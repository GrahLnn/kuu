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
  iframe,
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
  genFileFromFolder,
  justImportFile,
} from "../services/cmds";
import { formatString, shuffleArray } from "../data/utils";

import ImgViewer from "../../component/file_viewer/img_viewer.view";
import AudioPlayer from "../../component/present/audio_player.view";
import PDFViewer from "../../component/present/pdf_viewer.view";
import { FileType, getFileType } from "../data/type";
import WeakTextButton from "../../component/button/weak_text_button.view";
import ConfirmButton from "../../component/button/confirm_button.view";
import StateItemBar from "../../component/bar/state_item_bar.view";
import ContentEditableLabel from "../../component/label/content_editable_label.view";
import { getFormattedCurrentTime } from "../../utils/time";
import PresentedLabel from "../../component/label/presented_label.view";
import { fetchNodeByHash, fetchLabels } from "../services/cmds";
import NoneShow from "../../component/present/none_show.view";
import { fetchImgBase64 } from "../services/cmds";
import ImgShow from "../../component/present/img_show.view";
import * as _ from "lodash";
import { isIgnored } from "../data/utils";

interface ImportAreaProps {}

@View
class ImportArea implements ImportAreaProps, MenuEnv, GlobalData {
  @Env menu?: string | undefined;
  @Env labels?: LabelRecord[] | undefined;
  @Env setLabels?: ((labels: LabelRecord[]) => void) | undefined;
  @Env setMenu?: (menu: string) => void | undefined;
  @Env setPosition?: (position: Position) => void | undefined;
  @Env setTransform?: (position: TransformPosition) => void | undefined;
  @Env setOffsetX?: ((offsetX: number | null) => void) | undefined;
  @Env importHistory?: ImportHistory | undefined;
  @Env unshiftToNow?: ((record: ConfirmFileRecord) => void) | undefined;

  allImportHistory: ConfirmFileRecord[] = [];
  assignableLabels: LabelRecord[] = this.labels!.filter(
    (label) => label.is_assignable
  );

  willMount() {
    for (const [interval, items] of Object.entries(this.importHistory!)) {
      this.allImportHistory.push(...items);
    }
  }

  async addLabelAndUpdateLabels(t: string): Promise<void> {
    const labels = this.labels!.map((item) => item.title);
    if (!labels.includes(t)) {
      await addLabelAndLinkNode(t, this.curNode!.title);
      fetchLabels().then((labels) => {
        this.setLabels!(labels);
      });
    } else {
      await addLabelAndLinkNode(t, this.curNode!.title);
    }
    this.curNode = await fetchNodeByHash(this.curFile!.hash);
  }

  img64: String[] = [];
  curFile: ConfirmFileRecord | null = null;
  curNode: NodeRecord | null = null;

  async handleFileUpload() {
    const files = await open({
      multiple: true,
    });
    if (!files) return;
    // let lastRes: any = null;
    let resFile: ConfirmFileRecord | null = null;
    for (let file of files) {
      try {
        const res = await importFile(file.path);

        this.curNode = res[1];
        resFile = {
          ...res[0],
          confirm: this.curNode ? true : false,
          time: getFormattedCurrentTime(),
        };

        this.unshiftToNow!(resFile!);
        this.allImportHistory.unshift(resFile!);
      } catch (err) {
        console.log(err);
      }
    }
    this.curFile = resFile;

    const labels = await fetchLabels();
    this.setLabels!(labels);
  }

  async processFiles(concurrentFiles: any) {
    const importPromises = concurrentFiles.map(async (file: any) => {
      let resFile;
      if (!file.exist) {
        const { exist, ...rest } = file;
        await justImportFile(rest);
        resFile = {
          ...rest,
          confirm: true,
          time: getFormattedCurrentTime(),
        };
      } else {
        console.log(file.exist);
        const { exist, ...rest } = file;
        resFile = {
          ...rest,
          confirm: false,
          time: getFormattedCurrentTime(),
        };
      }
      this.unshiftToNow!(resFile!);
      this.allImportHistory.unshift(resFile!);
    });

    await Promise.all(importPromises);
  }

