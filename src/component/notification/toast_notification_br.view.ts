import {
  View,
  Prop,
  ContentProp,
  Content,
  required,
  span,
  h3,
  p,
  Env,
  div,
  type Typed,
  type Pretty,
  Watch,
  set,
} from "@dlightjs/dlight";
import { ToastMassageStruct } from "../../structure/toast";
import ToastMassage from "./toast_massage.view";

// interface ToastNotificationBottomRightProps {
//   children: ToastMassageStruct[];
// }

@View
class ToastNotificationBottomRight {
  // @Content toasts: ToastMassageStruct[] = [];
  @Env toasts: ToastMassageStruct[] = [];
  @Watch
  watchToasts() {
    console.log("watchToasts", this.toasts);
  }
  Body() {
    if (this.toasts.length > 0) {
      div().class(`fixed right-0 bottom-6 mx-8 flex flex-col gap-2 items-end`);

      {
        for (const child of this.toasts) {
          switch (child.type) {
            case "error":
              ToastMassage()
                .title(child.title)
                .content(child.content)
                .onClose(() => {
                  this.toasts = this.toasts.filter((c) => c !== child);
                });
          }
        }
      }
    }
  }
}

export default ToastNotificationBottomRight as Pretty as Typed;
