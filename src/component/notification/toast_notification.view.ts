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
import ToastMassage from "./toast_massage.view";

interface ToastNotificationProps {
  // content: ContentProp<string>;
  show: boolean;
  duration: number;
}

@View
class ToastNotification implements ToastNotificationProps {
  content = "You should add some Label to create!";
  @Prop show = false;
  @Prop duration = 3000;

  ui = "rounded-md bg-[#6d77d4] dark:bg-[#575ac6]";
  ux = "text-sm font-semibold text-white shadow-sm transition";
  position = "fixed bottom-4 left-4 right-4 z-50";
  Body() {
    if (this.show) {
      div().class(`fixed right-0 bottom-6 mx-8 flex flex-col gap-2 items-end`);

      {
        div();
        {
          ToastMassage();
        }
        div();
        {
          ToastMassage().title("File upload failed").content("Please retry it");
        }
      }
    }
  }
}

export default ToastNotification as Pretty as Typed<ToastNotificationProps>;
