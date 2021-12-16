import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimeButton from "../../../components/Button";
import {
  AnimOneVideo,
  Subtitle,
  VideoButtonsDiv,
  VideoInput,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneVideoCss";
import { Anime } from "../../../types/Amine";
import { IStoreState } from "../../../types/IStoreState";
import { Avatar, User } from "../../../types/User";
import { videoAdd } from "../../../api/videoAPI";
import { Video, VideoType } from "../../../types/VideoType";
import { openNotification } from "../../../helperFns/popUpAlert";
import { LoadingType } from "../../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";

const AnimeOneVideoAdd = (): JSX.Element => {
  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [embed, setEmbed] = useState<string>("");
  const [videoType, setVideoType] = useState<boolean>(true);

  useEffect(() => {
    //
  }, [videoType]);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "title":
        setTitle((e.target as HTMLInputElement).value);
        break;
      case "link":
        setLink((e.target as HTMLInputElement).value);
        break;
      case "embed":
        setEmbed((e.target as HTMLInputElement).value);
        break;
      default:
        break;
    }
  };

  const submit = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const video: Video = {
        _id: `${loginUser?._id}${videoType ? link : embed}`,
        userId: loginUser?._id as string,
        anime: chooseAnime?._id as string,
        link: videoType ? link : embed,
        title: title,
        type: videoType ? VideoType.Link : VideoType.Embed,
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
      };
      await videoAdd(video);
    } else {
      openNotification("error", "please login and then reply");
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const getBody = () =>
    videoType ? (
      <>
        <VideoInput>
          <p>Title:</p>
          <Input placeholder={"title"} onChange={onChange}></Input>
        </VideoInput>
        <VideoInput>
          <p>Link:</p>
          <Input placeholder={"link"} onChange={onChange}></Input>
        </VideoInput>
      </>
    ) : (
      <>
        <TextArea rows={4} placeholder={"embed"} onChange={onChange} />
      </>
    );

  return (
    <AnimOneVideo>
      <Subtitle>
        You are welcome to add a media source for this Anime work. Embed a code
        acquired from the source site(Like Youtube), or simply input the title
        and link address
      </Subtitle>
      {getBody()}
      <VideoButtonsDiv>
        <AnimeButton
          para=""
          text={"<>Embed"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor={!videoType ? "white" : "#F6F6F6"}
          borderColor="#F6F6F6"
          buttonClick={() => setVideoType(false)}
        />
        <AnimeButton
          para=""
          text={"+Link"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor={videoType ? "white" : "#F6F6F6"}
          borderColor="#F6F6F6"
          buttonClick={() => setVideoType(true)}
        />
      </VideoButtonsDiv>
      <>
        <AnimeButton
          para=""
          text={"Post"}
          width="830px"
          height="36px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => submit()}
        />
      </>
    </AnimOneVideo>
  );
};

export default AnimeOneVideoAdd;
