use super::common;
use super::label::LabelRecord;
use super::node::NodeRecord;
use crate::database::db;
use crate::utils::file;
use crate::utils::file::FileRecord;
use crate::utils::graph;
use crate::utils::label;
use crate::utils::node;
use futures::stream::{FuturesUnordered, StreamExt};
use indicatif::{ProgressBar, ProgressStyle};
use std::collections::HashSet;
use std::path::Path;
use surrealdb;
use surrealdb::Result as SurrealResult;
use tokio::task;

pub async fn create_import(
    mut file: FileRecord,
    mut labels: Vec<String>,
) -> SurrealResult<(FileRecord, Option<node::NodeRecord>)> {
    let check = file::check_file_existence(&file.hash).await?;

    if !check {
        return Ok((file, None));
    }

    let self_labels = file.fix_labels.clone();
    labels.retain(|label| !self_labels.contains(label));
    file.labels.extend(labels.clone());
    let _: Option<FileRecord> = db::create_with_init_id("file", &file.hash, file.clone()).await?;

    let node_title = file.stem.clone();

    let node = node::gen_node(node_title.clone());
    let _ = node::create_node_record(node.clone()).await;

    for title in labels {
        let label = label::LabelRecord {
            title: title.clone(),
            is_assignable: true,
            time: chrono::Utc::now().timestamp_millis(),
            hash: common::generate_random_string(32),
        };
        let _ = label::create_label_record(label.clone()).await;
        graph::link_node_to_label(node.clone(), vec![label]).await;
    }

    for title in self_labels {
        let label = label::LabelRecord {
            title: title.clone(),
            is_assignable: false,
            time: chrono::Utc::now().timestamp_millis(),
            hash: common::generate_random_string(32),
        };
        let _ = label::create_label_record(label.clone()).await;
        graph::link_node_to_label(node.clone(), vec![label]).await;
    }

    graph::link_node_to_file(node.clone(), file.clone()).await;
    let node = node::fetch_node(node_title).await?;

    Ok((file, Some(node)))
}

pub async fn gen_file_record(path: &Path) -> Result<FileRecord, String> {
    let metadata = async_std::fs::metadata(&path)
        .await
        .map_err(|e| e.to_string())?;
    if metadata.is_dir() {
        return Err("The path is a directory, not a file".to_string());
    }
    let f = file::gen_file_info(path.to_path_buf()).map_err(|e| e.to_string())?;
    Ok(f)
}

pub async fn link_new_file(file: FileRecord, node: NodeRecord) -> Result<node::NodeRecord, String> {
    let check = file::check_file_existence(&file.hash)
        .await
        .map_err(|e| e.to_string())?;
    if !check {
        return Err("File already exists".to_string());
    }
    let _: Option<FileRecord> = db::create_with_init_id("file", &file.hash, file.clone())
        .await
        .map_err(|e| e.to_string())?;
    for title in file.labels.clone() {
        let label = label::LabelRecord {
            title: title.clone(),
            is_assignable: true,
            time: chrono::Utc::now().timestamp_millis(),
            hash: common::generate_random_string(32),
        };
        let _ = label::create_label_record(label).await;
    }
    graph::link_node_to_file(node.clone(), file.clone()).await;
    let node = node::fetch_node(node.title)
        .await
        .map_err(|e| e.to_string())?;
    Ok(node)
}

pub async fn update_label_and_relates(old_label: String, new_label: String) -> Result<(), String> {
    let sql = r#"
        LET $label = SELECT VALUE id FROM ONLY label WHERE title = $old LIMIT 1;
        UPDATE $label SET title = $new;
        LET $relate_nodes = SELECT VALUE <-labeled.in FROM ONLY $label LIMIT 1;
        FOR $node IN $relate_nodes {
            UPDATE $node SET labels -= $old;
            UPDATE $node SET labels += $new;
        };
        LET $relate_files = SELECT VALUE ->linked.out FROM $relate_nodes;
        FOR $file IN $relate_files {
            UPDATE $file SET labels -= $old;
            UPDATE $file SET labels += $new;
        };
    "#;
    let params = Some(vec![
        ("old", old_label.as_str()),
        ("new", new_label.as_str()),
    ]);
    db::execute(sql, params).await;

    Ok(())
}

pub async fn delete_label(label: String) -> Result<(), String> {
    let sql = r#"
        LET $label = SELECT VALUE id FROM ONLY label WHERE title = $title LIMIT 1;
        LET $relate_nodes = SELECT VALUE <-labeled.in FROM ONLY $label LIMIT 1;
        FOR $node IN $relate_nodes {
            UPDATE $node SET labels -= $title;
        };
        LET $relate_files = SELECT VALUE ->linked.out FROM $relate_nodes;
        FOR $file IN $relate_files {
            UPDATE $file SET labels -= $title;
        };
        DELETE $label;
    "#;
    let params = Some(vec![("title", label.as_str())]);
    db::execute(sql, params).await;

    Ok(())
}

pub async fn gen_file_from_folder(str_path: String) -> Result<Vec<FileRecord>, String> {
    let path = Path::new(&str_path);

    let files =
        file::fetch_folder_files(path.to_path_buf(), Vec::new()).map_err(|e| e.to_string())?;

    let mut hashs = HashSet::new();
    let mut file_records = Vec::new();

    let mut tasks: FuturesUnordered<_> = files
        .into_iter()
        .map(|file| {
            let file_path = file.path.clone();
            let folders = file.folders.clone();
            task::spawn(async move {
                let path = Path::new(&file_path);
                let mut f = gen_file_record(path).await?;
                f.labels = folders
                    .into_iter()
                    .filter(|l| !f.fix_labels.contains(l))
                    .collect();
                Ok::<_, String>((f.hash.clone(), f))
            })
        })
        .collect();

    while let Some(result) = tasks.next().await {
        match result {
            Ok(Ok((hash, file_record))) => {
                if hashs.insert(hash) {
                    file_records.push(file_record);
                }
            }
            Ok(Err(e)) => return Err(e),
            Err(e) => return Err(e.to_string()),
        }
    }

    Ok(file_records)
}

pub async fn import_file_with_node(
    file: FileRecord,
    node: NodeRecord,
    labels: Vec<LabelRecord>,
) -> Result<(), String> {
    let _: Option<FileRecord> = db::create_with_init_id("file", &file.hash, file.clone())
        .await
        .map_err(|e| e.to_string())?;
    graph::link_node_to_label(node.clone(), labels).await;
    graph::link_node_to_file(node.clone(), file).await;

    Ok(())
}

pub async fn check_and_gen_node(files: Vec<FileRecord>) -> Result<Vec<NodeRecord>, String> {
    let existing_nodes = node::get_exist_nodes().await.map_err(|e| e.to_string())?;
    let existing_titles: HashSet<String> = existing_nodes
        .iter()
        .map(|node| node.title.clone())
        .collect();
    let stem_set: HashSet<String> = files.iter().map(|f| f.stem.clone()).collect();
    let need_create: HashSet<String> = stem_set.difference(&existing_titles).cloned().collect();
    let mut nodes = Vec::new();
    for stem in &need_create {
        let node = node::gen_node(stem.clone());
        let _ = node::create_node_record_no_check(node.clone()).await;
        nodes.push(node);
    }
    let existing_stems: HashSet<_> = stem_set.difference(&need_create).cloned().collect();
    for stem in existing_stems {
        if let Some(node) = existing_nodes.iter().find(|n| n.title == stem) {
            nodes.push(node.clone());
        }
    }

    Ok(nodes)
}
