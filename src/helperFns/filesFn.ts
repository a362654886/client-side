import { Dispatch } from "@reduxjs/toolkit";
import { filesAdd } from "../api/fileAPI";
import { LOADING_ADD_TOTAL, LOADING_INI } from "../redux/loading";
import { socketSend } from "../websocket/websocketFn";

export const sendFile = async (value: FileList, dispatch: Dispatch<any>) => {
  dispatch({
    payload: 0,
    type: LOADING_INI,
  });
  const uploadFileData = {
    file: {
      name: "",
    },
  };
  uploadFileData.file = value[0];
  const fileChunkList = createFileChunk(uploadFileData.file);
  dispatch({
    payload: fileChunkList.length,
    type: LOADING_ADD_TOTAL,
  });
  for (let i = 0; i < fileChunkList.length; i++) {
    const obj = new FormData();
    obj.append("chunk", fileChunkList[i]);
    obj.append("fileName", uploadFileData.file.name);
    obj.append("hash", uploadFileData.file.name + "-" + i);
    // send files
    await filesAdd(obj);
  }
  sendFileToS3(uploadFileData.file.name,fileChunkList.length);
  //send file to video
};

export const sendFileToS3 = (name: string,length: number) => {
  socketSend(`{
        "fileName":"${name}",
        "type":"uploadFile",
        "length":"${length}"
    }`);
};

export const createFileChunk = (file: any) => {
  const chunkSize = 5 * 1024 * 1024; //分片大小 2M
  const chunks: Blob[] = []; //保存分片数据

  // 拆分文件
  if (file.size < chunkSize) {
    chunks.push(file.slice(0));
  } else {
    let start = 0;
    let end = 0;
    const t = true;
    while (t) {
      end += chunkSize;
      const blob = file.slice(start, end);
      start += chunkSize;
      if (!blob.size) {
        break;
      }
      chunks.push(blob);
    }
  }
  return chunks;
};
