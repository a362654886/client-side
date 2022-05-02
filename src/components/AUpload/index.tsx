import { Spin, Upload } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { AvatarUploadImg, UploadButtons } from "./style";
import addAvatar from "../../files/addAvatar.svg";

type ImageCheck = {
  width: number;
  height: number;
};

export type ImageBody = {
  width: number;
  height: number;
  imgBase64: string;
  imgName: string;
};

export const ImageUploadBody = styled.div`
  display: flex;
`;

interface IProps {
  setImg: (value: ImageBody) => void;
  text: string;
  width: string;
  height: string;
  textColor: string;
  backGroundColor: string;
  border: string;
  imageAdd?: boolean;
  margin: string;
}

const AUpload = ({
  setImg,
  text,
  width,
  height,
  textColor,
  backGroundColor,
  border,
  imageAdd,
  margin,
}: IProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
   // console.log(margin);
  }, []);

  const fileCheck = (file: RcFile | undefined) => {
    if (file === undefined) {
      console.log("file dont exist!");
      return false;
    }
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      console.log("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      console.log("Image must smaller than 2MB!");
      return false;
    }
    return true;
  };

  const handleChange = async (info: UploadChangeParam<UploadFile<RcFile>>) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    }
    let resultImg: ImageBody = {
      height: 0,
      width: 0,
      imgBase64: "",
      imgName: "",
    };
    const checkResult = fileCheck(info.file.originFileObj);
    if (checkResult) {
      await getBase64file(info.file.originFileObj as RcFile).then(
        (result: ImageBody) => {
          resultImg = result;
        }
      );
      setImg(resultImg);
    }
    setLoading(false);
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

  const getWidthAndHeight = (imageObj: HTMLImageElement) => {
    return new Promise((resolve: (value: ImageCheck) => void) => {
      imageObj.onload = () => {
        resolve({ width: imageObj.width, height: imageObj.height });
      };
    });
  };

  const getBody = () => (
    <Upload
      style={{
        width: width,
      }}
      showUploadList={false}
      onChange={(e) => handleChange(e)}
    >
      <AvatarUploadImg src={addAvatar} />
    </Upload>
  );

  return (
    <UploadButtons
      style={{
        width: width,
        height: height,
        color: textColor,
        backgroundColor: backGroundColor,
        borderRadius: imageAdd && imageAdd == true ? "4px" : "20px",
        border: border,
        fontWeight: "bold",
        fontSize: " 14px",
        textAlign: "center",
        margin: margin,
      }}
    >
      {loading ? <Spin /> : getBody()}
    </UploadButtons>
  );
};

export default AUpload;
