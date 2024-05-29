import {
  View,
  Main,
  env,
  Env,
  div,
  Model,
  type Modeling,
  button,
  type Pretty,
  type Typed,
} from "@dlightjs/dlight";

interface EnvType {
  theme?: SingleTheme;
  language?: string;
}

enum ThemeType {
  Light = "Light",
  Dark = "Dark",
}

interface SingleTheme {
  bgColor: string;
  textColor: string;
}

interface Theme {
  [key: string]: {
    bgColor: string;
    textColor: string;
  };
}

@View
class SubComp2 implements EnvType {
  @Env theme?: SingleTheme | undefined;

  Body() {
    div("I am Sub Component2!").style({
      color: this.theme?.textColor,
      backgroundColor: this.theme?.bgColor,
      margin: "10px 0",
    });
  }
}

const subComp2 = SubComp2 as Pretty as Typed;

@Model
class SomeClass {
  name: string = "SomeClass";
}

@View
class Mycomp {
  themeType: ThemeType = ThemeType.Light;

  theme: Theme = {
    [ThemeType.Light]: {
      bgColor: "#fff",
      textColor: "#000",
    },
    [ThemeType.Dark]: {
      bgColor: "#000",
      textColor: "#fff",
    },
  };

  changeTheme(): void {
    this.themeType =
      this.themeType === ThemeType.Light ? ThemeType.Dark : ThemeType.Light;
  }

  Body() {
    env<EnvType>().theme(this.theme[this.themeType]).language("en");
    {
      button("Change Theme").onClick(this.changeTheme);
      subComp2();
    }
  }
}

export default Mycomp as Pretty as Typed;
