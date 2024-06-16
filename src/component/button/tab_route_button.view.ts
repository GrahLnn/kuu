import {
  View,
  Content,
  Prop,
  required,
  ContentProp,
  div,
  Env,
  Watch,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import { Filter, FilterEnv } from "../../app/data/filter_state";
import { Icon } from "../../icon/all_icon.view";
import * as _ from "lodash";

interface TabRouteButtonProp {
  content: ContentProp<string>;
  onToggle: () => void;
  onClose: () => void;
}

@View
class TabRouteButton implements TabRouteButtonProp, FilterEnv {
  @Env curFilter?: Filter | null;
  @Content content: ContentProp<string> = required;
  @Prop onToggle = () => {};
  @Prop onClear = () => {};
  @Prop onClose = () => {
    console.log("close");
  };

  toggle = false;
  ui_border = "border rounded-lg border-transparent";
  ui_bg =
    "hover:bg-[var(--light-bg-tertiary)] hover:dark:bg-[var(--dark-bg-blue-quaternary)]";
  ux = "transition opacity-80 hover:opacity-90 group";
  position = "flex items-center px-4 py-2 w-full justify-between gap-1";

  @Watch
  setToggle() {
    this.toggle = _.isEqual(this.curFilter?.name, this.content);
    this.ui_border = this.toggle
      ? "border rounded-lg border-transparent dark:border-[var(--dark-bg-blue-secondary)]"
      : "border rounded-lg border-transparent";
    this.ui_bg = this.toggle
      ? "bg-[var(--light-bg-gray-a)] dark:bg-[var(--dark-bg-gray-b)] shadow"
      : "hover:bg-[var(--light-bg-tertiary)] hover:dark:bg-[var(--dark-bg-blue-quaternary)]";
    this.ux = this.toggle
      ? "transition opacity-95 group"
      : "transition opacity-80 hover:opacity-90 group";
    this.position = this.toggle
      ? "flex items-center pl-4 pr-2 py-2 w-full justify-between gap-1"
      : "flex items-center pl-4 pr-2 py-2 w-full justify-between gap-1";
  }
  Body() {
    div()
      .class(`${this.position} ${this.ui_bg} ${this.ui_border} ${this.ux}`)
      .onClick(this.onToggle)
      .onContextMenu(() => {});

    {
      div(this.content).class(
        this.toggle
          ? "text-[#343434] dark:text-white text-[14px] cursor-default truncate transition"
          : "text-[#666666] dark:text-white/80 dark:group-hover:text-white group-hover:text-[#343434] text-[14px] cursor-default truncate transition"
      );
      Icon.XMark()
        .class(
          this.toggle
            ? "invisible p-1 group-hover:visible hover:bg-[#f7f7f7] dark:hover:bg-[#404555] border rounded-md border-transparent transition"
            : "invisible p-1 group-hover:visible hover:bg-gray-200 dark:hover:bg-[#2a3146] border rounded-md border-transparent transition"
        )
        .size(16)
        .lightColor("#666666")
        .darkColor("#fafafa")
        .onClick(this.onClose);
    }
  }
}

export default TabRouteButton as Pretty as Typed<TabRouteButtonProp>;
