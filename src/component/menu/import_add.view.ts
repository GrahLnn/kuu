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
import { ModalState } from "../../app/data/modal_state";
import { Icon } from "../../icon/all_icon.view";

interface ImportAddMenuProps {}

@View
class ImportAddMenu implements ImportAddMenuProps {
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
      //   div().class("flex justify-center ");
      //   {
      //     div().class(`w-1 h-1 rounded-full mr-2 bg-cyan-500 shrink-0`);
      //     div("Drog folder or files to list or choose.").class(
      //       "text-[#676769]/70 text-[14px] px-2 cursor-default dark:text-[#fafafa]/70"
      //     );
      //   }

      ContextMenuButton("Add File");
      {
        div().class("opacity-80 group-hover:opacity-100 transition solid");
        {
          Icon.FilePlus().size(16).lightColor("#666666").darkColor("#fafafa");
        }
      }
      ContextMenuButton("Add Folder");
      {
        div().class("opacity-80 group-hover:opacity-100 transition solid");
        {
          Icon.FolderPlus().size(16).lightColor("#666666").darkColor("#fafafa");
        }
      }
    }
  }
}

export default ImportAddMenu as Pretty as Typed<ImportAddMenuProps>;
