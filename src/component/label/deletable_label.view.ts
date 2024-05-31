import {
  View,
  Content,
  ContentProp,
  required,
  div,
  Env,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import Label from "./label.view";
import { Icon } from "../../icon/all_icon.view";
import { deleteLabel, fetchLabels } from "../../app/services/cmds";
import { GlobalData } from "../../app/data/global_env";
import { LabelRecord } from "../../app/data/type";

interface DeletableLabelProp {
  content: ContentProp<string>;
}
@View
export class DeletableLabel implements DeletableLabelProp, GlobalData {
  @Content content: ContentProp<string> = required;
  @Env setLabels?: ((labels: LabelRecord[]) => void) | undefined;

  ui_border = "border rounded-md border-gray-300 dark:border-[#494b65]";
  ui_bg = "bg-[var(--light-bg-tertiary)] dark:bg-[var(--dark-bg-gray-a)]";
  ux = "transition-all opacity-80 hover:opacity-100 shrink-0";
  position = "flex items-center px-1 py-0.5";

  Body() {
    div().class(`${this.position} ${this.ui_border} ${this.ui_bg} ${this.ux}`);
    {
      div().class("w-0.5");
      Label(this.content).class("opacity-80");
      div().class("w-1");
      div().onClick(async () => {
        await deleteLabel(this.content);
        let labels = await fetchLabels();
        this.setLabels?.(labels);
      });
      {
        Icon.XMark()
          .class("opacity-60 hover:opacity-90 transition-all")
          .passClick(true);
      }
    }
  }
}

export default DeletableLabel as Pretty as Typed<DeletableLabelProp>;