  async handleFolderUpload() {
    const folderPath = await open({
      directory: true,
    });
    if (!folderPath) return;
    // const prefiles = await fetchPreFiles(folderPath);
    // const files = prefiles.filter((file) => !isIgnored(file.path));
    // let resFile: ConfirmFileRecord | null = null;
    // for (let file of files) {
    //   try {
    //     const now = new Date().getTime();
    //     const res = await importFileWithLabels(file.path, file.folders);
    //     console.log(new Date().getTime() - now);
    //     this.curNode = res[1];
    //     resFile = {
    //       ...res[0],
    //       confirm: this.curNode ? true : false,
    //       time: getFormattedCurrentTime(),
    //     };

    //     this.unshiftToNow!(resFile!);
    //     this.allImportHistory.unshift(resFile!);

    //     const labels = await fetchLabels();
    //     this.setLabels!(labels);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // }
    // this.curFile = resFile;
    let res = await genFileFromFolder(folderPath);
    console.log(res);
    let exist = res[1].map((file) => ({
      ...file,
      exist: true,
    }));
    console.log(exist);
    let newFiles = res[0].map((file) => ({
      ...file,
      exist: false,
    }));
    let combinedFiles = shuffleArray([...exist, ...newFiles]);
    let resFile: ConfirmFileRecord | null = null;
    for (let file of combinedFiles) {
      if (!file.exist) {
        const { exist, ...rest } = file;
        await justImportFile(rest);
        resFile = {
          ...rest,
          confirm: true,
          time: getFormattedCurrentTime(),
        };
        this.unshiftToNow!(resFile!);
        this.allImportHistory.unshift(resFile!);
      } else {
        console.log(file.exist);
        const { exist, ...rest } = file;
        resFile = {
          ...rest,
          confirm: false,
          time: getFormattedCurrentTime(),
        };
        this.unshiftToNow!(resFile!);
        this.allImportHistory.unshift(resFile!);
      }
    }
    // await this.processFiles(combinedFiles);
    const labels = await fetchLabels();
    this.setLabels!(labels);
  }

  @Snippet
  historyItem({
    content,
    isCur,
    tags,
    onClick,
  }: {
    content: string;
    isCur: boolean;
    tags: string[];
    onClick: () => void;
  }) {
    ItemBar(content)
      .dataTags(tags)
      .identifiIcon(Icon.FileContent)
      .toggleOn(isCur)
      .indicator(isCur ? Icon.ArrowRight : null)
      .onClick(onClick)
      .mainClass("cursor-default");
  }

