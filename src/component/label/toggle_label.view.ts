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

interface ToggleLabelProp {
  content: ContentProp<string>;
  onToggle: () => void;
  disToggle: () => void;
  toggle?: boolean;
}

@View
class ToggleLabel implements ToggleLabelProp {
  @Content content: ContentProp<string> = required;
  @Prop onToggle = () => { };
  @Prop disToggle = () => { };
  @Prop toggle: boolean = false;

  ui_border = this.toggle
    ? "border rounded-md border-gray-300 dark:border-slate-500"
    : "border rounded-md border-gray-300 dark:border-[#494b65]";
  ui_bg = this.toggle
    ? "bg-gray-200 dark:bg-[#434e6a]"
    : "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-gray-a)]";
  ux = this.toggle
    ? "transition-all dark:opacity-90"
    : "transition-all opacity-80 hover:opacity-100";
  position = this.toggle
    ? "flex items-center px-1 py-0.5"
    : "flex items-center px-1 py-0.5";

  Body() {
    div()
      .class(`${this.position} ${this.ui_border} ${this.ui_bg} ${this.ux}`)
      .onClick(() => {
        this.toggle = !this.toggle;
        if (this.toggle) {
          this.onToggle();
        } else {
          this.disToggle();
        }
      });
    {
      Label(this.content).class(this.toggle ? "" : "opacity-60");
    }
  }
}

export default ToggleLabel as Pretty as Typed<ToggleLabelProp>;
