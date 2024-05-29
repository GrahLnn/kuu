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

interface MagneticButtonProps {
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
class MagneticButton implements MagneticButtonProps, MenuEnv {
  @Prop mainClass?: string | "";
  @Prop full: boolean = false;
  @Prop linkContent: boolean = true;
  @Content content?: ContentProp<string> | undefined;
  @Children children: any[] = [];
  @Prop setPosition?: ((position: Position) => void) | undefined;
  @Prop setTransform?: ((position: TransformPosition) => void) | undefined;
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

  handleMouseMove(e: MouseEvent) {
    const clientX = e.clientX;
    const clientY = e.clientY;
    const target = this.ref as HTMLElement;
    const { left, top, width, height, right, bottom } =
      target.getBoundingClientRect();

    const x = (clientX - left - width / 2) * 0.15;
    const y = (clientY - top - height / 2) * 0.15;
    if (this.content === this.menu) {
      this.setTransform?.({ x: x * 0.3, y: y * 0.3 });
    }

    this.hoverPosition = {
      x,
      y,
      opacity: 1,
    };
  }

  handleMouseLeave() {
    const initialX = this.hoverPosition.x;
    const initialY = this.hoverPosition.y;
    const initialOpacity = this.hoverPosition.opacity;
    const duration = 70; // 渐变总时间，单位毫秒
    const interval = 10; // 每个步骤的时间间隔，单位毫秒
    let elapsed = 0; // 已过时间

    const timer = setInterval(() => {
      elapsed += interval;
      const factor = elapsed / duration;

      this.hoverPosition = {
        x: initialX * (1 - factor), // 逐渐减少到0
        y: initialY * (1 - factor), // 逐渐减少到0
        opacity: initialOpacity * (1 - factor), // 逐渐减少到0
      };
      if (this.content === this.menu) {
        this.setTransform?.({
          x: initialX * (1 - factor),
          y: initialY * (1 - factor),
        });
      }

      if (factor >= 1) {
        clearInterval(timer);
      }
    }, interval);
  }

  Body() {
    button()
      .class(`relative cursor-default p-1.5 ${this.mainClass}`)
      .ref((ref) => {
        this.ref = ref;
      })
      .onMouseMove((e) => {
        this.handleMouseMove(e);
      })
      .onMouseLeave(() => {
        this.handleMouseLeave();
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

export default MagneticButton as Pretty as Typed<MagneticButtonProps>;
