import {
  View,
  Prop,
  ContentProp,
  required,
  div,
  Children,
  Env,
  button,
  type Typed,
  type Pretty,
  th,
  Content,
  span,
  img,
  input,
  Snippet,
  label,
} from "@dlightjs/dlight";
import MagneticButton from "../button/magnetic_button.view";
import { Icon } from "../../icon/all_icon.view";
import { open } from "@tauri-apps/plugin-dialog";
import { GlobalData } from "../../app/data/global_env";

interface storePathGuideProp {}

@View
class storePathGuide implements storePathGuideProp, GlobalData {
  @Env setStorePath?: ((path: string) => void) | undefined;

  tempFolderHolder = "Set Location Here!";

  @Snippet
  noStoreNotification() {
    div().class(
      "bg-[#fff1f3] dark:bg-red-600/20 " +
        "border rounded-lg border-[#FFDCD5] dark:border-[#301f1f] " +
        "flex items-center gap-2 shadow px-2 py-1 " +
        "cursor-default"
    );
    {
      Icon.CircleInfo().lightColor("#eb001c").darkColor("#ff0825").size(20);
      div(
        "Store location not set, please select a empty folder to store your assets."
      ).class("text text-gray-600 dark:text-white/70 ");
    }
  }

  @Snippet
  confirmStoreNotification() {
    div().class(
      "bg-[#d6f1d2] dark:bg-[#1f3428] " +
        "border rounded-lg border-[#84de77] dark:border-[#1f341c] " +
        "flex items-center gap-2 shadow px-2 py-1 " +
        "cursor-default"
    );
    {
      Icon.CircleCheck3().lightColor("#1fc500").darkColor("#79d26d").size(20);

      div()
        .class("relative")
        .onClick(() => {
          this.setStorePath?.(this.tempFolderHolder);
        });
      {
        div().class(
          "absolute -inset-2 rounded-lg bg-gradient-to-r from-[#1fc500] via-orange-300 to-[#79d26d] opacity-50 blur-lg"
        );
        div("Confirm").class(
          "relative flex items-center justify-center rounded-lg text-gray-700 dark:text-white/70 hover:shadow-lg bg-gray-400/20 hover:bg-gray-700/20 dark:hover:bg-white/30 px-2 cursor-pointer transition duration-300 font-semibold"
        );
      }
      div(
        'this path? You can modify location in the "Rule" zone at any time.'
      ).class("text text-gray-600 dark:text-white/80 ");
    }
  }

  @Snippet
  setStoreButton() {
    MagneticButton()
      .mainClass("hover:scale-110 transition")
      .onClick(async () => {
        const folder = await open({ directory: true });
        if (folder) {
          this.tempFolderHolder = folder;
        }
      });
    {
      div().class("flex items-center gap-4 py-4 px-4");
      {
        Icon.FolderLink().size(24).lightColor("#666666").darkColor("#fafafa");
        div(this.tempFolderHolder).class(
          "text-sm font-semibold text-gray-500 dark:text-white/70"
        );
      }
    }
  }

  Body() {
    div().class("flex flex-col items-center gap-12");
    {
      if (this.tempFolderHolder === "Set Location Here!") {
        this.noStoreNotification();
      } else {
        this.confirmStoreNotification();
      }
      this.setStoreButton();
    }
  }
}

export default storePathGuide as Pretty as Typed<storePathGuideProp>;
