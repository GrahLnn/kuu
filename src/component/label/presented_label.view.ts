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

interface PresentedLabelProp {
  content: ContentProp<string>;
}

@View
class PresentedLabel implements PresentedLabelProp {
  @Content content: ContentProp<string> = required;

  ui_border = "border rounded-md border-gray-300 dark:border-[#494b65]";
  ui_bg = "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-gray-a)]";
  ux = "transition-all opacity-80 hover:opacity-90";
  position = "flex items-center px-1 py-0.5";

  Body() {
    div().class(`${this.position} ${this.ui_border} ${this.ui_bg} ${this.ux}`);
    {
      Label(this.content).class("opacity-80");
    }
  }
}

export default PresentedLabel as Pretty as Typed<PresentedLabelProp>;
