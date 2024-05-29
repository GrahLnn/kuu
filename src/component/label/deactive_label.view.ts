import {
  View,
  Content,
  ContentProp,
  Prop,
  required,
  div,
  type Typed,
  type Pretty,
  i,
} from "@dlightjs/dlight";
import Label from "./label.view";
interface DeactiveLabelProp {
  content: ContentProp<string>;
}
@View
export class DeactiveLabel {
  @Content content: ContentProp<string> = required;

  ui_border = "border rounded-md border-gray-300 dark:border-[#494b65]";
  ui_bg = "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-gray-a)]";
  ux = "transition-all opacity-60 hover:opacity-90";
  position = "flex items-center px-1 py-0.5";

  Body() {
    div().class(`${this.position} ${this.ui_border} ${this.ui_bg} ${this.ux}`);
    {
      Label(this.content).class("opacity-60");
    }
  }
}

export default DeactiveLabel as Pretty as Typed<DeactiveLabelProp>;
