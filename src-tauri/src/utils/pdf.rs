use base64::{engine::general_purpose::STANDARD, Engine as _};
use image::ImageFormat;
use pdfium_render::prelude::*;
use std::io::Cursor;

pub async fn pdf2base64(path: String) -> Result<Vec<String>, Box<dyn std::error::Error>> {
    let pdfium = Pdfium::new(
        Pdfium::bind_to_library(Pdfium::pdfium_platform_library_name_at_path("./lib/"))
            .or_else(|_| Pdfium::bind_to_system_library())?,
    ); // Bind to the system's Pdfium library

    // 加载PDF文档
    let document = pdfium.load_pdf_from_file(path.as_str(), None)?;

    let render_config =
        PdfRenderConfig::new().rotate_if_landscape(PdfPageRenderRotation::Degrees90, true);

    let num_pages_to_process = 4;
    let mut base64_images = Vec::new();
    let mut img_buffers = Vec::new();

    // 遍历所有页面
    for (index, page) in document
        .pages()
        .iter()
        .enumerate()
        .take(num_pages_to_process)
    {
        dbg!(index);
        // Render the page with configuration
        let bitmap = page.render_with_config(&render_config)?;

        // Convert bitmap to an image object and hold it in a variable
        let dynamic_image = bitmap.as_image(); // Holds the DynamicImage

        // Check if the image can be converted to RGBA8 format and handle errors
        let image = dynamic_image.as_rgba8().ok_or(PdfiumError::ImageError)?;

        // Write the image to a PNG format in memory and encode it to Base64
        let mut buffer = Vec::new();
        image.write_to(&mut Cursor::new(&mut buffer), ImageFormat::WebP)?;
        img_buffers.push(buffer);
    }
    for buffer in img_buffers {
        let base64_image = STANDARD.encode(&buffer);
        base64_images.push(base64_image);
    }

    Ok(base64_images)
}
