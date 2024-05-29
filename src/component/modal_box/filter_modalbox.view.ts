import {
  View,
  Prop,
  required,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import ModalBoxFrame from "./skeleton/box_frame.view";
import FilterChooseBox from "./components/filter_choose_box.view";

interface FilterModalBoxProp {
  isOpen: boolean;
  onClose: () => void;
}

@View
class FilterModalBox implements FilterModalBoxProp {
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
      FilterChooseBox()
        .show(this.show)
        .onClose(() => {
          this.show = false;
          setTimeout(this.onClose, 300);
        });
    }
  }
}

export default FilterModalBox as Pretty as Typed<FilterModalBoxProp>;
