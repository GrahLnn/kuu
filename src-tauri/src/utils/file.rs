use crate::database::db;
use blake3;
use chrono::Utc;
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::fs;
use std::fs::File;
use std::io::{self, BufReader, Read, Seek, SeekFrom};
use std::path::{Path, PathBuf};
use surrealdb::Result as SurrealResult;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct FileRecord {
    pub name: String,
    pub stem: String,
    pub path: String,
    pub size: String,
    pub ext: String,
    pub hash: String,
    pub logo: String,
    pub record_time: i64,
    pub labels: Vec<String>,
}

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct PreFileInfo {
    pub path: PathBuf,
    pub folders: Vec<String>,
}

fn format_bytes(bytes: u64) -> String {
    if bytes == 0 {
        return "0 Bytes".to_string();
    }
    let sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    let k: f64 = 1000.0;
    let i = (bytes as f64).log(k).floor() as usize;
    let count = bytes as f64 / k.powi(i as i32);

    if count.fract() == 0.0 {
        format!("{} {}", count as u64, sizes[i])
    } else {
        let formatted = format!("{:.1}", count);
        format!("{} {}", formatted, sizes[i])
    }
}

fn multi_point_fingerprint(file_path: &Path) -> io::Result<String> {
    let file = File::open(file_path)?;
    let mut reader = BufReader::new(&file);
    let mut hasher = blake3::Hasher::new();
    let buffer_size = 4096;
    let mut buffer = vec![0u8; buffer_size];

    let file_size = file.metadata()?.len() as usize;

    let positions = if file_size > 3 * buffer_size {
        vec![0, file_size / 2 - buffer_size / 2, file_size - buffer_size]
    } else {
        vec![0, file_size]
    };

    for &pos in &positions {
        if pos < file_size {
            reader.seek(SeekFrom::Start(pos as u64))?;
            let bytes_read = reader.read(&mut buffer)?;
            if bytes_read > 0 {
                hasher.update(&buffer[..bytes_read]);
            }
        }
    }

    let hash = hasher.finalize();
    Ok(hash.to_hex().to_string())
}

fn init_file_collection() -> HashMap<&'static str, Vec<&'static str>> {
    let mut file_collection = HashMap::new();
    file_collection.insert(
        "audio",
        vec!["mp3", "wav", "flac", "aac", "ogg", "wma", "m4a"],
    );
    file_collection.insert(
        "video",
        vec!["mp4", "mkv", "avi", "mov", "wmv", "flv", "webm"],
    );
    file_collection.insert(
        "image",
        vec!["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"],
    );
    file_collection.insert("pdf", vec!["pdf"]);
    file_collection.insert("archive", vec!["zip", "rar", "7z", "tar", "gz", "bz2"]);
    file_collection.insert(
        "text",
        vec![
            "py", "js", "ts", "html", "css", "scss", "java", "c", "cpp", "h", "hpp", "cs", "php",
            "go", "rb", "sh", "rs", "kt", "swift", "dart", "md",
        ],
    );
    file_collection
}

fn get_file_logo(ext: &str) -> &'static str {
    let file_collection = init_file_collection();
    for (file_type, extensions) in file_collection {
        if extensions.contains(&ext) {
            return file_type;
        }
    }
    "other"
}

pub fn gen_file_info(path: PathBuf) -> io::Result<FileRecord> {
    let file = File::open(&path)?;
    let metadata = file.metadata()?;
    let size = metadata.len();

    let ext = path
        .extension()
        .and_then(|s| s.to_str())
        .map(|s| s.to_lowercase())
        .unwrap_or_default();

    let hash = multi_point_fingerprint(&path)?;

    let record_time = Utc::now().timestamp_millis();

    let mut labels = Vec::new();

    if !ext.is_empty() {
        labels.push(ext.clone());
    }

    let file_record = FileRecord {
        name: path
            .file_name()
            .and_then(|s| s.to_str())
            .unwrap_or_default()
            .to_string(),
        stem: path
            .file_stem()
            .and_then(|s| s.to_str())
            .unwrap_or_default()
            .to_string(),
        path: path.to_str().unwrap_or_default().to_string(),
        size: format_bytes(size),
        ext: ext.clone(),
        hash,
        logo: get_file_logo(&ext).to_string(),
        record_time,
        labels,
    };

    Ok(file_record)
}

pub fn fetch_folder_files(path: PathBuf, folders: Vec<String>) -> io::Result<Vec<PreFileInfo>> {
    let mut results = Vec::new();
    if path.is_dir() {
        for entry in fs::read_dir(&path)? {
            let entry = entry?;
            let file_path = entry.path();
            let mut current_folders = folders.clone();
            if let Some(parent_dir) = file_path.parent().and_then(|p| p.file_name()) {
                if let Some(parent_name) = parent_dir.to_str() {
                    current_folders.push(parent_name.to_string());
                }
            }

            if file_path.is_dir() {
                let sub_files = fetch_folder_files(file_path, current_folders)?;
                results.extend(sub_files);
            } else {
                results.push(PreFileInfo {
                    path: file_path,
                    folders: current_folders,
                });
            }
        }
    }
    Ok(results)
}

pub async fn fetch_file_by_path(path: String) -> SurrealResult<FileRecord> {
    let sql = "SELECT * FROM ONLY file WHERE path = $path LIMIT 1;";
    let params = Some(vec![("path", path.as_str())]);
    let mut res = db::query(sql, params).await?;
    let file: Option<FileRecord> = res.take(0)?;
    dbg!(&file);
    Ok(file.unwrap())
}

pub async fn delete_file(path: String) -> SurrealResult<()> {
    let sql = "DELETE file WHERE path = $path;";
    let params = Some(vec![("path", path.as_str())]);
    db::execute(sql, params).await;
    Ok(())
}

pub async fn check_file_existence(hash: &str) -> SurrealResult<bool> {
    let sql = "(SELECT * FROM file WHERE hash = $hash) == []";
    let params = Some(vec![("hash", hash)]);
    let mut res = db::query(sql, params).await?;
    let check: Option<bool> = res.take(0)?;
    Ok(check.unwrap())
}
