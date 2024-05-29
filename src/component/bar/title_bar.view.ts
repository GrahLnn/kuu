import {
  View,
  Content,
  ContentProp,
  Prop,
  required,
  div,
  Env,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import DataLabel from "../label/data_label.view";
import TypedButton from "../button/typed_button.view";
import { Icon } from "../../icon/all_icon.view";
import { Filter, FilterEnv } from "../../app/data/filter_state";

interface TitleBarProp {
  content: ContentProp<string>;
  labels?: string[];
  editable?: boolean;
}

@View
class TitleBar implements TitleBarProp, FilterEnv {
  @Content content: ContentProp<string> = required;
  @Prop labels?: string[];
  @Prop editable?: boolean = true;
  @Env curFilter?: Filter | null | undefined;
  @Env allFilterNames?: string[] | undefined;
  @Env updateFilter?: ((oldF: Filter, newF: Filter) => void) | undefined;

  ui = "";
  ui_border = "border-b border-[#edf0f3] dark:border-[#212234]";
  ui_bg =
    "hover:bg-[var(--light-bg-quinary)] dark:hover:bg-[var(--dark-bg-blue-tertiary)]";
  ux = "group transition-colors shrink-0 cursor-default";
  position =
    "flex items-center gap-1 px-8 pt-2 pb-1 w-full justify-between h-16";
  Body() {
    div().class(`${this.ui} ${this.ux} ${this.position} ${this.ui_border}`);
    {
      div().class("flex items-center gap-2");
      {
        div();
        {
          div(this.content)
            .class(
              this.editable
                ? "text-lg font-semibold dark:text-white opacity-80 cursor-text"
                : "text-lg font-semibold dark:text-white opacity-80 cursor-default"
            )
            .contentEditable(`${this.editable}`)
            .onKeyDown((e) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLElement;
                e.preventDefault();
                target.blur();
              }
            })
            .onBlur((e) => {
              const target = e.target as HTMLElement;
              if (
                target.textContent &&
                !this.allFilterNames?.includes(target.textContent.trim())
              ) {
                this.updateFilter?.(this.curFilter!, {
                  ...this.curFilter!,
                  name: target.textContent.trim(),
                });
              } else {
                target.textContent = this.content;
              }
            });
          if (this.curFilter?.labels) {
            div().class("flex gap-2");
            {
              for (const l of this.curFilter.labels) {
                DataLabel(l);
              }
            }
          } else {
            DataLabel("No Label Configured");
          }
        }
      }
      div().class("mr-6");
      {
        TypedButton("Display");
        {
          Icon.Sliders();
        }
      }

      // SlidersIcon().class(
      //   "opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity hover:shadow p-1.5 hover:bg-[#f7f7f7] dark:hover:bg-[#2a3146] rounded-md",
      // );
    }
  }
}

export default TitleBar as Pretty as Typed<TitleBarProp>;
