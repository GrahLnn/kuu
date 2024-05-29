import {
  View,
  Prop,
  ContentProp,
  required,
  div,
  Children,
  Env,
  button,
  type Typed,
  type Pretty,
  th,
  Content,
  span,
  img,
  input,
  Snippet,
  label,
  Watch,
  audio,
  use,
} from "@dlightjs/dlight";
import ImgViewer from "../file_viewer/img_viewer.view";
import { getPdfBase64 } from "../../app/services/cmds";

interface PDFViewerProp {
  src: ContentProp<string>;
}

@View
class PDFViewer implements PDFViewerProp {
  @Content src: ContentProp<string> = required;

  pdfData: any = null;

  @Watch
  srcChange() {
    getPdfBase64(this.src).then((data) => {
      this.pdfData = data;
    });
  }

  Body() {
    div().class(
      "h-[500px] flex gap-2 x-gradient overflow-auto px-32 grow-0 shrink-0"
    );
    {
      if (this.pdfData) {
        for (let img of this.pdfData) {
          ImgViewer(img);
        }
      }
    }
    // div().class("h-[500px]");
    // {
    //   ImgViewer(this.pdfData);
    // }
  }
}

export default PDFViewer as Pretty as Typed<PDFViewerProp>;
