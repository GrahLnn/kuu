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
  s,
  set,
} from "@dlightjs/dlight";
import SlidingDataLabel from "../label/sliding_data_label.view";
import { Icon } from "../../icon/all_icon.view";
import { IconProps } from "../../icon/skeleton/icon_data";

interface StateItemBarProp {
  content: ContentProp<string>;
  dataTags: string[];
  identifiIcon?: Typed<IconProps> | undefined;
  indicator?: any | null;
  mainClass?: string;
  state: string;
  fn?: () => void;
}

@View
class StateItemBar implements StateItemBarProp {
  @Content content: ContentProp<string> = required;
  @Prop dataTags: string[] = required;
  @Prop identifiIcon?: Typed<IconProps> | undefined;
  @Prop indicator?: any | null;
  @Prop mainClass?: string | "";
  @Prop state: string = required;
  @Prop fn?: (() => void) | undefined;

  ui = "";
  ui_border = "border-b border-[#edf0f3] dark:border-[#212234]";
  ui_bg = "";
  ux = "group transition-colors cursor-default ";
  position = "flex items-center gap-1 px-3 py-1.5 w-full justify-between ";

  willMount() {
    switch (this.state) {
      case "warning":
        this.ui_bg = "bg-[#fff1f3] dark:bg-red-600/20";
        break;
    }
  }

  didMount() {
    if (this.fn) {
      this.fn();
    }
  }

  @Snippet
  indicatorIcon({ icon }: { icon: any }) {
    if (icon) {
      if (this.state === "warning") {
        icon().size(14).lightColor("#eb001c").darkColor("#ff0825");
      } else {
        icon().size(14).color("#909295");
      }
    }
  }

  Body() {
    div().class(
      `${this.ui} ${this.ux} ${this.position} ${this.ui_border} ${this.ui_bg} ${this.mainClass}`
    );

    {
      div().class("flex items-center gap-2");
      {
        if (this.identifiIcon) {
          this.identifiIcon().color("#909295").size(12);
          // Icon.FileContent().color("#909295").size(12);
        } else {
          div().class("w-1 shrink-0");
        }

        div().class("-mb-1.5");
        {
          div(this.content).class(
            "text-[12px] text-[#2e2e2e] dark:text-[#fefefe] opacity-80 ml-0.5"
          );

          SlidingDataLabel().tabs(this.dataTags).class("-mt-1");
        }
      }
      if (this.indicator) {
        // @ts-ignore
        this.indicatorIcon().icon(this.indicator);
      }
    }
  }
}

export default StateItemBar as Pretty as Typed<StateItemBarProp>;
