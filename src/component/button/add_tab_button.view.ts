import {
  View,
  Content,
  Prop,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import { Icon } from "../../icon/all_icon.view";

interface AddTabFnButtonProp {
  callback: () => void;
}
@View
class AddTabFnButton implements AddTabFnButtonProp {
  @Prop callback: () => void = required;
  ui_border = "border rounded-lg border-transparent";
  ui_bg =
    "hover:bg-[var(--light-bg-tertiary)] hover:dark:bg-[var(--dark-bg-blue-quaternary)]";
  ux = "transition-all opacity-80 hover:opacity-90 group";
  position = "flex items-center px-4 py-2 w-full";

  Body() {
    div()
      .class(`${this.position} ${this.ui_bg} ${this.ui_border} ${this.ux}`)
      .onClick(this.callback);
    {
      Icon.Plus()
        .size(16)
        .class("mr-4 py-1 dark:opacity-70")
        .lightColor("#676769");
      div("New Tab").class(
        "dark:opacity-70 dark:text-white text-[#676769]/70 text-[14px] cursor-default truncate"
      );
    }
  }
}

export default AddTabFnButton as Pretty as Typed<AddTabFnButtonProp>;
