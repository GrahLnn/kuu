import {
  View,
  Prop,
  ContentProp,
  Content,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";

interface SolidLabelProps {
  content: ContentProp<string>;
}

@View
class SolidLabel implements SolidLabelProps {
  @Content content = required;
  ui =
    "rounded border-1 border-[#e6e6e6] bg-[#fdfdfd] dark:bg-[#3b4560] bg-opacity-60 dark:bg-opacity-60 text-[12px] text-gray-500 dark:text-gray-400";
  ux = "shadow transition cursor-default";
  position = "px-2 py-0.5";
  Body() {
    div(this.content).class(`${this.ui} ${this.ux} ${this.position}`);
  }
}

export default SolidLabel as Pretty as Typed<SolidLabelProps>;
