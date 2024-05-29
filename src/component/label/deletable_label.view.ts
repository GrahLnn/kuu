import {
  View,
  Content,
  ContentProp,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import Label from "./label.view";
import { Icon } from "../../icon/all_icon.view";

interface DeletableLabelProp {
  content: ContentProp<string>;
}
@View
export class DeletableLabel {
  @Content content: ContentProp<string> = required;

  ui_border = "border rounded-md border-gray-300 dark:border-[#494b65]";
  ui_bg = "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-gray-a)]";
  ux = "transition-all opacity-80 hover:opacity-100 shrink-0";
  position = "flex items-center px-1 py-0.5";

  Body() {
    div().class(`${this.position} ${this.ui_border} ${this.ui_bg} ${this.ux}`);
    {
      div().class("w-0.5");
      Label(this.content).class("opacity-80");
      div().class("w-1");
      Icon.XMark().class("opacity-60 hover:opacity-90 transition-all");
    }
  }
}

export default DeletableLabel as Pretty as Typed<DeletableLabelProp>;
