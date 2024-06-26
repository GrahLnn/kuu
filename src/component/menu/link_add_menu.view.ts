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
  Watch,
} from "@dlightjs/dlight";
import ContextMenuButton from "../button/context_menu_button.view";
import { ModalState } from "../../app/data/modal_state";
import { Icon } from "../../icon/all_icon.view";
import { MenuEnv } from "../../app/data/type";
import { open } from "@tauri-apps/plugin-dialog";
import { ConfirmFileRecord } from "../../app/data/global_env";

interface LinkAddContextMenuProps {}

@View
class LinkAddContextMenu
  implements LinkAddContextMenuProps, ModalState, MenuEnv
{
  @Env setFilterModalOpen?: ((open: boolean) => void) | undefined;
  @Env setSpaceModalOpen?: ((open: boolean) => void) | undefined;
  @Env setFileModalOpen?: ((open: boolean) => void) | undefined;
  @Env setMenu?: ((menu: string) => void) | undefined;
  @Env functions?: Record<string, () => void> | undefined;

  ref: any = null;

  close() {
    this.setMenu?.("");
  }

  whenClickOutside = (e: MouseEvent) => {
    if (this.ref && !this.ref.contains(e.target)) {
      this.close();
    }
  };

  didMount() {
    document.addEventListener("click", this.whenClickOutside);
  }

  willUnmount() {
    document.removeEventListener("click", this.whenClickOutside);
  }

  @Snippet
  buttonSnip({
    content,
    icon,
    onClick,
  }: {
    content: string;
    icon: any;
    onClick: () => void;
  }) {
    div()
      .class(
        `flex items-center w-full gap-2 hover:bg-[#f5f5f5] dark:hover:bg-[#2a3146] py-1 px-2 rounded cursor-default transition group`
      )
      .onClick(onClick);
    {
      div().class("opacity-80 group-hover:opacity-100 transition");
      {
        icon().size(16).lightColor("#666666").darkColor("#fafafa");
      }
      div(content).class(
        `text-[#666666] dark:text-white/80 dark:group-hover:text-white group-hover:text-[#343434] text-sm transition`
      );
    }
  }

  @Snippet
  divider() {
    div().class(
      "border-b w-full border-[#edf0f3] dark:border-[#38394c] h-[2px]"
    );
  }

  cmb_class = "opacity-80 group-hover:opacity-100 transition";

  Body() {
    div()
      .class(
        "w-64 bg-[#fcfcfc] dark:bg-[var(--dark-bg-blue-quaternary)] rounded-lg border border-[#edf0f3] dark:border-[#38394c] shadow-lg p-1 flex flex-col gap-1"
      )
      .ref(this.ref);
    {
      // @ts-ignore
      this.buttonSnip("Create documnet(unimpled)")
        // @ts-ignore
        .icon(Icon.File)
        .onClick(() => {
          this.close();
        });

      // @ts-ignore
      this.buttonSnip("Add a file")
        // @ts-ignore
        .icon(Icon.FilePlus)
        .onClick(() => {
          this.functions?.addFile();
          this.close();
        });

      // @ts-ignore
      this.buttonSnip("Move from node(unimpled)")
        // @ts-ignore
        .icon(Icon.CodeMerge)
        .onClick(() => {
          this.close();
        });
    }
  }
}

export default LinkAddContextMenu as Pretty as Typed<LinkAddContextMenuProps>;
