import {
  View,
  Main,
  env,
  Env,
  div,
  button,
  Content,
  ContentProp,
  Prop,
  Watch,
  required,
  type Pretty,
  type Typed,
} from "@dlightjs/dlight";
import { CheckTheme } from "./interface";

interface UnDeactivatableInfoButtonProp {
  content: ContentProp<string>;

  onToggle: () => void;
  onClear: () => void;
}

@View
class sbB implements UnDeactivatableInfoButtonProp, CheckTheme {
  @Content content: ContentProp<string> = required;
  @Env curComp?: string | undefined;
  @Prop onToggle = () => {};
  @Prop onClear = () => {};
  toggle?: boolean;
  @Watch
  resetToggle() {
    if (this.curComp !== this.content) {
      this.toggle = false;
    }
    console.log("resetToggle", this.curComp, this.content);
  }
  willMount() {
    this.toggle = this.curComp === this.content;
  }
  //   toggle = false;
  ui_border = this.toggle
    ? "border rounded-lg border-transparent dark:border-[var(--dark-bg-blue-secondary)]"
    : "border rounded-lg border-transparent";
  ui_bg = this.toggle
    ? "bg-[var(--light-bg-gray-a)] dark:bg-[var(--dark-bg-gray-b)]"
    : "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-blue-quaternary)]";
  ux = this.toggle
    ? "transition opacity-95 group"
    : "transition opacity-80 hover:opacity-90 group";
  position = this.toggle
    ? "flex items-center px-4 py-2 w-full justify-between gap-1"
    : "flex items-center px-4 py-2 w-full justify-between gap-1";

  Body() {
    div()
      .class(`${this.position} ${this.ui_bg} ${this.ui_border} ${this.ux}`)
      .onClick(() => {
        this.toggle = !this.toggle;
        if (this.toggle) {
          this.onToggle();
        }
      })
      .didUpdate(() => {
        console.log("didUpdate", this.curComp);
      });
    {
      div(this.content === this.curComp ? "sbyk" : this.content).class(
        "dark:text-white text-[#0d1933] text-[16px] cursor-default truncate transition"
      );
      //   XmarkIcon().class("invisible").size(16);
    }
  }
}

export default sbB as Pretty as Typed<UnDeactivatableInfoButtonProp>;
