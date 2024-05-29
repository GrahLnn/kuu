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

interface WeakTextButtonProps {
  onClick: () => void;
  content: ContentProp<string>;
  class?: string;
}

@View
class WeakTextButton implements WeakTextButtonProps {
  @Prop onClick = () => {};
  @Content content = required;
  @Prop class?: string | "";
  ui = "text-sm text-gray-400 dark:text-gray-500";
  ux = "cursor-default";
  position = "sm:mt-0 sm:w-auto";
  Body() {
    div(this.content)
      .class(`${this.ui} ${this.ux} ${this.position} ${this.class}`)
      .onClick(this.onClick);
  }
}

export default WeakTextButton as Pretty as Typed<WeakTextButtonProps>;
