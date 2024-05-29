import {
  View,
  Prop,
  required,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import ModalBoxFrame from "./skeleton/box_frame.view";
import FileUploadBox from "./components/file_upload_box.view";

interface FileUploadModalBoxProp {
  isOpen: boolean;
  onClose: () => void;
}

@View
class FileUploadModalBox implements FileUploadModalBoxProp {
  @Prop isOpen = required;
  @Prop onClose = required;

  show = false;

  Body() {
    ModalBoxFrame()
      .isOpen(this.isOpen)
      .onClose(this.onClose)
      .show(this.show)
      .handleShow((v) => {
        this.show = v;
      });
    {
      FileUploadBox()
        .show(this.show)
        .onClose(() => {
          this.show = false;
          setTimeout(this.onClose, 300);
        });
    }
  }
}

export default FileUploadModalBox as Pretty as Typed<FileUploadModalBoxProp>;
