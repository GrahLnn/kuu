import {
  View,
  ul,
  Prop,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import DeletableLabel from "../label/deletable_label.view";
import { Icon } from "../../icon/all_icon.view";

interface ItemToolBarProp {
  labels: string[];
}
@View
class ItemToolBar implements ItemToolBarProp {
  @Prop labels: string[] = required;
  ui_bg = "bg-[var(--light-bg-quinary)] dark:bg-[var(--dark-bg-blue-tertiary)]";
  ui_border = "border-b border-[#edf0f3] dark:border-[#212234]";
  ux = "overflow-hidden";
  position = "flex py-1.5 px-3 h-[41.5px]";
  Body() {
    div().class(`${this.ui_bg} ${this.ux} ${this.position} ${this.ui_border}`);
    {
      div().class("overflow-hidden flex items-center");
      {
        ul().class("flex overflow-x-scroll gap-1 px-6 mr-4");
        {
          for (let label of this.labels) {
            DeletableLabel(label);
          }
        }
      }

      div().class("flex items-center gap-2");
      {
        Icon.Trash()
          .class(
            "hover:shadow hover:bg-[#f7f7f7] dark:hover:bg-[#2a3146] transition-colors p-1.5 rounded-md"
          )
          .color("#E5484D")
          .size(12);
        Icon.XMark()
          .class(
            "transition-colors hover:shadow p-1.5 hover:bg-[#f7f7f7] dark:hover:bg-[#2a3146] rounded-md"
          )
          .color("#909295")
          .size(12);
      }
    }
  }
}

export default ItemToolBar as Pretty as Typed<ItemToolBarProp>;
