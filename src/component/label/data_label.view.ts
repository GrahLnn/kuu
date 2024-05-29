import {
  View,
  Content,
  ContentProp,
  Prop,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
interface DataLabelProp {
  content: ContentProp<string>;
  class: string;
}
@View
class DataLabel implements DataLabelProp {
  @Content content: ContentProp<string> = required;
  @Prop class: string = "";

  Body() {
    div(this.content).class(
      `dark:text-white ${this.class} text-[8px] cursor-default opacity-60`
    );
  }
}

export default DataLabel as Pretty as Typed<DataLabelProp>;
