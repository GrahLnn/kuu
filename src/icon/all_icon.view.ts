import { Typed, Pretty, q } from "@dlightjs/dlight";
import { IconProps } from "./skeleton/icon_data";
import { createIcon } from "./skeleton/icon_templete.view";

export const Icon = {
  ArrowLeft: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><line x1="2.75" y1="9" x2="15.25" y2="9"></line><polyline points="7 13.25 2.75 9 7 4.75"></polyline></g></svg>'
  ) as Pretty as Typed<IconProps>,
  TrangleWarning: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 12 12"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><circle cx="6" cy="10.125" r=".875" fill="#212121" stroke-width="1.5"></circle><line x1="6" y1="4.75" x2="6" y2="7.75"></line><path d="m8.625,10.25h1.164c1.123,0,1.826-1.216,1.265-2.189L7.265,1.484c-.562-.975-1.969-.975-2.53,0L.946,8.061c-.561.973.142,2.189,1.265,2.189h1.164"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  XMark: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 12 12"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><line x1="2.25" y1="9.75" x2="9.75" y2="2.25"></line><line x1="9.75" y1="9.75" x2="2.25" y2="2.25"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  AspectRatioSquare2: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><rect x="2.75" y="2.75" width="12.5" height="12.5" rx="2" ry="2" transform="translate(18 18) rotate(180)"></rect><polyline points="12.75 8.25 12.75 5.25 9.75 5.25"></polyline><polyline points="8.25 12.75 5.25 12.75 5.25 9.75"></polyline></g></svg>'
  ) as Pretty as Typed<IconProps>,
  BoxArchive: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M14.75,6.25v7c0,1.105-.895,2-2,2H5.25c-1.105,0-2-.895-2-2V6.25"></path><rect x="1.75" y="2.75" width="14.5" height="3.5" rx="1" ry="1"></rect><line x1="7" y1="9.25" x2="11" y2="9.25"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  CircleCompose2: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M16.182,8c.045,.327,.068,.661,.068,1,0,4.004-3.246,7.25-7.25,7.25S1.75,13.004,1.75,9,4.996,1.75,9,1.75c.339,0,.673,.023,1,.068"></path><path d="M6.75,11.25s2.12-.12,2.836-.836l6.25-6.25c.552-.552,.552-1.448,0-2-.552-.552-1.448-.552-2,0l-6.25,6.25c-.716,.716-.836,2.836-.836,2.836Z"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  CircleInfo: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><circle cx="9" cy="9" r="7.25"></circle><line x1="9" y1="12.819" x2="9" y2="8.25"></line><path d="M9,6.75c-.552,0-1-.449-1-1s.448-1,1-1,1,.449,1,1-.448,1-1,1Z" fill="#212121" data-stroke="none" stroke="none"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  FileContent: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><line x1="5.75" y1="6.75" x2="7.75" y2="6.75"></line><line x1="5.75" y1="9.75" x2="12.25" y2="9.75"></line><line x1="5.75" y1="12.75" x2="12.25" y2="12.75"></line><path d="M2.75,14.25V3.75c0-1.105,.895-2,2-2h5.586c.265,0,.52,.105,.707,.293l3.914,3.914c.188,.188,.293,.442,.293,.707v7.586c0,1.105-.895,2-2,2H4.75c-1.105,0-2-.895-2-2Z"></path><path d="M15.16,6.25h-3.41c-.552,0-1-.448-1-1V1.852"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Folder: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M2.25,8.75V4.75c0-1.105,.895-2,2-2h1.951c.607,0,1.18,.275,1.56,.748l.603,.752h5.386c1.105,0,2,.895,2,2v2.844"></path><path d="M4.25,6.75H13.75c1.105,0,2,.895,2,2v4.5c0,1.105-.895,2-2,2H4.25c-1.105,0-2-.895-2-2v-4.5c0-1.105,.895-2,2-2Z"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  GamePad3: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><circle cx="10.75" cy="7.25" r=".75" fill="#212121" data-stroke="none" stroke="none"></circle><circle cx="13.75" cy="7.25" r=".75" fill="#212121" data-stroke="none" stroke="none"></circle><circle cx="12.25" cy="6" r=".75" fill="#212121" data-stroke="none" stroke="none"></circle><circle cx="12.25" cy="8.5" r=".75" fill="#212121" data-stroke="none" stroke="none"></circle><line x1="5.75" y1="6" x2="5.75" y2="8.5"></line><line x1="7" y1="7.25" x2="4.5" y2="7.25"></line><line x1="6.23" y1="11.75" x2="11.769" y2="11.75"></line><circle cx="5.75" cy="11.5" r="1.5" fill="#212121" data-stroke="none" stroke="none"></circle><circle cx="12.25" cy="11.5" r="1.5" fill="#212121" data-stroke="none" stroke="none"></circle><path d="M14.173,13.435c.267,.517,.819,.862,1.452,.81,.802-.065,1.381-.805,1.375-1.609-.008-1.185-.168-2.627-.458-4.261-.671-3.787-2.118-5.625-4.042-5.625-.885,0-1.672,.39-2.221,1h-1.279s-1.279,0-1.279,0c-.549-.61-1.336-1-2.221-1-1.924,0-3.371,1.838-4.042,5.625-.289,1.634-.45,3.075-.458,4.261-.005,.804,.574,1.544,1.375,1.609,.633,.052,1.185-.294,1.452-.81"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  InboxArrowDown: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><polyline points="11.5 5.75 9 8.25 6.5 5.75"></polyline><line x1="9" y1="8.25" x2="9" y2="2.75"></line><path d="M16.214,9.75h-4.464v1c0,.552-.448,1-1,1h-3.5c-.552,0-1-.448-1-1v-1H1.787"></path><path d="M12,2.75h.137c.822,0,1.561,.503,1.862,1.269l2.113,5.379c.092,.233,.138,.481,.138,.731v3.121c0,1.105-.895,2-2,2H3.75c-1.105,0-2-.895-2-2v-3.121c0-.25,.047-.498,.138-.731l2.113-5.379c.301-.765,1.039-1.269,1.862-1.269h.137"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Link: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M8.5,6.827c-.352,.168-.682,.398-.973,.69l-.01,.01c-1.381,1.381-1.381,3.619,0,5l2.175,2.175c1.381,1.381,3.619,1.381,5,0l.01-.01c1.381-1.381,1.381-3.619,0-5l-.931-.931"></path><path d="M9.5,11.173c.352-.168,.682-.398,.973-.69l.01-.01c1.381-1.381,1.381-3.619,0-5l-2.175-2.175c-1.381-1.381-3.619-1.381-5,0l-.01,.01c-1.381,1.381-1.381,3.619,0,5l.931,.931"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Pen: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M2.75,15.25s3.599-.568,4.546-1.515c.947-.947,7.327-7.327,7.327-7.327,.837-.837,.837-2.194,0-3.03-.837-.837-2.194-.837-3.03,0,0,0-6.38,6.38-7.327,7.327s-1.515,4.546-1.515,4.546h0Z"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Plus: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><line x1="9" y1="3.25" x2="9" y2="14.75"></line><line x1="3.25" y1="9" x2="14.75" y2="9"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Sliders: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><line x1="13.25" y1="5.25" x2="16.25" y2="5.25"></line><line x1="1.75" y1="5.25" x2="8.75" y2="5.25"></line><circle cx="11" cy="5.25" r="2.25"></circle><line x1="4.75" y1="12.75" x2="1.75" y2="12.75"></line><line x1="16.25" y1="12.75" x2="9.25" y2="12.75"></line><circle cx="7" cy="12.75" r="2.25"></circle></g></svg>'
  ) as Pretty as Typed<IconProps>,
  SquarePlus: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><rect x="2.75" y="2.75" width="12.5" height="12.5" rx="2" ry="2"></rect><line x1="5.75" y1="9" x2="12.25" y2="9"></line><line x1="9" y1="5.75" x2="9" y2="12.25"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Trash: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><line x1="2.75" y1="4.25" x2="15.25" y2="4.25"></line><path d="M6.75,4.25v-1.5c0-.552,.448-1,1-1h2.5c.552,0,1,.448,1,1v1.5"></path><path d="M13.5,6.75l-.4,7.605c-.056,1.062-.934,1.895-1.997,1.895H6.898c-1.064,0-1.941-.833-1.997-1.895l-.4-7.605"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Wallet2: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M2.25,5.5h0c0-1.733,1.249-3.213,2.957-3.505L11.769,.875c.434-.074,.866,.145,1.063,.539l.053,.106"></path><path d="M15.75,11.25v2c0,1.105-.895,2-2,2H4.25c-1.105,0-2-.895-2-2V5.75c0-1.105,.895-2,2-2H13.75c1.105,0,2,.895,2,2v2"></path><path d="M15.75,11.25h-2.75c-.966,0-1.75-.784-1.75-1.75h0c0-.967,.784-1.75,1.75-1.75h2.75c.552,0,1,.448,1,1v1.5c0,.552-.448,1-1,1Z"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  ChevronRight: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><polyline points="6.5 2.75 12.75 9 6.5 15.25"></polyline></g></svg>'
  ) as Pretty as Typed<IconProps>,
  DuplicatePlus: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><rect x="5.25" y="5.25" width="11" height="11" rx="2" ry="2"></rect><path d="M2.801,11.998L1.772,5.074c-.162-1.093,.592-2.11,1.684-2.272l6.924-1.029c.933-.139,1.81,.39,2.148,1.228"></path><line x1="10.75" y1="13.25" x2="10.75" y2="8.25"></line><line x1="8.25" y1="10.75" x2="13.25" y2="10.75"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  StarSparkle: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M4.743,2.492l-.946-.315-.316-.947c-.102-.306-.609-.306-.711,0l-.316,.947-.946,.315c-.153,.051-.257,.194-.257,.356s.104,.305,.257,.356l.946,.315,.316,.947c.051,.153,.194,.256,.355,.256s.305-.104,.355-.256l.316-.947,.946-.315c.153-.051,.257-.194,.257-.356s-.104-.305-.257-.356Z" fill="#212121" data-stroke="none" stroke="none"></path><polyline points="13.469 9.728 16.25 7.017 11.24 6.29 9 1.75 6.76 6.29 1.75 7.017 5.375 10.551 4.519 15.54 8.864 13.256"></polyline><path d="M15.158,13.49l-1.263-.421-.421-1.263c-.137-.408-.812-.408-.949,0l-.421,1.263-1.263,.421c-.204,.068-.342,.259-.342,.474s.138,.406,.342,.474l1.263,.421,.421,1.263c.068,.204,.26,.342,.475,.342s.406-.138,.475-.342l.421-1.263,1.263-.421c.204-.068,.342-.259,.342-.474s-.138-.406-.342-.474Z" fill="#212121" data-stroke="none" stroke="none"></path><circle cx="14.25" cy="3.25" r=".75" fill="#212121" data-stroke="none" stroke="none"></circle></g></svg>'
  ) as Pretty as Typed<IconProps>,
  StackPerspective2: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M13.75,13.375l.691,.146c.932,.196,1.809-.515,1.809-1.468V4.619c0-.709-.497-1.322-1.191-1.468l-6.5-1.368c-.712-.15-1.388,.231-1.669,.843"></path><path d="M3.559,4.479l6.5,1.368c.694,.146,1.191,.758,1.191,1.468v7.434c0,.953-.877,1.664-1.809,1.468l-6.5-1.368c-.694-.146-1.191-.758-1.191-1.468V5.947c0-.953,.877-1.664,1.809-1.468Z"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  TableColNewRight: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><line x1="8.75" y1="15.25" x2="8.75" y2="2.75"></line><line x1="17.25" y1="9" x2="12.25" y2="9"></line><path d="M14.863,4.037c-.288-.751-1.01-1.287-1.863-1.287H4.75c-1.104,0-2,.895-2,2V13.25c0,1.105,.896,2,2,2H13c.853,0,1.575-.535,1.863-1.287"></path><line x1="14.75" y1="11.5" x2="14.75" y2="6.5"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  FolderPlus: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M2.25,8.75V4.75c0-1.105,.895-2,2-2h1.951c.607,0,1.18,.275,1.56,.748l.603,.752h5.386c1.105,0,2,.895,2,2v2.844"></path><line x1="14.75" y1="12.25" x2="14.75" y2="17.25"></line><path d="M15.75,9.961v-1.211c0-1.104-.895-2-2-2H4.25c-1.105,0-2,.896-2,2v4.5c0,1.104,.895,2,2,2h5.55"></path><line x1="17.25" y1="14.75" x2="12.25" y2="14.75"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  ObjAdd: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M15.25,11.75v1.5c0,1.105-.895,2-2,2H4.75c-1.105,0-2-.895-2-2v-1.5"></path><line x1="9" y1="2.75" x2="9" y2="9.75"></line><line x1="12.5" y1="6.25" x2="5.5" y2="6.25"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Siren: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height"size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M7.25,9c0-.965,.785-1.75,1.75-1.75"></path><line x1="9" y1=".75" x2="9" y2="2.25"></line><line x1="14.834" y1="3.166" x2="13.773" y2="4.227"></line><line x1="17.25" y1="9" x2="15.75" y2="9"></line><line x1="3.166" y1="3.166" x2="4.227" y2="4.227"></line><line x1=".75" y1="9" x2="2.25" y2="9"></line><rect x="3.25" y="13.75" width="11.5" height="2.5" rx=".5" ry=".5"></rect><path d="M4.75,13.75v-4.75c0-2.347,1.903-4.25,4.25-4.25h0c2.347,0,4.25,1.903,4.25,4.25v4.75"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Code2: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><polyline points="5.25 12.5 1.75 9 5.25 5.5"></polyline><polyline points="12.75 12.5 16.25 9 12.75 5.5"></polyline><line x1="7.5" y1="15.25" x2="10.5" y2="2.75"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  CubeSettings: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><polyline points="13.983 5.53 8 9 2.017 5.53"></polyline><line x1="8" y1="15.938" x2="8" y2="9"></line><line x1="13.75" y1="10.5" x2="13.75" y2="11.75"></line><line x1="16.048" y1="11.452" x2="15.164" y2="12.336"></line><line x1="17" y1="13.75" x2="15.75" y2="13.75"></line><line x1="16.048" y1="16.048" x2="15.164" y2="15.164"></line><line x1="13.75" y1="17" x2="13.75" y2="15.75"></line><line x1="11.452" y1="16.048" x2="12.336" y2="15.164"></line><line x1="10.5" y1="13.75" x2="11.75" y2="13.75"></line><line x1="11.452" y1="11.452" x2="12.336" y2="12.336"></line><circle cx="13.75" cy="13.75" r="1.75"></circle><path d="M14.25,8.06v-1.533c0-.713-.38-1.372-.997-1.73l-4.25-2.465c-.621-.36-1.386-.36-2.007,0L2.747,4.797c-.617,.358-.997,1.017-.997,1.73v4.946c0,.713,.38,1.372,.997,1.73l4.25,2.465c.603,.35,1.341,.353,1.951,.023"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Queue: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><rect x="2.75" y="2.75" width="12.5" height="5.5" rx="1" ry="1"></rect><line x1="2.75" y1="11.75" x2="15.25" y2="11.75"></line><line x1="2.75" y1="15.25" x2="15.25" y2="15.25"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  AddItem: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M14.75,8.75v5c0,1.105-.895,2-2,2H4.25c-1.105,0-2-.895-2-2V5.25c0-1.105,.895-2,2-2h5"></path><line x1="14.75" y1=".75" x2="14.75" y2="5.75"></line><line x1="17.25" y1="3.25" x2="12.25" y2="3.25"></line><line x1="2.25" y1="12.25" x2="14.75" y2="12.25"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  FilePlus: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><line x1="5.75" y1="6.75" x2="7.75" y2="6.75"></line><line x1="5.75" y1="9.75" x2="10.25" y2="9.75"></line><path d="M15.16,6.25h-3.41c-.552,0-1-.448-1-1V1.852"></path><line x1="14.75" y1="10.75" x2="14.75" y2="15.75"></line><path d="M15.25,8.3v-1.636c0-.265-.105-.52-.293-.707l-3.914-3.914c-.188-.188-.442-.293-.707-.293H4.75c-1.105,0-2,.896-2,2V14.25c0,1.104,.895,2,2,2h7.55"></path><line x1="17.25" y1="13.25" x2="12.25" y2="13.25"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Layers3: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M2.665,5.086L8.534,1.995c.292-.154,.64-.154,.932,0l5.87,3.091c.534,.281,.534,1.046,0,1.327l-5.87,3.091c-.292,.154-.64,.154-.932,0L2.665,6.414c-.534-.281-.534-1.046,0-1.327Z"></path><path d="M15.736,9c0,.261-.134,.523-.401,.664l-5.87,3.091c-.292,.154-.64,.154-.932,0l-5.87-3.091c-.267-.141-.401-.402-.401-.664"></path><path d="M15.736,12.25c0,.261-.134,.523-.401,.664l-5.87,3.091c-.292,.154-.64,.154-.932,0l-5.87-3.091c-.267-.141-.401-.402-.401-.664"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  WindowSparkle: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><circle cx="4.25" cy="5.25" r=".75" fill="#212121" data-stroke="none" stroke="none"></circle><circle cx="6.75" cy="5.25" r=".75" fill="#212121" data-stroke="none" stroke="none"></circle><line x1="1.75" y1="7.75" x2="16.25" y2="7.75"></line><path d="M16.25,9.752V4.75c0-1.104-.895-2-2-2H3.75c-1.105,0-2,.896-2,2V13.25c0,1.104,.895,2,2,2h5.25"></path><polygon points="14.25 11.25 15.25 13.25 17.25 14.25 15.25 15.25 14.25 17.25 13.25 15.25 11.25 14.25 13.25 13.25 14.25 11.25"></polygon></g></svg>'
  ) as Pretty as Typed<IconProps>,
  GlobeSerach: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M9.795,16.207c-.261,.029-.527,.043-.795,.043-4.004,0-7.25-3.246-7.25-7.25S4.996,1.75,9,1.75s7.25,3.246,7.25,7.25c0,.269-.015,.534-.043,.795"></path><path d="M16.25,9c0-1.657-3.246-3-7.25-3S1.75,7.343,1.75,9c0,1.657,3.246,3,7.25,3,.234,0,.464-.005,.692-.014"></path><path d="M11.986,9.699c.009-.23,.014-.463,.014-.699,0-4.004-1.343-7.25-3-7.25-1.657,0-3,3.246-3,7.25s1.343,7.25,3,7.25"></path><circle cx="14" cy="14" r="2.25"></circle><line x1="15.59" y1="15.59" x2="17.25" y2="17.25"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Itinerary4: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><rect x="11.75" y="11.75" width="4" height="4" rx="1" ry="1"></rect><circle cx="4.25" cy="4.25" r="2"></circle><line x1="7.5" y1="7.5" x2="10.25" y2="10.25"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Loader: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><line x1="9" y1="1.75" x2="9" y2="4.25"></line><line x1="14.127" y1="3.873" x2="12.359" y2="5.641" opacity=".88"></line><line x1="16.25" y1="9" x2="13.75" y2="9" opacity=".75"></line><line x1="14.127" y1="14.127" x2="12.359" y2="12.359" opacity=".63"></line><line x1="9" y1="16.25" x2="9" y2="13.75" opacity=".5"></line><line x1="3.873" y1="14.127" x2="5.641" y2="12.359" opacity=".38"></line><line x1="1.75" y1="9" x2="4.25" y2="9" opacity=".25"></line><line x1="3.873" y1="3.873" x2="5.641" y2="5.641" opacity=".13"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  SpinLoader: createIcon(
    '<svg class="animate-spin text-zinc-500 dark:text-white" xmlns="http://www.w3.org/2000/svg" width="size" height="size" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>'
  ) as Pretty as Typed<IconProps>,
  AppStore: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 48 48"><g fill="#212121" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="15" height="15" rx="2" fill="none" stroke="#212121" stroke-width="2"></rect><rect x="29.213" y="4.213" width="14.573" height="14.573" rx="1.943" transform="translate(2.559 29.178) rotate(-45)" fill="none" stroke="#212121" stroke-width="2"></rect><rect x="29" y="29" width="15" height="15" rx="2" fill="none" stroke="#212121" stroke-width="2"></rect><rect x="4" y="29" width="15" height="15" rx="2" fill="none" stroke="#212121" stroke-width="2"></rect></g></svg>'
  ) as Pretty as Typed<IconProps>,
  FolderLink: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M2.25,8.75V4.75c0-1.105,.895-2,2-2h1.951c.607,0,1.18,.275,1.56,.748l.603,.752h5.386c1.105,0,2,.895,2,2v2.844"></path><path d="M12.75,17.25h-.5c-.828,0-1.5-.672-1.5-1.5v-1c0-.828,.672-1.5,1.5-1.5h.5"></path><path d="M15.75,10.75v-2c0-1.104-.895-2-2-2H4.25c-1.105,0-2,.896-2,2v4.5c0,1.104,.895,2,2,2h4"></path><path d="M15.25,17.25h.5c.828,0,1.5-.672,1.5-1.5v-1c0-.828-.672-1.5-1.5-1.5h-.5"></path><line x1="13.25" y1="15.25" x2="14.75" y2="15.25"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  FolderCheck: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><path d="M2.25,8.75V4.75c0-1.105,.895-2,2-2h1.951c.607,0,1.18,.275,1.56,.748l.603,.752h5.386c1.105,0,2,.895,2,2v2.844"></path><path d="M15.75,9.764v-1.014c0-1.104-.895-2-2-2H4.25c-1.105,0-2,.896-2,2v4.5c0,1.104,.895,2,2,2h5.549"></path><polyline points="12.244 14.75 13.853 16.25 17.25 11.75"></polyline></g></svg>'
  ) as Pretty as Typed<IconProps>,
  CircleCheck3: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><circle cx="9" cy="9" r="7.25"></circle><path d="M5.5,9c.863,.867,1.537,1.868,2.1,2.962,1.307-2.491,2.94-4.466,4.9-5.923"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  MediaPlay: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="#212121"><path d="M15.1,7.478L5.608,2.222c-.553-.306-1.206-.297-1.749,.023-.538,.317-.859,.877-.859,1.499V14.256c0,.622,.321,1.182,.859,1.499,.279,.164,.586,.247,.895,.247,.293,0,.586-.075,.854-.223l9.491-5.256c.556-.307,.901-.891,.901-1.522s-.345-1.215-.9-1.522Z"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  MediaPause: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="#212121"><rect x="2" y="2" width="5" height="14" rx="1.75" ry="1.75"></rect><rect x="11" y="2" width="5" height="14" rx="1.75" ry="1.75"></rect></g></svg>'
  ) as Pretty as Typed<IconProps>,
  MediaNext: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="#212121"><path d="M12.667,7.59L4.413,3.021c-.511-.283-1.116-.275-1.618,.022-.498,.293-.795,.812-.795,1.387V13.57c0,.575,.297,1.094,.795,1.387,.258,.152,.542,.229,.828,.229,.271,0,.542-.069,.791-.207l8.254-4.57c.514-.285,.833-.825,.833-1.41s-.319-1.125-.833-1.41Z"></path><path d="M15.25,2c-.414,0-.75,.336-.75,.75V15.25c0,.414,.336,.75,.75,.75s.75-.336,.75-.75V2.75c0-.414-.336-.75-.75-.75Z"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  MediaPrevious: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="#212121"><path d="M15.205,3.042c-.502-.297-1.107-.305-1.618-.022L5.333,7.59c-.514,.285-.833,.825-.833,1.41s.319,1.125,.833,1.41l8.254,4.57c.249,.138,.52,.207,.791,.206,.285,0,.57-.076,.828-.228,.498-.293,.795-.812,.795-1.387V4.43c0-.575-.297-1.094-.795-1.387Z"></path><path d="M2.75,2c-.414,0-.75,.336-.75,.75V15.25c0,.414,.336,.75,.75,.75s.75-.336,.75-.75V2.75c0-.414-.336-.75-.75-.75Z"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  ArrowRight: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><line x1="15.25" y1="9" x2="2.75" y2="9"></line><polyline points="11 4.75 15.25 9 11 13.25"></polyline></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Nodes: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 48 48"><g fill="#212121" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="15" r="4" fill="none" stroke="#212121" stroke-width="2"></circle><circle cx="40.001" cy="15" r="4" fill="none" stroke="#212121" stroke-width="2"></circle><circle cx="24.001" cy="42" r="4" fill="none" stroke="#212121" stroke-width="2"></circle><line x1="24.001" y1="28" x2="24.001" y2="38" fill="none" stroke="#212121" stroke-width="2"></line><line x1="32.163" y1="37.409" x2="27.486" y2="40.04" fill="none" stroke="#212121" stroke-width="2"></line><line x1="8" y1="19" x2="8" y2="24" fill="none" stroke="#212121" stroke-width="2"></line><line x1="20.517" y1="22.041" x2="11.483" y2="16.959" fill="none" stroke="#212121" stroke-width="2"></line><line x1="27.487" y1="22.039" x2="36.515" y2="16.961" fill="none" stroke="#212121" stroke-width="2"></line><line x1="36.517" y1="13.04" x2="31.839" y2="10.409" fill="none" stroke="#212121" stroke-width="2"></line><circle cx="8" cy="33" r="4" fill="none" stroke="#212121" stroke-width="2"></circle><circle cx="40.001" cy="33" r="4" fill="none" stroke="#212121" stroke-width="2"></circle><circle cx="24.001" cy="24" r="4" fill="none" stroke="#212121" stroke-width="2"></circle><line x1="24.001" y1="10" x2="24.001" y2="20" fill="none" stroke="#212121" stroke-width="2"></line><circle cx="24.001" cy="6" r="4" fill="none" stroke="#212121" stroke-width="2"></circle><line x1="15.838" y1="10.591" x2="20.515" y2="7.96" fill="none" stroke="#212121" stroke-width="2"></line><line x1="16.163" y1="37.591" x2="11.484" y2="34.96" fill="none" stroke="#212121" stroke-width="2"></line><line x1="40.001" y1="24" x2="40.001" y2="29" fill="none" stroke="#212121" stroke-width="2"></line><line x1="20.517" y1="25.959" x2="11.483" y2="31.041" fill="none" stroke="#212121" stroke-width="2"></line><line x1="27.487" y1="25.961" x2="36.515" y2="31.039" fill="none" stroke="#212121" stroke-width="2"></line></g></svg>'
  ) as Pretty as Typed<IconProps>,
  DotsVertical: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 12 12"><g fill="#212121"><circle cx="6" cy="6" r="1" stroke-width="0"></circle><circle cx="6" cy="2" r="1" stroke-width="0"></circle><circle cx="6" cy="10" r="1" stroke-width="0"></circle></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Dots: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><circle cx="9" cy="9" r=".5" fill="#212121"></circle><circle cx="3.25" cy="9" r=".5" fill="#212121"></circle><circle cx="14.75" cy="9" r=".5" fill="#212121"></circle></g></svg>'
  ) as Pretty as Typed<IconProps>,
  Eye2: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><circle cx="9" cy="9" r="2.75"></circle><path d="M1.75,9S3.521,3.5,9,3.5s7.25,5.5,7.25,5.5"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
  HandBookOpen: createIcon(
    '<svg xmlns="http://www.w3.org/2000/svg" width="size" height="size" viewBox="0 0 18 18"><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" stroke="#212121"><line x1="9" y1="2.946" x2="9" y2="4.5"></line><path d="M16.25,8V3.487c0-.354-.181-.68-.486-.86-.637-.376-1.726-.863-3.14-.863-1.89,0-3.198,.872-3.624,1.182-.425-.31-1.734-1.181-3.624-1.182-1.414,0-2.503,.487-3.14,.863-.305,.18-.486,.502-.486,.856,0,1.618,0,6.498,0,9.09,0,.697,.696,1.188,1.344,.933,.27-.106,.573-.204,.906-.28"></path><path d="M17.25,15.225c0-2.059-.236-3.639-1-4.223-.875-.669-3.152-.838-5.295-.232l-1.33-2.827c-.293-.626-1.037-.896-1.663-.603h0c-.625,.292-.896,1.036-.604,1.661l2.561,5.456-2.724-.501c-.587-.108-1.167,.224-1.371,.785h0c-.232,.637,.098,1.34,.736,1.569l2.616,.941"></path></g></svg>'
  ) as Pretty as Typed<IconProps>,
};
