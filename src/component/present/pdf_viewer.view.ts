import {
  View,
  ContentProp,
  required,
  div,
  type Typed,
  type Pretty,
  Content,
  canvas,
  Snippet
} from "@dlightjs/dlight";
import 'pdfjs-dist/web/pdf_viewer.css';
import { convertFileSrc } from '@tauri-apps/api/core';
//@ts-ignore
import * as pdfjsLib from '../../mod/pdf.mjs';
import { Icon } from "../../icon/all_icon.view";

interface PDFViewerProp {
  src: ContentProp<string>;
}

@View
class PDFViewer implements PDFViewerProp {
  @Content src: ContentProp<string> = required;
  assetUrl = convertFileSrc(this.src);
  canvasRef: HTMLCanvasElement | null = null;
  wrapperRef: HTMLDivElement | null = null;
  contentRef: HTMLDivElement | null = null;
  pageCnt = 0;
  curPage = 1;

  async didMount() {
    const canvas = this.canvasRef!;
    const ctx = canvas.getContext('2d');

    pdfjsLib.GlobalWorkerOptions.workerSrc = '../../src/mod/pdf.worker.mjs';
    pdfjsLib.getDocument(this.assetUrl).promise.then((pdf: any) => {
      pdf.getPage(1).then((page: any) => {
        this.pageCnt = pdf.numPages;
        this.renderPage(page, canvas, ctx!);
      });
    });

    // 监听 contentRef 大小变化
    const resizeObserver = new ResizeObserver(() => {
      this.doResize();
    });
    resizeObserver.observe(this.contentRef!);

    // 初始缩放
    this.doResize();
  }

  onPrePage() {
    if (this.curPage <= 1) return;
    const canvas = this.canvasRef!;
    const ctx = canvas.getContext('2d');

    pdfjsLib.getDocument(this.assetUrl).promise.then((pdf: any) => {
      pdf.getPage(this.curPage - 1).then((page: any) => {
        this.renderPage(page, canvas, ctx!);
        this.curPage -= 1;
      });
    });
  }

  onNextPage() {
    if (this.curPage >= this.pageCnt) return;
    const canvas = this.canvasRef!;
    const ctx = canvas.getContext('2d');

    pdfjsLib.getDocument(this.assetUrl).promise.then((pdf: any) => {
      pdf.getPage(this.curPage + 1).then((page: any) => {
        this.renderPage(page, canvas, ctx!);
        this.curPage += 1;
      });
    });
  }

  renderPage(page: any, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    const viewport = page.getViewport({ scale: 1 });

    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({
      canvasContext: ctx,
      viewport: viewport
    });
  }

  @Snippet
  ctrlButton({ icon, onClick }: { icon: any; onClick: () => void }) {
    div()
      .class(
        "rounded-md opacity-60 hover:opacity-80 transition hover:bg-gray-200 p-1 dark:hover:bg-white/10 "
      )
      .onClick(onClick);
    {
      icon()
        .size(20)
        .lightColor("#666666")
        .darkColor("#fafafa")
        .passClick(true);
    }
  }

  @Snippet
  ctrlPannel() {
    div().class(
      "flex items-center justify-center gap-8 hover:bg-white/70 dark:hover:bg-white/10 rounded-lg px-6 py-1 hover:shadow-lg transition duration-500"
    );
    {
      // @ts-ignore
      this.ctrlButton().icon(Icon.MediaPrevious).onClick(this.onPrePage);

      div(`${this.curPage}/${this.pageCnt}`).class("text-md");

      // @ts-ignore
      this.ctrlButton().icon(Icon.MediaNext).onClick(this.onNextPage);
    }
  }

  doResize() {
    const cont = this.contentRef!;
    const wrap = this.wrapperRef!;
    const widthScale = wrap.clientWidth / cont.clientWidth;
    const heightScale = (wrap.clientHeight) / cont.clientHeight
    const scale = Math.min(widthScale, heightScale);
    cont.style.transform = `scale(${scale})`;
    console.log(widthScale, heightScale, scale);
    cont.style.transformOrigin = 'top';
  }

  Body() {
    div().class("flex flex-col");
    {
      div().ref((r) => {
        this.wrapperRef = r;
      }).class("h-[500px]");
      {
        div().ref((r) => {
          this.contentRef = r;
        }).class("flex justify-center items-center p-4");
        {
          canvas().class("relative").ref((r) => {
            this.canvasRef = r;
          });
        }

      }
      this.ctrlPannel();
    }
  }
}

export default PDFViewer as Pretty as Typed<PDFViewerProp>;
