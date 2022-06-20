import { RcFile } from "antd/lib/upload";
import imageCompression from "browser-image-compression";
import { imageAdd } from "../api/imageAPI";

export const getCompressImage = async (file: RcFile): Promise<RcFile> => {
  const options = {
    maxSizeMB: 0.5,
    maxWidthOrHeight: 820,
    useWebWorker: true,
  };
  const compressedFile = await imageCompression(file, options);
  return compressedFile as RcFile;
};

//

export const forumTextCompress = async (text: string) => {
  const textArr = text.split('<img src="data');
  let newText = "";
  for (let i = 0; i < textArr.length; i++) {
    const r = '<img[^<>]*? src="data([^<>]*?)"';
    const yyy = `<img src="data${textArr[i]}`.match(r);
    if (yyy && yyy[0].indexOf("<img") != -1) {
      const base64Image = `data${yyy[1]}`;
      const base64Size = getBase64Size(base64Image)
      const base64Compress = await compressImg(base64Image,800,1/base64Size)
      const url = await imageAdd({
        _id: "",
        imageValue: base64Compress,
        forumId: "forumImage",
      });
      const _newText = `<img src="data${textArr[i]}`.replace(
        yyy[0],
        `<img src="https://animeimagebucket.s3.amazonaws.com/${url}" /`
      );
      newText = newText + _newText;
    } else {
      newText = newText + textArr[i];
    }
  }
  return newText;
};

export const compressImg = (
  base64String: string,
  w: number,
  quality: number
) => {
  console.log(quality)
  const getMimeType = (urlData: any) => {
    const arr = urlData.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    return mime;
  };
  const newImage = new Image();
  let imgWidth, imgHeight;

  const promise = new Promise((resolve) => (newImage.onload = resolve));
  newImage.src = base64String;
  return promise.then(() => {
    imgWidth = newImage.width;
    imgHeight = newImage.height;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (Math.max(imgWidth, imgHeight) > w) {
      if (imgWidth > imgHeight) {
        canvas.width = w;
        canvas.height = (w * imgHeight) / imgWidth;
      } else {
        canvas.height = w;
        canvas.width = (w * imgWidth) / imgHeight;
      }
    } else {
      canvas.width = imgWidth;
      canvas.height = imgHeight;
    }
    (ctx as CanvasRenderingContext2D).clearRect(
      0,
      0,
      canvas.width,
      canvas.height
    );
    (ctx as CanvasRenderingContext2D).drawImage(
      newImage,
      0,
      0,
      canvas.width,
      canvas.height
    );
    const base64 = canvas.toDataURL(getMimeType(base64String), quality);
    return base64;
  });
};

const getBase64Size = (base64: string) => {
  base64 = base64.split(",")[1].split("=")[0];
  const strLength = base64.length;
  const fileLength = strLength - (strLength / 8) * 2;
  return Math.floor(fileLength)/(1024*1024);
};
