import { ImportHistory, LabelRecord } from "./type";

export interface FileRecord {
  name: string;
  stem: string;
  path: string;
  size: string;
  logo: string;
  ext: string;
  hash: string;
  record_time: number;
  labels: string[];
  fix_labels: string[];
}

// export class FileRecord {
//   constructor(
//     public name: string,
//     public stem: string,
//     public path: string,
//     public size: string,
//     public logo: string,
//     public ext: string,
//     public hash: string,
//     public record_time: number
//   ) {}
// }

export interface ConfirmFileRecord extends FileRecord {
  confirm: boolean;
  time: string;
}

export class NodeRecord {
  constructor(
    public title: string,
    public linked_files: string[],
    public labels: string[] // public commits: OperationRecord[]
  ) {}
}

export class NodesCollection {
  constructor(public labels: string[], public nodes: NodeRecord[]) {}
}

export class OperationRecord {
  constructor(
    public operation: string,
    public time: string,
    public user: string
  ) {}
}

export enum FilterLevel {
  Favorite = "Favorite",
  Pinned = "Pinned",
  Temporary = "Temporary",
  Resent = "Resent",
}

export class FilterRecord {
  constructor(
    public name: string,
    public level: FilterLevel,
    public labels: string[],
    public nodes: NodeRecord[]
  ) {}
}

export class SpaceRecord {
  constructor(
    public name: string,
    public profile: string,
    public filters: FilterRecord[]
  ) {}
}

export interface GlobalData {
  labels?: LabelRecord[];
  setLabels?: (labels: LabelRecord[]) => void;
  spaces?: SpaceRecord[];
  curSpace?: SpaceRecord;
  storePath?: string;
  setStorePath?: (path: string) => void;
  importHistory?: ImportHistory;
  unshiftToNow?: (record: ConfirmFileRecord) => void;
  nodes?: NodeRecord[];
  setNodes?: (nodes: NodeRecord[]) => void;
  const?: Record<string, any>;
  notification?: string;
  setNotification?: (notification: string) => void;
  recordCount?: number;
  setRecordCount?: (count: number) => void;
}
