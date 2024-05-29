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

interface ImportListProp {}

@View
class ImportList implements ImportListProp {}
export default ImportList as Pretty as Typed<ImportListProp>;
