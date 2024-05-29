import {
  View,
  Prop,
  Watch,
  Children,
  required,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";

interface ModalBoxFrameProp {
  isOpen: boolean;
  onClose: () => void;
  children: ChildNode[];
  handleShow: (show: boolean) => void;
  show: boolean;
  useCol?: boolean;
}

@View
class ModalBoxFrame implements ModalBoxFrameProp {
  @Prop isOpen = required;
  @Prop onClose = required;
  @Children children = required;
  @Prop handleShow = required;
  @Prop show = required;
  @Prop useCol?: boolean | false;

  handleClose() {
    this.show = false;
    setTimeout(this.onClose, 300);
  }

  preventScroll = (e: WheelEvent) => {
    const path = e.composedPath && e.composedPath();
    const modalContentFound = path.find(
      (dom): dom is Element =>
        dom instanceof Element && dom.classList.contains("modalbox-content")
    );

    // 如果 modalbox-content 元素或其子元素之外的地方触发了滚动事件，则阻止它。
    // 只要事件路径中存在具有 "modalbox-content" 类的元素，就允许滚动。
    if (!modalContentFound) {
      e.preventDefault();
      e.stopPropagation();
      console.log("prevent scroll");
    }
  };

  @Watch
  listen(): void {
    if (this.isOpen) {
      document.addEventListener("wheel", this.preventScroll, {
        passive: false,
      });
    } else {
      document.removeEventListener("wheel", this.preventScroll, false);
    }
  }

  @Watch("isOpen")
  open2show() {
    setTimeout(() => {
      this.show = this.isOpen;
    }, 1);
  }

  @Watch
  h_show() {
    this.handleShow(this.show);
  }

  Body() {
    if (!this.show && !this.isOpen) {
    } else {
      div()
        .class(
          `relative z-10 transition duration-300 ${
            this.show ? "opacity-100 " : "opacity-0"
          } `
        )
        .ariaModal("true")

        .onClick(this.handleClose);
      {
        div().class(
          "fixed inset-0 bg-gray-500 bg-opacity-50 dark:bg-[#131928] dark:bg-opacity-50"
        );
        div().class("fixed inset-0 z-10 w-screen overflow-hidden");
        {
          div().class(
            this.useCol
              ? "flex h-full items-center justify-center p-4 text-center flex-col"
              : "flex h-full items-center justify-center p-4 text-center"
          );
          {
            this.children;
          }
        }
      }
    }
  }
}

export default ModalBoxFrame as Pretty as Typed<ModalBoxFrameProp>;