  @Snippet
  importButton({ icon, fn }: { icon: any; fn: () => void }) {
    div()
      .class(
        "p-1.5 bg-zinc-200 dark:bg-[#2a3146] hover:bg-zinc-300 dark:hover:bg-[#2a3146] transition opacity-80 hover:opacity-100"
      )
      .onClick(fn);
    {
      icon()
        .size(18)
        .lightColor("#666666")
        .darkColor("#fafafa")
        .passClick(true);
    }
  }

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
            "w-full block rounded-lg bg-zinc-200/80 dark:bg-[#2a3146] pl-8 pr-2 py-1 cursor-default"
          )
          .type("text")
          .placeholder("from url...");
      }

      div().class("flex shrink-0 rounded-lg overflow-hidden");
      {
        // @ts-ignore
        this.importButton().icon(Icon.FilePlus).fn(this.handleFileUpload);
        // @ts-ignore
        this.importButton()
          // @ts-ignore
          .icon(Icon.FolderPlus)
          .fn(this.handleFolderUpload);
      }
    }
  }

  @Snippet
  webWindow() {}

  @Snippet
  history() {
    if (this.allImportHistory.length > 0) {
      div().class("flex flex-col overflow-auto");
      {
        for (const [interval, items] of Object.entries(this.importHistory!)) {
          if (items.length > 0) {
            div(interval).class(
              "text-left w-full text-[12px] text-[#909295]  transition font-semibold px-4 mt-1 fade-in cursor-default"
            );
            for (const record of items) {
              if (record.confirm) {
                // @ts-ignore
                this.historyItem(record.stem)
                  // @ts-ignore
                  // .isCur(record === this.curFile)
                  .isCur(_.isEqual(record, this.curFile))
                  .tags(
                    record.ext !== ""
                      ? [record.size, record.ext, record.time]
                      : [record.size, record.time]
                  )
                  .onClick(async () => {
                    console.log(
                      this.curFile,
                      record,
                      _.isEqual(record, this.curFile)
                    );
                    this.curFile = record;
                    this.curNode = await fetchNodeByHash(record.hash);
                    this.isTitleFocus = false;
                  });
              } else {
                StateItemBar(record.name)
                  .dataTags(["File Alerady Stored", record.time])
                  .indicator(Icon.CircleInfo)
                  .state("warning");
              }
            }
            div().class("h-2 shrink-0");
          }
        }
      }
    } else {
      div("Drag file or folder here or click the add button to import.").class(
        "flex items-center justify-center flex-grow text-center dark:text-[#fefefe] text-[#676769] text-[12px] px-4 fade-in"
      );
    }
  }

  @Snippet
  leftPart() {
    div().class(
      "w-[296px] grow-0 shrink-0 bg-gray-100 dark:bg-[var(--dark-bg-blue-primary)] flex flex-col border-r border-[#edf0f3] dark:border-[#212234]"
    );
    {
      this.leftToolBar();
      this.history();
    }
  }
  labelRef: any = null;
  showLabels: boolean = false;
  inTarget: boolean = false;
  timeout: any = null;
  subMenuAnime: string = "";
  isTitleFocus: boolean = false;

  @Snippet
  labelChooseZone() {
    div()
      .class(
        this.showLabels
          ? `block absolute top-[100%] left-0 rounded-lg w-full ${this.subMenuAnime} bg-[#fcfcfc] dark:bg-[var(--dark-bg-blue-quaternary)] shadow-lg p-6 flex flex-wrap gap-2 z-10 transition border border-[#edf0f3] dark:border-[#212234]`
          : "hidden"
      )
      .onMouseEnter(() => {
        this.inTarget = true;
      })
      .onMouseLeave(() => {
        this.inTarget = false;
      });
    {
      if (this.assignableLabels.length || 0 > 0) {
        for (let label of this.assignableLabels) {
          ToggleLabel(label.title)
            .toggle(this.curNode!.labels.includes(label.title))
            .onToggle(() => {
              linkNodeToLabelReturnNew(this.curNode!.title, label.title).then(
                (node) => {
                  this.curNode = node;
                }
              );
            })
            .disToggle(() => {
              deleteNodeLabelLink(this.curNode!.title, label.title).then(
                (node) => {
                  this.curNode = node;
                }
              );
            });
        }
      } else {
        div("No Label Available. Try add some ...").class(
          "text-[12px] text-[#676769] dark:text-white/70 cursor-default fade-in"
        );
      }
    }
  }

  @Snippet
  presentFile() {
    if (this.curFile && this.curNode) {
      div().class("flex flex-col grow items-center p-2 gap-2");
      {
        Icon.Nodes().size(22).lightColor("#666666").darkColor("#fafafa");
        div(this.curNode.title).class(
          "text-[#676769] dark:text-white/90 text-[14px] transition font-semibold px-4 mt-2 py-1 rounded-lg cursor-default"
        );
        // .class(
        //   this.isTitleFocus
        //     ? "text-[#676769] dark:text-white/90 text-[14px] transition font-semibold px-4 mt-2 bg-white dark:bg-[var(--dark-bg-blue-quaternary)] py-1 rounded-lg shadow-md hover:shadow-lg cursor-text"
        //     : "text-[#676769] dark:text-white/90 text-[14px] transition font-semibold px-4 mt-2 hover:bg-white dark:hover:bg-[var(--dark-bg-blue-quaternary)] py-1 rounded-lg hover:shadow-md cursor-text"
        // )
        // .contentEditable("true")
        // .onFocus(() => {
        //   this.isTitleFocus = true;
        // })
        // .onBlur((e) => {
        // const target = e.target as HTMLElement;
        // if (target.textContent?.trim() === "") {
        //   target.textContent = this.curNode!.title;
        // } else {
        //   this.isTitleFocus = false;
        //   updateNodeTitle(this.curNode!.title, target.textContent!.trim())
        //     .then(() => {
        //       this.curNode!.title = target.textContent!.trim();
        //     })
        //     .catch(() => {
        //       target.textContent = this.curNode!.title;
        //     });
        //   }
        // })
        // .onKeyDown((e: KeyboardEvent) => {
        //   if (e.key === "Enter") {
        //     const target = e.target as HTMLElement;
        //     e.preventDefault();
        //     target.blur();
        //   }
        // });
        div()
          .class("flex flex-col relative w-full")
          .onMouseEnter(() => {
            this.inTarget = true;
          })
          .onMouseLeave(() => {
            this.subMenuAnime = "fade-out";
            setTimeout(() => {
              this.showLabels = false;
            }, 200);
          });
        {
          div().class("flex justify-center pb-2");
          {
            div()
              .class("flex gap-1 flex-wrap items-center justify-center shrink")
              .onMouseEnter(() => {
                this.subMenuAnime = "fade-in";
                this.timeout = setTimeout(() => {
                  this.showLabels = true;
                }, 300);
              })
              .onMouseLeave(() => {
                clearTimeout(this.timeout);
              });
            {
              for (let label of this.curNode?.labels || []) {
                PresentedLabel(label);
              }
              ContentEditableLabel("Add Label")
                .leftIcon(Icon.Plus)
                .blurFn(this.addLabelAndUpdateLabels);
            }
          }
          this.labelChooseZone();
        }
        if (this.curFile.logo === FileType.PDF) {
          PDFViewer(this.curFile.path);
        } else if (this.curFile.logo === FileType.Audio) {
          AudioPlayer(this.curFile.path);
        } else if (this.curFile.logo === FileType.Image) {
          ImgShow(this.curFile.path);
        } else {
          NoneShow("No Preview Available for this file.");
        }
      }
    }
  }

  @Snippet
  configItem({ content }: { content: string }) {
    div(content).class(
      "text-left w-full text-[12px] dark:opacity-60 opacity-60 dark:text-white text-[#676769] transition font-semibold px-4 mt-4"
    );
  }

  @Snippet
  rightPannel() {
    div().class(
      "w-full bg-gray-200 dark:bg-[var(--dark-bg-blue-primary)] p-4 flex flex-col gap-2 overflow-none"
    );
    {
      this.presentFile();
      // iframe()
      //   .src("https://ralphammer.com/make-me-think/")
      //   .class("w-full h-full");
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
export default ImportArea as Pretty as Typed<ImportAreaProps>;
