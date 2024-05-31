import { ConfirmFileRecord } from "./global_env";

export enum Menu {
  AddSpace = "AddSpace",
  Archive = "Archive",
  ImportAdd = "ImportAdd",
  FileLinkContext = "FileLinkContext",
  LinkAdd = "LinkAdd",
}

export interface LabelRecord {
  title: string;
  is_assignable: boolean;
  time: number;
}

export interface PreFileInfo {
  path: string;
  folders: string[];
}

export enum FileType {
  Audio = "audio",
  Video = "video",
  Image = "image",
  PDF = "pdf",
  Document = "document",
  Archive = "archive",
  Text = "text",
  Other = "other",
}

export enum Guide {
  Import = "Import",
  View = "View",
  Tool = "Tool",
  Rule = "Rule",
  Space = "Space",
  Roadmap = "Roadmap",
}

export interface Warnings {
  [key: string]: string;
}

export enum HistoryState {
  Now = "Now",
  OneMinAgo = "1 min ago",
  TwoMinAgo = "2 min ago",
  FiveMinAgo = "5 min ago",
  FifteenMinAgo = "15 min ago",
  ThirtyMinAgo = "30 min ago",
  OneHourAgo = "1 hour ago",
  TwoHourAgo = "2 hours ago",
  FourHourAgo = "4 hours ago",
  EightHourAgo = "8 hours ago",
  TwelveHourAgo = "12 hours ago",
  SixteenHourAgo = "16 hours ago",
  TwientyHourAgo = "20 hours ago",
  OneDayAgo = "Yesterday",
  ThreeDayAgo = "3 days ago",
  OneWeekAgo = "Last week",
  OneMonthAgo = "Last month",
  LongerAgo = "Longer ago",
}

export type ImportHistory = Record<HistoryState, Array<ConfirmFileRecord>>;

export function updateHistory(
  history: ImportHistory,
  currentTimestamp: number
): ImportHistory {
  const newHistory: ImportHistory = {
    [HistoryState.Now]: [],
    [HistoryState.OneMinAgo]: [],
    [HistoryState.TwoMinAgo]: [],
    [HistoryState.FiveMinAgo]: [],
    [HistoryState.FifteenMinAgo]: [],
    [HistoryState.ThirtyMinAgo]: [],
    [HistoryState.OneHourAgo]: [],
    [HistoryState.TwoHourAgo]: [],
    [HistoryState.FourHourAgo]: [],
    [HistoryState.EightHourAgo]: [],
    [HistoryState.TwelveHourAgo]: [],
    [HistoryState.SixteenHourAgo]: [],
    [HistoryState.TwientyHourAgo]: [],
    [HistoryState.OneDayAgo]: [],
    [HistoryState.ThreeDayAgo]: [],
    [HistoryState.OneWeekAgo]: [],
    [HistoryState.OneMonthAgo]: [],
    [HistoryState.LongerAgo]: [],
  };

  Object.entries(history).forEach(([state, records]) => {
    records.forEach((record) => {
      const timeDiff = currentTimestamp - record.record_time;
      const newState = determineState(timeDiff);
      newHistory[newState].push(record);
    });
  });

  return newHistory;
}

function determineState(timeDiff: number): HistoryState {
  if (timeDiff < 60000) return HistoryState.Now; // 少于1分钟
  else if (timeDiff < 120000) return HistoryState.OneMinAgo; // 少于2分钟
  else if (timeDiff < 300000) return HistoryState.TwoMinAgo; // 少于5分钟
  else if (timeDiff < 900000) return HistoryState.FiveMinAgo; // 少于15分钟
  else if (timeDiff < 1800000) return HistoryState.FifteenMinAgo; // 少于30分钟
  else if (timeDiff < 3600000) return HistoryState.ThirtyMinAgo; // 少于1小时
  else if (timeDiff < 7200000) return HistoryState.OneHourAgo; // 少于2小时
  else if (timeDiff < 14400000) return HistoryState.TwoHourAgo; // 少于4小时
  else if (timeDiff < 28800000) return HistoryState.FourHourAgo; // 少于8小时
  else if (timeDiff < 43200000) return HistoryState.EightHourAgo; // 少于12小时
  else if (timeDiff < 57600000) return HistoryState.TwelveHourAgo; // 少于16小时
  else if (timeDiff < 72000000)
    return HistoryState.SixteenHourAgo; // 少于20小时
  else if (timeDiff < 86400000) return HistoryState.TwientyHourAgo; // 少于1天
  else if (timeDiff < 259200000) return HistoryState.OneDayAgo; // 少于3天
  else if (timeDiff < 604800000) return HistoryState.OneWeekAgo; // 少于1周
  else if (timeDiff < 2592000000) return HistoryState.OneMonthAgo; // 少于1个月
  else return HistoryState.LongerAgo; // 更久
}

export class Position {
  constructor(
    public l: number,
    public t: number,
    public w: number,
    public h: number,
    public r: number,
    public b: number
  ) {}
}

export class TransformPosition {
  constructor(public x: number, public y: number) {}
}

export interface MenuEnv {
  menu?: string;
  setMenu?: (menu: string) => void;
  position?: Position;
  setPosition?: (position: Position) => void;
  transformPosition?: TransformPosition;
  setTransform?: (position: TransformPosition) => void;
  offsetX?: number | null;
  offsetY?: number | null;
  setOffsetX?: (offsetX: number | null) => void;
  setOffsetY?: (offsetY: number | null) => void;
  data?: any;
  setData?: (data: any) => void;
  functions?: Record<string, () => void>;
  setFunctions?: (functions: Record<string, () => void>) => void;
}

export interface FaceEnv {
  face?: FaceEnum;
  setFace?: (face: FaceEnum) => void;
}

export enum FaceEnum {
  Aggregate = "Aggregate",
  Diverge = "Diverge",
}

const fileTypes = {
  audio: ["mp3", "wav", "flac", "aac", "ogg", "wma", "m4a"],
  video: ["mp4", "mkv", "avi", "mov", "wmv", "flv", "webm"],
  image: ["jpg", "jpeg", "png", "gif", "bmp", "webp", "svg"],
  pdf: ["pdf"],
  archive: ["zip", "rar", "7z", "tar", "gz", "bz2"],
  text: [
    "py",
    "js",
    "ts",
    "html",
    "css",
    "scss",
    "java",
    "c",
    "cpp",
    "h",
    "hpp",
    "cs",
    "php",
    "go",
    "rb",
    "sh",
    "rs",
    "kt",
    "swift",
    "dart",
    "md",
  ],
};

export function getFileType(ext: string): string {
  for (const [type, exts] of Object.entries(fileTypes)) {
    if (exts.includes(ext)) {
      return type;
    }
  }
  return "other";
}
