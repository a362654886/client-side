import * as React from "react";
import { useEffect, useState } from "react";
import { videoDelete, videosAllGet } from "../../../api/videoAPI";
import AnimeButton, { MiddleDiv } from "../../../components/Button";
import {
  FromText,
  TimeText,
  UserNameText,
  VideoBottom,
  VideoBottomImg,
  VideoDiv,
  VideoIframe,
  VideoIframeDiv,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import {
  AnimOneVideo,
  Subtitle,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneVideoCss";
import { AnimeAddButtonDiv } from "../../../cssJs/AnimePage/AnimeOneCss";
import { LoadingImgDiv } from "../../../cssJs/homePageCss";
import { Anime } from "../../../types/Amine";
import loadingImg from "../../../files/loading.gif";
import { Video, VideoType } from "../../../types/VideoType";
import { popUpAPIResult } from "../../../helperFns/popUpAlert";

interface IProps {
  anime: Anime | null;
  pageSizeSetting: number;
  ifShowHeader: boolean;
  ifShowAdd: boolean;
  toAddVideo?: (page: number) => void;
  toVideo?: (num: number) => void;
}

const AnimeOneVideo = ({
  anime,
  pageSizeSetting,
  ifShowHeader,
  ifShowAdd,
  toAddVideo,
  toVideo,
}: IProps): JSX.Element => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [update, setUpdate] = useState(0);

  const pageSize = pageSizeSetting;

  useEffect(() => {
    console.log(videos);
  }, [videos, update]);

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
      setCount(videoResult.count);
    }
    setLoading(false);
  };

  const deleteVideo = (videoId: string) => {
    popUpAPIResult<Promise<number | null>>(
      videoDelete(videoId),
      "delete video fail"
    );
    const newVideos = videos;
    const index = newVideos.map((video) => video._id).indexOf(videoId);
    newVideos.splice(index, 1);
    setVideos(newVideos);
    setUpdate(update + 1);
  };

  const getExistVideos = () =>
    videos.map((video, index) => {
      const date = new Date(video.uploadTime);
      return (
        <VideoDiv key={index}>
          {video.type == VideoType.Link ? (
            <VideoIframe
              key={index}
              src={
                video.link.indexOf("facebook") == -1
                  ? video.link.replace("watch?v=", "embed/")
                  : video.link
              }
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title={video.title}
            />
          ) : (
            <VideoIframeDiv
              dangerouslySetInnerHTML={{ __html: video.link }}
            ></VideoIframeDiv>
          )}
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
              buttonClick={() => deleteVideo(video._id)}
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
      {ifShowAdd ? (
        count > 0 ? (
          <>
            <MiddleDiv>
              <AnimeButton
                para=""
                text={"View More"}
                width="120px"
                height="32px"
                textColor="#F5A623"
                backGroundColor="#FBFCDB"
                borderColor="#F5A623"
                buttonClick={() => (toVideo ? toVideo(1) : {})}
              />
            </MiddleDiv>
          </>
        ) : (
          <></>
        )
      ) : (
        <>
          {videos.length < count ? (
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
          ) : (
            <></>
          )}
        </>
      )}
      <br />
    </AnimOneVideo>
  );
};

export default AnimeOneVideo;
