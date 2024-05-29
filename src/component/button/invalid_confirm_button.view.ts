import {
  View,
  Prop,
  ContentProp,
  Content,
  required,
  div,
  type Typed,
  type Pretty,
  Watch,
} from "@dlightjs/dlight";

interface InvalidConfirmButtonProps {
  content: ContentProp<string>;
  onClick: () => void;
}

@View
class InvalidConfirmButton implements InvalidConfirmButtonProps {
  @Content content = required;
  @Prop onClick = () => {};

  click = false;

  ui = "rounded-md bg-[#6d77d4] dark:bg-[#575ac6]";
  ux = `cursor-default text-sm font-semibold text-white shadow-sm transition ${
    this.click ? "invalid-confirm" : ""
  }`;
  position = "flex w-full justify-center px-3 py-2 sm:ml-3 sm:w-auto";
  Body() {
    div(this.content)
      .class(`${this.ui} ${this.ux} ${this.position}`)
      .onClick(() => {
        this.click = true;
        this.onClick();
        setTimeout(() => {
          this.click = false;
        }, 400);
      });
  }
}

export default InvalidConfirmButton as Pretty as Typed<InvalidConfirmButtonProps>;
