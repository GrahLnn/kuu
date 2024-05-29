import {
  View,
  Content,
  ContentProp,
  Snippet,
  Prop,
  Env,
  Children,
  required,
  div,
  type Typed,
  type Pretty,
  DLightObject,
  span,
  button,
} from "@dlightjs/dlight";
import ContextMenuButton from "../button/context_menu_button.view";
import { Icon } from "../../icon/all_icon.view";

interface ArchiveMenuProps {}

@View
class ArchiveMenu implements ArchiveMenuProps {
  @Snippet
  buttonSnip({ content, icon }: { content: string; icon: any }) {
    ContextMenuButton(content);
    {
      div().class("opacity-80 group-hover:opacity-100 transition");
      {
        // XmarkIcon().size(16).lightColor("#666666").darkColor("#fafafa");
        icon().size(16);
      }
    }
  }

  cmb_class = "opacity-80 group-hover:opacity-100 transition";

  Body() {
    div().class(
      "w-64 bg-[#fcfcfc] dark:bg-[var(--dark-bg-blue-quaternary)] rounded-lg border border-[#edf0f3] dark:border-[#212234] shadow-lg p-2 flex flex-col gap-2"
    );
    {
      ContextMenuButton("Settings");
      {
        div().class("opacity-80 group-hover:opacity-100 transition");
        {
          Icon.Wallet2().size(16).lightColor("#666666").darkColor("#fafafa");
        }
      }
      ContextMenuButton("API Keys");
      {
        div().class("opacity-80 group-hover:opacity-100 transition");
        {
          Icon.Wallet2().size(16).lightColor("#666666").darkColor("#fafafa");
        }
      }

      ContextMenuButton("Alpah Feedback");
      {
        div().class("opacity-80 group-hover:opacity-100 transition");
        {
          Icon.Folder().size(16).lightColor("#666666").darkColor("#fafafa");
        }
      }
      ContextMenuButton("Chat Your Records");
      {
        div().class("opacity-80 group-hover:opacity-100 transition");
        {
          Icon.Folder().size(16).lightColor("#666666").darkColor("#fafafa");
        }
      }

      div().class(
        "border-b w-full border-[#edf0f3] dark:border-[#38394c] h-[2px]"
      );

      ContextMenuButton("Log Out")
        .bgColor("hover:bg-[#fff1f3] dark:hover:bg-red-600/20")
        .contentColor("text-[#eb001c] dark:text-[#ff0825]");
      {
        div().class("opacity-80 group-hover:opacity-100 transition");
        {
          Icon.SquarePlus().size(16).lightColor("#eb001c").darkColor("#ff0825");
        }
      }
    }
  }
}

export default ArchiveMenu as Pretty as Typed<ArchiveMenuProps>;
