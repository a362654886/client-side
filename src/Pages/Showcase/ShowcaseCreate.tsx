import { Button, Input, Radio, RadioChangeEvent, Space } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showCaseAdd } from "../../api/showcaseAPI";
import AnimeButton from "../../components/Button";
import FullTextEditor from "../../components/FullTextEditor";
import ImageUpload, { ImageBody } from "../../components/ImageUpload";
import {
  CancelButton,
  DescriptionInput,
  ShowCaseCreateImage,
  ShowCaseCreateImageHeader,
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
import { useHistory } from "react-router-dom";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";

const ShowcaseCreate = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const [imgArr, setImgArr] = useState<ImageBody[]>([]);
  const [html, setHtml] = useState<string>("");
  const [showCaseType, setShowCaseType] = useState<ShowCaseEnum>(
    ShowCaseEnum.Collections
  );
  const [tags, setTags] = useState<string[]>([]);
  const [sourceType, setSourceType] = useState<string>("origin");
  const [sourceValue, setSourceValue] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
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
        return "Series";
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

  const replaceNewImage = (imageBody: ImageBody) => {
    const newArr = [];
    newArr.push(imageBody);
    setImgArr(newArr);
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
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (TagCheck(tags)) {
      const r = await showCaseAdd(showCase);
      console.log(r);
    } else {
      openNotification(
        "please add # before tag",
        NotificationColor.Error,
        NotificationTitle.Error
      );
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const TagCheck = (tags: string[]) => {
    let r = true;
    (tags as string[]).forEach((tag: string) => {
      if (tag.indexOf("#") == -1) {
        r = false;
      }
    });
    return r;
  };

  const onSourceChange = (e: RadioChangeEvent) => setSourceType(e.target.value);

  const getImageUpload = () => {
    if (showCaseType !== ShowCaseEnum.Manga) {
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
            width={"240px"}
            height={"240px"}
            textColor={"black"}
            backGroundColor={"#F6F6F6"}
            border={"1px solid #F6F6F6"}
            text={""}
            setImg={(value: ImageBody) => setNewImage(value)}
            imageAdd={false}
          />
        </>
      );
    } else {
      return (
        <>
          <ShowCaseCreateImage
            style={{
              height: `${imgArr.length > 0 ? imgArr[0].height : 0 + 48}px`,
            }}
          >
            <div>
              <img
                src={imgArr.length > 0 ? imgArr[0].imgBase64 : ""}
                style={{ maxWidth: "1170px" }}
              />
            </div>
          </ShowCaseCreateImage>
          <ImageUpload
            width={"240px"}
            height={"32px"}
            textColor={"black"}
            backGroundColor={"#F6F6F6"}
            border={"1px solid #F6F6F6"}
            text={"Change the Cover Image"}
            setImg={(value: ImageBody) => replaceNewImage(value)}
          />
        </>
      );
    }
  };

  return (
    <>
      <ShowCaseTitleDiv>
        <ShowCaseTitle>{getHeader()}</ShowCaseTitle>
      </ShowCaseTitleDiv>
      {showCaseType == ShowCaseEnum.Manga ? (
        <>
          <ShowCaseCreateImageHeader>Title</ShowCaseCreateImageHeader>
          <TitleInput
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
          <ShowCaseCreateImageHeader>Write a caption</ShowCaseCreateImageHeader>
          <DescriptionInput
            placeholder=""
            onChange={(e) => setDescription(e.target.value)}
          />
        </>
      ) : (
        <></>
      )}
      <ShowCaseCreateImageHeader>
        {showCaseType == ShowCaseEnum.Manga ? "Cover Image" : "Images"}
      </ShowCaseCreateImageHeader>
      {getImageUpload()}
      <ShowcaseTextInput>
        {showCaseType == ShowCaseEnum.Manga ? (
          <></>
        ) : (
          <>
            <ShowCaseCreateImageHeader>
              Write a caption
            </ShowCaseCreateImageHeader>
            <FullTextEditor
              html={html}
              setFullText={(e) => {
                setHtml(e);
              }}
            />
          </>
        )}
        <br />
        <TagSelectDiv>
          <ShowCaseCreateImageHeader>Tags</ShowCaseCreateImageHeader>
          <TagSelect
            mode="tags"
            placeholder="#"
            defaultValue={tags}
            onChange={(e) => setTags(e as string[])}
            dropdownStyle={{ display: "none" }}
          ></TagSelect>
        </TagSelectDiv>
        <ShowCaseCreateImageHeader>Copyright Notice</ShowCaseCreateImageHeader>
        <ShowcaseRadioDiv>
          <Radio.Group onChange={onSourceChange} value={sourceType}>
            <Space direction="vertical">
              <Radio value="origin">I am the Author.</Radio>
              <TagRadioInput value="source">
                <p>I am Not the Author. This is from</p>
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
