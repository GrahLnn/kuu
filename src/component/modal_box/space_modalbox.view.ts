import {
  View,
  Prop,
  required,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import ModalBoxFrame from "./skeleton/box_frame.view";
import SpaceCreateBox from "./components/space_create_box.view";

interface SpaceModalBoxProp {
  isOpen: boolean;
  onClose: () => void;
}

@View
class SpaceModalBox implements SpaceModalBoxProp {
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
      SpaceCreateBox()
        .show(this.show)
        .onClose(() => {
          this.show = false;
          setTimeout(this.onClose, 300);
        });
    }
  }
}

export default SpaceModalBox as Pretty as Typed<SpaceModalBoxProp>;
