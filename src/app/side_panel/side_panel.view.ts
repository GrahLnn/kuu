import {
  View,
  Prop,
  ContentProp,
  Content,
  required,
  span,
  h3,
  p,
  button,
  Env,
  env,
  div,
  Snippet,
  Model,
  type Typed,
  type Pretty,
  Watch,
  set,
} from "@dlightjs/dlight";
import InfoButton from "../../component/button/tab_route_button.view";
import FilterModalBox from "../../component/modal_box/filter_modalbox.view";
import UnDeactivatableInfoButton from "../../component/button/undeactivatable_tab_route_button.view";

import StatusLabel from "../../component/label/status_label.view";
import PresentedLabel from "../../component/label/presented_label.view";
import MagneticButton from "../../component/button/magnetic_button.view";
import { Icon } from "../../icon/all_icon.view";
import { Menu } from "../data/type";
import { FilterEnv, Filter, FilterLevel } from "../data/filter_state";
import { ModalState } from "../data/modal_state";
import SpaceModalBox from "../../component/modal_box/space_modalbox.view";
import FileUploadModalBox from "../../component/modal_box/upload_file_modalbox.view";
import { MenuEnv, FaceEnv, FaceEnum } from "../data/type";
import { Position, TransformPosition } from "../data/type";
import InvalidAddTabFnButton from "../../component/button/invalid_add_tab_fn_button.view";
import AddTabFnButton from "../../component/button/add_tab_button.view";
import * as _ from "lodash";
import { GlobalData, NodeRecord } from "../data/global_env";

interface SidePanelProps {}

@View
class SidePanel
  implements
    SidePanelProps,
    FilterEnv,
    ModalState,
    MenuEnv,
    FaceEnv,
    GlobalData
{
  @Env addFilter: (filter: Filter) => void = () => {};
  @Env removeFilter: (filter: Filter) => void = () => {};
  @Env filters?: Record<FilterLevel, Filter[]> | undefined;
  @Env filterModalOpen: boolean = false;
  @Env setFilterModalOpen: (open: boolean) => void = () => {};
  @Env setCurFilter: (newFilter: Filter) => void = () => {};
  @Env spaceModalOpen?: boolean | undefined;
  @Env setSpaceModalOpen?: (open: boolean) => void | undefined;
  @Env fileModalOpen?: boolean | undefined;
  @Env setFileModalOpen?: (open: boolean) => void | undefined;
  @Env menu?: string | undefined;
  @Env setMenu?: (menu: string) => void | undefined;
  @Env setPosition?: (position: Position) => void | undefined;
  @Env setTransform?: (position: TransformPosition) => void | undefined;
  @Env setFace?: ((face: FaceEnum) => void) | undefined;
  @Env nodes?: NodeRecord[] | undefined;
  @Env setNotification?: ((notification: string) => void) | undefined;

  fv: string[] = ["My Records"];

  filterExists(filters: Filter[], filterToCheck: Filter) {
    return filters.some((filter) => _.isEqual(filter, filterToCheck));
  }

  willMount() {
    let defaultFilter;
    for (const f of this.fv) {
      const filter = new Filter(f, FilterLevel.Favorite, [
        "All Label Configured",
      ]);
      if (!this.filterExists(this.filters!.Favorite, filter)) {
        this.addFilter(filter);
      }
      if (f === "My Records") {
        defaultFilter = filter;
      }
    }

    this.setCurFilter(defaultFilter!);
  }

  @Snippet
  infoButtonInSidebar({ content }: { content: Filter }) {
    InfoButton(content.name)
      .onToggle(() => {
        this.setCurFilter(content);
      })
      .onClose(() => {
        this.removeFilter(content);
      });
  }

  @Snippet
  favoriteZone() {
    div().class("px-4 w-full flex flex-col gap-2 ");
    {
      for (const f of this.filters![FilterLevel.Favorite]) {
        UnDeactivatableInfoButton(f.name).onToggle(() => {
          this.setCurFilter(f);
        });
      }
    }
  }

  @Snippet
  spaceZone() {
    div().class(
      "flex flex-col px-4 pb-8 overflow-x-hidden w-full h-full gap-1 horizontal-scroll-gradient-without-top"
    );
    {
      for (let f of this.filters![FilterLevel.Pinned]) {
        this.infoButtonInSidebar(f as any);
      }
      if (this.filters![FilterLevel.Pinned].length > 0) {
        div().class(
          "border-b w-full border-[#d8d8d8] dark:border-[#38394c] h-[2px] my-2"
        );
      }
      if (this.nodes!.length === 0) {
        InvalidAddTabFnButton().callback(() => {
          this.setNotification?.("No records found, cannot add tab.");
        });
      } else {
        AddTabFnButton().callback(() => {
          this.setFilterModalOpen(true);
        });
      }
      for (const f of this.filters![FilterLevel.Temporary]) {
        this.infoButtonInSidebar(f as any);
      }
    }
  }

  Body() {
    div().class(
      `w-56 bg-white dark:bg-[var(--dark-bg-blue-primary)] border-r border-[#edf0f3] dark:border-[#212234] flex flex-col gap-2 overflow-x-hidden items-center pt-2 pb-2 shrink-0 h-screen transition`
    );

    {
      this.favoriteZone();
      div("Space 1").class(
        "text-left w-full text-[12px] dark:opacity-60 opacity-60 dark:text-white text-[#676769] transition font-semibold px-4 mt-2"
      );
      this.spaceZone();
      div().class("flex w-full justify-between px-4");
      {
        MagneticButton().onClick(() => {
          this.setFace?.(FaceEnum.Diverge);
        });
        {
          Icon.BoxArchive()
            .size(18)
            // .darkColor("#dadadc")
            // .lightColor("#13143e")
            .lightColor("#666666")
            .darkColor("#fafafa")
            .passClick(true);
        }
        MagneticButton(Menu.AddSpace)
          .setPosition(this.setPosition)
          .setTransform(this.setTransform)
          .menu(this.menu);
        {
          Icon.Plus()
            .size(18)
            .lightColor("#666666")
            .darkColor("#fafafa")
            .passClick(true);
        }
      }
    }
    FilterModalBox()
      .isOpen(this.filterModalOpen)
      .onClose(() => {
        this.setFilterModalOpen(false);
      });
    SpaceModalBox()
      .isOpen(this.spaceModalOpen!)
      .onClose(() => {
        this.setSpaceModalOpen!(false);
      });
    FileUploadModalBox()
      .isOpen(this.fileModalOpen!)
      .onClose(() => {
        this.setFileModalOpen!(false);
      });
  }
}

export default SidePanel as Pretty as Typed<SidePanelProps>;
