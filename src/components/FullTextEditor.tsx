import { UploadChangeParam } from "antd/lib/upload";
import { RcFile, UploadFile } from "antd/lib/upload/interface";
import imageCompression from "browser-image-compression";
import * as React from "react";
import { useRef } from "react";
import ReactQuill from "react-quill";
import { imageAdd } from "../api/imageAPI";
import { getCompressImage } from "../helperFns/imageCompress";
import { ImageBody, ImageCheck } from "./ImageUpload";

interface IProps {
  html: string;
  setFullText: (html: string) => void;
}

const FullTextEditor = ({ html, setFullText }: IProps): JSX.Element => {
  const textInput = useRef(null);

  const getWidthAndHeight = (imageObj: HTMLImageElement) => {
    return new Promise((resolve: (value: ImageCheck) => void) => {
      imageObj.onload = () => {
        resolve({ width: imageObj.width, height: imageObj.height });
      };
    });
  };

  const getBase64file = (file: RcFile) => {
    return new Promise((resolve: (value: ImageBody) => void) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const image = new Image();
        image.src = reader.result as string;
        const returnImg: ImageBody = {
          height: 0,
          width: 0,
          imgBase64: "",
          imgName: file.name,
        };
        await getWidthAndHeight(image).then((result: ImageCheck) => {
          returnImg.height = result.height;
          returnImg.width = result.width;
        });
        returnImg.imgBase64 = reader.result as string;
        resolve(returnImg);
      };
    });
  };

  const handlerImage = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("multiple", "multiple");
    input.click();
    input.onchange = async (e: any) => {
      let resultImg: ImageBody = {
        height: 0,
        width: 0,
        imgBase64: "",
        imgName: "",
      };
      const files = input.files;
      if (files) {
        Array.from(files).forEach(async (item) => {
          const compressedFile = await getCompressImage(item as RcFile);
          await getBase64file(compressedFile as RcFile).then(
            (result: ImageBody) => {
              resultImg = result;
            }
          );
          const url = await imageAdd({
            _id: "",
            imageValue: resultImg.imgBase64,
            forumId: "forumImage",
          });

          const quill = (textInput?.current as any).getEditor(); //获取到编辑器本身
          const cursorPosition = quill.getSelection().index; //获取当前光标位置
          quill.insertEmbed(
            //cursorPosition
            0,
            "image",
            `https://animeimagebucket.s3.amazonaws.com/${url}`
          ); //插入图片
          quill.setSelection(cursorPosition + 1); //光标位置加1
        });
      }
    };
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: handlerImage,
      },
    },
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <>
      <ReactQuill
        ref={textInput}
        theme={"snow"}
        onChange={(e) => setFullText(e)}
        value={html}
        modules={modules}
        formats={formats}
        bounds={".app"}
      />
    </>
  );
};

export default FullTextEditor;
