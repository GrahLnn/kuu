import {
  View,
  Content,
  ContentProp,
  Prop,
  Watch,
  Children,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import Label from "./label.view";

interface TypedLabelProp {
  content: ContentProp<string>;
  typeIcon: ChildNode[];
}

@View
class TypedLabel implements TypedLabelProp {
  @Content content: ContentProp<string> = required;
  @Children typeIcon = required;

  ui_border = "border rounded-md border-gray-300 dark:border-[#494b65]";
  ui_bg = "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-gray-a)]";
  ux = "transition-all opacity-80 hover:opacity-90";
  position = "flex items-center px-1.5 py-0.5";

  Body() {
    div().class(`${this.position} ${this.ui_border} ${this.ui_bg} ${this.ux}`);
    {
      this.typeIcon;
      div().class("mr-1");
      Label(this.content).class("opacity-80");
    }
  }
}

export default TypedLabel as Pretty as Typed<TypedLabelProp>;
