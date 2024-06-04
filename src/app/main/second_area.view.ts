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
} from "@dlightjs/dlight";
import GuideBar from "../../component/bar/guide_bar.view";
import ImportArea from "../area/import_area.view";
import { GuideEnv } from "../data/filter_state";
import ViewArea from "../area/view_area.view";
import { Guide } from "../data/type";
import ToolArea from "../area/tool_area.view";
import RuleArea from "../area/rule_area.view";

interface SAreaProps {
  onClick?: () => void;
}

@View
class SArea implements SAreaProps, GuideEnv {
  @Prop onClick?: (() => void) | undefined;
  @Env guideArea?: string;

  ui =
    "h-screen dark:bg-[var(--dark-bg-blue-primary)] bg-[var(--light-bg-primary)] overflow-hidden select-none flex ";
  Body() {
    div().class(this.ui).onClick(this.onClick);
    {
      GuideBar();
      // ImportArea();
      switch (this.guideArea) {
        case Guide.Import:
          ImportArea();
          break;
        case Guide.View:
          ViewArea();
          break;
        case Guide.Tool:
          ToolArea();
          break;
        case Guide.Rule:
          RuleArea();
          break;
      }
    }
  }
}

export default SArea as Pretty as Typed<SAreaProps>;
