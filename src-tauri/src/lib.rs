#[cfg_attr(mobile, tauri::mobile_entry_point)]
mod cmds;
mod database;
mod utils;

use crate::utils::dirs;
use tauri::Manager;

pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_store::Builder::new().build())
        .setup(|app| {
            let main_window = app.get_webview_window("main").unwrap();
            main_window.eval("setTimeout(() => window.location.reload(), 50)").unwrap();

            let app_handle = app.handle().clone();
            tokio::spawn(async move {
                match app_handle.path().app_data_dir() {
                    Ok(dir) => {
                        let db_dir = dirs::app_db_dir(dir.clone());
                        let _config_dir = dirs::app_config_dir(dir.clone());
                        let _log_dir = dirs::app_log_dir(dir.clone());
                        let _user_data_dir = dirs::app_user_data_dir(dir.clone());
                        let _temp_dir = dirs::app_temp_dir(dir.clone());
                        let _resource_dir = dirs::app_resource_dir(dir.clone());
                        let _backup_dir = dirs::app_backup_dir(dir.clone());
                        if let Err(e) = database::db::init(db_dir.clone()).await {
                            println!("Failed to initialize database: {}", e);
                        }
                        dbg!(db_dir);
                        // database::db::check().await.unwrap();
                    }
                    Err(e) => {
                        println!("Failed to get app data dir: {}", e);
                    }
                }
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            cmds::import_file,
            cmds::get_pdf_base64,
            cmds::get_audio_array,
            cmds::fetch_node_by_hash,
            cmds::fetch_labels,
            cmds::update_node_title,
            cmds::fetch_img_base64,
            cmds::add_label_and_link_node,
            cmds::delete_node_label_link_return_new,
            cmds::link_node_to_label_return_new,
            cmds::fetch_pre_files,
            cmds::fetch_all_nodes,
            cmds::import_file_with_labels,
            cmds::fetch_nodes_by_labels,
            cmds::fetch_file,
            cmds::delete_file,
            cmds::link_new_file,
            cmds::add_new_label,
            cmds::update_label,
            cmds::delete_label,
            cmds::gen_file_from_folder,
            cmds::just_import_file
        ])
        .plugin(tauri_plugin_dialog::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
