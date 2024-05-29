import {
  View,
  Content,
  ContentProp,
  Prop,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import Label from "./label.view";

interface ActiveLabelProp {
  content: ContentProp<string>;
}

@View
class ActiveLabel implements ActiveLabelProp {
  @Content content: ContentProp<string> = required;

  ui_border = "border rounded-md border-gray-300 dark:border-slate-500";
  ui_bg = "bg-gray-200 dark:bg-[#434e6a]";
  ux = "transition-all dark:opacity-90";
  position = "flex items-center px-1 py-0.5";

  Body() {
    div().class(`${this.position} ${this.ui_border} ${this.ui_bg} ${this.ux}`);
    {
      Label(this.content);
    }
  }
}

export default ActiveLabel as Pretty as Typed<ActiveLabelProp>;
