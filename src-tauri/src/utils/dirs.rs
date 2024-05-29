use std::fs;
use std::path::PathBuf;

pub fn app_db_dir(appdata_dir: PathBuf) -> PathBuf {
    let db_dir = appdata_dir.join("db");
    if !db_dir.exists() {
        fs::create_dir_all(&db_dir).expect("Failed to create db directory");
    }
    db_dir
}

pub fn app_config_dir(appdata_dir: PathBuf) -> PathBuf {
    let config_dir = appdata_dir.join("config");
    if !config_dir.exists() {
        fs::create_dir_all(&config_dir).expect("Failed to create config directory");
    }
    config_dir
}

pub fn app_log_dir(appdata_dir: PathBuf) -> PathBuf {
    let log_dir = appdata_dir.join("log");
    if !log_dir.exists() {
        fs::create_dir_all(&log_dir).expect("Failed to create log directory");
    }
    log_dir
}

pub fn app_user_data_dir(appdata_dir: PathBuf) -> PathBuf {
    let user_data_dir = appdata_dir.join("user_data");
    if !user_data_dir.exists() {
        fs::create_dir_all(&user_data_dir).expect("Failed to create user_data directory");
    }
    user_data_dir
}

pub fn app_temp_dir(appdata_dir: PathBuf) -> PathBuf {
    let temp_dir = appdata_dir.join("temp");
    if !temp_dir.exists() {
        fs::create_dir_all(&temp_dir).expect("Failed to create temp directory");
    }
    temp_dir
}

pub fn app_resource_dir(appdata_dir: PathBuf) -> PathBuf {
    let resource_dir = appdata_dir.join("resource");
    if !resource_dir.exists() {
        fs::create_dir_all(&resource_dir).expect("Failed to create resource directory");
    }
    resource_dir
}

pub fn app_backup_dir(appdata_dir: PathBuf) -> PathBuf {
    let backup_dir = appdata_dir.join("backup");
    if !backup_dir.exists() {
        fs::create_dir_all(&backup_dir).expect("Failed to create backup directory");
    }
    backup_dir
}
