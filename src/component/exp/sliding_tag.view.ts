import {
  View,
  Watch,
  span,
  div,
  type Typed,
  type Pretty,
} from "@dlightjs/dlight";

interface SlidingTagProp {}

@View
class SlidingTag implements SlidingTagProp {
  private tabsRef: HTMLElement[] = [];
  private activeTabKey: number | null = null;
  private tabUnderlineWidth: number = 0;
  private tabUnderlineLeft: number = 0;

  tabs = ["home", "blog", "projects", "arts"];

  @Watch("activeTabKey")
  watchRef() {
    if (this.activeTabKey !== null) {
      const tab = this.tabsRef[this.activeTabKey];
      this.tabUnderlineWidth = tab?.offsetWidth ?? 0;

      this.tabUnderlineLeft = tab?.offsetLeft ?? 0;
    }
  }

  Body() {
    div().class(
      `flew-row relative mx-auto flex h-12 rounded-3xl border border-black/40 bg-neutral-800 px-2 backdrop-blur-sm`
    );
    {
      span()
        .class(
          `absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300`
        )
        .style({
          left: `${this.tabUnderlineLeft}px`,
          width: `${this.tabUnderlineWidth}px`,
        });
      {
        span().class(
          `h-full w-full rounded-3xl transition-colors duration-300 ${
            this.activeTabKey !== null
              ? "bg-[var(--light-bg-tertiary)"
              : "bg-transparent"
          }]`
        );
      }
      for (const [idx, tab] of this.tabs.entries()) {
        div(tab)
          .class(
            `${
              this.activeTabKey === idx
                ? "text-dark"
                : "text-white hover:text-neutral-300"
            } my-auto select-none rounded-full px-4 text-center font-light transition-colors cursor-default`
          )
          .onMouseEnter(() => {
            this.activeTabKey = idx;
          })
          .onMouseLeave(() => {
            this.activeTabKey = null;
          })

          .ref((el) => {
            this.tabsRef[idx] = el;
          });
      }
    }
  }
}

export default SlidingTag as Pretty as Typed<SlidingTagProp>;
