import {
  View,
  Content,
  ContentProp,
  Prop,
  Children,
  required,
  div,
  type Typed,
  type Pretty,
  Snippet,
} from "@dlightjs/dlight";
import SlidingDataLabel from "../label/sliding_data_label.view";
import { Icon } from "../../icon/all_icon.view";
import { IconProps } from "../../icon/skeleton/icon_data";

interface ItemBarProp {
  content: ContentProp<string>;
  dataTags: string[];
  identifiIcon?: Typed<IconProps> | undefined;
  expandFunc?: () => void;
  inProgress?: boolean;
  toggleOn?: boolean;
  indicator?: any | null;
  onClick?: () => void;
  mainClass?: string;
  fontSize?: number;
}

@View
class ItemBar implements ItemBarProp {
  @Content content: ContentProp<string> = required;
  @Prop dataTags: string[] = required;
  @Prop inProgress?: boolean | false;
  @Prop identifiIcon?: Typed<IconProps> | undefined;
  @Prop expandFunc?: (() => void) | undefined;
  @Prop toggleOn?: boolean | undefined;
  @Prop indicator?: any | null;
  @Prop onClick?: () => void;
  @Prop mainClass?: string | "";
  @Prop fontSize?: number = 12;

  ui = "";
  ui_border = "border-b border-[#edf0f3] dark:border-[#212234]";
  ui_bg = this.toggleOn
    ? "bg-[var(--light-bg-quinary)] dark:bg-[var(--dark-bg-blue-tertiary)]"
    : "hover:bg-[var(--light-bg-quinary)] dark:hover:bg-[var(--dark-bg-blue-tertiary)]";
  ux = "group transition-colors";
  position = "flex items-center gap-1 px-3 py-1.5 w-full justify-between ";

  @Snippet
  indicatorIcon({ icon }: { icon: any }) {
    if (icon) {
      icon().size(14).color("#909295");
    }
  }

  Body() {
    div()
      .class(
        `${this.ui} ${this.ux} ${this.position} ${this.ui_border} ${this.ui_bg} ${this.mainClass}`
      )
      .onClick(this.onClick);
    {
      // div().class("flex items-center gap-2");
      // {

      // }
      if (this.identifiIcon) {
        this.identifiIcon().color("#909295").size(12);
        // Icon.FileContent().color("#909295").size(12);
      } else {
        div().class("w-1 shrink-0");
      }

      div().class("-mb-1 mx-2 grow");
      {
        div(this.content).class(
          `text-[${this.fontSize}px] text-[#2e2e2e] dark:text-[#fefefe] opacity-90 ml-0.5 cursor-default text-wrap long-string`
        );

        SlidingDataLabel().tabs(this.dataTags).class("-mt-1");
      }
      if (this.expandFunc) {
        Icon.AspectRatioSquare2()
          .class(
            "opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity p-1 hover:bg-[#f7f7f7] dark:hover:bg-[#2a3146] rounded-md"
          )
          .size(14)
          .color("#909295");
      } else if (this.indicator) {
        // div().class("animate-spin");
        // {
        //   Icon.Loader().class("animate-spin").size(14).color("#909295");
        // }
        // Icon.SpinLoader().size(14).color("#909295");
        // @ts-ignore
        this.indicatorIcon().icon(this.indicator);
      }
    }
  }
}

export default ItemBar as Pretty as Typed<ItemBarProp>;
