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
} from "@dlightjs/dlight";

interface ImgViewerProp {
  src: ContentProp<string>;
}

@View
class ImgViewer implements ImgViewerProp {
  @Content src: ContentProp<string> = required;

  Body() {
    if (this.src) {
      img()
        .src(`data:image/png;base64,${this.src}`)
        .alt("Base64 Example")
        .class("responsive-img cursor-default");
    }
  }
}

export default ImgViewer as Pretty as Typed<ImgViewerProp>;
