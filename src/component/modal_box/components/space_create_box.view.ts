import {
  View,
  Prop,
  required,
  div,
  Env,
  button,
  type Typed,
  type Pretty,
  th,
} from "@dlightjs/dlight";
import ConfirmButton from "../../button/confirm_button.view";
import WeakTextButton from "../../button/weak_text_button.view";
import SolidLabel from "../../label/solid_label.view";
import InvalidConfirmButton from "../../button/invalid_confirm_button.view";
import { Icon } from "../../../icon/all_icon.view";

interface SpaceCreateBoxProps {
  show: boolean;
  onClose: () => void;
}

@View
class SpaceCreateBox implements SpaceCreateBoxProps {
  @Prop show = required;
  @Prop onClose = required;

  onToggleLabels: string[] = [];

  // bg-[#e0e2e5] dark:bg-[#191e33]
  // bg-white dark:bg-[#191e33] dark:bg-opacity-50 bg-opacity-50
  bg_a = "bg-[#e0e2e5] dark:bg-[#191e33]";
  bd_a = "border dark:border-[#38394c] border-[#d8d8d8] rounded-lg";
  ux_a = `shadow-xl transition-all duration-300 ${
    this.show ? "scale-100 " : "scale-75"
  }`;
  po_a = "relative sm:w-full sm:max-w-3xl";
  buttonName = "New Space";

  generateUniqueName(baseName: string, existingNames: string[]) {
    let i = 1; // 开始的索引
    let newName;

    do {
      newName = `${baseName}${i}`;
      i++;
    } while (existingNames.includes(newName));

    return newName;
  }
  allFilterNames: string[] = [];
  uniqueNameHolder = this.generateUniqueName("Space-", this.allFilterNames);

  Body() {
    div()
      .class(`${this.bg_a} ${this.ux_a} ${this.po_a} ${this.bd_a} `)

      .onClick((e) => e.stopPropagation());
    {
      div().class("px-4 pb-4 pt-5 sm:p-6 sm:pb-4");
      {
        div().class("sm:flex sm:items-start");
        {
          div().class("mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left");
          {
            div().class("flex items-center ");
            {
              SolidLabel("New Space");
              Icon.ChevronRight().class("mx-2");
              div(this.uniqueNameHolder).class(
                "text-[13px] opacity-80 text-[#2e2e2e] dark:text-[#dadbe8]"
              );
            }
            div().class(
              " mt-2 min-h-40 max-h-72 overflow-y-auto overscroll-contain scroll-able horizontal-scroll-gradient modalbox-content"
            );
            {
              div().class("flex flex-wrap gap-1 py-6");
              {
                //   for (let label of this.labels) {
                //     ToggleLabel(label)
                //       .onToggle(() => {
                //         if (!this.onToggleLabels.includes(label)) {
                //           this.onToggleLabels.push(label);
                //         }
                //       })
                //       .disToggle(() => {
                //         const index = this.onToggleLabels.indexOf(label);
                //         if (index > -1) {
                //           this.onToggleLabels.splice(index, 1);
                //         }
                //       });
                //   }
              }
            }
          }
        }
      }
      div().class(
        "px-4 py-3 sm:flex items-center sm:flex-row justify-between sm:px-6 border-t border-[#d8d8d8] dark:border-[#38394c]"
      );
      {
        div();
        div().class("flex gap-2 items-center");
        {
          WeakTextButton("cancel").class("mt-2 sm:mt-0").onClick(this.onClose);
          if (
            this.onToggleLabels.length === 0 ||
            this.allFilterNames.includes(this.uniqueNameHolder)
          ) {
            InvalidConfirmButton(this.buttonName);
          } else {
            ConfirmButton(this.buttonName).onClick(() => {
              console.log("Filter Labels:", this.onToggleLabels);
              // this.addFilter(
              //   new Filter(this.uniqueNameHolder, Level.Temporary)
              // ); // change to space

              this.onClose();
              // this.setCurFilter?.(this.uniqueNameHolder);
            });
          }
        }
      }
    }
  }
}

export default SpaceCreateBox as Pretty as Typed<SpaceCreateBoxProps>;
