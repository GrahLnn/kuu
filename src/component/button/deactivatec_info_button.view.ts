import {
  View,
  Content,
  Prop,
  required,
  ContentProp,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import { Icon } from "../../icon/all_icon.view";

interface DectivatedInfoButtonProp {
  content: ContentProp<string>;
}
@View
class DectivatedInfoButton implements DectivatedInfoButtonProp {
  @Content content: ContentProp<string> = required;

  ui_border = "border rounded-lg border-transparent";
  ui_bg =
    "hover:bg-[var(--light-bg-tertiary)] hover:dark:bg-[var(--dark-bg-blue-quaternary)]";
  ux = "transition-all opacity-80 hover:opacity-90 group";
  position = "flex items-center px-4 py-2 w-52 justify-between gap-1";

  Body() {
    div().class(`${this.position} ${this.ui_bg} ${this.ui_border} ${this.ux}`);
    {
      div(this.content).class(
        "text-gray-500 dark:text-white dark:opacity-60 text-[16px] cursor-default truncate"
      );
      Icon.XMark()
        .class(
          "invisible p-1 group-hover:visible hover:bg-gray-200 dark:hover:bg-[#2a3146] border rounded-md border-transparent transition"
        )
        .size(16);
    }
  }
}

export default DectivatedInfoButton as Pretty as Typed<DectivatedInfoButtonProp>;
