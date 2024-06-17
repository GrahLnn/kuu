// src-tauri/src/websocket.rs

use crate::utils::audio::read_audio_file;
use futures_util::{stream::SplitSink, SinkExt, StreamExt};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::net::{TcpListener, TcpStream};
use tokio::sync::Mutex;
use tokio_tungstenite::{accept_async, tungstenite::Message};
type WebSocket = tokio_tungstenite::WebSocketStream<TcpStream>;
type WebSocketWriter = SplitSink<WebSocket, Message>;
type Result<T> = std::result::Result<T, Box<dyn std::error::Error>>;
use serde::{Deserialize, Serialize};

#[derive(Default)]
struct ConnectionManager {
    connections: Mutex<HashMap<u32, WebSocketWriter>>,
}

#[derive(Deserialize, Serialize)]
struct ReadAudioFileRequest {
    command: String,
    path: String,
}

impl ConnectionManager {
    async fn add_connection(&self, id: u32, writer: WebSocketWriter) {
        self.connections.lock().await.insert(id, writer);
    }

    async fn remove_connection(&self, id: &u32) {
        self.connections.lock().await.remove(id);
    }

    async fn send_message(&self, id: &u32, msg: Message) -> Result<()> {
        if let Some(writer) = self.connections.lock().await.get_mut(id) {
            writer.send(msg).await?;
        }
        Ok(())
    }
}

pub async fn start_server() -> Result<()> {
    let addr = "127.0.0.1:8080".to_string();
    let listener = TcpListener::bind(&addr).await?;

    let manager = Arc::new(ConnectionManager::default());

    while let Ok((stream, _)) = listener.accept().await {
        let manager = manager.clone();
        tokio::spawn(async move {
            if let Err(e) = handle_connection(manager, stream).await {
                eprintln!("Error handling connection: {}", e);
            }
        });
    }

    Ok(())
}

async fn handle_connection(manager: Arc<ConnectionManager>, stream: TcpStream) -> Result<()> {
    let ws_stream = accept_async(stream).await?;
    let (writer, mut reader) = ws_stream.split();
    let id = rand::random::<u32>();

    manager.add_connection(id, writer).await;

    while let Some(Ok(msg)) = reader.next().await {
        match msg {
            Message::Text(text) => {
                println!("Received a text message: {}", text);
                if let Ok(request) = serde_json::from_str::<ReadAudioFileRequest>(&text) {
                    if request.command == "read_audio_file" {
                        match read_audio_file(request.path) {
                            Ok(data) => {
                                // 分块传输文件数据
                                let chunk_size = 14 * 1024 * 1024; // 8 MB per chunk
                                for chunk in data.chunks(chunk_size) {
                                    let response = Message::Binary(chunk.to_vec());
                                    manager.send_message(&id, response).await?;
                                }
                            }
                            Err(e) => {
                                let error_msg = format!("Error reading audio file: {}", e);
                                manager.send_message(&id, Message::Text(error_msg)).await?;
                            }
                        }
                    }
                }
            }

            Message::Binary(bin) => {
                println!("Received a binary message: {:?}", bin);
            }
            Message::Close(_) => {
                manager.remove_connection(&id).await;
                break;
            }
            _ => {}
        }
    }

    Ok(())
}