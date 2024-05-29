import {
  View,
  Content,
  Prop,
  required,
  ContentProp,
  div,
  Env,
  type Typed,
  type Pretty,
  Watch,
} from "@dlightjs/dlight";
import { Filter, FilterEnv } from "../../app/data/filter_state";

interface UnDeactivatableTabRouteButtonProp {
  content: ContentProp<string>;

  onToggle: () => void;
  onClear: () => void;
}

@View
class UnDeactivatableTabRouteButton
  implements UnDeactivatableTabRouteButtonProp, FilterEnv
{
  @Content content: ContentProp<string> = required;
  @Env curFilter?: Filter | undefined;
  @Prop onToggle = () => {};
  @Prop onClear = () => {};
  toggle?: boolean;
  @Watch
  setToggle() {
    this.toggle = this.curFilter?.name === this.content;
  }
  willMount() {
    this.toggle = this.curFilter?.name === this.content;
  }
  //   toggle = false;
  ui_border = this.toggle
    ? "border rounded-lg border-transparent dark:border-[var(--dark-bg-blue-secondary)]"
    : "border rounded-lg border-transparent";
  ui_bg = this.toggle
    ? "bg-[var(--light-bg-gray-a)] dark:bg-[var(--dark-bg-gray-b)] shadow"
    : "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-blue-quaternary)] hover:shadow";
  ux = this.toggle
    ? "transition duration-300 opacity-95 group"
    : "transition duration-300 opacity-80 hover:opacity-90 group";
  position = this.toggle
    ? "flex items-center px-4 py-1 w-full justify-between gap-1"
    : "flex items-center px-4 py-1 w-full justify-between gap-1";

  Body() {
    div()
      .class(`${this.position} ${this.ui_bg} ${this.ui_border} ${this.ux}`)
      .onClick(() => {
        this.onToggle();
      });

    {
      div(this.content).class(
        "dark:text-white text-[#0d1933] text-[12px] cursor-default truncate transition"
      );
      //   XmarkIcon().class("invisible").size(16);
    }
  }
}

export default UnDeactivatableTabRouteButton as Pretty as Typed<UnDeactivatableTabRouteButtonProp>;
