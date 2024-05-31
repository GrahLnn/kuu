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
import Label from "./label.view";
import { Icon } from "../../icon/all_icon.view";
import { GlobalData } from "../../app/data/global_env";
import { LabelRecord } from "../../app/data/type";
import { fetchLabels, updateLabel } from "../../app/services/cmds";

interface EditableLabelProp {
  content: ContentProp<string>;
}

@View
class EditableLabel implements EditableLabelProp, GlobalData {
  @Content content: ContentProp<string> = required;
  @Env labels?: LabelRecord[] | undefined;
  @Env setNotification?: ((notification: string) => void) | undefined;
  @Env setLabels?: ((labels: LabelRecord[]) => void) | undefined;

  ui_border = "border rounded-md border-gray-300 dark:border-[#494b65]";
  ui_bg = "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-gray-a)]";
  ux = "transition-all opacity-80 hover:opacity-100";
  position = "flex items-center px-1 py-0.5";
  onFocused = false;
  ordLabel = "";

  focusTextAtEnd(element: HTMLElement) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
    element.focus();
  }

  Body() {
    div().class(`${this.position} ${this.ui_border} ${this.ui_bg} ${this.ux}`);
    {
      div(this.content)
        .class(`dark:text-white opacity-80 text-[12px] cursor-text min-w-[4px]`)
        .contentEditable("true")
        .onKeyDown((e) => {
          if (e.key === "Enter") {
            const target = e.target as HTMLElement;
            e.preventDefault();
            target.blur();
          }
        })
        .onFocus((e) => {
          this.ordLabel = this.content;
          this.onFocused = true;
        })
        .onBlur(async (e) => {
          const target = e.target as HTMLElement;
          this.onFocused = false;
          if (target.textContent?.trim() === this.content) {
          } else if (target.textContent?.trim() === "") {
            this.setNotification?.("Label name cannot be empty");
            target.textContent = this.ordLabel;
            this.focusTextAtEnd(target);
          } else if (
            this.labels
              ?.map((l) => l.title)
              .includes(target.textContent!.trim())
          ) {
            this.setNotification?.("Label already exists");
            target.textContent = this.ordLabel;
            this.focusTextAtEnd(target);
          } else {
            await updateLabel(this.content, target.textContent!);
            const labels = await fetchLabels();
            this.setLabels?.(labels);
          }
        });
    }
  }
}

export default EditableLabel as Pretty as Typed<EditableLabelProp>;
