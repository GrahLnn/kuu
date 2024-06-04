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
  use,
  br,
  Watch,
  object,
} from "@dlightjs/dlight";
import ItemBar from "../../component/bar/item_bar.view";
import { Icon } from "../../icon/all_icon.view";
import MagneticButton from "../../component/button/magnetic_button.view";
import ToggleLabel from "../../component/label/toggle_label.view";
import { ImportHistory, LabelRecord, Menu, MenuEnv } from "../data/type";
import { Position } from "../data/type";
import { TransformPosition } from "../data/type";
import {
  FileRecord,
  GlobalData,
  NodeRecord,
  ConfirmFileRecord,
} from "../data/global_env";
import { HistoryState } from "../data/type";
import { open } from "@tauri-apps/plugin-dialog";
import NormalButton from "../../component/button/normal_button.view";
import {
  addLabelAndLinkNode,
  deleteNodeLabelLink,
  fetchPreFiles,
  importFile,
  getPdfBase64,
  linkNodeToLabelReturnNew,
  updateNodeTitle,
  importFileWithLabels,
  addNewLabel,
} from "../services/cmds";
import { formatString } from "../data/utils";

import ImgViewer from "../../component/file_viewer/img_viewer.view";
import AudioPlayer from "../../component/present/audio_player.view";
import PDFViewer from "../../component/present/pdf_viewer.view";
import { FileType, getFileType } from "../data/type";
import WeakTextButton from "../../component/button/weak_text_button.view";
import ConfirmButton from "../../component/button/confirm_button.view";
import StateItemBar from "../../component/bar/state_item_bar.view";
import FnDashEditableLabel from "../../component/label/content_editable_label.view";
import { getFormattedCurrentTime } from "../../utils/time";
import PresentedLabel from "../../component/label/presented_label.view";
import { fetchNodeByHash, fetchLabels } from "../services/cmds";
import NoneShow from "../../component/present/none_show.view";
import { fetchImgBase64 } from "../services/cmds";
import ImgShow from "../../component/present/img_show.view";
import * as _ from "lodash";
import TypedButton from "../../component/button/typed_button.view";
import SlidingDataLabel from "../../component/label/sliding_data_label.view";
import DeletableLabel from "../../component/label/deletable_label.view";
import EditableLabel from "../../component/label/editable_label.view";

interface ToolAreaProps {}

interface ToolState {
  [key: string]: string;
}

@View
class ToolArea implements ToolAreaProps, GlobalData {
  @Env labels?: LabelRecord[] | undefined;
  @Env setLabels?: ((labels: LabelRecord[]) => void) | undefined;
  @Env setNotification?: ((notification: string) => void) | undefined;

  @Snippet
  leftToolBar() {
    div().class("flex px-4 gap-2 py-2 overflow-hidden shrink-0");
    {
      div().class("relative w-full flex items-center gap-2");
      {
        Icon.GlobeSerach()
          .size(18)
          .lightColor("#848484")
          .darkColor("#fbfbfb")
          .class("absolute left-2 transform -translate-y-1/2 opacity-80");
        input()
          .class(
            "w-full block rounded-lg bg-zinc-200/80 dark:bg-[#2a3146] pl-8 pr-2 py-1 cursor-text"
          )
          .type("text")
          .placeholder("clone from git...");
      }
    }
  }

  @Snippet
  leftPart() {
    div().class(
      "w-[296px] grow-0 shrink-0 bg-gray-100 dark:bg-[var(--dark-bg-blue-primary)] flex flex-col border-r border-[#edf0f3] dark:border-[#212234] py-[1px]"
    );
    {
      this.leftToolBar();
    }
  }

  @Snippet
  rightPannel() {
    div().class(
      "w-full bg-gray-200 dark:bg-[var(--dark-bg-blue-primary)] flex flex-col gap-2 overflow-none"
    );
    {
      div().class(
        "flex py-2 px-4 justify-between items-center border-b border-[#edf0f3] dark:border-[#212234] bg-gray-100 dark:bg-[var(--dark-bg-blue-primary)]"
      );
      {
        div();
        {
        }
        div();
        {
          TypedButton("Display");
          {
            Icon.Sliders();
          }
        }
      }
    }
  }

  Body() {
    div().class("flex grow");
    {
      this.leftPart();
      this.rightPannel();
    }
  }
}
export default ToolArea as Pretty as Typed<ToolAreaProps>;
