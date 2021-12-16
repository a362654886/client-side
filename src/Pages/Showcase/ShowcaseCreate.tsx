import { Button, Input, Radio, RadioChangeEvent, Select, Space } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showCaseAdd } from "../../api/showcaseAPI";
import AnimeButton from "../../components/Button";
import FullTextEditor from "../../components/FullTextEditor";
import ImageUpload, { ImageBody } from "../../components/ImageUpload";
import { TextInput } from "../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import {
  CancelButton,
  DescriptionInput,
  ShowCaseCreateImage,
  ShowcaseRadioDiv,
  ShowcaseTextInput,
  ShowCaseTitle,
  ShowCaseTitleDiv,
  TagRadioInput,
  TagSelect,
  TagSelectDiv,
  TitleInput,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { IStoreState } from "../../types/IStoreState";
import { ShowCaseEnum, ShowCaseType } from "../../types/showCaseType";
import { User } from "../../types/User";
import avatar from "../../files/avatar.png";
import { useHistory, useLocation } from "react-router-dom";
import { SelectValue } from "antd/lib/select";
import { openNotification } from "../../helperFns/popUpAlert";

const ShowcaseCreate = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const history = useHistory();

  const [imgArr, setImgArr] = useState<ImageBody[]>([]);
  const [html, setHtml] = useState<string>("");
  const [showCaseType, setShowCaseType] = useState<ShowCaseEnum>(
    ShowCaseEnum.Collections
  );
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagAdd, setTagAdd] = useState<boolean>(true);
  const [sourceType, setSourceType] = useState<string>("origin");
  const [sourceValue, setSourceValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    setShowCaseType((history.location.state as any).type);
  }, []);

  useEffect(() => {
    console.log(tags);
  }, [imgArr, tags]);

  const getHeader = () => {
    switch (showCaseType) {
      case ShowCaseEnum.Collections:
        return "Collections";
      case ShowCaseEnum.Illustrations:
        return "Illustrations";
      case ShowCaseEnum.Manga:
        return "Manga";
    }
  };

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
      userName: loginUser
        ? `${loginUser.firstName}.${loginUser.lastName
            .substring(0, 1)
            .toUpperCase()}`
        : "",
      userId: loginUser ? loginUser._id : "",
      tags: tags.map((tag, index) => {
        return {
          _id: id + index,
          text: tag,
        };
      }),
      text: html,
      source: sourceType == "origin" ? sourceType : "source" + sourceValue,
      title: title,
      description: description,
      aweSome: 0,
    };
    setLoading(true);
    if (tagAdd) {
      const r = await showCaseAdd(showCase);
    } else {
      openNotification("fail", "please add # before tag");
    }
    setLoading(false);
  };

  const addTag = (e: SelectValue) => {
    (e as string[]).forEach((tag: string) => {
      if (tag.indexOf("#") == -1) {
        setTagAdd(false);
      }
    });
    console.log(e);
    if (tagAdd) {
      setTags(e as string[]);
    } else {
      console.log("please add # before tag");
    }
  };

  const onSourceChange = (e: RadioChangeEvent) => setSourceType(e.target.value);

  return (
    <>
      <ShowCaseTitleDiv>
        <ShowCaseTitle>{getHeader()}</ShowCaseTitle>
      </ShowCaseTitleDiv>
      {showCaseType == ShowCaseEnum.Manga ? (
        <>
          <TitleInput
            placeholder="Titles"
            onChange={(e) => setTitle(e.target.value)}
          />
          <DescriptionInput
            placeholder="Descriptions"
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      ) : (
        <></>
      )}
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
        text={"Change Cover Image"}
        setImg={(value: ImageBody) => setNewImage(value)}
      />
      <ShowcaseTextInput>
        {showCaseType == ShowCaseEnum.Manga ? (
          <></>
        ) : (
          <FullTextEditor
            html={html}
            setFullText={(e) => {
              setHtml(e);
            }}
          />
        )}
        <br />
        <TagSelectDiv>
          <p>Tags:</p>
          <TagSelect
            mode="tags"
            placeholder=""
            defaultValue={tags}
            onChange={(e) => addTag(e)}
            dropdownStyle={{ display: "none" }}
          ></TagSelect>
        </TagSelectDiv>
        <ShowcaseRadioDiv>
          <Radio.Group onChange={onSourceChange} value={sourceType}>
            <Space direction="vertical">
              <Radio value="origin">It is my original work</Radio>
              <TagRadioInput value="source">
                <p>Source: </p>
                <Input
                  placeholder={"Authors and/or Publishers"}
                  onChange={(e) => {
                    setSourceValue(e.target.value);
                  }}
                ></Input>
              </TagRadioInput>
            </Space>
          </Radio.Group>
        </ShowcaseRadioDiv>
        <br />
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
        <CancelButton>
          <AnimeButton
            para=""
            text={"Cancel"}
            width="120px"
            height="32px"
            textColor="black"
            backGroundColor="white"
            borderColor="#302D46"
            buttonClick={() => {
              console.log("console");
            }}
          />
        </CancelButton>
      </ShowcaseTextInput>
    </>
  );
};

export default ShowcaseCreate;
