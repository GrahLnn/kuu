import { View, Prop, span } from "@dlightjs/dlight";
import { darkModeState } from "../../state/dark_mode_state";
import { IconProps } from "./icon_data";
import { Typed, Pretty } from "@dlightjs/dlight";

@View
class BaseIcon implements IconProps {
  @Prop class = "";
  @Prop color = "";
  @Prop size = 10;
  @Prop lightColor = "#212121";
  @Prop darkColor = "#FFFFFF";
  @Prop onClick = () => {};
  @Prop passClick = false;

  public svgHTML!: string;

  private svg!: string;

  private isDarkMode: boolean = darkModeState.getCurrentMode();
  private unsubscribe?: () => void;

  private get_color(): string {
    return this.color || (this.isDarkMode ? this.darkColor : this.lightColor);
  }
  private colorProp?: string;

  setProps() {
    this.colorProp = this.get_color();
    this.svg = this.svgHTML
      .replace(/#212121/g, this.colorProp)
      .replace(/size/g, `${this.size}`);
  }

  handleClick(e: MouseEvent) {
    this.onClick();

    if (!this.passClick) {
      e.stopPropagation();
    }
  }

  willMount() {
    this.unsubscribe = darkModeState.subscribe((isDark) => {
      this.isDarkMode = isDark;
      this.setProps();
    });
    this.setProps();
  }

  willUnmount() {
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }

  Body() {
    span()
      .innerHTML(this.svg)
      .class(`${this.class} stopClickPropagation solid`)
      .onClick((e) => {
        this.handleClick(e);
      });
  }
}

export function createIcon(svgHTML: string): typeof BaseIcon {
  return class extends BaseIcon {
    constructor() {
      super();
      this.svgHTML = svgHTML;
    }
  };
}
