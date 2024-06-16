use std::collections::HashSet;

use crate::database::db;
use anyhow::{bail, Result};
use serde::{Deserialize, Serialize};
use surrealdb::Result as SurrealResult;

use super::common;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct NodeRecord {
    pub title: String,
    pub labels: Vec<String>,
    pub linked_files: Vec<String>,
    pub hash: String,
}

// pub async fn create_node_record(node: NodeRecord) -> SurrealResult<()> {
//     let _: Vec<NodeRecord> = db::create("node", node).await?;

//     Ok(())
// }

pub async fn create_node_record(node: NodeRecord) -> SurrealResult<()> {
    let sql = "(SELECT * FROM node WHERE title = $title) = []";
    let params = Some(vec![("title", node.title.as_str())]);
    let mut res = db::query(sql, params, None::<Vec<(&str, Vec<String>)>>).await?;
    let check: Option<bool> = res.take(0)?;
    if check.unwrap() {
        let _: Option<NodeRecord> =
            db::create_with_init_id("node", &node.clone().title, node).await?;
    }
    Ok(())
}

pub async fn create_node_record_no_check(node: NodeRecord) -> SurrealResult<()> {
    let _: Option<NodeRecord> = db::create_with_init_id("node", &node.clone().hash, node).await?;
    Ok(())
}

pub fn gen_node(title: String) -> NodeRecord {
    NodeRecord {
        title,
        labels: vec![],
        linked_files: vec![],
        hash: common::generate_random_string(32),
    }
}

pub async fn fetch_node(title: String) -> SurrealResult<NodeRecord> {
    let sql = r#"
        SELECT * FROM ONLY node WHERE title = $title LIMIT 1;
        "#;
    let params = Some(vec![("title", title.as_str())]);
    let mut res = db::query(sql, params, None::<Vec<(&str, Vec<String>)>>).await?;
    let node: Option<NodeRecord> = res.take(0)?;
    Ok(node.unwrap())
}

pub async fn fetch_all_nodes() -> SurrealResult<Vec<NodeRecord>> {
    let nodes: Vec<NodeRecord> = db::select("node").await?;
    Ok(nodes)
}

pub async fn fetch_node_by_hash(hash: String) -> SurrealResult<NodeRecord> {
    let sql = r#"
        LET $file = (SELECT VALUE id FROM file WHERE hash = $hash);
        LET $node = (SELECT VALUE <-linked.in FROM ONLY $file LIMIT 1);
        SELECT * FROM ONLY $node LIMIT 1;
        "#;
    let params = Some(vec![("hash", hash.as_str())]);
    let mut res = db::query(sql, params, None::<Vec<(&str, Vec<String>)>>).await?;
    let node: Option<NodeRecord> = res.take(2)?;
    Ok(node.unwrap())
}

pub async fn fetch_nodes_by_labels(labels: Vec<String>) -> SurrealResult<Vec<NodeRecord>> {
    let sql = r#"
        LET $labelsID = (SELECT VALUE id FROM label WHERE title IN $labels);
        LET $nodes = array::distinct(array::flatten(SELECT VALUE <-labeled.in FROM $labelsID));
        SELECT * FROM $nodes WHERE array::len(array::intersect(labels, $labels)) == array::len($labels);
        "#;
    // let labels_str = format!("{:?}", labels);
    let params = Some(vec![("labels", labels)]);
    let mut res = db::query(sql, params, None::<Vec<(&str, Vec<String>)>>).await?;
    let nodes: Vec<NodeRecord> = res.take(2)?;
    dbg!(&nodes);
    Ok(nodes)
}

pub async fn update_node_title(old_title: String, new_title: String) -> Result<()> {
    let sql = r#"
        LET $node = (SELECT VALUE id FROM node WHERE title = $new_title);
        RETURN $node == [];
        "#;
    let params = Some(vec![("new_title", new_title.as_str())]);
    let mut res = db::query(sql, params, None::<Vec<(&str, Vec<String>)>>).await?;
    dbg!(&res);
    let check: Option<bool> = res.take(1)?;
    if check == Some(false) {
        bail!("Node with new title already exists");
    }

    let sql = r#"
        LET $node = (SELECT VALUE id FROM ONLY node WHERE title = $old_title LIMIT 1);
        UPDATE $node SET title = $new_title;
        "#;
    let params = Some(vec![
        ("old_title", old_title.as_str()),
        ("new_title", new_title.as_str()),
    ]);
    db::execute(sql, params).await;
    Ok(())
}

pub async fn get_existence_nodes() -> SurrealResult<HashSet<String>> {
    let nodes: Vec<NodeRecord> = db::select("node").await?;
    let titles: HashSet<String> = nodes.iter().map(|node| node.title.clone()).collect();
    Ok(titles)
}
