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
import ImportArea from "../area/import/import_area.view";

interface SAreaProps {
  onClick?: () => void;
}

@View
class SArea implements SAreaProps {
  @Prop onClick?: (() => void) | undefined;
  ui =
    "h-screen dark:bg-[var(--dark-bg-blue-primary)] bg-[var(--light-bg-primary)] overflow-hidden select-none flex ";
  Body() {
    div().class(this.ui).onClick(this.onClick);
    {
      GuideBar();
      ImportArea();
    }
  }
}

export default SArea as Pretty as Typed<SAreaProps>;
