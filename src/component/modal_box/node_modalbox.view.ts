import {
  View,
  Prop,
  required,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import ModalBoxFrame from "./skeleton/box_frame.view";
import FilterChooseBox from "./components/filter_choose_box.view";
import NodeBox from "./components/node_box.view";
import { NodeRecord } from "../../app/data/global_env";

interface NodeModalBoxProp {
  isOpen: boolean;
  onClose: () => void;
  node: NodeRecord;
}

@View
class NodeModalBox implements NodeModalBoxProp {
  @Prop isOpen = required;
  @Prop onClose = required;
  @Prop node = required;

  show = false;

  Body() {
    ModalBoxFrame()
      .useCol(true)
      .isOpen(this.isOpen)
      .onClose(this.onClose)
      .show(this.show)
      .handleShow((v) => {
        this.show = v;
      });
    {
      NodeBox()
        .show(this.show)
        .node(this.node)
        .onClose(() => {
          this.show = false;
          setTimeout(this.onClose, 300);
        });
    }
  }
}

export default NodeModalBox as Pretty as Typed<NodeModalBoxProp>;
