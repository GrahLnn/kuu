import {
  View,
  div,
  type Pretty,
  type Typed,
  ContentProp,
  Content,
  required,
  Env,
  Watch,
} from "@dlightjs/dlight";
import { Icon } from "../../icon/all_icon.view";
import { transform } from "lodash";
import { GlobalData } from "../../app/data/global_env";

interface DemoWarningProp {}

@View
class DemoWarning implements DemoWarningProp, GlobalData {
  @Env notification?: string | undefined;
  @Env setNotification?: ((notification: string) => void) | undefined;

  timmer: any;
  transform: string = "";

  @Watch
  delayOut() {
    if (this.timmer) {
      clearTimeout(this.timmer);
    }

    if (this.notification !== "") {
      this.transform = "transform-in-y";
      this.timmer = setTimeout(async () => {
        this.transform = "transform-out-y";
        // const anime = document.getAnimations();
        // console.log(anime);
        // await Promise.all(anime.map((a) => a.finished));
        // console.log("done");
        setTimeout(() => {
          this.setNotification?.("");
        }, 200);
      }, 3000);
    }
  }

  ui_bg = "bg-[#f3f5f7] dark:bg-[var(--dark-bg-indigo-secondary)]";
  ui_border = "border border-gray-300 dark:border-[#444556] rounded-full";
  ux = `flex justify-center items-center backdrop-blur-2xl shadow transition-colors ${this.transform} cursor-default`;
  position = "absolute bottom-2 py-1 px-2 z-[1000]";
  Body() {
    div().class(
      "w-screen flex items-center justify-center absolute bottom-0 overflow-hidden h-[40px] pointer-events-none"
    );
    {
      div().class(
        `${this.position} ${this.ui_bg} ${this.ui_border} ${this.ux}`
      );

      {
        Icon.CircleInfo().lightColor("#eb001c").darkColor("#ff0825").size(14);
        div().class("w-1");
        div(this.notification).class("opacity-70 text-[12px] dark:text-white");
      }
    }
  }
}

export default DemoWarning as Pretty as Typed<DemoWarningProp>;
