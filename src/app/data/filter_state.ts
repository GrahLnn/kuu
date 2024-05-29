export interface FilterEnv {
  curFilter?: Filter | null;
  allFilterNames?: string[];
  addFilter?: (filter: Filter) => void;
  removeFilter?: (filter: Filter) => void;
  filters?: Record<FilterLevel, Filter[]>;
  //   modalOpen?: boolean;
  //   setModalOpen?: (open: boolean) => void;
  setCurFilter?: (newFilter: Filter) => void;
  updateFilter?: (oldF: Filter, newF: Filter) => void;
}

export class Filter {
  constructor(
    public name: string,
    public level: FilterLevel,
    public labels: string[]
  ) {}
}

// export interface Filter {
//   name: string;
//   level: FilterLevel;
//   labels: string[];
// }

export enum FilterLevel {
  Favorite = "Favorite",
  Pinned = "Pinned",
  Temporary = "Temporary",
  Resent = "Resent",
}
// export let curFilter: string = "";
// export let modalOpen = false;
// export let allNames: string[] = [];
// export let filters: Filter[] = [];
// export function setModalOpen(open: boolean) {
//   modalOpen = open;
// }

// export function addFilter(filter: Filter) {
//   console.log("add");
//   filters.push(filter);
//   allNames.push(filter.name);
// }
// export function removeFilter(filter: Filter) {
//   filters = filters.filter((f) => f.name !== filter.name);
//   allNames = allNames.filter((f) => f !== filter.name);
//   console.log("remove");
//   console.log(filters);
// }
// export function updateCurFilter(newFilter: string) {
//   curFilter = newFilter;
// }

// export function setCurFilter(newFilter: string) {
//   curFilter = newFilter;
//   console.log("set");
// }
