use crate::utils::audio;
use crate::utils::file;
use crate::utils::file::FileRecord;
use crate::utils::file::PreFileInfo;
use crate::utils::graph;
use crate::utils::img;
use crate::utils::label;
use crate::utils::label::LabelRecord;
use crate::utils::node;
use crate::utils::node::NodeRecord;
use crate::utils::pdf;
use crate::utils::service;
use std::path::Path;
use surrealdb::Result as SurrealResult;
use tauri;

type CmdResult<T = ()> = Result<T, String>;

#[tauri::command]
pub async fn import_file(path: String) -> CmdResult<(FileRecord, Option<NodeRecord>)> {
    let record = service::gen_file_record(path)
        .await
        .map_err(|e| e.to_string())?;

    match service::create_import(record, vec![]).await {
        SurrealResult::Ok((file, node)) => Ok((file, node)),
        SurrealResult::Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn link_new_file(path: String, title: String) -> CmdResult<NodeRecord> {
    let record = service::gen_file_record(path)
        .await
        .map_err(|e| e.to_string())?;
    let node = service::link_new_file(record, title)
        .await
        .map_err(|e| e.to_string())?;
    Ok(node)
}

#[tauri::command]
pub async fn import_file_with_labels(
    path: String,
    labels: Vec<String>,
) -> CmdResult<(FileRecord, Option<NodeRecord>)> {
    let file_path = Path::new(&path);
    let metadata = async_std::fs::metadata(&path)
        .await
        .map_err(|e| e.to_string())?;
    if metadata.is_dir() {
        dbg!("The path is a directory, not a file");
        return Err("The path is a directory, not a file".to_string());
    }
    let record = file::gen_file_info(file_path.to_path_buf()).map_err(|e| e.to_string())?;

    match service::create_import(record, labels).await {
        SurrealResult::Ok((file, node)) => Ok((file, node)),
        SurrealResult::Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn get_pdf_base64(path: String) -> CmdResult<Vec<String>> {
    let path = Path::new(&path);
    let result = pdf::pdf2base64(path.to_string_lossy().to_string()).await;
    match result {
        Ok(base64_images) => Ok(base64_images),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn get_audio_array(path: String) -> CmdResult<Vec<u8>> {
    let result = audio::read_audio_file(path).await;
    match result {
        Ok(audio_array) => Ok(audio_array),
        Err(e) => Err(e),
    }
}

#[tauri::command]
pub async fn fetch_node_by_hash(hash: String) -> CmdResult<NodeRecord> {
    let node = node::fetch_node_by_hash(hash)
        .await
        .map_err(|e| e.to_string())?;
    Ok(node)
}

#[tauri::command]
pub async fn fetch_labels() -> CmdResult<Vec<LabelRecord>> {
    let labels = label::fetch_labels().await;
    match labels {
        Ok(labels) => Ok(labels),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn update_node_title(old_title: String, new_title: String) -> CmdResult<()> {
    node::update_node_title(old_title, new_title)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[tauri::command]
pub async fn fetch_img_base64(path: String) -> CmdResult<String> {
    let path = Path::new(&path);
    let result = img::img2base64(path).await;
    match result {
        Ok(base64_image) => Ok(base64_image),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn add_label_and_link_node(title: String, node_title: String) -> CmdResult<()> {
    let label = LabelRecord {
        title: title.clone(),
        is_assignable: true,
        time: chrono::Local::now().timestamp_millis(),
    };
    let _ = label::create_label_record(label).await;
    graph::link_node_to_label(node_title, title).await;
    Ok(())
}

#[tauri::command]
pub async fn delete_node_label_link_return_new(
    node_title: String,
    label_title: String,
) -> CmdResult<NodeRecord> {
    graph::delete_node_label_link(node_title.clone(), label_title).await;
    match node::fetch_node(node_title).await {
        Ok(node) => Ok(node),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn link_node_to_label_return_new(
    node_title: String,
    label_title: String,
) -> CmdResult<NodeRecord> {
    graph::link_node_to_label(node_title.clone(), label_title).await;
    match node::fetch_node(node_title).await {
        Ok(node) => Ok(node),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn fetch_pre_files(path: String) -> CmdResult<Vec<PreFileInfo>> {
    let path = Path::new(&path);
    let initial_folders = Vec::new();
    let files =
        file::fetch_folder_files(path.to_path_buf(), initial_folders).map_err(|e| e.to_string())?;
    Ok(files)
}

#[tauri::command]
pub async fn fetch_all_nodes() -> CmdResult<Vec<NodeRecord>> {
    let nodes = node::fetch_all_nodes().await;
    match nodes {
        Ok(nodes) => Ok(nodes),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn fetch_nodes_by_labels(labels: Vec<String>) -> CmdResult<Vec<NodeRecord>> {
    let nodes = node::fetch_nodes_by_labels(labels).await;
    match nodes {
        Ok(nodes) => Ok(nodes),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn fetch_file(path: String) -> CmdResult<FileRecord> {
    dbg!(&path);
    let file = file::fetch_file_by_path(path).await;
    match file {
        Ok(file) => Ok(file),
        Err(e) => Err(e.to_string()),
    }
}

#[tauri::command]
pub async fn delete_file(path: String) -> CmdResult<()> {
    graph::delete_file_and_update_network(path).await;
    Ok(())
}
