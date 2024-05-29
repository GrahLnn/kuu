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
import { MenuEnv } from "../../app/data/type";

interface SpaceAddContextMenuProps {}

@View
class SpaceAddContextMenu
  implements SpaceAddContextMenuProps, ModalState, MenuEnv
{
  @Env setFilterModalOpen?: ((open: boolean) => void) | undefined;
  @Env setSpaceModalOpen?: ((open: boolean) => void) | undefined;
  @Env setFileModalOpen?: ((open: boolean) => void) | undefined;
  @Env setMenu?: ((menu: string) => void) | undefined;
  @Snippet
  buttonSnip({ content, icon }: { content: string; icon: any }) {
    ContextMenuButton(content);
    {
      div().class("opacity-80 group-hover:opacity-100 transition");
      {
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
      ContextMenuButton("New File").onClick(() => {
        // this.setFileModalOpen?.(true);
        this.setMenu?.("");
      });
      {
        div().class("opacity-80 group-hover:opacity-100 transition");
        {
          Icon.FilePlus().size(16).lightColor("#666666").darkColor("#fafafa");
        }
      }
      ContextMenuButton("New Space").onClick(() => {
        this.setSpaceModalOpen?.(true);
        this.setMenu?.("");
      });
      {
        div().class("opacity-80 group-hover:opacity-100 transition");
        {
          Icon.TableColNewRight()
            .size(16)
            .lightColor("#666666")
            .darkColor("#fafafa");
        }
      }

      ContextMenuButton("New Folder");
      {
        div().class("opacity-80 group-hover:opacity-100 transition");
        {
          Icon.FolderPlus().size(16).lightColor("#666666").darkColor("#fafafa");
        }
      }

      div().class(
        "border-b w-full border-[#edf0f3] dark:border-[#38394c] h-[2px]"
      );

      ContextMenuButton("New Tab").onClick(() => {
        this.setFilterModalOpen?.(true);
      });
      {
        div().class("opacity-80 group-hover:opacity-100 transition solid");
        {
          Icon.DuplicatePlus()
            .size(16)
            .lightColor("#666666")
            .darkColor("#fafafa");
        }
      }
    }
  }
}

export default SpaceAddContextMenu as Pretty as Typed<SpaceAddContextMenuProps>;
