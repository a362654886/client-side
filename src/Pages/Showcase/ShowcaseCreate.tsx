import { Button, Radio, RadioChangeEvent } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showCaseAdd } from "../../api/showcaseAPI";
import AnimeButton from "../../components/Button";
import FullTextEditor from "../../components/FullTextEditor";
import ImageUpload, { ImageBody } from "../../components/ImageUpload";
import { TextInput } from "../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import {
  ShowCaseCreateImage,
  ShowcaseRadioDiv,
  ShowcaseTextInput,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { IStoreState } from "../../types/IStoreState";
import { ShowCaseEnum, ShowCaseType } from "../../types/showCaseType";
import { User } from "../../types/User";
import avatar from "../../files/avatar.png";

const ShowcaseCreate = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [imgArr, setImgArr] = useState<ImageBody[]>([]);
  const [html, setHtml] = useState<string>("");
  const [showCaseType, setShowCaseType] = useState<ShowCaseEnum>(
    ShowCaseEnum.Collections
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(imgArr);
  }, [imgArr]);

  const onChange = (e: RadioChangeEvent): void =>
    setShowCaseType(e.target.value as ShowCaseEnum);

  const setNewImage = (imageBody: ImageBody) => {
    const exist = imgArr
      .map((image) => image.imgName)
      .indexOf(imageBody.imgName);
    if (exist == -1) {
      const newArr = [];
      imgArr.forEach((image) => newArr.push(image));
      newArr.push(imageBody);
      setImgArr(newArr);
    }
  };

  const deleteImg = (index: number) => {
    const newArr: ImageBody[] = [];
    imgArr.forEach((image) => newArr.push(image));
    newArr.splice(index, 1);
    setImgArr(newArr);
  };

  const showCaseCreate = async () => {
    const id = new Date().valueOf().toString();
    const showCase: ShowCaseType = {
      _id: id,
      showCaseId: id,
      imageArr: imgArr.map((image) => image.imgBase64),
      type: showCaseType,
      userAvatar: loginUser
        ? loginUser.avatarImage
          ? loginUser.avatarImage[0].imageUrl
          : avatar
        : avatar,
      userName: loginUser ? loginUser.name : "",
      tags: [],
      text: html,
    };
    setLoading(true);
    const r = await showCaseAdd(showCase);
    setLoading(false);
  };

  return (
    <>
      {imgArr.map((image, index) => {
        return (
          <ShowCaseCreateImage
            key={index}
            style={{ height: `${image.height + 48}px` }}
          >
            <div>
              <img src={image.imgBase64} style={{ maxWidth: "1170px" }} />
            </div>
            <div>
              <Button onClick={() => deleteImg(index)}>Delete</Button>
            </div>
          </ShowCaseCreateImage>
        );
      })}
      <ImageUpload
        width={"100%"}
        height={"36px"}
        textColor={"#F5A623"}
        backGroundColor={"#FBFCDB"}
        border={"1px solid #F5A623"}
        text={"+ Image"}
        setImg={(value: ImageBody) => setNewImage(value)}
      />
      <ShowcaseTextInput>
        <FullTextEditor
          html={html}
          setFullText={(e) => {
            setHtml(e);
          }}
        />
        <br />
        <ShowcaseRadioDiv>
          <Radio.Group onChange={onChange} value={showCaseType}>
            <Radio value={ShowCaseEnum.Collections}>Collections</Radio>
            <Radio value={ShowCaseEnum.Originals}>Originals</Radio>
          </Radio.Group>
        </ShowcaseRadioDiv>
        <AnimeButton
          para=""
          text={"Post"}
          width="100%"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => showCaseCreate()}
        />
      </ShowcaseTextInput>
    </>
  );
};

export default ShowcaseCreate;
