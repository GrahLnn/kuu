import {
  View,
  Content,
  ContentProp,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";

interface NameProp {
  content: ContentProp<string>;
}

@View
class Name implements NameProp {
  @Content content: ContentProp<string> = required;
  ui = "text-[12px] dark:text-white";
  Body() {
    div(this.content).class(this.ui);
  }
}

export default Name as Pretty as Typed<NameProp>;
