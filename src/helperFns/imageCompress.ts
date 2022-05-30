import { RcFile } from "antd/lib/upload";
import imageCompression from "browser-image-compression";
import { ImageBody, ImageCheck } from "../components/ImageUpload";

export const getCompressImage = async (file: RcFile): Promise<RcFile> => {
  console.log(`originalFile size ${file.size / 1024 / 1024} MB`);
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  const compressedFile = await imageCompression(file, options);
  console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
  return compressedFile as RcFile;
};
