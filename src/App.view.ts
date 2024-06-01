import { Main, View, div, Env, Watch, env } from "@dlightjs/dlight";
import "./index.css";
import Library from "./app/library/library.view";
import { LabelRecord, Position, TransformPosition } from "./app/data/type";
import SidePanel from "./app/side_panel/side_panel.view";
import PresentRecordsArea from "./app/main/main_area.view";
import { MenuEnv, FaceEnv, FaceEnum } from "./app/data/type";
import ContextFrame from "./component/menu/context_frame.view";
import SpaceAddContextMenu from "./component/menu/space_add_context_menu.view";
import {
  FilterEnv,
  Filter,
  FilterLevel,
  GuideEnv,
} from "./app/data/filter_state";
import { ModalState } from "./app/data/modal_state";
import SArea from "./app/main/second_area.view";
import { GlobalData, NodeRecord } from "./app/data/global_env";
import { ImportHistory, HistoryState, updateHistory } from "./app/data/type";
import { fetchLabels } from "./app/services/cmds";
import * as _ from "lodash";
import { filtersStore } from "./app/services/tauri";
import DemoWarning from "./component/notification/demo_warning.view";
import { Guide } from "./app/data/type";

@Main
@View
class App {
  ui =
    "h-screen dark:bg-[var(--dark-bg-blue-primary)] bg-[var(--light-bg-primary)] overflow-hidden select-none flex ";

  // ...menu...
  curMenu: string = "";
  menuPosition: Position = { l: 0, t: 0, w: 0, h: 0, r: 0, b: 0 };
  transformPosition: TransformPosition = { x: 0, y: 0 };
  changeMenu = (newMenu: string) => {
    if (this.curMenu !== newMenu) {
      this.curMenu = newMenu;
    }
  };
  updateMenuPosition = (newPosition: Position) => {
    this.menuPosition = newPosition;
  };
  updateTransformPosition = (newPosition: TransformPosition) => {
    this.transformPosition = newPosition;
  };
  offsetX: number | null = -48;
  offsetY: number | null = 10;
  setOffsetX = (offsetX: number | null) => {
    this.offsetX = offsetX;
  };
  setOffsetY = (offsetY: number | null) => {
    this.offsetY = offsetY;
  };
  data: any = null;
  setData = (data: any) => {
    this.data = data;
  };
  functions: Record<string, () => void> = {};
  setFunctions = (functions: Record<string, () => void>) => {
    this.functions = functions;
  };

  // ...filter...
  allNames: string[] = [];
  curFilter: Filter | null = null;
  filters: Record<FilterLevel, Filter[]> = {
    [FilterLevel.Favorite]: [],
    [FilterLevel.Pinned]: [],
    [FilterLevel.Temporary]: [],
    [FilterLevel.Resent]: [],
  };
  changeCurFilter(newFilter: Filter) {
    this.curFilter = newFilter;
  }
  updateFilter(oldF: Filter, newF: Filter) {
    const index = this.filters[oldF.level].findIndex(
      (f) => f.name === oldF.name
    );

    if (index !== -1) {
      this.filters[oldF.level].splice(index, 1);
    }

    if (!this.filters[newF.level]) {
      this.filters[newF.level] = [];
    }
    this.filters[newF.level].splice(index, 0, newF);
    if (_.isEqual(this.curFilter, oldF)) {
      this.curFilter = newF;
    }
    this.allNames = this.allNames.map((name) =>
      name === oldF.name ? newF.name : name
    );
    this.updateFilterStore();
  }

  async updateFilterStore() {
    await filtersStore.set(
      "filtersTemporary",
      this.filters[FilterLevel.Temporary]
    );
  }

  addFilter(filter: Filter) {
    if (filter.level !== FilterLevel.Temporary) {
      this.filters[filter.level].push(filter);
      this.allNames.push(filter.name);
    } else {
      this.filters[filter.level].unshift(filter);
      this.allNames.unshift(filter.name);
    }
    this.updateFilterStore();
  }
  removeFilter(filter: Filter) {
    this.filters[filter.level] = this.filters[filter.level].filter(
      (f) => f.name !== filter.name
    );
    this.allNames = this.allNames.filter((f) => f !== filter.name);
    if (_.isEqual(this.curFilter, filter)) {
      this.curFilter =
        this.filters[filter["level"]][0] ||
        this.filters[FilterLevel.Favorite][0] ||
        null;
    }
    this.updateFilterStore();
  }

  // ...modal...
  filterModalOpen = false;
  setFilterModalOpen = (open: boolean) => {
    this.filterModalOpen = open;
  };
  spaceModalOpen = false;
  setSpaceModalOpen = (open: boolean) => {
    this.spaceModalOpen = open;
  };
  fileModalOpen = false;
  setFileModalOpen = (open: boolean) => {
    this.fileModalOpen = open;
  };
  nodeModalOpen = false;
  setNodeModalOpen = (open: boolean) => {
    this.nodeModalOpen = open;
  };

  // ...face...
  face = FaceEnum.Aggregate;
  setFace = (face: FaceEnum) => {
    this.face = face;
  };

  // ...guide...
  guideArea = Guide.Import;
  setGuideArea = (area: string) => {
    this.guideArea = area as Guide;
  };

