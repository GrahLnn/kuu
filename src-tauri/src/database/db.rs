use crate::utils::file;
use crate::utils::label;
use crate::utils::node;
use serde::{de::DeserializeOwned, Serialize};
use std::fmt::Debug;
use std::path::PathBuf;
use surrealdb::engine::local::{Db, RocksDb};
use surrealdb::sql::Thing;
use surrealdb::{Response, Result, Surreal};
use tokio::sync::OnceCell;

static DB: OnceCell<Surreal<Db>> = OnceCell::const_new();

pub async fn init(db_path: PathBuf) -> Result<()> {
    let db = Surreal::new::<RocksDb>(db_path).await?;
    db.use_ns("kuu").use_db("kuu").await?;
    DB.set(db).expect("Failed to set DB");
    Ok(())
}

pub async fn create<T: Serialize, U: DeserializeOwned + Debug>(
    table: &str,
    item: T,
) -> Result<Vec<U>> {
    let db = DB.get().expect("DB not initialized");
    let result: Vec<U> = db.create(table).content(item).await?;
    Ok(result)
}

pub async fn select<U: DeserializeOwned + Debug>(table: &str) -> Result<Vec<U>> {
    let db = DB.get().expect("DB not initialized");
    let result: Vec<U> = db.select(table).await?;
    Ok(result)
}

pub async fn delete(table: &str, id: &str) -> Result<Option<Thing>> {
    let db = DB.get().expect("DB not initialized");
    db.delete((table, id)).await
}

pub async fn query<T>(sql: &str, params: Option<Vec<(&str, T)>>) -> Result<Response>
where
    T: Serialize,
{
    let db = DB.get().expect("DB not initialized");
    let mut query = db.query(sql);
    if let Some(bindings) = params {
        for (key, value) in bindings {
            query = query.bind((key, value));
        }
    }
    query.await
}

pub async fn execute(sql: &str, params: Option<Vec<(&str, &str)>>) -> () {
    let db = DB.get().expect("DB not initialized");
    let mut execute = db.query(sql);
    if let Some(bindings) = params {
        for (key, value) in bindings {
            execute = execute.bind((key, value));
        }
    }
    let _ = execute.await;
}

pub async fn set<T: Serialize>(var: &str, item: T) -> Result<()> {
    let db = DB.get().expect("DB not initialized");
    db.set(var, item).await?;
    Ok(())
}

pub async fn check() -> Result<()> {
    let db = DB.get().expect("DB not initialized");
    let files: Vec<file::FileRecord> = db.select("file").await?;
    dbg!(files
        .iter()
        .map(|f| f.name.clone())
        .collect::<Vec<String>>());

    let nodes: Vec<node::NodeRecord> = db.select("node").await?;
    dbg!(nodes
        .iter()
        .map(|n| n.title.clone())
        .collect::<Vec<String>>());

    let labels: Vec<label::LabelRecord> = db.select("label").await?;
    dbg!(labels
        .iter()
        .map(|l| l.title.clone())
        .collect::<Vec<String>>());

    Ok(())
}
