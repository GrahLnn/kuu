use crate::utils::audio;
use crate::utils::common;
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
use futures::stream::{FuturesUnordered, StreamExt};
use indicatif::{ProgressBar, ProgressStyle};
use std::collections::HashSet;
use std::path::Path;
use std::sync::{Arc, Mutex};
use surrealdb::Result as SurrealResult;
use tauri::command;

type CmdResult<T = ()> = Result<T, String>;

#[command]
pub async fn import_file(path: String) -> CmdResult<(FileRecord, Option<NodeRecord>)> {
    let path = Path::new(&path);
    let record = service::gen_file_record(path)
        .await
        .map_err(|e| e.to_string())?;

    match service::create_import(record, vec![]).await {
        SurrealResult::Ok((file, node)) => Ok((file, node)),
        SurrealResult::Err(e) => Err(e.to_string()),
    }
}

#[command]
pub async fn link_new_file(path: String, node: NodeRecord) -> CmdResult<NodeRecord> {
    let path = Path::new(&path);
    let record = service::gen_file_record(path)
        .await
        .map_err(|e| e.to_string())?;
    let node = service::link_new_file(record, node)
        .await
        .map_err(|e| e.to_string())?;
    Ok(node)
}

#[command]
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

#[command]
pub async fn get_pdf_base64(path: String) -> CmdResult<Vec<String>> {
    let path = Path::new(&path);
    let result = pdf::pdf2base64(path.to_string_lossy().to_string()).await;
    match result {
        Ok(base64_images) => Ok(base64_images),
        Err(e) => Err(e.to_string()),
    }
}

#[command]
pub async fn get_audio_array(path: String) -> CmdResult<Vec<u8>> {
    let result = audio::read_audio_file(path).await;
    match result {
        Ok(audio_array) => Ok(audio_array),
        Err(e) => Err(e),
    }
}

#[command]
pub async fn fetch_node_by_hash(hash: String) -> CmdResult<NodeRecord> {
    let node = node::fetch_node_by_hash(hash)
        .await
        .map_err(|e| e.to_string())?;
    Ok(node)
}

#[command]
pub async fn fetch_labels() -> CmdResult<Vec<LabelRecord>> {
    dbg!("fetch_labels");
    let labels = label::fetch_labels().await;
    match labels {
        Ok(labels) => Ok(labels),
        Err(e) => Err(e.to_string()),
    }
}

