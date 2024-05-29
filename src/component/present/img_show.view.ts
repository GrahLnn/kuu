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
import { fetchImgBase64 } from "../../app/services/cmds";

interface ImgShowProp {
  src: ContentProp<string>;
}

@View
class ImgShow implements ImgShowProp {
  @Content src: ContentProp<string> = required;

  imgData: any = null;

  @Watch
  srcChange() {
    fetchImgBase64(this.src).then((data) => {
      this.imgData = data;
    });
  }

  Body() {
    div().class("flex items-center justify-center grow");
    {
      div().class(
        "overflow-hidden w-full h-full flex items-center justify-center relative"
      );
      {
        ImgViewer(this.imgData);
      }
    }
  }
}

export default ImgShow as Pretty as Typed<ImgShowProp>;
