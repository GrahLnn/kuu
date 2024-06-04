use std::collections::HashSet;

use crate::database::db;
use serde::{Deserialize, Serialize};
use surrealdb::Result;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct LabelRecord {
    pub title: String,
    pub is_assignable: bool,
    pub time: i64,
}

pub async fn create_label_record(label: LabelRecord) -> Result<()> {
    let sql = "(SELECT * FROM label WHERE title = $title) = []";
    let params = Some(vec![("title", label.title.as_str())]);
    let mut res = db::query(sql, params).await?;
    let check: Option<bool> = res.take(0)?;
    if check == Some(false) {
        return Ok(());
    }
    let _: Vec<LabelRecord> = db::create("label", label).await?;
    Ok(())
}

pub async fn fetch_labels() -> Result<Vec<LabelRecord>> {
    let mut labels: Vec<LabelRecord> = db::select("label").await?;
    labels.sort_by(|a, b| b.time.cmp(&a.time));
    Ok(labels)
}

pub async fn get_existence_labels() -> Result<HashSet<String>> {
    let labels: Vec<LabelRecord> = db::select("label").await?;
    let labels: HashSet<String> = labels.into_iter().map(|label| label.title).collect();
    Ok(labels)
}

pub async fn just_create_label(labels: Vec<LabelRecord>) -> Result<()> {
    for label in labels {
        let _: Vec<LabelRecord> = db::create("label", label).await?;
    }
    Ok(())
}

pub fn label_info(title: String, is_assignable: bool) -> LabelRecord {
    LabelRecord {
        title,
        is_assignable,
        time: chrono::Utc::now().timestamp_millis(),
    }
}
