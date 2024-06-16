import {
  View,
  Prop,
  required,
  div,
  Env,
  button,
  type Typed,
  type Pretty,
  th,
  input,
  textarea,
  Watch,
} from "@dlightjs/dlight";
import ConfirmButton from "../../button/confirm_button.view";
import WeakTextButton from "../../button/weak_text_button.view";
import SolidLabel from "../../label/solid_label.view";
import InvalidConfirmButton from "../../button/invalid_confirm_button.view";
import { Icon } from "../../../icon/all_icon.view";
import {
  FileRecord,
  GlobalData,
  NodeRecord,
} from "../../../app/data/global_env";
import {
  addLabelAndLinkNode,
  deleteFile,
  deleteNodeLabelLink,
  fetchAllNodes,
  fetchFile,
  fetchLabels,
  fetchNodesByLabels,
  linkNewFile,
  linkNodeToLabelReturnNew,
  updateNodeTitle,
} from "../../../app/services/cmds";
import { FileType, LabelRecord } from "../../../app/data/type";
import PDFViewer from "../../present/pdf_viewer.view";
import AudioPlayer from "../../present/audio_player.view";
import ImgShow from "../../present/img_show.view";
import NoneShow from "../../present/none_show.view";
import PresentedLabel from "../../label/presented_label.view";
import { MenuEnv } from "../../../app/data/type";
import { Position } from "../../../app/data/type";
import { Menu } from "../../../app/data/type";
import { Filter, FilterEnv } from "../../../app/data/filter_state";
import * as _ from "lodash";
import ContentEditableLabel from "../../label/content_editable_label.view";
import ToggleLabel from "../../label/toggle_label.view";
import { open } from "@tauri-apps/plugin-dialog";
import { Warnings } from "../../../app/data/type";
import { Warning } from "postcss";

interface NodeBoxProp {
  show: boolean;
  onClose: () => void;
  node: NodeRecord;
  files: FileRecord[];
  commonPathLast: string | null;
  commonPathRest: string | null;
  commonPath: string | null;
}

@View
class NodeBox implements NodeBoxProp, MenuEnv, GlobalData, FilterEnv {
  @Prop show = required;
  @Prop onClose = required;
  @Prop node: NodeRecord = required;
  @Env menu?: string | undefined;
  @Env setMenu?: (menu: string) => void | undefined;
  @Env setPosition?: (position: Position) => void | undefined;
  @Env setData?: ((data: any) => void) | undefined;
  @Env setFunctions?:
    | ((functions: Record<string, () => void>) => void)
    | undefined;
  @Env setNodes?: ((nodes: NodeRecord[]) => void) | undefined;
  @Env const?: Record<string, any> | undefined;
  @Env curFilter?: Filter | null | undefined;
  @Env setNotification?: ((notification: string) => void) | undefined;
  @Env setLabels?: ((labels: LabelRecord[]) => void) | undefined;
  @Env labels?: LabelRecord[] | undefined;

  onToggleLabels: string[] = [];
  @Prop files: FileRecord[] = [];

  // bg-[#e0e2e5] dark:bg-[#191e33]
  // bg-white dark:bg-[#191e33] dark:bg-opacity-50 bg-opacity-50
  bg_a = "bg-[#e0e2e5] dark:bg-[#191e33]";
  bd_a = "border dark:border-[#38394c] border-[#d8d8d8] rounded-lg";
  ux_a = `shadow-xl transition-all duration-300 ${this.show ? "scale-100 " : "scale-75"
    }`;
  po_a = "relative grow-0 sm:w-full sm:max-w-3xl h-full";
  @Prop commonPathLast: string | null = null;
  @Prop commonPathRest: string | null = null;
  @Prop commonPath: string | null = null;
  curMenuFile: string | null = null;
  assignableLabels: LabelRecord[] = this.labels!.filter(
    (label) => label.is_assignable
  );
  isChooseLabel: boolean = false;
  chooseZoneRef: HTMLElement | null = null;
  linksRef: HTMLElement[] = [];
  linkAddRef: HTMLElement | null = null;
  timmer: any;
  warnings: Warnings = {
    Empty: "title cannot be empty...",
    Exists: "node already exists...",
    None: "",
  };
  token: string = "None";

  whenClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (this.chooseZoneRef && !this.chooseZoneRef.contains(target)) {
      this.isChooseLabel = false;
    }
  };

  async updateFile(files: string[]) {
    this.files = [];
    for (const path of files) {
      // fetchFile(path).then((file) => {
      //   this.files.push(file);
      // });
      let file = await fetchFile(path);
      this.files.push(file);
    }
    if (this.node.linked_files.length > 1) {
      this.commonPath = this.getCommonPath(this.node.linked_files);
      this.commonPathLast = this.getLastFolderName(this.commonPath);
      this.commonPathRest = this.removeLastFolderName(this.commonPath);
    }
  }

  async willMount() {
    await this.updateFile(this.node.linked_files);
    if (this.timmer) {
      clearTimeout(this.timmer);
    }
  }

  

  

  invalidTitle(token: string) {
    if (this.timmer) {
      clearTimeout(this.timmer);
    }
    this.token = token;
    this.warnings["None"] = this.warnings[token];
    this.timmer = setTimeout(() => {
      this.token = "None";
    }, 5000);
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

  getLastFolderName(commonPath: string): string {
    const pathParts = commonPath.split("/");
    return pathParts[pathParts.length - 1] || "";
  }

  removeLastFolderName(commonPath: string): string {
    const pathParts = commonPath.split("/");
    pathParts.pop();
    return pathParts.join("/") + "/";
  }

  async updateNodes() {
    let nodes: NodeRecord[] = [];
    if (this.curFilter?.name === this.const?.defaultFilterName) {
      nodes = await fetchAllNodes();
    } else if (this.curFilter?.labels) {
      nodes = await fetchNodesByLabels(this.curFilter?.labels);
    }
    return nodes;
  }

  async addLabelAndUpdateLabels(t: string): Promise<void> {
    const labels = this.labels!.map((item) => item.title);
    if (!labels.includes(t)) {
      await addLabelAndLinkNode(t, this.node);
      fetchLabels().then((labels) => {
        this.setLabels!(labels);
      });
    } else {
      // await updateNodeLabels
      await addLabelAndLinkNode(t, this.node);
    }
    // this.curNode = await fetchNodeByHash(this.curFile!.hash);
    let nodes: NodeRecord[] = await this.updateNodes();
    this.setNodes?.(nodes);
    nodes.map((i) => {
      if (_.isEqual(i.title, this.node.title)) {
        this.node = i;
      }
    });
  }

  @Watch
  removeListener() {
    if (!this.isChooseLabel) {
      document.removeEventListener("click", this.whenClickOutside);
    }
  }

  handleLinkContext(idx: string, f: string) {
    const target = this.linksRef[Number(idx)] as HTMLElement;
    const { left, top, width, height, right, bottom } =
      target.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewprotWidth = window.innerWidth;
    this.curMenuFile = idx;
    this.setFunctions?.({
      onblur: () => {
        this.curMenuFile = null;
      },
      delete: async () => {
        console.log("delete file")
        await deleteFile((this.commonPath || "") + f);
        let nodes: NodeRecord[] = await this.updateNodes();
        this.setNodes?.(nodes);
        if (!nodes.some((i) => _.isEqual(i.title, this.node.title))) {
          this.setNotification?.(
            `${this.node.title} has no linked file, so it was deleted.`
          );
          this.onClose();
        } else {
          nodes.map(async (i) => {
            if (_.isEqual(i.title, this.node.title)) {
              this.node = i;
              console.log(i);
              await this.updateFile(i.linked_files);
            }
          });
        }
      },
    });
    this.setPosition?.({
      l: left,
      t: top,
      w: width,
      h: height,
      r: viewprotWidth - right,
      b: viewportHeight - bottom,
    });
    this.setMenu?.(Menu.FileLinkContext);
  }

  async addFile() {
    console.log("link new file");
    const files = await open({
      multiple: true,
    });
    if (!files) return;
    for (let file of files) {
      try {
        let node = await linkNewFile(file.path, this.node);
        let nodes = await this.updateNodes();
        this.setNodes?.(nodes);
        this.node = node;
        await this.updateFile(node.linked_files);
      } catch (err: any) {
        this.setNotification?.(String(err));
      }
    }
  }

  handleLinkAddContext() {
    const target = this.linkAddRef as HTMLElement;
    const { left, top, width, height, right, bottom } =
      target.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewprotWidth = window.innerWidth;
    this.setPosition?.({
      l: left,
      t: top,
      w: width,
      h: height,
      r: viewprotWidth - right,
      b: viewportHeight - bottom,
    });
    this.setMenu?.(Menu.LinkAdd);
    this.setFunctions?.({
      addFile: this.addFile,
    });
  }

  Body() {
    div()
      .class(`${this.bg_a} ${this.ux_a} ${this.po_a} ${this.bd_a} `)
      .onClick((e) => e.stopPropagation());
    {
      div().class("flex flex-col h-full py-6 px-8 gap-4");
      {
        div().class("flex items-center");
        {
          div().class("flex items-center");
          {
            Icon.Nodes().size(24);
            Icon.ChevronRight().class("mx-2");
          }
          div().class("relative");
          {
            div(this.node.title)
              .class(
                "text-[14px] text-black/70 dark:text-white/80 font-semibold text-left long-string w-full min-w-[10px]"
              )
              .contentEditable("true")
              .onKeyDown((e) => {
                const target = e.target as HTMLElement;
                if (e.key === "Enter") {
                  e.preventDefault();
                  target.blur();
                }
              })
              .onBlur((e) => {
                const target = e.target as HTMLElement;
                if (target.textContent?.trim() === "") {
                  target.textContent = this.node!.title;
                  // this.titleWarning = "title cannot be empty...";
                  this.invalidTitle("Empty");
                } else if (target.textContent!.trim() !== this.node!.title) {
                  updateNodeTitle(this.node!.title, target.textContent!.trim())
                    .then(async () => {
                      this.node!.title = target.textContent!.trim();
                      let nodes = await this.updateNodes();
                      this.setNodes?.(nodes);
                    })
                    .catch(() => {
                      // this.titleWarning = "title already exists...";
                      this.invalidTitle("Exists");
                      target.textContent = this.node!.title;
                    });
                }
              });
            // TODO 添加命名构造器的指示
            div().class(
              this.token !== "None"
                ? "absolute cursor-default flex items-center transition duration-300 opacity-100"
                : "absolute cursor-default flex items-center transition duration-300 opacity-0"
            );
            {
              Icon.CircleInfo()
                .lightColor("#eb001c")
                .darkColor("#ff0825")
                .size(10);
              div().class("w-1");
              div(this.warnings[this.token]).class(
                "text-[10px] opacity-60 text-nowrap"
              );
            }
          }
        }
        div().class(
          "overflow-auto scroll-able modalbox-content mt-2 h-full flex flex-col gap-4"
        );
        {
          div().class("grid grid-cols-12 gap-x-2 gap-y-4 text-left");
          {
            div().class("col-span-1 py-0.5");
            {
              div("Trait").class(
                " text-[13px] mt-0.5 text-[#5c5c5e] dark:text-[#969799] cursor-default"
              );
            }
            div().class("col-span-11 flex flex-col gap-1");
            {
              div().class("flex flex-wrap gap-1");
              {
                for (const l of this.node.labels) {
                  PresentedLabel(l);
                }
                div()
                  .class(
                    "flex items-center px-1 opacity-60 hover:opacity-90 hover:bg-[var(--light-bg-tertiary)] dark:hover:bg-[var(--dark-bg-gray-a)] rounded-md transition duration-300 border border-transparent hover:border-gray-300 hover:dark:border-[#494b65]"
                  )
                  .onClick(() => {
                    this.isChooseLabel = !this.isChooseLabel;
                    if (this.isChooseLabel) {
                      document.addEventListener("click", this.whenClickOutside);
                    }
                  });
                {
                  Icon.Dots().size(14).passClick(true);
                }
              }
              div()
                .class(
                  this.isChooseLabel
                    ? "flex flex-wrap gap-1 bg-[#f0f0f0] dark:bg-[#2a3146] rounded-md p-4"
                    : "hidden"
                )
                .ref((r) => (this.chooseZoneRef = r));
              {
                ContentEditableLabel("Add Label")
                  .leftIcon(Icon.Plus)
                  .blurFn(this.addLabelAndUpdateLabels);
                for (let label of this.assignableLabels) {
                  ToggleLabel(label.title)
                    .toggle(this.node!.labels.includes(label.title))
                    .onToggle(() => {
                      linkNodeToLabelReturnNew(
                        this.node!,
                        label
                      ).then(async (node) => {
                        this.node = node;
                        const nodes = await this.updateNodes();
                        this.setNodes?.(nodes);
                      });
                    })
                    .disToggle(() => {
                      deleteNodeLabelLink(this.node!.title, label.title).then(
                        async (node) => {
                          this.node = node;
                          const nodes = await this.updateNodes();
                          this.setNodes?.(nodes);
                        }
                      );
                    });
                }
              }
            }
            div().class("col-span-1 flex flex-col gap-1");
            {
              if (this.commonPath) {
                div("hod").class("text-[10px] opacity-0");
              }
              div("Links").class(
                "text-[13px] py-1 text-[#5c5c5e] dark:text-[#969799] cursor-default"
              );
            }
            div().class("col-span-11 flex flex-col gap-1 pr-2");
            {
              if (this.commonPath) {
                div(this.commonPath).class(
                  "text-[10px] opacity-60 text-[#2e2e2e] dark:text-[#dadbe8] px-2"
                );
              }
              div().class("flex flex-wrap gap-1");
              {
                for (const [idx, f] of Object.entries(
                  this.node.linked_files.map((f) => {
                    return this.commonPath ? f.replace(this.commonPath, "") : f;
                  })
                )) {
                  div().class("relative group");
                  {
                    div(f).class(
                      idx === this.curMenuFile
                        ? "text-[13px] opacity-100 text-[#2e2e2e] dark:text-[#dadbe8] bg-zinc-300 dark:bg-[#2a3146] rounded-md px-2 py-1 cursor-default transition duration-300 relative"
                        : "text-[13px] opacity-80 hover:opacity-100 group-hover:opacity-100 text-[#2e2e2e] dark:text-[#dadbe8] bg-zinc-300 dark:bg-[#2a3146] rounded-md px-2 py-1 cursor-default transition duration-300 relative"
                    );

                    div()
                      .class(
                        idx === this.curMenuFile
                          ? "absolute right-0 top-0 px-0.5 py-1 opacity-100 bg-[#bfbfc2] dark:bg-[#2e364d] rounded-md m-[1px] h-[26px] flex items-center z-10"
                          : "absolute right-0 top-0 bg-zinc-300 dark:bg-[#2a3146] px-0.5 py-1 opacity-0 group-hover:opacity-100 hover:bg-[#bfbfc2] dark:hover:bg-[#333B55] rounded-md m-[1px] transition duration-300 h-[26px] flex items-center z-10"
                      )
                      .ref((ref) => {
                        this.linksRef.push(ref);
                      })
                      .onClick((e: MouseEvent) => {
                        this.handleLinkContext(idx, f);
                      });
                    {
                      Icon.DotsVertical().size(14).passClick(true);
                    }
                  }
                }
                div()
                  .class(
                    this.menu === Menu.LinkAdd
                      ? "flex items-center justify-center w-[27px] min-h-[27px] opacity-100 bg-zinc-300 dark:bg-[#2a3146] rounded-md"
                      : "flex items-center justify-center w-[27px] min-h-[27px] opacity-60 hover:opacity-100 hover:bg-zinc-300 dark:hover:bg-[#2a3146] rounded-md transition duration-300"
                  )
                  .ref((r) => (this.linkAddRef = r))
                  .onClick(() => {
                    this.handleLinkAddContext();
                  });
                {
                  Icon.Plus().size(12).passClick(true);
                }
              }
            }
          }

          if (
            !this.files.some((file) =>
              [FileType.PDF, FileType.Audio, FileType.Image].includes(
                file.logo as FileType
              )
            )
          ) {

            if (this.files.length === 1) {
              NoneShow("No preview for this file.");
            } else {
              NoneShow("No preview for these files.");
            }
          } else {
            for (const file of this.files) {
              switch (file.logo) {
                case FileType.PDF:
                  // PDFViewer(file.path);
                  break;
                case FileType.Audio:
                  AudioPlayer(file.path).transparent(false);
                  break;
                case FileType.Image:
                  ImgShow(file.path);
                  break;
              }
            }
          }
        }
      }
    }
  }
}

export default NodeBox as Pretty as Typed<NodeBoxProp>;
