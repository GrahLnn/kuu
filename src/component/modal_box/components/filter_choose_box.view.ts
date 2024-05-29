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
  Watch,
} from "@dlightjs/dlight";
import ToggleLabel from "../../label/toggle_label.view";
import ConfirmButton from "../../button/confirm_button.view";
import WeakTextButton from "../../button/weak_text_button.view";
import SolidLabel from "../../label/solid_label.view";
import InvalidConfirmButton from "../../button/invalid_confirm_button.view";
import { FilterEnv, Filter, FilterLevel } from "../../../app/data/filter_state";
import { Icon } from "../../../icon/all_icon.view";
import { GlobalData } from "../../../app/data/global_env";
import { LabelRecord } from "../../../app/data/type";

interface FilterChooseBoxProps {
  show: boolean;
  onClose: () => void;
}
interface Warnings {
  [key: string]: string;
  // 其他属性...
}
@View
class FilterChooseBox implements FilterChooseBoxProps, FilterEnv, GlobalData {
  @Prop show = required;
  @Prop onClose = required;
  @Env addFilter: (filter: Filter) => void = required;
  @Env allFilterNames: string[] = required;
  @Env setCurFilter?: ((newFilter: Filter) => void) | undefined;
  @Env labels?: LabelRecord[] | undefined;
  @Env filters?: Record<FilterLevel, Filter[]> | undefined;

  onToggleLabels: string[] = [];
  // bg-[#e0e2e5] dark:bg-[#191e33]
  // bg-white dark:bg-[#191e33] dark:bg-opacity-50 bg-opacity-50
  bg_a = "bg-[#e0e2e5] dark:bg-[#191e33]";
  bd_a = "border dark:border-[#38394c] border-[#d8d8d8] rounded-lg";
  ux_a = `shadow-xl transition-all duration-300 ${
    this.show ? "scale-100 " : "scale-75"
  }`;
  po_a = "relative sm:w-full sm:max-w-3xl";
  buttonName = "New Tab";

  warning = "None";
  timmer: any;
  warnings: Warnings = {
    NoSelectedLabels: "The label has not been selected yet...",
    SelectedLabelsHaveTabs:
      "The selected labels already have corresponding tabs...",
    FilterNameExists: "The filter name already exists...",
    None: "",
  };

  willMount() {
    if (this.timmer) {
      clearTimeout(this.timmer);
    }
  }

  handleInvalidClick(err_type: string) {
    if (this.timmer) {
      clearTimeout(this.timmer);
    }

    this.warning = err_type;
    this.warnings["None"] = this.warnings[this.warning];
    this.timmer = setTimeout(() => {
      this.warning = "None";
    }, 5000);
  }

  generateUniqueName(baseName: string, existingNames: string[]) {
    let i = 1; // 开始的索引
    let newName;

    do {
      newName = `${baseName}${i}`;
      i++;
    } while (existingNames.includes(newName));

    return newName;
  }
  uniqueNameHolder = this.generateUniqueName("Filter-", this.allFilterNames);

  checkForInvalidConditions(): string | null {
    if (this.onToggleLabels.length === 0) {
      return "NoSelectedLabels";
    } else if (this.allFilterNames.includes(this.uniqueNameHolder)) {
      return "FilterNameExists";
    } else if (
      Object.values(this.filters!)
        .flat()
        .map((f) => f.labels)
        .some(
          (arr) =>
            arr.length === this.onToggleLabels.length &&
            arr.every((l) => this.onToggleLabels.includes(l))
        )
    ) {
      return "SelectedLabelsHaveTabs";
    }
    return null;
  }

  invalidCondition: string | null = null;

  @Watch("onToggleLabels", "uniqueNameHolder")
  onToggleLabelsChange() {
    this.invalidCondition = this.checkForInvalidConditions();
  }

  Body() {
    div()
      // .class(
      //   `relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg duration-300 `,
      // )
      .class(`${this.bg_a} ${this.ux_a} ${this.po_a} ${this.bd_a} `)
      // .style({
      //   WebkitBackdropFilter: "blur(10px)",
      //   backdropFilter: "blur(10px)",
      // })
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
              SolidLabel("New Filter");
              Icon.ChevronRight().class("mx-2");
              div(this.uniqueNameHolder)
                .class(
                  "text-[13px] opacity-80 text-[#2e2e2e] dark:text-[#dadbe8]"
                )
                .contentEditable("true")
                .onBlur((e) => {
                  const target = e.target as HTMLElement;
                  if (target.textContent) {
                    this.uniqueNameHolder = target.textContent.trim();
                  }
                })
                .onKeyDown((e) => {
                  if (e.key === "Enter") {
                    const target = e.target as HTMLElement;
                    e.preventDefault();
                    target.blur();
                  }
                });
            }
            div().class(
              "mt-2 min-h-40 max-h-72 overflow-y-auto overscroll-contain scroll-able horizontal-scroll-gradient modalbox-content"
            );
            {
              div().class("flex flex-wrap gap-1 py-6");
              {
                for (let label of this.labels!) {
                  ToggleLabel(label.title)
                    .onToggle(() => {
                      if (!this.onToggleLabels.includes(label.title)) {
                        this.onToggleLabels.push(label.title);
                      }
                    })
                    .disToggle(() => {
                      const index = this.onToggleLabels.indexOf(label.title);
                      if (index > -1) {
                        this.onToggleLabels.splice(index, 1);
                      }
                    });
                }
              }
            }
          }
        }
      }
      div().class(
        "px-4 py-3 sm:flex items-center sm:flex-row justify-between sm:px-6 border-t border-[#d8d8d8] dark:border-[#38394c]"
      );
      {
        div().class("flex gap-2 items-center px-2");
        {
          // div().class(`w-2 h-2 rounded-full mr-2 bg-red-600 shrink-0`);
          Icon.CircleInfo()
            .lightColor("#eb001c")
            .darkColor("#ff0825")
            .size(14)
            .class(
              `${
                this.warning === "None" ? "opacity-0" : "opacity-100"
              } transition duration-300`
            );
          div(this.warnings[this.warning]).class(
            `text-gray-600/80 dark:text-white/80 text-[12px] cursor-default ${
              this.warning === "None" ? "opacity-0" : "opacity-100"
            } transition duration-300`
          );
        }

        // div();
        div().class("flex gap-2 items-center");
        {
          WeakTextButton("cancel").class("mt-2 sm:mt-0").onClick(this.onClose);
          if (this.invalidCondition) {
            InvalidConfirmButton(this.buttonName).onClick(() => {
              this.handleInvalidClick(this.invalidCondition!);
            });
          } else {
            ConfirmButton(this.buttonName).onClick(() => {
              const newFilter = new Filter(
                this.uniqueNameHolder,
                FilterLevel.Temporary,
                this.onToggleLabels
              );
              this.addFilter(newFilter);
              this.onClose();
              this.setCurFilter?.(newFilter);
            });
          }
        }
      }
    }
  }
}

export default FilterChooseBox as Pretty as Typed<FilterChooseBoxProps>;
