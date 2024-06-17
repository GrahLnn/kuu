use std::fs::File;
use std::io::{Read, Seek, SeekFrom};
use std::sync::{Arc, Mutex};
use std::thread;
use crate::utils::file::format_bytes;

pub fn read_audio_file(path: String) -> Result<Vec<u8>, String> {
    let start_time = std::time::Instant::now();
    let num_threads = 4;
    let file = File::open(&path).map_err(|e| e.to_string())?;
    let metadata = file.metadata().map_err(|e| e.to_string())?;
    let file_size = metadata.len();
    dbg!(format_bytes(file_size));
    let chunk_size = (file_size + num_threads as u64 - 1) / num_threads as u64;
    let mut handles = vec![];

    let file = Arc::new(Mutex::new(file));
    let buffer = Arc::new(Mutex::new(Vec::with_capacity(file_size as usize)));

    for i in 0..num_threads {
        let file = Arc::clone(&file);
        let buffer = Arc::clone(&buffer);
        let start = i as u64 * chunk_size;
        let end = if i == num_threads - 1 { file_size } else { (i as u64 + 1) * chunk_size };

        let handle = thread::spawn(move || {
            let mut local_file = file.lock().unwrap();
            local_file.seek(SeekFrom::Start(start)).unwrap();
            let mut chunk = vec![0; (end - start) as usize];
            local_file.read_exact(&mut chunk).unwrap();
            buffer.lock().unwrap().extend_from_slice(&chunk);
        });

        handles.push(handle);
    }

    for handle in handles {
        handle.join().map_err(|e| {
            if let Some(string) = e.downcast_ref::<String>() {
                string.clone()
            } else {
                "Thread panicked".to_string()
            }
        })?;
    }

    let buffer = Arc::try_unwrap(buffer).map_err(|_| "Failed to unwrap buffer Arc".to_string())?;
    let buffer = buffer.into_inner().map_err(|_| "Failed to get buffer from Mutex".to_string())?;
    let elapsed = start_time.elapsed();
    dbg!(elapsed);
    Ok(buffer)
}
