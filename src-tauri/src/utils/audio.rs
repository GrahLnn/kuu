use std::fs::File;
use std::io::Read;

pub async fn read_audio_file(path: String) -> Result<Vec<u8>, String> {
    let mut file = File::open(path).map_err(|e| e.to_string())?;
    let mut buffer = Vec::new();
    file.read_to_end(&mut buffer).map_err(|e| e.to_string())?;
    Ok(buffer)
}
