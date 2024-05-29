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
import { Icon } from "../../icon/all_icon.view";

interface EditableLabelProp {
  content: ContentProp<string>;
}

@View
class EditableLabel implements EditableLabelProp {
  @Content content: ContentProp<string> = required;

  ui_border = "border rounded-md border-gray-300 dark:border-[#494b65]";
  ui_bg = "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-gray-a)]";
  ux = "transition-all opacity-80 hover:opacity-100";
  position = "flex items-center px-1 py-0.5";

  Body() {
    div().class(`${this.position} ${this.ui_border} ${this.ui_bg} ${this.ux}`);
    {
      div().class("w-0.5");
      Label(this.content).class("opacity-80");
      div().class("w-1");
      Icon.Pen().class("opacity-60 hover:opacity-90 transition-all");
    }
  }
}

export default EditableLabel as Pretty as Typed<EditableLabelProp>;
