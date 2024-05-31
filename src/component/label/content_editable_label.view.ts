import {
  View,
  Content,
  Prop,
  ContentProp,
  required,
  div,
  type Typed,
  type Pretty,
  Children,
  input,
} from "@dlightjs/dlight";
import Label from "./label.view";

interface ContentEditableLabelProp {
  content: ContentProp<string>;
  leftIcon: any;
  blurFn: (s: string) => Promise<void>;
}
@View
export class FnDashEditableLabel {
  @Content content: ContentProp<string> = required;
  @Prop leftIcon: any = null;
  @Prop blurFn: (s: string) => Promise<void> = required;

  finalText = "";
  inputRef: HTMLInputElement | null = null;
  ui_border =
    "border border-dashed rounded-md border-gray-300 dark:border-zinc-500";
  ui_bg = "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-gray-a)]";
  ux = "transition-opacity opacity-70 hover:opacity-90 shrink-0 cursor-text";
  position = "flex items-center py-0.5 !pl-1 max-h-[24px] gap-0.5";

  resetValue(target: HTMLInputElement) {
    target.value = "";
    const parentNode = target.parentNode as HTMLElement;
    parentNode.dataset.value = "";
  }

  Body() {
    div()
      .class(
        `input-sizer ${this.position} ${this.ui_bg} ${this.ui_border} ${this.ux}`
      )
      .onClick(() => {
        this.inputRef?.focus();
      });
    {
      if (this.leftIcon) {
        this.leftIcon().passClick(true);
      }

      input()
        .type("text")
        .ref((input) => {
          this.inputRef = input;
        })
        .class("opacity-60 dark:opacity-80 dark:text-white text-[12px]")
        .onInput((ev) => {
          const inputElement = ev.target as HTMLInputElement; // 类型断言，确保ev.target是HTMLInputElement
          if (inputElement.parentNode) {
            // 检查是否有父节点
            const parentNode = inputElement.parentNode as HTMLElement;
            parentNode.dataset.value = inputElement.value; // 更新父节点的dataset.value
          }
        })
        .size(this.content.length - 1)
        .placeholder(this.content)
        .onKeyDown((e) => {
          if (e.key === "Enter") {
            const target = e.target as HTMLInputElement;
            const value = target.value;
            e.preventDefault();
            if (value.trim() !== "") {
              this.blurFn(value.trim())
                .then(() => {
                  this.resetValue(target);
                })
                .catch(() => {
                  this.resetValue(target);
                });
            } else {
              this.resetValue(target);
            }
          }
        })
        .onBlur((e) => {
          const target = e.target as HTMLInputElement;
          const value = target.value;
          if (value.trim() !== "") {
            this.blurFn(value.trim())
              .then(() => {
                this.resetValue(target);
              })
              .catch(() => {
                this.resetValue(target);
              });
          } else {
            this.resetValue(target);
          }
        })
        .autocomplete("off")
        .autocapitalize("off")
        .spellcheck(false);
    }
  }
}

export default FnDashEditableLabel as Pretty as Typed<ContentEditableLabelProp>;
