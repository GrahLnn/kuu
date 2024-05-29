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
}
@View
class SlidingDataLabel implements SlidingDataLabelProp {
  @Prop tabs: string[] = required;
  @Prop class: string = "";
  tabsRef: HTMLElement[] = [];
  activeTabKey: number | null = null;

  tabUnderlineWidth: number = 0;
  tabUnderlineLeft: number = 0;
  tabUnderlineHeight: number = 0;
  tabUnderlineTop: number = 0;

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
          `absolute bottom-0 top-0 -z-10 flex overflow-hidden py-1 translation-all duration-300`
        ) // translation-all duration-300
        .style({
          left: `${this.tabUnderlineLeft}px`,
          width: `${this.tabUnderlineWidth}px`,
          height: `${this.tabUnderlineHeight * 2}px`,
          top: `${this.tabUnderlineTop - 4}px`,
        });
      {
        span().class(
          `h-full w-full rounded-sm transition-colors duration-200  ${
            this.activeTabKey !== null
              ? "bg-gray-300/30 dark:bg-[var(--dark-bg-gray-b)]"
              : "bg-transparent"
          }`
        );
      }
      for (const [idx, tab] of Object.entries(this.tabs)) {
        div(tab)
          .class(
            `${
              this.activeTabKey === Number(idx) ? "opacity-70" : "opacity-60"
            } shrink-0 dark:text-white my-auto select-none rounded-full px-0.5 text-center font-light transition-opacity cursor-default text-[7px] `
          )
          .onMouseEnter(() => {
            this.activeTabKey = Number(idx);
          })
          .onMouseLeave(() => {
            this.activeTabKey = null;
          })

          .ref((el) => {
            this.tabsRef[Number(idx)] = el;
          });
      }
    }
  }
}

export default SlidingDataLabel as Pretty as Typed<SlidingDataLabelProp>;
