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
  img,
  input,
  Snippet,
  label,
  Watch,
  audio,
  set,
} from "@dlightjs/dlight";

interface NoneShowProps {
  message: ContentProp<string>;
}

@View
class NoneShow implements NoneShowProps {
  @Content message: ContentProp<string> = required;

  Body() {
    div().class(
      "w-full h-full items-center cursor-default rounded-lg bg-gray-100 dark:bg-[var(--dark-bg-blue-tertiary)] py-4 px-6 flex justify-center"
    );
    {
      span(this.message).class(
        "text-sm dark:text-[#fefefe] text-[#676769] dark:opacity-80"
      );
    }
  }
}

export default NoneShow as Pretty as Typed<NoneShowProps>;
