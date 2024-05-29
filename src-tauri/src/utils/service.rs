use crate::database::db;
use crate::utils::file::FileRecord;
use crate::utils::graph;
use crate::utils::label;
use crate::utils::node;
use surrealdb::Result;

pub async fn create_import(
    mut file: FileRecord,
    labels: Vec<String>,
) -> Result<(FileRecord, Option<node::NodeRecord>)> {
    // 检查文件是否已经存在
    let sql = "(SELECT * FROM file WHERE hash = $hash) == []";
    let params = Some(vec![("hash", file.hash.as_str())]);
    let mut res = db::query(sql, params).await?;
    let check: Option<bool> = res.take(0)?;
    if check == Some(false) {
        return Ok((file, None));
    }
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

        // graph::link_node_to_label(node_title.clone(), title.clone()).await;
    }
    graph::link_node_to_file(node_title.clone(), record.hash.clone()).await;
    let node = node::fetch_node(node_title).await?;

    Ok((file, Some(node)))
}
