import * as React from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import { ImageBody } from "../../types/BasicType";

type ImageCheck = {
  width: number;
  height: number;
};

export const Upload = styled.input`
  width: 180px;
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

const fileCheck = (file: File | undefined | null) => {
  if (file === undefined || file === null) {
    return false;
  }
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    openNotification(
      "please upload jpeg or png format image.",
      NotificationColor.Error,
      NotificationTitle.Error
    );
    return false;
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    openNotification(
      "Image must smaller than 2MB!",
      NotificationColor.Error,
      NotificationTitle.Error
    );
    return false;
  }
  return true;
};

const ImgUploadDiv = ({ setImg }: IProps): JSX.Element => {
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let resultImg: ImageBody = {
      height: 0,
      width: 0,
      imgBase64: "",
      imgName: "",
    };
    const files: FileList | null = (e.target as HTMLInputElement).files;
    const checkResult = fileCheck(files ? files[0] : null);
    if (files && checkResult) {
      await getBase64file(files[0]).then((result: ImageBody) => {
        resultImg = result;
      });
      setImg(resultImg);
    }
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

  const getWidthAndHeight = (imageObj: HTMLImageElement) => {
    return new Promise((resolve: (value: ImageCheck) => void) => {
      imageObj.onload = () => {
        resolve({ width: imageObj.width, height: imageObj.height });
      };
    });
  };

  return (
    <Upload
      type="file"
      onClick={(e) => {
        (e.target as any).value = "";
      }}
      onChange={(e) => handleImageChange(e)}
    />
  );
};

export default ImgUploadDiv;
