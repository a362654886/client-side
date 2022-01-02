import * as React from "react";
import { useEffect, useState } from "react";
import { videoDelete, videosAllGet } from "../../../api/videoAPI";
import AnimeButton, {
  MiddleDiv,
  MoreButtonDiv,
} from "../../../components/Button";
import {
  AvatarSettingImg,
  DeleteDiv,
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
import {
  AnimeAddButtonDiv,
  AnimeAddButtonLeftDiv,
  DiscoveryHead,
} from "../../../cssJs/AnimePage/AnimeOneCss";
import { LoadingImgDiv } from "../../../cssJs/homePageCss";
import { Anime } from "../../../types/Amine";
import loadingImg from "../../../files/loading.gif";
import { Video, VideoType } from "../../../types/VideoType";
import { popUpAPIResult } from "../../../helperFns/popUpAlert";
import deleteIcon from "../../../files/deleteIcon.svg";
import avatarSetting from "../../../files/avatarSetting.png";
import getMoreImg from "../../../files/getMore.png";

interface IProps {
  anime: Anime | null;
  pageSizeSetting: number;
  ifShowHeader: boolean;
  ifShowAdd: boolean;
  toAddVideo?: (page: number) => void;
  toVideo?: (num: number) => void;
  discovery?: boolean;
}

const AnimeOneVideo = ({
  anime,
  pageSizeSetting,
  ifShowHeader,
  ifShowAdd,
  toAddVideo,
  toVideo,
  discovery,
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
          {discovery ? <DiscoveryHead>{video.anime}</DiscoveryHead> : <></>}
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
            <TimeText>{`${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`}</TimeText>
            <FromText>from</FromText>
            <VideoBottomImg src={`${video.userAvatar}`} />
            <UserNameText>{video.userName}</UserNameText>
            <AvatarSettingImg src={`${avatarSetting}`} />
          </VideoBottom>
          {discovery ? (
            <></>
          ) : (
            <DeleteDiv onClick={() => deleteVideo(video._id)}>
              <img src={`${deleteIcon}`} />
              <AnimeButton
                para=""
                text={"Delete"}
                width="47px"
                height="32px"
                textColor="black"
                backGroundColor="#F6F6F6"
                borderColor="#F6F6F6"
                buttonClick={() => {
                  console.log("");
                }}
              />
            </DeleteDiv>
          )}
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
      {!ifShowAdd && !ifShowHeader ? (
        <></>
      ) : (
        <>
          <Subtitle style={{ display: ifShowHeader ? "" : "none" }}>
            You are welcome to add a media source for this Anime work. Embed a
            code acquired from the source site(Like Youtube), or simply input
            the title and link address
          </Subtitle>
          {ifShowAdd && ifShowHeader ? (
            <>
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
            </>
          ) : (
            <AnimeAddButtonLeftDiv
              style={{
                display: "flex",
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
            </AnimeAddButtonLeftDiv>
          )}
        </>
      )}
      <div style={{ marginTop: "16px" }}>{getExistVideos()}</div>
      {getLoading()}
      {ifShowAdd ? (
        count > 0 ? (
          <>
            <MiddleDiv>
              <AnimeButton
                para=""
                text={"View All"}
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
            <MoreButtonDiv onClick={() => getMore()}>
              <div>
                <img src={`${getMoreImg}`} />
                <p>Load More</p>
              </div>
            </MoreButtonDiv>
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
