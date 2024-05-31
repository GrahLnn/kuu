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
  Snippet,
} from "@dlightjs/dlight";
import MagneticButton from "../button/magnetic_button.view";
import { Icon } from "../../icon/all_icon.view";
import { FaceEnv, FaceEnum, Guide } from "../../app/data/type";
import { GuideEnv } from "../../app/data/filter_state";

interface GuideBarProp {}

@View
class GuideBar implements GuideBarProp, FaceEnv, GuideEnv {
  @Env setFace?: ((face: FaceEnum) => void) | undefined;
  @Env guideArea?: string;
  @Env setGuideArea?: ((area: string) => void) | undefined;

  @Snippet
  FuncButton({
    content,
    icon,
    focus,
    onClick,
  }: {
    content: string;
    icon: any;
    focus?: boolean;
    onClick?: () => void;
  }) {
    MagneticButton()
      .linkContent(false)
      .mainClass("w-full py-4 group")
      .roundedClass("rounded-lg")
      .focus(focus)
      .onClick(onClick);
    {
      div().class(
        content === this.guideArea
          ? "flex flex-col items-center gap-2 opacity-100 group-hover:opacity-100 transition"
          : "flex flex-col items-center gap-2 opacity-80 group-hover:opacity-100 transition"
      );
      {
        icon()
          .size(24)
          .lightColor("#666666")
          .darkColor("#fafafa")
          .passClick(true);
        span(content).class(
          "relative text-sm font-semibold text-zinc-600 transition-colors dark:text-zinc-400 dork:hover:text-zinc-100 px-2"
        );
      }
    }
  }
  Body() {
    div().class(
      "shrink-0 w-32 flex flex-col items-center gap-2 py-2 bg-white dark:bg-[var(--dark-bg-blue-primary)] border-r border-[#edf0f3] dark:border-[#212234]"
    );
    {
      div().class(
        "grow flex flex-col items-center gap-4 w-full px-3 py-2 overflow-auto"
      );
      {
        //@ts-ignore
        this.FuncButton(Guide.Import)
          //@ts-ignore
          .icon(Icon.AddItem)
          .focus(this.guideArea === Guide.Import)
          .onClick(() => {
            this.setGuideArea?.(Guide.Import);
          });
        //@ts-ignore
        this.FuncButton("Tool").icon(Icon.Siren);
        //@ts-ignore
        this.FuncButton("Rule").icon(Icon.CubeSettings);
        //@ts-ignore
        this.FuncButton("Space").icon(Icon.StackPerspective2);
        //@ts-ignore
        this.FuncButton(Guide.View)
          //@ts-ignore
          .icon(Icon.Layers3)
          .focus(this.guideArea === Guide.View)
          .onClick(() => {
            this.setGuideArea?.(Guide.View);
          });
        //@ts-ignore
        this.FuncButton("Roadmap").icon(Icon.Itinerary4);
      }
      div().class("w-full flex justify-between px-4");
      {
        MagneticButton().onClick(() => {
          this.setFace?.(FaceEnum.Aggregate);
        });
        {
          Icon.ArrowLeft()
            .passClick(true)
            .size(18)
            .lightColor("#666666")
            .darkColor("#fafafa");
        }
        MagneticButton();
        {
          Icon.StarSparkle()
            .passClick(true)
            .size(18)
            .lightColor("#666666")
            .darkColor("#fafafa");
        }
      }
    }
  }
}

export default GuideBar as Pretty as Typed<GuideBarProp>;
