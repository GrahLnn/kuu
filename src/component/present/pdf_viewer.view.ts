import {
  View,
  ContentProp,
  required,
  div,
  type Typed,
  type Pretty,
  Content,
  canvas,
  Snippet,
} from "@dlightjs/dlight";
import "pdfjs-dist/web/pdf_viewer.css";
import { convertFileSrc } from "@tauri-apps/api/core";
//@ts-ignore
import * as pdfjsLib from "../../mod/pdf.mjs";
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
  canvas2Ref: HTMLCanvasElement | null = null;
  wrapper2Ref: HTMLDivElement | null = null;
  content2Ref: HTMLDivElement | null = null;
  pageCnt = 0;
  curPage = 1;
  pdf: any = null;
  pageCache: Map<number, any> = new Map();

  async didMount() {
    const canvas = this.canvasRef!;
    const ctx = canvas.getContext("2d");
    const canvas2 = this.canvas2Ref!;
    const ctx2 = canvas2.getContext("2d");

    pdfjsLib.GlobalWorkerOptions.workerSrc = "../../src/mod/pdf.worker.mjs";
    this.pdf = await pdfjsLib.getDocument(this.assetUrl).promise;
    this.pageCnt = this.pdf.numPages;

    // Load first two pages
    const page1 = await this.pdf.getPage(1);
    this.pageCache.set(1, page1);
    this.renderPage(page1, canvas, ctx!);

    if (this.pageCnt > 1) {
      const page2 = await this.pdf.getPage(2);
      this.pageCache.set(2, page2);
      this.renderPage(page2, canvas2, ctx2!);
    }

    // 监听 contentRef 大小变化
    // const resizeObserver = new ResizeObserver(() => {
    //   this.doResize();
    // });
    // resizeObserver.observe(this.contentRef!);

    // 初始缩放
    this.doResize();
  }

  async onPrePage() {
    if (this.curPage <= 1) return;
    this.curPage -= 2;
    await this.loadAndRenderPages();
  }

  async onNextPage() {
    if (this.curPage + 2 > this.pageCnt) return;
    this.curPage += 2;
    await this.loadAndRenderPages();
  }

  async loadAndRenderPages() {
    const canvas = this.canvasRef!;
    const ctx = canvas.getContext("2d");
    const canvas2 = this.canvas2Ref!;
    const ctx2 = canvas2.getContext("2d");

    let page1 = this.pageCache.get(this.curPage);
    if (!page1) {
      page1 = await this.pdf.getPage(this.curPage);
      this.pageCache.set(this.curPage, page1);
    }
    this.renderPage(page1, canvas, ctx!);

    if (this.curPage + 1 <= this.pageCnt) {
      let page2 = this.pageCache.get(this.curPage + 1);
      if (!page2) {
        page2 = await this.pdf.getPage(this.curPage + 1);
        this.pageCache.set(this.curPage + 1, page2);
      }
      this.renderPage(page2, canvas2, ctx2!);
    } else {
      ctx2!.clearRect(0, 0, canvas2.width, canvas2.height); // Clear second canvas if no second page
    }
  }

  renderPage(
    page: any,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D
  ) {
    const viewport = page.getViewport({ scale: 1 });

    canvas.height = viewport.height;
    canvas.width = viewport.width;
    page.render({
      canvasContext: ctx,
      viewport: viewport,
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

  doResize() {
    const cont = this.contentRef!;
    const wrap = this.wrapperRef!;

    const widthScale = wrap.clientWidth / cont.clientWidth;
    const heightScale = 500 / cont.clientHeight;
    const scale = Math.min(widthScale, heightScale);
    const scaledHeight = cont.clientHeight * scale;
    console.log(
      "scale",
      scale,
      this.canvasRef!.width + this.canvas2Ref!.width,
      cont.clientWidth,
      cont.clientHeight,
      cont.clientHeight * scale,
      scaledHeight
    );
    cont.style.transform = `scale(${scale})`;
    // cont.style.transformOrigin = "top";

    // 设置 wrap 的高度
    wrap.style.height = `${scaledHeight}px`;
  }

  @Snippet
  ctrlPannel() {
    div().class(
      "flex items-center justify-center gap-8 hover:bg-white/70 dark:hover:bg-white/10 rounded-lg px-6 py-1 hover:shadow-lg transition duration-500"
    );
    {
      // @ts-ignore
      this.ctrlButton()
        // @ts-ignore
        .icon(Icon.arrowBoldLeftFromLine)
        .onClick(this.onPrePage);
      div().class("flex items-center gap-2");
      {
        div(`${this.curPage}`).class(
          "text-[14px] text-black/70 dark:text-white/80 font-semibold"
        );
        div(`(${this.pageCnt})`).class(
          "text-[8px] text-black/70 dark:text-white/80 "
        );
        if (this.curPage + 1 <= this.pageCnt) {
          div(`${this.curPage + 1}`).class(
            "text-[14px] text-black/70 dark:text-white/80 font-semibold"
          );
        }
      }
      // @ts-ignore
      this.ctrlButton()
        // @ts-ignore
        .icon(Icon.arrowBoldRightFromLine)
        .onClick(this.onNextPage);
    }
  }

  Body() {
    div()
      .class("flex flex-col pb-20")
      .ref((r) => {
        this.wrapper2Ref = r;
      });
    {
      div()
        .class("flex justify-center mt-4")
        .ref((r) => {
          this.wrapperRef = r;
        });
      {
        div()
          .ref((r) => {
            this.contentRef = r;
          })
          .class("flex justify-center items-center p-4 gap-2");
        {
          canvas()
            .class("relative")
            .ref((r) => {
              this.canvasRef = r;
            });
          canvas()
            .class("relative")
            .ref((r) => {
              this.canvas2Ref = r;
            });
        }
      }
      div().class("flex justify-center");
      {
        this.ctrlPannel();
      }
    }
  }
}

export default PDFViewer as Pretty as Typed<PDFViewerProp>;
