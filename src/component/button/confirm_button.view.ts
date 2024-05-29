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

interface ConfirmButtonProps {
  onClick: () => void;
  content: ContentProp<string>;
}

@View
class ConfirmButton implements ConfirmButtonProps {
  @Prop onClick = () => {};
  @Content content = required;
  ui =
    "rounded-md bg-[#6d77d4] dark:bg-[#575ac6] hover:bg-[#6570ca] hover:dark:bg-[#6466d8]";
  ux = "text-sm font-semibold text-white shadow-sm transition cursor-default";
  position = "flex w-full justify-center px-3 py-2 sm:ml-3 sm:w-auto";
  Body() {
    div(this.content)
      .class(`${this.ui} ${this.ux} ${this.position}`)
      .onClick(this.onClick);
  }
}

export default ConfirmButton as Pretty as Typed<ConfirmButtonProps>;
