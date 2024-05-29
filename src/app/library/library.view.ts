import {
  View,
  Content,
  ContentProp,
  Prop,
  Env,
  Children,
  required,
  div,
  type Typed,
  type Pretty,
  DLightObject,
  span,
} from "@dlightjs/dlight";
import Entry from "./entry.view";
import Name from "./name.view";
import DataLabel from "../../component/label/data_label.view";
import PresentedLabel from "../../component/label/presented_label.view";
import DeletableLabel from "../../component/label/deletable_label.view";
import EditableLabel from "../../component/label/editable_label.view";
import ActiveLabel from "../../component/label/active_label.view";
import DeactiveLabel from "../../component/label/deactive_label.view";
import ToggleLabel from "../../component/label/toggle_label.view";
import DisabledLabel from "../../component/label/disabled_label.view";
import StatusLabel from "../../component/label/status_label.view";
import DashedLabel from "../../component/label/dashed_label.view";
import TypeDashedLabel from "../../component/label/type_dashed_label.view";
import TypedLabel from "../../component/label/typed_label.view";
import SlidingDataLabel from "../../component/label/sliding_data_label.view";
import ContentEditableLabel from "../../component/label/content_editable_label.view";
import DemoWarning from "../../component/notification/demo_warning.view";
import TypedButton from "../../component/button/typed_button.view";
import ActivatedInfoButton from "../../component/button/activated_info_button.view";
import DectivatedInfoButton from "../../component/button/deactivatec_info_button.view";
import InfoButton from "../../component/button/tab_route_button.view";
import AddFnButton from "../../component/button/add_tab_button.view";
import PresentLabelBar from "../../component/bar/present_label_bar.view";
import ItemBar from "../../component/bar/item_bar.view";
import ItemToolBar from "../../component/bar/item_tool_bar.view";
import TitleBar from "../../component/bar/title_bar.view";

import FilterModalBox from "../../component/modal_box/filter_modalbox.view";
import ConfirmButton from "../../component/button/confirm_button.view";
import WeakTextButton from "../../component/button/weak_text_button.view";
import InvalidConfirmButton from "../../component/button/invalid_confirm_button.view";
import ToastNotification from "../../component/notification/toast_notification.view";
import ToastMassage from "../../component/notification/toast_massage.view";
import ToastNotificationBottomRight from "../../component/notification/toast_notification_br.view";
import { ToastMassageStruct } from "../../structure/toast";
import SidePanel from "../side_panel/side_panel.view";
import UnDeactivatableInfoButton from "../../component/button/undeactivatable_tab_route_button.view";
import MagneticButton from "../../component/button/magnetic_button.view";
import SpaceAddContextMenu from "../../component/menu/space_add_context_menu.view";
import ContextMenuButton from "../../component/button/context_menu_button.view";
import { Icon } from "../../icon/all_icon.view";

interface LibraryProp {
  class: string;
}

@View
class Library implements LibraryProp {
  @Prop class: string = "";
  @Env toasts: ToastMassageStruct[] = [];
  @Env updateToasts: (newToasts: ToastMassageStruct[]) => void = () => {};

