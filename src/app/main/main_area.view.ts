import {
  View,
  Content,
  ContentProp,
  Prop,
  Env,
  required,
  Snippet,
  div,
  type Typed,
  type Pretty,
  Watch,
} from "@dlightjs/dlight";
import TitleBar from "../../component/bar/title_bar.view";
import ItemBar from "../../component/bar/item_bar.view";
import PresentLabelBar from "../../component/bar/present_label_bar.view";
import { name3, names1, names2 } from "../data/pre_define_data";
import { Icon } from "../../icon/all_icon.view";
import MagneticButton from "../../component/button/magnetic_button.view";
import { GlobalData, NodeRecord, SpaceRecord } from "../data/global_env";
import storePathGuide from "../../component/guide/store_path_guide.view";
import { NodesCollection } from "../data/global_env";
import AudioPlayer from "../../component/present/audio_player.view";
import { fetchAllNodes, fetchNodesByLabels } from "../services/cmds";
import { Filter, FilterEnv } from "../data/filter_state";
import NodeModalBox from "../../component/modal_box/node_modalbox.view";
import { ModalState } from "../data/modal_state";

interface PresentRecordsAreaProp {
  filterTitle?: string;
  zoneLbaels?: string[];
  nodesCollections?: NodesCollection[];
}

@View
class PresentRecordsArea
  implements PresentRecordsAreaProp, GlobalData, FilterEnv, ModalState
{
  @Prop filterTitle?: string;
  @Prop zoneLabels?: string[] = [];
  @Prop nodesCollections?: NodesCollection[] | undefined;
  @Env storePath?: string | undefined;
  @Env nodeModalOpen?: boolean | undefined;
  @Env curFilter?: Filter | undefined;
  @Env setNodeModalOpen?: ((open: boolean) => void) | undefined;
  @Env nodes?: NodeRecord[] | undefined;
  @Env setNodes?: ((nodes: NodeRecord[]) => void) | undefined;
  @Env const?: Record<string, any> | undefined;

  choosedNode: NodeRecord | null = null;
  // nodes: NodeRecord[] = [];

  async updateNodes() {
    if (this.curFilter?.name === this.const?.defaultFilterName) {
      const nodes = await fetchAllNodes();
      this.setNodes?.(nodes);
    } else if (this.curFilter?.labels) {
      const nodes = await fetchNodesByLabels(this.curFilter?.labels);
      this.setNodes?.(nodes);
    }
  }

  async willMount() {
    await this.updateNodes();
  }

  @Watch("curFilter")
  async filterChange() {
    await this.updateNodes();
  }

  Body() {
    div().class("flex flex-col overflow-hidden w-full min-w-20");
    {
      // TitleBar("My Records").labels(["All Label Configured"]);
      TitleBar(this.curFilter?.name)
        .labels(this.curFilter?.labels)
        .editable(this.curFilter?.name !== this.const?.defaultFilterName);
      // div().class("flex flex-col items-center overflow-y-auto");
      // {
      //   // PresentLabelBar().labels([
      //   // ]);
      //   // for (const n of names1) {
      //   //   ItemBar(n).dataTags(["PDF", "12.5MB"]);
      //   // }

      // }
      // if (!this.storePath) {
      //   div().class("m-auto");
      //   {
      //     storePathGuide();
      //   }
      // }
      // // else if (!this.nodesCollections) {
      // //   div().class("m-auto");
      // //   {
      // //     div("No Records Found").class(
      // //       "text-sm text-gray-400 dark:text-gray-300 cursor-default"
      // //     );
      // //   }
      // // }
      // else {
      //   div().class("flex flex-col items-center overflow-y-auto");
      //   {
      //     for (const node of this.allNodes) {
      //       ItemBar(node.title).dataTags(node.labels);
      //     }
      //   }
      // }
      div().class("flex flex-col items-center overflow-y-auto h-full");
      {
        if (this.nodes!.length === 0) {
          div().class("m-auto");
          {
            div("No records found yet...").class(
              "text-sm text-gray-400 dark:text-gray-300 cursor-default"
            );
          }
        } else {
          for (const node of this.nodes!) {
            ItemBar(node.title)
              .dataTags(node.labels)
              .identifiIcon(Icon.FileContent)
              .onClick(() => {
                this.setNodeModalOpen?.(true);
                this.choosedNode = node;
              });
          }
        }
      }
    }
    NodeModalBox()
      .node(this.choosedNode!)
      .isOpen(this.nodeModalOpen!)
      .onClose(() => {
        this.setNodeModalOpen?.(false);
      });
  }
}

export default PresentRecordsArea as Pretty as Typed<PresentRecordsAreaProp>;
