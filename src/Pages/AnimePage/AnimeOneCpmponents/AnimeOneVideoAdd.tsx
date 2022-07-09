import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimeButton from "../../../components/Button";
import {
  AnimOneVideo,
  Subtitle,
  VideoAddButtonsDiv,
  VideoButtonsDiv,
  VideoCancelButton,
  VideoInput,
  VideoPostButton,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneVideoCss";
import { Anime } from "../../../types/Amine";
import { IStoreState } from "../../../types/IStoreState";
import { Avatar, User } from "../../../types/User";
import { videoAdd } from "../../../api/videoAPI";
import { Video, VideoType } from "../../../types/VideoType";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
  popUpAPIResult,
} from "../../../helperFns/popUpAlert";
import { LoadingType } from "../../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import stateAvailable from "../../../files/stateAvailable.svg";
import stateSoldOut from "../../../files/stateSoldOut.svg";

interface IProps {
  toVideo: (num: number) => void;
}

const AnimeOneVideoAdd = ({ toVideo }: IProps): JSX.Element => {
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
  }, [videoType, link, embed]);

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
    if (embed.indexOf("iframe") == -1 && videoType == false) {
      openNotification(
        "there are embed error, please add iframe element",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    } else if (loginUser) {
      const video: Video = {
        _id: `${loginUser?._id}${new Date().valueOf()}`,
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
        hide: false,
      };
      dispatch({
        payload: LoadingType.OPEN,
        type: LOADING_OPEN,
      });
      await popUpAPIResult<Promise<number | null>>(
        videoAdd(video),
        "add new video fail",
        () => toVideo(1)
      );
      setLink("");
      setEmbed("");
      setTitle("");
      dispatch({
        payload: LoadingType.CLOSE,
        type: LOADING_CLOSE,
      });
    } else {
      openNotification(
        "please login and then reply",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    }
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
      <VideoButtonsDiv>
        <VideoAddButtonsDiv onClick={() => setVideoType(true)}>
          <img src={`${stateAvailable}`} />
          <AnimeButton
            para=""
            text={"+Link"}
            width="47px"
            height="32px"
            textColor="black"
            backGroundColor={"white"}
            borderColor="white"
            padding="0px"
            buttonClick={() => console.log()}
          />
        </VideoAddButtonsDiv>
        <VideoAddButtonsDiv onClick={() => setVideoType(false)}>
          <img src={`${stateSoldOut}`} />
          <AnimeButton
            para=""
            text={"<>Embed"}
            width="47px"
            height="32px"
            textColor="black"
            backGroundColor={"white"}
            borderColor="white"
            padding="0px"
            buttonClick={() => console.log()}
          />
        </VideoAddButtonsDiv>
      </VideoButtonsDiv>
      {getBody()}
      <VideoPostButton>
        <AnimeButton
          para=""
          text={"Post"}
          width="100%"
          height="36px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => submit()}
        />
      </VideoPostButton>
      <VideoCancelButton>
        <AnimeButton
          para=""
          text={"Cancel"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="white"
          borderColor="#302D46"
          buttonClick={() => window.location.reload()}
        />
      </VideoCancelButton>
    </AnimOneVideo>
  );
};

export default AnimeOneVideoAdd;
