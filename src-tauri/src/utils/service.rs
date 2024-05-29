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
    labels: Vec<String>,
) -> SurrealResult<(FileRecord, Option<node::NodeRecord>)> {
    let check = file::check_file_existence(&file.hash).await?;
    if !check {
        return Ok((file, None));
    }
    file.labels.extend(labels.clone());
    let file_record: Vec<FileRecord> = db::create("file", file.clone()).await?;
    let record = file_record.get(0).unwrap();
    let node_title = record.stem.clone();

    let node = node::gen_node(node_title.clone());
    let _ = node::create_node_record(node.clone()).await;

    for title in file.labels.clone() {
        let label = label::LabelRecord {
            title: title.clone(),
            is_assignable: true,
            time: chrono::Utc::now().timestamp_millis(),
        };
        let _ = label::create_label_record(label).await;
    }
    graph::link_node_to_file(node_title.clone(), record.hash.clone()).await;
    let node = node::fetch_node(node_title).await?;

    Ok((file, Some(node)))
}

pub async fn gen_file_record(path: String) -> Result<FileRecord, String> {
    let file_path = Path::new(&path);
    let metadata = async_std::fs::metadata(&path)
        .await
        .map_err(|e| e.to_string())?;
    if metadata.is_dir() {
        return Err("The path is a directory, not a file".to_string());
    }
    let f = file::gen_file_info(file_path.to_path_buf()).map_err(|e| e.to_string())?;
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
