import {
  View,
  Prop,
  Watch,
  required,
  div,
  span,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";

interface SlidingDataLabelProp {
  tabs: string[];
  class: string;
  size?: number | null;
  style?: string | null;
  bgColor?: string | null;
  slidingPaddingX?: number;
  allowChoose?: boolean;
  callback?: (n: any) => void;
}
@View
class SlidingDataLabel implements SlidingDataLabelProp {
  @Prop tabs: string[] = required;
  @Prop class: string = "";
  @Prop size: number | null = null;
  @Prop style: string | null = null;
  @Prop bgColor: string | null = null;
  @Prop slidingPaddingX: number = 0;
  @Prop allowChoose: boolean = false;
  @Prop callback?: (n: any) => void = () => {};

  tabsRef: HTMLElement[] = [];
  activeTabKey: number | null = null;

  tabUnderlineWidth: number = 0;
  tabUnderlineLeft: number = 0;
  tabUnderlineHeight: number = 0;
  tabUnderlineTop: number = 0;
  chooseTabKey: number | null = null;

  @Watch
  watchRef() {
    if (this.activeTabKey !== null) {
      const tab = this.tabsRef[this.activeTabKey];
      this.tabUnderlineWidth = tab?.offsetWidth ?? 0;
      this.tabUnderlineLeft = tab?.offsetLeft ?? 0;
      this.tabUnderlineHeight = tab?.offsetHeight ?? 0;
      this.tabUnderlineTop = tab?.offsetTop ?? 0;
    }
  }

  willMount() {
    if (this.allowChoose) {
      this.activeTabKey = 0;
      this.chooseTabKey = 0;
    }
  }

  didMount() {
    const tab = this.tabsRef[0];
    this.tabUnderlineWidth = tab?.offsetWidth ?? 0;
    this.tabUnderlineLeft = tab?.offsetLeft ?? 0;
    this.tabUnderlineHeight = tab?.offsetHeight ?? 0;
    this.tabUnderlineTop = tab?.offsetTop ?? 0;
  }

  Body() {
    div().class(
      `flew-row flex-wrap relative mx-auto flex py-1 backdrop-invert-0 ${this.class}`
    );
    {
      span()
        .class(
          `absolute bottom-0 top-0 -z-10 flex overflow-hidden mt-1 translation-all duration-300`
        )
        .style({
          left: `${this.tabUnderlineLeft - this.slidingPaddingX / 2}px`,
          width: `${this.tabUnderlineWidth + this.slidingPaddingX}px`,
          height: `${this.tabUnderlineHeight}px`,
          top: `${this.tabUnderlineTop - 4}px`,
        });
      {
        span().class(
          `h-full w-full rounded-sm transition-colors duration-200 ${
            this.activeTabKey !== null
              ? this.bgColor
                ? this.bgColor
                : "bg-gray-300/30 dark:bg-[var(--dark-bg-gray-b)]"
              : "bg-transparent"
          }`
        );
      }
      for (const [idx, tab] of Object.entries(this.tabs)) {
        div(tab)
          .class(
            `${
              this.activeTabKey === Number(idx) ? "opacity-70" : "opacity-60"
            } shrink-0 dark:text-white my-auto select-none rounded-full px-0.5 text-center ${
              this.style ? `font-${this.style}` : ""
            } transition-opacity cursor-default ${
              this.size ? `text-[${this.size}px]` : "text-[7px]"
            } `
          )
          .onMouseEnter(() => {
            this.activeTabKey = Number(idx);
          })
          .onClick(() => {
            if (this.allowChoose) {
              this.chooseTabKey = Number(idx);
              this.callback?.(tab);
            }
          })
          .onMouseLeave(() => {
            if (this.chooseTabKey === null) {
              this.activeTabKey = null;
            } else {
              this.activeTabKey = this.chooseTabKey;
            }
          })

          .ref((el) => {
            this.tabsRef[Number(idx)] = el;
          });
      }
    }
  }
}

export default SlidingDataLabel as Pretty as Typed<SlidingDataLabelProp>;
