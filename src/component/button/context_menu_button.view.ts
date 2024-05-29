import {
  View,
  Prop,
  ContentProp,
  Content,
  required,
  Children,
  span,
  h3,
  p,
  button,
  env,
  div,
  Snippet,
  Model,
  type Typed,
  type Pretty,
  Watch,
  set,
} from "@dlightjs/dlight";

interface ContextMenuButtonProps {
  onClick: () => void;
  content: ContentProp<string>;
  bgColor?: string;
  icon: ChildNode;
  contentColor?: string;
}

@View
class ContextMenuButton implements ContextMenuButtonProps {
  @Prop onClick = () => {};
  @Content content = required;
  @Prop bgColor: string = "hover:bg-[#f5f5f5] dark:hover:bg-[#2a3146]";
  @Prop contentColor: string =
    "text-[#666666] dark:text-white/80 dark:group-hover:text-white group-hover:text-[#343434]";
  @Children icon: ChildNode = required;

  ui = "text-sm text-gray-400 dark:text-gray-500";
  ux = "";
  position = "sm:mt-0 sm:w-auto";

  Body() {
    div()
      .class(
        `flex items-center w-full gap-4 ${this.bgColor} p-2 rounded cursor-pointer transition group`
      )
      .onClick(this.onClick);
    {
      this.icon;
      div(this.content).class(`${this.contentColor} transition`);
    }
  }
}

export default ContextMenuButton as Pretty as Typed<ContextMenuButtonProps>;
