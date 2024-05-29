use anyhow::{anyhow, Result};
use base64::{engine::general_purpose::STANDARD, Engine as _};
use std::fs::File;
use std::io::Read;
use std::path::Path;

pub async fn img2base64<P: AsRef<Path>>(path: P) -> Result<String> {
    // 打开图片文件
    let mut file = File::open(path.as_ref()).map_err(|e| anyhow!("Failed to open file: {}", e))?;

    // 读取文件内容到内存
    let mut image_data = Vec::new();
    file.read_to_end(&mut image_data)
        .map_err(|e| anyhow!("Failed to read file: {}", e))?;

    // 使用 Base64 编码图片数据
    let base64_string = STANDARD.encode(&image_data);

    // 返回 Base64 编码的字符串
    Ok(base64_string)
}
