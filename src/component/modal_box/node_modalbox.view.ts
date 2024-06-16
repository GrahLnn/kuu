import {
  View,
  Prop,
  required,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";
import ModalBoxFrame from "./skeleton/box_frame.view";
import FilterChooseBox from "./components/filter_choose_box.view";
import NodeBox from "./components/node_box.view";
import { FileRecord, NodeRecord } from "../../app/data/global_env";
import { fetchFile } from "../../app/services/cmds";

interface NodeModalBoxProp {
  isOpen: boolean;
  onClose: () => void;
  node: NodeRecord;
}

@View
class NodeModalBox implements NodeModalBoxProp {
  @Prop isOpen = required;
  @Prop onClose = required;
  @Prop node = required;

  show = false;

  files: FileRecord[] = [];
  commonPath: string | null = null;
  commonPathLast: string | null = null;
  commonPathRest: string | null = null;

  async updateFile(files: string[]) {
    this.files = [];
    for (const path of files) {
      let file = await fetchFile(path);
      this.files.push(file);
    }

    if (this.node.linked_files.length > 1) {
      this.commonPath = this.getCommonPath(this.node.linked_files);
      this.commonPathLast = this.getLastFolderName(this.commonPath);
      this.commonPathRest = this.removeLastFolderName(this.commonPath);
    }
  }

  getLastFolderName(commonPath: string): string {
    const pathParts = commonPath.split("/");
    return pathParts[pathParts.length - 1] || "";
  }

  removeLastFolderName(commonPath: string): string {
    const pathParts = commonPath.split("/");
    pathParts.pop();
    return pathParts.join("/") + "/";
  }

  getCommonPath(paths: string[]): string {
    if (paths.length === 0) return "";
    const splitPaths = paths.map((path) => path.split("/"));
    const commonPathParts = [];
    for (let i = 0; i < splitPaths[0].length; i++) {
      const part = splitPaths[0][i];
      if (splitPaths.every((pathParts) => pathParts[i] === part)) {
        commonPathParts.push(part);
      } else {
        break;
      }
    }
    if (commonPathParts.length === 0) {
      return "";
    }
    return commonPathParts.join("/") + "/";
  }

  async willMount() {
    if (!this.node) return;
    await this.updateFile(this.node.linked_files);
  }

  Body() {
    ModalBoxFrame()
      .useCol(true)
      .isOpen(this.isOpen)
      .onClose(this.onClose)
      .show(this.show)
      .handleShow((v) => {
        this.show = v;
      });
    {
      NodeBox()
        .show(this.show)
        .node(this.node)
        .files(this.files)
        .commonPath(this.commonPath)
        .commonPathLast(this.commonPathLast)
        .commonPathRest(this.commonPathRest)
        .onClose(() => {
          this.show = false;
          setTimeout(this.onClose, 300);
        });
    }
  }
}

export default NodeModalBox as Pretty as Typed<NodeModalBoxProp>;
