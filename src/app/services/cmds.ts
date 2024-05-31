import { invoke } from "@tauri-apps/api/core";
import WaveSurfer from "wavesurfer.js";
import { FileRecord, NodeRecord } from "../data/global_env";
import { LabelRecord, PreFileInfo } from "../data/type";

export async function importFile(path: string): Promise<any> {
  return await invoke("import_file", { path });
}

export async function importFileWithLabels(
  path: string,
  labels: Array<string>
): Promise<any> {
  return await invoke("import_file_with_labels", { path, labels });
}

export async function getPdfBase64(path: string): Promise<Array<string>> {
  return await invoke("get_pdf_base64", { path });
}

export async function loadAudio(path: string): Promise<Blob> {
  const audioData: Array<number> = await invoke("get_audio_array", { path });
  const blob = new Blob([new Uint8Array(audioData)], { type: "audio/mp3" });
  return blob;
}

export async function fetchNodeByHash(hash: string): Promise<NodeRecord> {
  return await invoke("fetch_node_by_hash", { hash });
}

export async function fetchLabels(): Promise<Array<LabelRecord>> {
  return await invoke("fetch_labels");
}

export async function updateNodeTitle(oldTitle: string, newTitle: string) {
  await invoke("update_node_title", { oldTitle, newTitle });
}

export async function fetchImgBase64(path: string): Promise<string> {
  return await invoke("fetch_img_base64", { path });
}

export async function addLabelAndLinkNode(title: string, nodeTitle: string) {
  await invoke("add_label_and_link_node", { title, nodeTitle });
}

export async function deleteNodeLabelLink(
  nodeTitle: string,
  labelTitle: string
): Promise<NodeRecord> {
  return await invoke("delete_node_label_link_return_new", {
    nodeTitle,
    labelTitle,
  });
}

export async function linkNodeToLabelReturnNew(
  nodeTitle: string,
  labelTitle: string
): Promise<NodeRecord> {
  return await invoke("link_node_to_label_return_new", {
    nodeTitle,
    labelTitle,
  });
}

export async function fetchPreFiles(path: string): Promise<Array<PreFileInfo>> {
  return await invoke("fetch_pre_files", { path });
}

export async function fetchAllNodes(): Promise<Array<NodeRecord>> {
  return await invoke("fetch_all_nodes");
}

export async function fetchNodesByLabels(
  labels: Array<string>
): Promise<Array<NodeRecord>> {
  return await invoke("fetch_nodes_by_labels", { labels });
}

export async function fetchFile(path: string): Promise<FileRecord> {
  return await invoke("fetch_file", { path });
}

export async function deleteFile(path: string) {
  await invoke("delete_file", { path });
}

export async function linkNewFile(
  path: string,
  title: string
): Promise<NodeRecord> {
  return await invoke("link_new_file", { path, title });
}

export async function addNewLabel(title: string) {
  await invoke("add_new_label", { title });
}

export async function updateLabel(oldTitle: string, newTitle: string) {
  await invoke("update_label", { oldTitle, newTitle });
}
