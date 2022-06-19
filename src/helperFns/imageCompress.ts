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
      const url = await imageAdd({
        _id: "",
        imageValue: base64Image,
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
