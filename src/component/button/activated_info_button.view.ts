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

interface ActivatedInfoButtonProp {
  content: ContentProp<string>;
}

@View
class ActivatedInfoButton implements ActivatedInfoButtonProp {
  @Content content: ContentProp<string> = required;

  ui_border =
    "border rounded-lg border-transparent dark:border-[var(--dark-bg-blue-secondary)]";
  ui_bg = "bg-[var(--light-bg-gray-a)] dark:bg-[var(--dark-bg-gray-b)]";
  ux = "transition-all opacity-80 hover:opacity-90 group";
  position = "flex items-center px-4 py-2 w-52 justify-between gap-1";

  Body() {
    div().class(`${this.position} ${this.ui_border} ${this.ui_bg} ${this.ux}`);
    {
      div(this.content).class(
        "opacity-95 dark:text-white text-[16px] cursor-default truncate"
      );
      Icon.XMark()
        .class(
          "invisible p-1 group-hover:visible hover:bg-[#f7f7f7] dark:hover:bg-[#404555] border rounded-md border-transparent transition"
        )
        .size(16);
    }
  }
}

export default ActivatedInfoButton as Pretty as Typed<ActivatedInfoButtonProp>;
