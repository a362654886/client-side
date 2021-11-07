import * as React from "react";
import { useEffect, useState } from "react";
import { videosAllGet } from "../../../api/videoAPI";
import AnimeButton, { MiddleDiv } from "../../../components/Button";
import LoadingDiv from "../../../components/LoadingDiv";
import {
  FromText,
  TimeText,
  UserNameText,
  VideoBottom,
  VideoBottomImg,
  VideoDiv,
  VideoIframe,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import {
  AnimOneVideo,
  Subtitle,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneVideoCss";
import { Anime } from "../../../types/Amine";
import { Video } from "../../../types/VideoType";

interface IProps {
  anime: Anime | null;
  pageSizeSetting: number;
  ifShowHeader: boolean;
  ifShowAdd: boolean;
  toAddVideo?: (page: number) => void;
}

const AnimeOneVideo = ({
  anime,
  pageSizeSetting,
  ifShowHeader,
  ifShowAdd,
  toAddVideo,
}: IProps): JSX.Element => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState<number>(1);

  const pageSize = pageSizeSetting;

  useEffect(() => {
    (async function anyNameFunction() {
      await getVideos();
    })();
  }, [pageNum]);

  const getVideos = async () => {
    setLoading(true);
    const videoResult = await videosAllGet(
      anime ? anime._id : "",
      pageNum,
      pageSize
    );
    if (videoResult && videos.length < videoResult.count) {
      setVideos(videos.concat(videoResult.result));
    }
    setLoading(false);
  };

  const getVideosDiv = () =>
    !loading ? (
      <></>
    ) : (
      <MiddleDiv>
        <LoadingDiv width="200px" height="200px" />
      </MiddleDiv>
    );

  const getExistVideos = () =>
    videos.map((video, index) => {
      const date = new Date(video.uploadTime);
      return (
        <VideoDiv key={index}>
          <VideoIframe
            key={index}
            src={video.link.replace("watch?v=", "embed/")}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={video.title}
          />
          <VideoBottom>
            <TimeText>{`${date.getDay()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`}</TimeText>
            <FromText>from</FromText>
            <VideoBottomImg src={`${video.userAvatar}`} />
            <UserNameText>{video.userName}</UserNameText>
            <AnimeButton
              para=""
              text={"Delete"}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="white"
              borderColor="#302D46"
              buttonClick={() => {
                console.log("S");
              }}
            />
          </VideoBottom>
        </VideoDiv>
      );
    });

  const getMore = () => {
    const newPage = pageNum + 1;
    setPageNum(newPage);
  };

  return (
    <AnimOneVideo>
      <Subtitle style={{ display: ifShowHeader ? "" : "none" }}>
        You are welcome to add a media source for this Anime work. Embed a code
        acquired from the source site(Like Youtube), or simply input the title
        and link address
      </Subtitle>
      <MiddleDiv style={{ display: ifShowHeader ? "" : "none" }}>
        <AnimeButton
          para=""
          text={"Add"}
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => (toAddVideo ? toAddVideo(4) : "")}
        />
      </MiddleDiv>
      <div
        style={{
          display: ifShowAdd ? "inline" : "none",
        }}
      >
        <AnimeButton
          para=""
          text={"Add"}
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => (toAddVideo ? toAddVideo(4) : "")}
        />
      </div>
      <div style={{ marginTop: "23px" }}>
        {getExistVideos()}
        {getVideosDiv()}
      </div>
      <MiddleDiv>
        <AnimeButton
          para=""
          text={"View More"}
          width="120px"
          height="32px"
          textColor="#F5A623"
          backGroundColor="#FBFCDB"
          borderColor="#F5A623"
          buttonClick={() => getMore()}
        />
      </MiddleDiv>
      <br />
    </AnimOneVideo>
  );
};

export default AnimeOneVideo;
