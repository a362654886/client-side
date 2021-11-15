import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { videosAllGet } from "../../../api/videoAPI";
import AnimeButton, { MiddleDiv } from "../../../components/Button";
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
import {
  AnimeAddButtonDiv,
} from "../../../cssJs/AnimePage/AnimeOneCss";
import { LoadingImgDiv } from "../../../cssJs/homePageCss";
import { Anime } from "../../../types/Amine";
import loadingImg from "../../../files/loading.gif";
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
  const dispatch = useDispatch();

  const [videos, setVideos] = useState<Video[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

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

  const getLoading = () =>
    loading ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      <></>
    );

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
      <AnimeAddButtonDiv
        style={{
          display: ifShowAdd ? "flex" : "none",
        }}
      >
        <h6>Videos</h6>
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
      </AnimeAddButtonDiv>
      <div style={{ marginTop: "23px" }}>{getExistVideos()}</div>
      {getLoading()}
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
