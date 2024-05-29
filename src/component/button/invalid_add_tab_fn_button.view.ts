import {
  View,
  Prop,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import { Icon } from "../../icon/all_icon.view";

interface InvalidAddTabFnButtonProp {
  callback: () => void;
}

@View
class InvalidAddTabFnButton implements InvalidAddTabFnButtonProp {
  @Prop callback: () => void = required;

  click = false;
  ui_border = "border rounded-lg border-transparent";
  ui_bg = `hover:bg-[var(--light-bg-tertiary)] hover:dark:bg-[var(--dark-bg-blue-quaternary)]`;
  ux = `transition-all opacity-80 hover:opacity-90 group ${
    this.click ? "invalid-confirm" : ""
  }`;
  position = "flex items-center px-4 py-2 w-full";

  Body() {
    div()
      .class(`${this.position} ${this.ui_bg} ${this.ui_border} ${this.ux}`)
      .onClick(() => {
        this.click = true;
        this.callback();
        setTimeout(() => {
          this.click = false;
        }, 400);
      });
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

export default InvalidAddTabFnButton as Pretty as Typed<InvalidAddTabFnButtonProp>;
