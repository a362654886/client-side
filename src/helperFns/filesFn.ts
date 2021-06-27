import { Dispatch } from "@reduxjs/toolkit";
import { filesAdd } from "../api/fileAPI";
import {
  LOADING_ADD_NOW,
  LOADING_ADD_TOTAL,
  LOADING_INI,
} from "../redux/loading";
import { socketSend } from "../websocket/websocketFn";
import AWS, { AWSError } from "aws-sdk";

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
  sendFileToS3(uploadFileData.file.name, fileChunkList.length);
  //send file to video
};

export const sendFileToS3 = (name: string, length: number) => {
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

export const sendFileToAws = (file: File, dispatch: Dispatch<any>) => {
  dispatch({
    payload: 0,
    type: LOADING_INI,
  });

  const SESConfig = {
    apiVersion: "2006-03-01",
    accessKeyId: `AKIAQHA4MFR2WBOVFECF`,
    accessSecretKey: `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`,
    region: "us-east-1",
  };

  const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    accessKeyId: SESConfig.accessKeyId,
    secretAccessKey: SESConfig.accessSecretKey,
  });

  const params = {
    Bucket: "animevideobucket" /* required */,
    Key: file.name /* required */,
    Body: file,
  };

  s3.putObject(params, (err, data) => {
    if (err) {
      console.log("失败");
      console.log(err, err.stack); // an error occurred
    } else {
      // successful response
      console.log("成功");
      //成功之后将获取的objectKey值来替换img的路径
      //this.urlData = objectKey
      // console.log(data)
    }
  }).on("httpUploadProgress", function (evt) {
    dispatch({
      payload: evt.total,
      type: LOADING_ADD_TOTAL,
    });
    dispatch({
      payload: evt.loaded,
      type: LOADING_ADD_NOW,
    });
  });
};
