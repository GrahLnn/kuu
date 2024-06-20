use crate::database::db;
use serde::{Deserialize, Serialize};
use std::collections::HashSet;
use std::hash::{Hash, Hasher};
use surrealdb::Result;

use super::common;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct LabelRecord {
    pub title: String,
    pub is_assignable: bool,
    pub time: i64,
    pub hash: String,
}

impl PartialEq for LabelRecord {
    fn eq(&self, other: &Self) -> bool {
        self.title == other.title
    }
}

impl Eq for LabelRecord {}

// 实现 Hash 只基于 title 字段
impl Hash for LabelRecord {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.title.hash(state);
    }
}

pub async fn create_label_record(label: LabelRecord) -> Result<()> {
    let sql = "(SELECT * FROM label WHERE title = $title) = []";
    let params = Some(vec![("title", label.title.as_str())]);
    let mut res = db::query(sql, params, None::<Vec<(&str, Vec<String>)>>).await?;
    let check: Option<bool> = res.take(0)?;

    if !check.unwrap() {
        return Ok(());
    }
    let r: Option<LabelRecord> =
        db::create_with_init_id("label", &label.clone().hash, label).await?;
    dbg!(r);
    Ok(())
}

pub async fn fetch_labels() -> Result<Vec<LabelRecord>> {
    let mut labels: Vec<LabelRecord> = db::select("label").await?;
    labels.sort_by(|a, b| b.time.cmp(&a.time));
    Ok(labels)
}

pub async fn get_existence_labels() -> Result<Vec<LabelRecord>> {
    let labels: Vec<LabelRecord> = db::select("label").await?;

    Ok(labels)
}

pub async fn just_create_label(labels: Vec<LabelRecord>) -> Result<()> {
    for label in labels {
        let _: Option<LabelRecord> =
            db::create_with_init_id("label", &label.clone().hash, label).await?;
    }
    Ok(())
}

pub fn label_info(title: String, is_assignable: bool) -> LabelRecord {
    LabelRecord {
        title,
        is_assignable,
        time: chrono::Utc::now().timestamp_millis(),
        hash: common::generate_random_string(32),
    }
}