  // ...global data...
  labels: LabelRecord[] = [];
  setLabels = (labels: LabelRecord[]) => {
    this.labels = labels;
  };
  storePath: string = "";
  setStorePath = (path: string) => {
    this.storePath = path;
  };
  importHistory: ImportHistory = {
    [HistoryState.Now]: [],
    [HistoryState.OneMinAgo]: [],
    [HistoryState.TwoMinAgo]: [],
    [HistoryState.FiveMinAgo]: [],
    [HistoryState.FifteenMinAgo]: [],
    [HistoryState.ThirtyMinAgo]: [],
    [HistoryState.OneHourAgo]: [],
    [HistoryState.TwoHourAgo]: [],
    [HistoryState.FourHourAgo]: [],
    [HistoryState.EightHourAgo]: [],
    [HistoryState.TwelveHourAgo]: [],
    [HistoryState.SixteenHourAgo]: [],
    [HistoryState.TwientyHourAgo]: [],
    [HistoryState.OneDayAgo]: [],
    [HistoryState.ThreeDayAgo]: [],
    [HistoryState.OneWeekAgo]: [],
    [HistoryState.OneMonthAgo]: [],
    [HistoryState.LongerAgo]: [],
  };
  unShiftToNow = (record: any) => {
    this.importHistory[HistoryState.Now].unshift(record);
  };
  nodes: NodeRecord[] = [];
  setNodes = (nodes: NodeRecord[]) => {
    this.nodes = nodes;
  };
  const: Record<string, any> = { defaultFilterName: "My Records" };
  notification: string = "";
  setNotification = (notification: string) => {
    this.notification = notification;
  };

  // ...common...
  timer: any = null;

  didMount() {
    // this.timer = setInterval(() => {
    //   const currentTimestamp = Date.now();
    //   const updatedHistory = updateHistory(
    //     this.importHistory,
    //     currentTimestamp
    //   );
    //   this.importHistory = updatedHistory;
    // }, 1000);
  }
  willUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  async willMount() {
    const filtersTemp: Filter[] | null = await filtersStore.get(
      "filtersTemporary"
    );
    if (filtersTemp) {
      this.filters[FilterLevel.Temporary] = filtersTemp;
    }
    const labels = await fetchLabels();
    this.setLabels(labels);
    this.notification =
      "This is a highly experimental demo. Do not use it in production.";
    const isWindows = navigator.userAgent.indexOf("Windows") !== -1;

    if (isWindows) {
      document.documentElement.setAttribute("data-platform", "windows");
    }
  }

  Body() {
    env<GlobalData>()
      .labels(this.labels)
      .setLabels(this.setLabels)
      .storePath(this.storePath)
      .setStorePath(this.setStorePath)
      .importHistory(this.importHistory)
      .unshiftToNow(this.unShiftToNow)
      .nodes(this.nodes)
      .setNodes(this.setNodes)
      .const(this.const)
      .notification(this.notification)
      .setNotification(this.setNotification);
    {
      env<FaceEnv>().setFace(this.setFace).face(this.face);
      {
        env<GuideEnv>()
          .guideArea(this.guideArea)
          .setGuideArea(this.setGuideArea);
        {
          env<MenuEnv>()
            .menu(this.curMenu)
            .position(this.menuPosition)
            .transformPosition(this.transformPosition)
            .setMenu(this.changeMenu)
            .setPosition(this.updateMenuPosition)
            .setTransform(this.updateTransformPosition)
            .offsetX(this.offsetX)
            .offsetY(this.offsetY)
            .setOffsetX(this.setOffsetX)
            .setOffsetY(this.setOffsetY)
            .data(this.data)
            .setData(this.setData)
            .functions(this.functions)
            .setFunctions(this.setFunctions);
          {
            env<FilterEnv>()
              .curFilter(this.curFilter)
              .filters(this.filters)
              .addFilter(this.addFilter)
              .allFilterNames(this.allNames)
              .removeFilter(this.removeFilter)
              .setCurFilter(this.changeCurFilter)
              .updateFilter(this.updateFilter);

            {
              env<ModalState>()
                .filterModalOpen(this.filterModalOpen)
                .setFilterModalOpen(this.setFilterModalOpen)
                .spaceModalOpen(this.spaceModalOpen)
                .setSpaceModalOpen(this.setSpaceModalOpen)
                .fileModalOpen(this.fileModalOpen)
                .setFileModalOpen(this.setFileModalOpen)
                .nodeModalOpen(this.nodeModalOpen)
                .setNodeModalOpen(this.setNodeModalOpen);
              {
                switch (this.face) {
                  case FaceEnum.Aggregate:
                    div()
                      .class(this.ui)
                      .onClick(() => {
                        this.changeMenu("");
                      });
                    {
                      SidePanel();
                      // if (this.curFilter?.name === "Components") {
                      //   Library();
                      // } else
                      if (this.curFilter) {
                        PresentRecordsArea();
                      }
                    }
                    break;
                  case FaceEnum.Diverge:
                    SArea().onClick(() => {
                      this.changeMenu("");
                    });
                    break;
                }
                DemoWarning();
                ContextFrame();
              }
            }
          }
        }
      }
    }
  }
}
