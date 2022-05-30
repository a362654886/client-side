import { Spin, Upload } from "antd";
import { RcFile, UploadChangeParam } from "antd/lib/upload";
import { UploadFile } from "antd/lib/upload/interface";
import * as React from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import add from "../../../files/Add.svg";
import { AvatarUploadText } from "../../../cssJs/AdminPage/adminSysSettingCss";
import { NotificationColor, NotificationTitle, openNotification } from "../../../helperFns/popUpAlert";
import { getCompressImage } from "../../../helperFns/imageCompress";

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

const ImageUpload = ({
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
    console.log(margin);
  }, []);

  const fileCheck = (file: RcFile | undefined) => {
    if (file === undefined) {
      console.log("file dont exist!");
      return false;
    }
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      openNotification(
        "You can only upload JPG/PNG file!",
        NotificationColor.Error,
        NotificationTitle.Error
      );
      return false;
    }
    /*const isLt2M = file.size / 1024 / 1024 < 10;
    if (!isLt2M) {
      openNotification(
        "Image must smaller than 2MB!",
        NotificationColor.Error,
        NotificationTitle.Error
      );
      return false;
    }*/
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
      const compressFile = await getCompressImage(info.file.originFileObj as RcFile);
      await getBase64file(compressFile).then(
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

  const getBody = () => {
    return (
      <Upload showUploadList={false} onChange={(e) => handleChange(e)}>
        <div style={{ display: "flex" }}>
          <img
            style={{ height: "36px", width: "36px", marginRight: "8px" }}
            src={add}
          />
          <AvatarUploadText>{text}</AvatarUploadText>
        </div>
      </Upload>
    );
  };

  return <>{loading ? <Spin /> : getBody()}</>;
};

export default ImageUpload;
