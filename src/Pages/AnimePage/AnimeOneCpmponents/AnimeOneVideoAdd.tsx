import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
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
import LoadingDiv from "../../../components/LoadingDiv";
import { openNotification } from "../../../helperFns/popUpAlert";

const AnimeOneVideoAdd = (): JSX.Element => {
  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [title, setTitle] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [embed, setEmbed] = useState<string>("");
  const [videoType, setVideoType] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
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
        userName: loginUser.name,
      };
      await videoAdd(video);
    } else {
      openNotification("error", "please login and then reply");
    }
    setLoading(false);
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

  const getSubmitButton = () => {
    if (loading) {
      return <LoadingDiv height="40px" width="40px" />;
    } else {
      return (
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
      );
    }
  };

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
      {getSubmitButton()}
    </AnimOneVideo>
  );
};

export default AnimeOneVideoAdd;