#[command]
pub async fn update_node_title(old_title: String, new_title: String) -> CmdResult<()> {
    node::update_node_title(old_title, new_title)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[command]
pub async fn fetch_img_base64(path: String) -> CmdResult<String> {
    let path = Path::new(&path);
    let result = img::img2base64(path).await;
    match result {
        Ok(base64_image) => Ok(base64_image),
        Err(e) => Err(e.to_string()),
    }
}

#[command]
pub async fn add_label_and_link_node(title: String, node: NodeRecord) -> CmdResult<()> {
    let label = LabelRecord {
        title: title.clone(),
        is_assignable: true,
        time: chrono::Local::now().timestamp_millis(),
        hash: common::generate_random_string(32),
    };
    let _ = label::create_label_record(label.clone()).await;
    graph::link_node_to_label(node, vec![label]).await;
    Ok(())
}

#[command]
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

#[command]
pub async fn link_node_to_label_return_new(
    node: NodeRecord,
    label: LabelRecord,
) -> CmdResult<NodeRecord> {
    graph::link_node_to_label(node.clone(), vec![label]).await;
    match node::fetch_node(node.title).await {
        Ok(node) => Ok(node),
        Err(e) => Err(e.to_string()),
    }
}

#[command]
pub async fn fetch_pre_files(path: String) -> CmdResult<Vec<PreFileInfo>> {
    let path = Path::new(&path);
    let initial_folders = Vec::new();
    let files =
        file::fetch_folder_files(path.to_path_buf(), initial_folders).map_err(|e| e.to_string())?;
    Ok(files)
}

#[command]
pub async fn fetch_all_nodes() -> CmdResult<Vec<NodeRecord>> {
    dbg!("fetch_all_nodes");
    let nodes = node::fetch_all_nodes().await;
    match nodes {
        Ok(nodes) => Ok(nodes),
        Err(e) => Err(e.to_string()),
    }
}

#[command]
pub async fn fetch_nodes_by_labels(labels: Vec<String>) -> CmdResult<Vec<NodeRecord>> {
    let nodes = node::fetch_nodes_by_labels(labels).await;
    match nodes {
        Ok(nodes) => Ok(nodes),
        Err(e) => Err(e.to_string()),
    }
}

#[command]
pub async fn fetch_file(path: String) -> CmdResult<FileRecord> {
    dbg!(&path);
    let file = file::fetch_file_by_path(path).await;
    match file {
        Ok(file) => Ok(file),
        Err(e) => Err(e.to_string()),
    }
}

#[command]
pub async fn delete_file(path: String) -> CmdResult<()> {
    graph::delete_file_and_update_network(path).await;
    Ok(())
}

#[command]
pub async fn add_new_label(title: String) -> CmdResult<()> {
    let label = LabelRecord {
        title,
        is_assignable: true,
        time: chrono::Local::now().timestamp_millis(),
        hash: common::generate_random_string(32),
    };
    let _ = label::create_label_record(label).await;
    Ok(())
}

#[command]
pub async fn update_label(old_title: String, new_title: String) -> CmdResult<()> {
    service::update_label_and_relates(old_title, new_title)
        .await
        .map_err(|e| e.to_string())?;
    Ok(())
}

#[command]
pub async fn delete_label(title: String) -> CmdResult<()> {
    let _ = service::delete_label(title).await;
    Ok(())
}

#[command]
pub async fn gen_file_from_folder(path: String) -> CmdResult<(Vec<FileRecord>, Vec<FileRecord>)> {
    let files = service::gen_file_from_folder(path).await?;

    let exist_files = file::get_existence_hashs().await?;

    let unique_files: Vec<FileRecord> = files
        .clone()
        .into_iter()
        .filter(|f| !exist_files.contains(&f.hash))
        .collect();
    let repeated_files: Vec<FileRecord> = files
        .clone()
        .into_iter()
        .filter(|f| exist_files.contains(&f.hash))
        .collect();

    let exist_label = label::get_existence_labels()
        .await
        .map_err(|e| e.to_string())?;
    let ext_label_title: HashSet<String> = exist_label
        .clone()
        .into_iter()
        .map(|label| label.title)
        .collect();

    let fix_labels: HashSet<String> = unique_files
        .iter()
        .map(|f| f.fix_labels.clone())
        .flatten()
        .collect();

    let unique_fix_labels: Vec<String> = fix_labels.difference(&ext_label_title).cloned().collect();
    let clean_fix_labels: Vec<LabelRecord> = unique_fix_labels
        .into_iter()
        .map(|l| label::label_info(l, false))
        .collect();
    let assinable_labels: HashSet<String> = unique_files
        .iter()
        .map(|f| f.labels.clone())
        .flatten()
        .collect();

    let unique_assinable_labels: Vec<String> = assinable_labels
        .difference(&ext_label_title)
        .cloned()
        .collect();
    let clean_assinable_labels: Vec<LabelRecord> = unique_assinable_labels
        .into_iter()
        .map(|l| label::label_info(l, true))
        .collect();
    let union_clean_labels: Vec<LabelRecord> = clean_fix_labels
        .into_iter()
        .chain(clean_assinable_labels.into_iter())
        .collect();

    label::just_create_label(union_clean_labels.clone())
        .await
        .map_err(|e| e.to_string())?;
    let mut all_labels_vec = union_clean_labels.clone();
    all_labels_vec.extend(exist_label.clone());

    let nodes = service::check_and_gen_node(unique_files.clone()).await?;

    let pb = ProgressBar::new(unique_files.len() as u64);
    pb.set_style(
        ProgressStyle::default_bar()
            .template(
                "{spinner:.green} [{elapsed_precise}] [{bar:40.cyan/blue}] {pos}/{len} ({eta})",
            )
            .map_err(|e| e.to_string())?
            .progress_chars("#>-"),
    );
    // let _ = file::batch_create_file_record(files.clone()).await;
    let all_labels: HashSet<LabelRecord> = all_labels_vec.into_iter().collect();
    for file in unique_files.clone() {
        // let node = nodes
        //     .iter()
        //     .find(|n| n.title == file.stem)
        //     .map(|n| n.clone())
        //     .unwrap();
        let node = nodes
            .iter()
            .find(|n| n.title == file.stem)
            .map(|n| n.clone())
            .unwrap_or_else(|| {
                // 记录错误日志或其他处理逻辑
                // println!("Node with title '{}' not found", file.stem);
                // 你可以选择返回一个默认值，或者直接引发 panic
                panic!("Node with title '{}' not found", file.stem);
            });

        let mut labels_t = file.clone().fix_labels;
        labels_t.extend(file.clone().labels);
        let labels: Vec<LabelRecord> = labels_t
            .into_iter()
            .filter_map(|l| {
                all_labels
                    .get(&LabelRecord {
                        title: l,
                        is_assignable: false, // 其他字段可以随便填，只要确保 `title` 字段是正确的
                        time: 0,
                        hash: "".to_string(),
                    })
                    .cloned()
            })
            .collect();
        service::import_file_with_node(file, node, labels).await?;
        pb.inc(1);
    }

    // let unique_files_clone = unique_files.clone();
    // let futures: FuturesUnordered<_> = unique_files_clone
    //     .into_iter()
    //     .map(|file| service::import_file_with_node(file))
    //     .collect();

    // futures
    //     .for_each_concurrent(1000, |result| async {
    //         if let Err(e) = result {
    //             dbg!(e);
    //         }
    //         pb.inc(1);
    //     })
    //     .await;

    Ok((unique_files, repeated_files))
}

#[command]
pub async fn just_import_file(
    file: FileRecord,
    node: NodeRecord,
    labels: Vec<LabelRecord>,
) -> CmdResult<()> {
    dbg!(&file);
    service::import_file_with_node(file, node, labels).await?;
    Ok(())
}