  isOpen = false;
  Body() {
    div().class("flex flex-col overflow-hidden w-full grow-0");
    {
      TitleBar("Components");

      div().class("flex flex-col items-center gap-8 overflow-y-auto");
      {
        div().class("h-2");
        Entry();
        {
          Name("PresentedLabel");
          PresentedLabel("Autoencoders");
        }
        Entry();
        {
          Name("DeletableLabel");
          DeletableLabel("BERT");
        }
        Entry();
        {
          Name("EditableLabel");
          EditableLabel("Random Forest");
        }
        Entry();
        {
          Name("ActiveLabel");
          ActiveLabel("Neo4j");
        }
        Entry();
        {
          Name("DeactiveLabel");
          DeactiveLabel("C++");
        }
        Entry();
        {
          Name("ToggleLabel");
          ToggleLabel("Rust");
          ContentEditableLabel("Add New Label");
        }
        Entry();
        {
          Name("DisabledLabel");
          DisabledLabel("SpaceX");
        }
        Entry();
        {
          Name("StatusLabel");
          StatusLabel("H·Lachenmann").stateColor("bg-red-600");
          StatusLabel("西村 朗").stateColor("bg-lime-500");
          StatusLabel("Long Short-Term Memory Networks, LSTM").stateColor(
            "bg-cyan-500"
          );
          StatusLabel("Александр Петрович").stateColor("bg-sky-500");
        }
        Entry();
        {
          Name("DashedLabel");
          DashedLabel("羊をめぐる冒険");
        }
        Entry();
        {
          Name("TypeDashedLabel");
          TypeDashedLabel("Add New File");
          {
            Icon.Plus();
          }
        }
        Entry();
        {
          Name("TypedLabel");
          TypedLabel("https://www.nintendo-systems.com/");
          {
            Icon.Link();
          }
          TypedLabel("Cyberpunk 2077");
          {
            Icon.GamePad3();
          }
        }
        Entry();
        {
          Name("StaticDataLabel");
          DataLabel("Python");
          DataLabel("PDF");
          DataLabel("JavaScript");
          DataLabel("JPEG");
          DataLabel("WAV");
        }
        Entry();
        {
          Name("SlidingDataLabel");
          div();
          {
            SlidingDataLabel().tabs([
              "WAV",
              "PDF",
              "MP4",
              "Python",
              "JavaScript",
            ]);
          }
        }
        Entry();
        {
          Name("ContentEditableLabel");
          ContentEditableLabel("The Last of Us");
        }
        Entry();
        {
          Name("DemoWarning");
          DemoWarning();
        }
        Entry();
        {
          Name("TypedButton");
          TypedButton("Preferences");
          {
            Icon.Plus();
          }
        }
        Entry();
        {
          Name("ActivatedInfoButton");
          ActivatedInfoButton("H·Lachenmann piano works");
        }
        Entry();
        {
          Name("DectivatedInfoButton");
          DectivatedInfoButton("Orechestra Works");
        }
        Entry();
        {
          Name("InfoButton");
          InfoButton("All Works");
        }
        // Entry();
        // {
        //   Name("UnDeactivatableInfoButton");
        //   UnDeactivatableInfoButton("All Works");
        // }
        Entry();
        {
          Name("AddFnButton");
          AddFnButton().callback(() => {
            this.isOpen = true;
          });
        }
        Entry();
        {
          Name("ConfirmButton");
          ConfirmButton("Export").onClick(() => {
            console.log("Export Confirm!");
          });
        }
        Entry();
        {
          Name("InvalidConfirmButton");
          InvalidConfirmButton("Import");
        }
        Entry();
        {
          Name("WeakTextButton");
          WeakTextButton("cancle").onClick(() => {
            console.log("cancle Clicked!");
          });
        }

        Entry();
        {
          Name("PresentLabelBar");
          PresentLabelBar().labels(["Python", "JavaScript", "TypeScript"]);
        }
        Entry();
        {
          Name("ItemBar");
          ItemBar("Ⅴ.04 交響曲第２番「三つのオード」Ⅱ").dataTags([
            "WAV",
            "PDF",
            "MP4",
            "OGG",
          ]);
        }
        Entry();
        {
          Name("ItemToolBar");
          ItemToolBar().labels([
            "Python",
            "JavaScript",
            "TypeScript",
            "C++",
            "Rust",
            "Go",
            "Java",
            "Kotlin",
            "Swift",
            "Objective-C",
            "Ruby",
            "PHP",
            "Perl",
            "Scala",
            "Groovy",
            "Clojure",
            "Haskell",
            "Erlang",
            "Elixir",
            "Julia",
            "R",
            "Dart",
            "Lua",
            "CoffeeScript",
            "Shell",
            "PowerShell",
            "Batch",
            "VimScript",
            "Emacs Lisp",
            "TeX",
            "Markdown",
            "HTML",
            "CSS",
            "SCSS",
            "Less",
            "Stylus",
            "Sass",
            "JSON",
            "YAML",
            "XML",
            "SQL",
            "NoSQL",
            "GraphQL",
            "REST",
            "SOAP",
            "gRPC",
            "WebRTC",
            "WebSockets",
            "HTTP",
            "HTTPS",
            "TCP",
            "UDP",
            "IP",
            "DNS",
            "DHCP",
            "FTP",
            "SFTP",
            "SSH",
            "Telnet",
            "SMTP",
            "POP3",
            "IMAP",
            "HTTP/2",
            "HTTP/3",
            "HTTP/1.1",
            "HTTP/1.0",
            "HTML5",
            "CSS3",
            "ECMAScript",
            "ES6",
          ]);
        }
        Entry();
        {
          Name("TitleBar");
          TitleBar("Rebecca Saunders's piano concerto").labels([
            "MP3",
            "PDF",
            "Rebecca Saunders",
            "Piano Concerto",
            "FLAC",
          ]);
        }
        Entry();
        {
          Name("ToastNotification(Needs to be implemented)");
          ConfirmButton("Show Toast").onClick(() => {
            // console.log("active toast");
            // this.updateToasts()
            // this.toasts.push({
            //   title: "File upload failed",
            //   content: "Please retry it",
            //   type: "error",
            // });
            // this.updateToasts(this.toasts);
            // console.log(this.toasts);
          });
        }
        Entry();
        {
          Name("ToastMassage");
          ToastMassage()
            .title("Upload failed")
            .content("Please check your file integrity.");
        }
        Entry();
        {
          Name("MagneticButton");
          MagneticButton("test");
          {
            span("Magnetic").class(
              "relative text-sm text-zinc-600 transition-colors  dark:text-zinc-400 dork:hover:text-zinc-100 px-2"
            );
          }
        }
        Entry();
        {
          Name("ContextMenuButton");
          ContextMenuButton("Setting").onClick(() => {
            console.log("Context Menu Button Clicked!");
          });
          {
            Icon.Plus();
          }
        }
        Entry();
        {
          Name("SpaceAddContextMenu");
          SpaceAddContextMenu();
        }

        div().class("min-h-60");
        // ToastNotificationBottomRight();
        // ToastNotification().show(true);
        // SidePanel();
        FilterModalBox()
          .isOpen(this.isOpen)
          .onClose(() => {
            this.isOpen = false;
          });
      }
    }
  }
}

export default Library as Pretty as Typed<LibraryProp>;
