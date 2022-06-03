import { Input } from "antd";
import { cloneDeep } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import AnimeButton from "../../../components/Button";
import ImageUpload from "../../../components/ImageUpload";
import {
  AdminHomePageButtonsDiv,
  HeadlineInput,
} from "../../../cssJs/AdminPage/adminManagementCss";
import { HeaderLineImage } from "../../../cssJs/homePageCss";
import { ImageBody } from "../../../types/BasicType";
import { HeadLineType } from "../../../types/headLine";
import CropImgBodyDiv from "./CropImgBodyDiv";

interface IProps {
  headLine: HeadLineType | null;
  editHeadline: (headline: HeadLineType, ifNew: boolean) => void;
  num: number;
}

const AdminHomeLinePage = ({
  headLine,
  editHeadline,
  num,
}: IProps): JSX.Element => {
  const [localHeadLine, setLocalHeadLine] = useState<HeadLineType>({
    _id: "headline1",
    image: "",
    title: "",
    link: "",
    num: 1,
  });
  const [uploadImg, setLoadImg] = useState<ImageBody>({
    width: 0,
    height: 0,
    imgBase64: "",
    imgName: "",
  });
  const [showCropper, setShowCropper] = useState<boolean>(false);
  

  useEffect(() => {
    setIniHeadline();
  }, [headLine, num]);

  useEffect(() => {
    console.log(localHeadLine);
  }, [localHeadLine]);

  const setIniHeadline = () => {
    setLocalHeadLine(
      headLine
        ? headLine
        : {
            _id: `headline${num}`,
            image: "",
            title: "",
            link: "",
            num: 1,
          }
    );
  };

  const replaceNewImage = (imageBody: ImageBody) => {
    const newHeadline = cloneDeep(localHeadLine);
    newHeadline.image = imageBody.imgBase64;
    setLocalHeadLine(newHeadline);
  };

  const replaceLink = (link: string) => {
    const newHeadline = cloneDeep(localHeadLine);
    newHeadline.link = link;
    setLocalHeadLine(newHeadline);
  };

  const replaceTitle = (title: string) => {
    const newHeadline = cloneDeep(localHeadLine);
    newHeadline.title = title;
    setLocalHeadLine(newHeadline);
  };

  return (
    <div>
      <HeaderLineImage src={localHeadLine?.image} />
      <ImageUpload
        width={"240px"}
        height={"32px"}
        textColor={"black"}
        backGroundColor={"#F6F6F6"}
        border={"1px solid #F6F6F6"}
        text={"Change Image"}
        setImg={(value: ImageBody) => {
          setLoadImg(value);
          setShowCropper(true);
        }}
        margin={"20px auto"}
      />
      <CropImgBodyDiv
        uploadImg={uploadImg}
        setLoadImg={(imageBody: ImageBody) => {
          replaceNewImage(imageBody);
          setShowCropper(false);
        }}
        visible={showCropper}
        setVisibleFalse={() => setShowCropper(false)}
      />
      <HeadlineInput>
        <h6>Title</h6>
        <Input
          value={localHeadLine.title}
          onChange={(e) => {
            replaceTitle(e.target.value);
          }}
        />
      </HeadlineInput>
      <HeadlineInput>
        <p>Link</p>
        <Input
          value={localHeadLine.link}
          onChange={(e) => {
            replaceLink(e.target.value);
          }}
        />
      </HeadlineInput>
      <AdminHomePageButtonsDiv>
        <AnimeButton
          para=""
          text={"Submit"}
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() =>
            editHeadline(localHeadLine, headLine ? false : true)
          }
        />
        <AnimeButton
          para=""
          text={"Cancel"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="white"
          borderColor="#b8b8b8"
          buttonClick={() => setIniHeadline()}
        />
      </AdminHomePageButtonsDiv>
    </div>
  );
};

export default AdminHomeLinePage;
