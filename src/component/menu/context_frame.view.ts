import {
  View,
  Content,
  ContentProp,
  Snippet,
  Prop,
  Env,
  Children,
  required,
  div,
  type Typed,
  type Pretty,
  DLightObject,
  span,
  button,
  Watch,
} from "@dlightjs/dlight";
import {
  MenuEnv,
  Position,
  Menu,
  TransformPosition,
} from "../../app/data/type";
import SpaceAddContextMenu from "./space_add_context_menu.view";
import ArchiveMenu from "./archive_menu.view";
import ImportAddMenu from "./import_add.view";
import FileLinkContextMenu from "./file_link_menu.view";

interface ContextFrameProps {
  children: ChildNode[];
}

@View
class ContextFrame implements ContextFrameProps, MenuEnv {
  @Children children: ChildNode[] = required;
  @Env menu: string = "";
  @Env position: Position = { l: 0, t: 0, w: 0, h: 0, r: 0, b: 0 };
  @Env transformPosition: TransformPosition = { x: 0, y: 0 };
  @Env offsetX: number | null = null;
  @Env offsetY: number = 10;
  bottom = 0;
  left = 0;

  direction: string | null = null;

  // offsetX = -48

  willMount() {
    if (this.offsetX === null) {
      this.offsetX = -48;
    }
  }

  @Watch
  changeDirection() {
    if (this.menu === Menu.FileLinkContext) {
      this.direction = "down";
    }
  }

  async setCompPosition(e: HTMLElement[]) {
    await Promise.resolve();
    const initL = this.position.l + this.offsetX!;
    const initB = this.position.b + this.position.w + 10;
    if (this.menu === Menu.FileLinkContext) {
      if (initL <= 16) {
        this.left = 16;
      } else if (initL + e[0].offsetWidth >= window.innerWidth - 16) {
        this.left = window.innerWidth - 16;
      } else {
        this.left = initL;
      }
      this.bottom = this.position.b - e[0].offsetHeight - 4;
    } else {
      if (initL <= 16) {
        this.left = 16;
      } else if (initL + e[0].offsetWidth >= window.innerWidth - 16) {
        this.left = window.innerWidth - 16;
      } else {
        this.left = initL;
      }

      if (initB + e[0].offsetHeight >= window.innerHeight - 16) {
        this.bottom = this.position.b - e[0].offsetHeight - 10;
      } else {
        this.bottom = initB;
      }
    }
  }

  Body() {
    if (this.menu === "") {
    } else {
      div()
        .class("absolute select-none menu")
        .style({
          bottom: `${this.bottom}px`,
          left: `${this.left}px`,
          transform: `translate(${this.transformPosition.x}px, ${this.transformPosition.y}px)`,
          opacity: "1",
        });
      {
        switch (this.menu) {
          case Menu.Archive:
            ArchiveMenu().elements((els) => {
              this.setCompPosition(els);
            });
            break;
          case Menu.AddSpace:
            SpaceAddContextMenu().elements((els) => {
              this.setCompPosition(els);
            });
            break;
          case Menu.ImportAdd:
            ImportAddMenu().elements((els) => {
              this.setCompPosition(els);
            });
            break;
          case Menu.FileLinkContext:
            FileLinkContextMenu().elements((els) => {
              this.setCompPosition(els);
            });
        }
      }
    }
  }
}

export default ContextFrame as Pretty as Typed<ContextFrameProps>;
