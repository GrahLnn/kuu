use once_cell::sync::Lazy;
use std::path::PathBuf;
use std::sync::Mutex;

pub static APP_DATA_DIR: Lazy<Mutex<Option<PathBuf>>> = Lazy::new(|| Mutex::new(None));

pub fn setup_global_app_data_dir(app_data_dir: PathBuf) {
    let mut dir = APP_DATA_DIR.lock().unwrap();
    *dir = Some(app_data_dir);
}

pub fn app_data_dir() -> PathBuf {
    let dir = APP_DATA_DIR.lock().unwrap();
    dir.clone().unwrap()
}
