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
  tr,
} from "@dlightjs/dlight";
import SpaceAddContextMenu from "../menu/space_add_context_menu.view";
import { MenuEnv, Position, TransformPosition } from "../../app/data/type";

interface NormalButtonProps {
  mainClass?: string;
  content?: ContentProp<string>;
  linkContent?: boolean;
  full?: boolean;
  setPosition?: (position: Position) => void;
  // setMenu?: (menu: string) => void;
  setTransform?: (position: TransformPosition) => void;
  menu?: string;
  onClick?: () => void;
  onHover?: () => void;
  focus?: boolean;
  roundedClass?: string;
}

@View
class NormalButton implements NormalButtonProps, MenuEnv {
  @Prop mainClass?: string | "";
  @Prop full: boolean = false;
  @Prop linkContent: boolean = true;
  @Content content?: ContentProp<string> | undefined;
  @Children children: any[] = [];
  @Prop setPosition?: ((position: Position) => void) | undefined;
  @Env setMenu?: ((menu: string) => void) | undefined;
  @Prop menu?: string | "";
  @Prop onClick?: (() => void) | undefined;
  @Prop onHover?: (() => void) | undefined;
  @Prop focus: boolean = false;
  @Prop roundedClass: string = "rounded-md";

  ref: any = null;
  hoverPosition = {
    x: 0,
    y: 0,
    opacity: 0,
  };

  elem_rect = {
    left: 0,
    top: 0,

    right: 0,
    bottom: 0,
  };

  handleMouseClick(e: MouseEvent) {
    const clientX = e.clientX;
    const clientY = e.clientY;

    const target = this.ref as HTMLElement;

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
    e.stopPropagation();
    if (this.content === this.menu) {
      this.setMenu?.("");
    } else {
      this.setMenu?.(this.content || "");
    }
    this.onClick?.();
  }

  Body() {
    button()
      .class(
        `relative cursor-default px-[7px] ${this.mainClass} bg-zinc-200/80 hover:bg-zinc-300 transition rounded-lg flex justify-center items-center`
      )
      .ref((ref) => {
        this.ref = ref;
      })
      .onClick((e) => {
        this.handleMouseClick(e);
      });
    {
      div()
        .class(
          `absolute bottom-0 left-0 h-full w-full ${this.roundedClass} bg-zinc-200/80 transition-opacity dark:bg-[#2a3146]`
        )
        .ariaHidden("true")
        .style({
          transform: `translate(${this.hoverPosition.x}px, ${this.hoverPosition.y}px)`,
          opacity: this.focus ? 1 : this.hoverPosition.opacity,
        });
      div()
        .class("relative")
        .style({
          transform: `translate(${
            this.linkContent ? this.hoverPosition.x * 0.5 : 0
          }px, ${this.linkContent ? this.hoverPosition.y * 0.5 : 0}px)`,
        });
      {
        this.children;
      }
    }
  }
}

export default NormalButton as Pretty as Typed<NormalButtonProps>;
