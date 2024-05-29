import {
  View,
  Content,
  Prop,
  ContentProp,
  Watch,
  Children,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";

import Label from "./label.view";

interface StatusLabelProp {
  content: ContentProp<string>;
  stateColor: string;
  class?: string;
}

@View
class StatusLabel implements StatusLabelProp {
  @Content content: ContentProp<string> = required;
  @Prop stateColor: string = required;
  @Prop class?: string = "";

  ui_border = "border rounded-md border-gray-300 dark:border-[#494b65]";
  ui_bg = "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-gray-a)]";
  ux = "transition-all opacity-80 hover:opacity-90";
  position = "flex items-center px-1.5 py-0.5";

  Body() {
    div().class(
      `${this.position} ${this.ui_border} ${this.ui_bg} ${this.ux} ${this.class}`
    );
    {
      div().class(`w-1 h-1 rounded-full mr-2 ${this.stateColor} shrink-0`);

      Label(this.content).class("opacity-80");
    }
  }
}

export default StatusLabel as Pretty as Typed<StatusLabelProp>;
