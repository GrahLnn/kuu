import {
  View,
  Prop,
  ContentProp,
  Content,
  required,
  span,
  h3,
  p,
  div,
  type Typed,
  type Pretty,
  Watch,
} from "@dlightjs/dlight";
import { Icon } from "../../icon/all_icon.view";

interface ToastMassageProps {
  title: string;
  content: string;
  onClose: () => void;
}

@View
class ToastMassage implements ToastMassageProps {
  @Prop title = "Create filter failed";
  @Prop content = "You should add some Label to create!";
  @Prop onClose = () => {};
  didMount() {
    setTimeout(() => {
      this.onClose();
    }, 3000);
  }
  bg = "bg-[#fefefe] dark:bg-[var(--dark-bg-gray-a)]";
  bg_err = "bg-[#fff1f3] dark:bg-red-600/20";

  border = "border rounded-lg border-gray-300 dark:border-[#5A1913]";
  border_err = "border rounded-lg border-[#FFDCD5] dark:border-[#301f1f]";
  ux = "shadow-md";
  position = "py-4 pl-4 pr-9 inline-block max-w-96";
  Body() {
    div().class(
      `${this.bg_err} ${this.border_err} ${this.ux} ${this.position}`
    );
    {
      div().class("flex items-start item-center gap-2");
      {
        Icon.XMark()
          .color("#ffffff")
          .size(12)
          .class("p-1 rounded-full bg-[#e5484d] my-auto");
        h3(this.title).class(
          "text-base leading-6 text-gray-800 dark:text-[#eb001c] dark:opacity-90 font-medium"
        );
      }
      div().class("flex items-start item-center gap-2");
      {
        Icon.XMark()
          .color("#ffffff00")
          .size(12)
          .class("p-1 rounded-full bg-transparent my-auto");
        div(this.content).class(
          "text-sm text-gray-500 dark:text-white dark:opacity-60"
        );
      }
    }
  }
}

export default ToastMassage as Pretty as Typed<ToastMassageProps>;
