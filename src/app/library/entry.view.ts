import {
  View,
  Content,
  ContentProp,
  Prop,
  Children,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";

interface EntryProp {
  children: ChildNode[];
}
@View
class Entry implements EntryProp {
  @Children children = required;
  ui = "flex justify-center items-center gap-8 w-full px-8 grow-0";
  Body() {
    div().class(this.ui);
    {
      this.children;
    }
  }
}

export default Entry as Pretty as Typed<EntryProp>;
