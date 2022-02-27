import * as React from "react";
import { useEffect, useState } from "react";
import { videoDelete, videosAllGet } from "../../../api/videoAPI";
import AnimeButton, {
  MiddleBiggerDiv,
  MiddleDiv,
  MoreButtonDiv,
} from "../../../components/Button";
import {
  DeleteDiv,
  FromText,
  TimeText,
  UserNameText,
  VideoBottom,
  VideoBottomImg,
  VideoDiv,
  VideoIframeDiv,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import {
  AnimOneVideo,
  Subtitle,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneVideoCss";
import {
  AnimeAddButtonLeftDiv,
  DiscoveryHead,
} from "../../../cssJs/AnimePage/AnimeOneCss";
import { LoadingImgDiv } from "../../../cssJs/homePageCss";
import { Anime } from "../../../types/Amine";
import loadingImg from "../../../files/loading.gif";
import { Video, VideoType } from "../../../types/VideoType";
import { popUpAPIResult } from "../../../helperFns/popUpAlert";
import deleteIcon from "../../../files/deleteIcon.svg";
import getMoreImg from "../../../files/getMore.png";
import moreRightImg from "../../../files/moreRightArrow.png";
import { MoreRight } from "../../../cssJs/basicCss";
import SettingImg from "../../../components/SettingImg";
import ProfileWrapperDiv from "../../../components/ProfileWrapperDiv";
import Flag from "react-flagkit";
import { flagGet } from "../../../helperFns/flag";
import { User } from "../../../types/User";
import { useSelector } from "react-redux";
import { IStoreState } from "../../../types/IStoreState";
import DeleteWrapperDiv from "../../../components/DeleteWrapperDiv";
import { IfLoginCheck } from "../../../helperFns/loginCheck";
import { getWidth } from "../../../helperFns/widthFn";
import ReactPlayer from "react-player";
import { cloneDeep } from "lodash";

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
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

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
    if (pageNum > 1) {
      (async function anyNameFunction() {
        await getVideos();
      })();
    }
  }, [pageNum]);

  useEffect(() => {
    (async function anyNameFunction() {
      if (chooseAnime) {
        await getIniVideos();
      }
    })();
  }, [chooseAnime]);

  const getIniVideos = async () => {
    setLoading(true);
    const videoResult = await videosAllGet(
      discovery ? "" : chooseAnime ? chooseAnime._id : "",
      pageNum,
      pageSize
    );
    if (videoResult) {
      console.log(videoResult);
      setVideos(videoResult.result);
      setCount(videoResult.count);
    }
    setLoading(false);
  };

  const getVideos = async () => {
    setLoading(true);
    const videoResult = await videosAllGet(
      discovery ? "" : chooseAnime ? chooseAnime._id : "",
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
      "delete video fail",
      () => ""
    );
    const newVideos = videos;
    const index = newVideos.map((video) => video._id).indexOf(videoId);
    newVideos.splice(index, 1);
    setVideos(newVideos);
    setUpdate(update + 1);
  };

  const toOther = (url: string) => window.open(url);

  const getDeleteButton = (video: Video) => {
    if (loginUser && loginUser._id == video.userId) {
      return (
        <DeleteWrapperDiv
          element={
            <DeleteDiv>
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
          }
          deleteFn={() => deleteVideo(video._id)}
        />
      );
    } else {
      return <></>;
    }
  };

  const getBottomButton = (video: Video) => {
    const date = new Date(video.uploadTime);
    return (
      <>
        <VideoBottom>
          <TimeText>{`${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`}</TimeText>
          <FromText>from</FromText>
          <ProfileWrapperDiv
            userId={video.userId}
            element={
              <>
                <VideoBottomImg src={`${video.userAvatar}`} />
                <UserNameText>
                  {video.userName}
                  <Flag
                    style={{ marginLeft: "5px" }}
                    country={flagGet(
                      video.userCountry ? video.userCountry : ""
                    )}
                  />
                </UserNameText>
              </>
            }
          ></ProfileWrapperDiv>
          <SettingImg
            userId={video.userId}
            userName={video.userName}
            userImg={video.userAvatar}
            marginTop="24px"
          />
        </VideoBottom>
        {discovery ? <></> : getDeleteButton(video)}
      </>
    );
  };

  const linkWithEmbed = (video: Video, index: number) => {
    return (
      <ReactPlayer
        url={video.link}
        onError={(e) => {
          const newVideoArr = cloneDeep(videos);
          newVideoArr[index].type = VideoType.LinkError;
          setVideos(newVideoArr);
        }}
        width={getWidth() > 600 ? 808 : 200}
        height={getWidth() > 580 ? 580 : 400}
        style={{ margin: "0 auto" }}
      />
    );
  };

  const getExistVideos = () =>
    videos.map((video, index) => {
      const date = new Date(video.uploadTime);
      const videoLink =
        getWidth() > 600
          ? video.link.replace(
              "<iframe",
              "<iframe className='bi_iframe' width='808' height='580'"
            )
          : video.link.replace(
              "<iframe",
              "<iframe className='bi_iframe' width='200' height='400'"
            );
      return video.type == VideoType.Embed ? (
        <VideoDiv key={index}>
          {discovery ? <DiscoveryHead>{video.anime}</DiscoveryHead> : <></>}
          <VideoIframeDiv
            style={{ height: getWidth() > 600 ? "600px" : "400px" }}
            dangerouslySetInnerHTML={{ __html: videoLink }}
          ></VideoIframeDiv>
          {getBottomButton(video)}
        </VideoDiv>
      ) : (
        <VideoDiv key={index}>
          {discovery ? <DiscoveryHead>{video.anime}</DiscoveryHead> : <></>}
          {video.type == VideoType.Link ? (
            linkWithEmbed(video, index)
          ) : (
            <h2
              onClick={() => {
                toOther(video.link);
              }}
            >
              {video.title}
            </h2>
          )}
          {getBottomButton(video)}
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
                  buttonClick={() =>
                    IfLoginCheck(loginUser)
                      ? toAddVideo
                        ? toAddVideo(4)
                        : ""
                      : ""
                  }
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
                buttonClick={() =>
                  IfLoginCheck(loginUser)
                    ? toAddVideo
                      ? toAddVideo(4)
                      : ""
                    : ""
                }
              />
            </AnimeAddButtonLeftDiv>
          )}
        </>
      )}
      <div style={{ marginTop: "16px" }}>{getExistVideos()}</div>
      {getLoading()}
      {(ifShowAdd && ifShowHeader && count > 0) ||
      (!ifShowAdd && !ifShowHeader) ? (
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
      ) : (
        <>
          <MiddleBiggerDiv>
            <MoreRight onClick={() => (toVideo ? toVideo(1) : {})}>
              <img src={moreRightImg} />
              <p>More</p>
            </MoreRight>
          </MiddleBiggerDiv>
        </>
      )}
      <br />
    </AnimOneVideo>
  );
};

export default AnimeOneVideo;
