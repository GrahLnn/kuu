// import {
//   View,
//   Main,
//   Prop,
//   env,
//   Env,
//   div,
//   required,
//   Watch,
//   Model,
//   type Modeling,
//   button,
//   type Pretty,
//   type Typed,
// } from "@dlightjs/dlight";

// interface FilterModalBoxProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// @View
// export class FilterModalBox implements FilterModalBoxProps {
//   @Prop isOpen = required;
//   @Prop onClose = required;
//   show = false;

//   handleClose() {
//     this.show = false;
//     setTimeout(this.onClose, 300);
//   }

//   preventScroll = (event: MouseEvent) => {
//     event.preventDefault();
//     event.stopPropagation();
//   };

//   @Watch
//   open2show() {
//     setTimeout(() => {
//       this.show = this.isOpen;
//     }, 1);
//     if (this.isOpen) {
//       // 如果模态框是打开的，添加事件监听阻止滚动事件
//       document.addEventListener("wheel", this.preventScroll, {
//         passive: false,
//       });
//     } else {
//       // 如果模态框是关闭的，移除事件监听恢复滚动
//       document.removeEventListener("wheel", this.preventScroll, {
//         passive: false,
//       });
//     }

//     // 组件卸载时清除监听器，以防内存泄露
//     return () => {
//       document.removeEventListener("wheel", this.preventScroll, {
//         passive: false,
//       });
//     };
//   }

//   // didMount() {
//   //   setTimeout(() => {
//   //     this.show = this.isOpen;
//   //   }, 1);
//   // }

//   Body() {
//     if (!this.show && !this.isOpen) {
//     } else {
//       div()
//         .class(
//           `relative z-10 transition duration-300 ${
//             this.show ? "opacity-100" : "opacity-0"
//           }`
//         )
//         .ariaModal("true")
//         .onClick(this.handleClose);
//       // .didUpdate(() => {
//       //   this.show = !this.show;
//       // });
//       {
//         div().class(
//           "fixed inset-0 bg-gray-500 bg-opacity-40 dark:bg-[#262733] dark:bg-opacity-40 transition-opacity duration-300"
//         );
//         div().class("fixed inset-0 z-10 w-screen overflow-hidden");
//         {
//           div().class(
//             "flex min-h-full items-end justify-center p-4 text-center sm:items-start mt-0 sm:mt-36 sm:p-0 "
//           );
//           {
//             div()
//               .class(
//                 `relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg duration-300 ${
//                   this.show ? "scale-100" : "scale-75"
//                 }`
//               )
//               .onClick((e) => e.stopPropagation());
//             {
//               div().class("bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4");
//               {
//                 div().class("sm:flex sm:items-start");
//                 {
//                   div().class(
//                     "mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
//                   );
//                   {
//                     span()
//                       .innerHTML(`<svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
//                                     <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
//                                   </svg>`);
//                   }
//                   div().class("mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left");
//                   {
//                     h3("Deactivate account")
//                       .class("text-base font-semibold leading-6 text-gray-900")
//                       .id("modal-title");

//                     div().class("mt-2");
//                     {
//                       p(
//                         "Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone."
//                       ).class("text-sm text-gray-500");
//                     }
//                   }
//                 }
//               }
//               div().class(
//                 "bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6"
//               );
//               {
//                 button("Deactivate")
//                   .type("button")
//                   .class(
//                     "inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
//                   );

//                 button("Cancel")
//                   .type("button")
//                   .class(
//                     "mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
//                   )
//                   .onClick(() => {
//                     this.show = false;
//                   });
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
