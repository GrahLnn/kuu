use std::collections::HashSet;
use std::path::Path;

use crate::database::db;
use crate::utils::file;
use crate::utils::file::FileRecord;
use crate::utils::graph;
use crate::utils::label;
use crate::utils::node;
use surrealdb;
use surrealdb::Result as SurrealResult;

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
    let file_record: Vec<FileRecord> = db::create("file", file.clone()).await?;
    let record = file_record.get(0).unwrap();
    let node_title = record.stem.clone();

    let node = node::gen_node(node_title.clone());
    let _ = node::create_node_record(node.clone()).await;

    for title in labels {
        let label = label::LabelRecord {
            title: title.clone(),
            is_assignable: true,
            time: chrono::Utc::now().timestamp_millis(),
        };
        let _ = label::create_label_record(label).await;
        graph::link_node_to_label(node_title.clone(), title).await;
    }

    for title in self_labels {
        let label = label::LabelRecord {
            title: title.clone(),
            is_assignable: false,
            time: chrono::Utc::now().timestamp_millis(),
        };
        let _ = label::create_label_record(label).await;
        graph::link_node_to_label(node_title.clone(), title).await;
    }

    graph::link_node_to_file(node_title.clone(), record.hash.clone()).await;
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

pub async fn link_new_file(
    file: FileRecord,
    node_title: String,
) -> Result<node::NodeRecord, String> {
    let check = file::check_file_existence(&file.hash)
        .await
        .map_err(|e| e.to_string())?;
    if !check {
        return Err("File already exists".to_string());
    }
    let _: Vec<FileRecord> = db::create("file", file.clone())
        .await
        .map_err(|e| e.to_string())?;
    for title in file.labels.clone() {
        let label = label::LabelRecord {
            title: title.clone(),
            is_assignable: true,
            time: chrono::Utc::now().timestamp_millis(),
        };
        let _ = label::create_label_record(label).await;
    }
    graph::link_node_to_file(node_title.clone(), file.hash.clone()).await;
    let node = node::fetch_node(node_title)
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
    for file in files {
        let path = Path::new(&file.path);
        let mut f = gen_file_record(path).await?;
        f.labels = file
            .folders
            .clone()
            .into_iter()
            .filter(|l| !f.fix_labels.contains(l))
            .collect();
        if hashs.insert(f.hash.clone()) {
            file_records.push(f);
        }
    }
    Ok(file_records)
}

pub async fn import_file_with_node(file: FileRecord) -> Result<(), String> {
    dbg!(&file);
    let _: Vec<FileRecord> = db::create("file", file.clone())
        .await
        .map_err(|e| e.to_string())?;

    let mut all_labels = file.fix_labels;
    all_labels.extend(file.labels);
    for l in all_labels {
        graph::link_node_to_label(file.stem.clone(), l).await;
    }
    graph::link_node_to_file(file.stem.clone(), file.hash.clone()).await;
    Ok(())
}

pub async fn check_and_gen_node(files: Vec<FileRecord>) -> Result<(), String> {
    let nodes = node::get_existence_nodes()
        .await
        .map_err(|e| e.to_string())?;
    let stem_set: HashSet<String> = files.iter().map(|f| f.stem.clone()).collect();
    let need_create = stem_set.difference(&nodes).collect::<Vec<&String>>();
    for stem in need_create {
        let _ = node::create_node_record_no_check(node::gen_node(stem.clone())).await;
    }
    Ok(())
}
