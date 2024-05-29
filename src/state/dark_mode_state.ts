type Listener = (isDarkMode: boolean) => void;

class DarkModeState {
  private isDarkMode: boolean;
  private listeners: Listener[];

  constructor() {
    this.isDarkMode =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    this.listeners = [];

    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    mediaQueryList.addEventListener("change", this.updateDarkMode.bind(this));
  }

  private updateDarkMode(e: MediaQueryListEvent): void {
    this.isDarkMode = e.matches;
    this.listeners.forEach((listener) => listener(this.isDarkMode));
    // console.log("Dark mode updated", this.isDarkMode);
  }

  subscribe(listener: Listener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  getCurrentMode(): boolean {
    return this.isDarkMode;
  }
}

export const darkModeState = new DarkModeState();
