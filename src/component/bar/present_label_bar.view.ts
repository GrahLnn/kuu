import {
  View,
  Content,
  Prop,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import PresentedLabel from "../label/presented_label.view";
import TypeDashedLabel from "../label/type_dashed_label.view";
import { Icon } from "../../icon/all_icon.view";
interface PresentLabelBarProp {
  labels: string[];
}
@View
class PresentLabelBar implements PresentLabelBarProp {
  @Prop labels: string[] = required;

  ui =
    "bg-[var(--light-bg-quaternary)] dark:bg-[var(--dark-bg-blue-secondary)] opacity-70";
  ui_border = "border-b border-[#edf0f3] dark:border-[#212234]";
  ux = "group transition-colors flex-wrap";
  position = "flex items-center gap-1 px-3 py-1.5 w-full gap-1";
  Body() {
    div().class(`${this.ui} ${this.ux} ${this.position} ${this.ui_border}`);
    {
      if (this.labels === undefined || this.labels.length === 0) {
        PresentedLabel("Unassigned Files");
      } else {
        for (let label of this.labels) {
          PresentedLabel(label);
        }
      }
      div().class(
        "hidden opacity-0 group-hover:block group-hover:opacity-100 transition-opacity"
      );
      {
        TypeDashedLabel("Add New File for Labels");
        {
          Icon.Plus();
        }
      }
    }
  }
}

export default PresentLabelBar as Pretty as Typed<PresentLabelBarProp>;
