import * as React from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";
import { ImageBody } from "../../types/BasicType";

type ImageCheck = {
  width: number;
  height: number;
};

export const Upload = styled.input`
  width: 300px;
  height: 40px;
  line-height: 32px;
  background-color: white;
  border-radius: 4px;
`;

export const ImageUploadBody = styled.div`
  display: flex;
`;

interface IProps {
  setImg: (value: ImageBody) => void;
}

const ImgUploadDiv = ({ setImg}: IProps): JSX.Element => {
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let resultImg: ImageBody = {
      height: 0,
      width: 0,
      imgBase64: "",
      imgName:""
    };
    const files: FileList | null = (e.target as HTMLInputElement).files;
    if (files) {
      await getBase64file(files[0]).then((result: ImageBody) => {
        resultImg = result;
      });
    }
    setImg(resultImg);
  };

  const getBase64file = (file: File) => {
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
          imgName: file.name
        };
        await getWidthAndHeight(image).then(
          (result: ImageCheck) => {
            returnImg.height = result.height;
            returnImg.width = result.width;
          }
        );
        returnImg.imgBase64 = reader.result as string;
        resolve(returnImg);
      };
    });
  };

  const getWidthAndHeight = (imageObj: HTMLImageElement) => {
    return new Promise(
      (resolve: (value: ImageCheck) => void) => {
        imageObj.onload = () => {
          resolve({ width: imageObj.width, height: imageObj.height });
        };
      }
    );
  };

  return (
      <Upload type="file" onChange={(e) => handleImageChange(e)} />
  );
};

export default ImgUploadDiv;
