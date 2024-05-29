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

interface LabelProp {
  content: ContentProp<string>;
  class: string;
}

@View
class Label implements LabelProp {
  @Content content: ContentProp<string> = required;
  @Prop class: string = "";

  Body() {
    div(this.content).class(
      `dark:text-white ${this.class} text-[12px] cursor-default`
    );
  }
}

export default Label as Pretty as Typed<LabelProp>;
