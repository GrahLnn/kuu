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
import WaveSurfer from "wavesurfer.js";
// @ts-ignore
import Spectrogram from "wavesurfer.js/dist/plugins/spectrogram.esm.js";
import { Icon } from "../../icon/all_icon.view";
import { darkModeState } from "../../state/dark_mode_state";
import { loadAudio } from "../../app/services/cmds";

interface AudioPlayerProp {
  src: ContentProp<string>;
  transparent?: boolean;
}

@View
class AudioPlayer implements AudioPlayerProp {
  @Content src: ContentProp<string> = required;
  @Prop transparent: boolean = true;

  waveForm: HTMLElement | null = null;
  spectrogramRef: HTMLElement | null = null;
  wavesurfer: WaveSurfer | null = null;
  isPlaying: boolean = false;
  loading: boolean = true;

  setupWaveSurfer() {
    if (this.waveForm) {
      this.wavesurfer = WaveSurfer.create({
        container: this.waveForm,
        waveColor: "#676769",
        progressColor: "rgb(14 165 233)",
        cursorColor: "rgb(34 197 94)",
        barWidth: 2,
        barRadius: 30,
        barHeight: 0.7,
        height: 100,
        dragToSeek: true,
        plugins: [
          Spectrogram.create({
            labels: false,
          }),
        ],
      });
      this.wavesurfer.on("finish", () => {
        this.isPlaying = false;
      });
    } else {
      console.error("waveForm is not set");
    }
  }

  @Watch("src")
  srcChanged() {
    if (this.wavesurfer && this.src) {
      this.loading = true;
      loadAudio(this.src)
        .then((blob) => {
          this.wavesurfer?.loadBlob(blob);
          this.loading = false;
        })
        .catch((error) => {
          console.error("Failed to load audio:", error);
        });
    }
  }

  setWaveForm(ref: HTMLElement) {
    this.waveForm = ref;
    this.setupWaveSurfer();
    if (this.src) {
      loadAudio(this.src)
        .then((blob) => {
          this.wavesurfer?.loadBlob(blob);
          this.loading = false;
        })
        .catch((error) => {
          console.error("Failed to load audio:", error);
        });
    }
  }

  handlePlay() {
    if (this.isPlaying) {
      this.wavesurfer?.pause();
    } else {
      this.wavesurfer?.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  moveToStart() {
    this.wavesurfer?.seekTo(0);
  }

  moveToEnd() {
    this.wavesurfer?.seekTo(1);
  }

  willUnmount() {
    this.wavesurfer?.destroy();
  }

  @Snippet
  ctrlButton({ icon, onClick }: { icon: any; onClick: () => void }) {
    div()
      .class(
        "rounded-md opacity-60 hover:opacity-80 transition hover:bg-gray-200 p-1 dark:hover:bg-white/10 "
      )
      .onClick(onClick);
    {
      icon()
        .size(20)
        .lightColor("#666666")
        .darkColor("#fafafa")
        .passClick(true);
    }
  }

  Body() {
    div().class(
      this.transparent
        ? "flex flex-col w-full items-center gap-4 rounded-lg bg-gray-100 dark:bg-[var(--dark-bg-blue-tertiary)] py-4 px-6"
        : "flex flex-col w-full items-center gap-4 py-4 px-6 "
    );
    {
      div().class("w-full").id("waveform").ref(this.setWaveForm);
      div().class(
        "flex items-center justify-center gap-8 hover:bg-white/70 dark:hover:bg-white/10 rounded-lg px-6 py-1 hover:shadow-lg transition duration-500"
      );
      {
        // @ts-ignore
        this.ctrlButton().icon(Icon.MediaPrevious).onClick(this.moveToStart);

        if (this.isPlaying) {
          // @ts-ignore
          this.ctrlButton().icon(Icon.MediaPause).onClick(this.handlePlay);
        } else {
          // @ts-ignore
          this.ctrlButton().icon(Icon.MediaPlay).onClick(this.handlePlay);
        } // @ts-ignore
        this.ctrlButton().icon(Icon.MediaNext).onClick(this.moveToEnd);
      }
    }
  }
}

export default AudioPlayer as Pretty as Typed<AudioPlayerProp>;
