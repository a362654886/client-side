import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { episodeGetById } from "../../api/episodeAPI";
import { LoadingBox } from "../../cssJs/headerCss";
import {
  EpisodeChapter,
  EpisodeDrawer,
  EpisodeShowDiv,
  EpisodeShowFooter,
  EpisodeShowFooterLeft,
  EpisodeShowFooterMiddle,
  EpisodeShowFooterRight,
  EpisodeShowHeader,
  EpisodeShowHeaderLeft,
  EpisodeShowHeaderMiddle,
  EpisodeShowHeaderRight,
  EpisodeShowPageDiv,
} from "../../cssJs/ShowCasePage/EpisodeCss";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { LoadingType } from "../../types/EnumTypes";
import { EpisodeType } from "../../types/EpisodeType";
import { IStoreState } from "../../types/IStoreState";
import loadingImg from "../../files/loading.gif";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import { getWidth } from "../../helperFns/widthFn";

const EpisodeShow = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loading: LoadingType = useSelector(
    (state: IStoreState) => state.loadingState
  );

  const [episodeId, setEpisodeId] = useState<string>("");
  const [episode, setEpisode] = useState<EpisodeType | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [update, setUpdate] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const id = history.location.state;
    if (id) {
      setEpisodeId(id as string);
    }
  }, []);

  useEffect(() => {
    console.log(scrollPosition);
  }, [scrollPosition]);

  useEffect(() => {
    (async function anyNameFunction() {
      dispatch({
        payload: LoadingType.OPEN,
        type: LOADING_OPEN,
      });
      await getEpisode();
      dispatch({
        payload: LoadingType.CLOSE,
        type: LOADING_CLOSE,
      });
    })();
  }, [episodeId]);

  useEffect(() => {
    //
  }, [episode, update, loading]);

  const getEpisode = async () => {
    const episodeResult = await episodeGetById(episodeId);
    if (episodeResult) {
      setEpisode(episodeResult.episodes);
      setCount(episodeResult.count);
      setUpdate(update + 1);
    }
  };

  const getImages = () => {
    if (episode) {
      return episode.imageArr.map((image, index) => {
        return <img style={{ width: "100%" }} key={index} src={image} />;
      });
    }
  };

  const onClose = () => setDrawerVisible(false);

  const toChapter = async (episode: number) => {
    const index = episodeId.indexOf("E");
    const id = episodeId.slice(0, index);
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const episodeResult = await episodeGetById(`${id}Episode${episode}`);
    if (episodeResult) {
      setEpisode(episodeResult.episodes);
      setEpisodeId(episodeResult.episodes._id);
      setCount(episodeResult.count);
      setUpdate(update + 1);
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const getChapters = () =>
    Array.from({ length: count }, (v, k) => k).map((n, index) => {
      return (
        <EpisodeChapter
          style={{
            fontSize: getWidth() > 600 ? "16px" : "10px",
            height: getWidth() > 600 ? "24px" : "14px",
          }}
          key={index}
          onClick={() => toChapter(index + 1)}
        >
          {`Episode ${index + 1}`}
        </EpisodeChapter>
      );
    });

  const calculateHeight = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const totalH =
      document.body.scrollHeight || document.documentElement.scrollHeight;
    const clientH = window.innerHeight || document.documentElement.clientHeight;
    const vaildH = totalH - clientH;
    const scrollH =
      document.body.scrollTop || document.documentElement.scrollTop;
    const result = ((scrollH / vaildH) * 100).toFixed(2);
    const totalPages = episode?.imageArr.length;
    const position = (parseFloat(result) * (totalPages ? totalPages : 0)) / 100;
    setScrollPosition(isNaN(position) ? 1 : parseInt(position.toString()));
  };

  const prePage = async () => {
    const index = episodeId.indexOf("e");
    const number = episodeId.slice(index + 1, episodeId.length);
    const episodeString = episodeId.slice(0, index + 1);
    if (parseInt(number) > 1) {
      dispatch({
        payload: LoadingType.OPEN,
        type: LOADING_OPEN,
      });
      const episodeResult = await episodeGetById(
        `${episodeString}${parseInt(number) - 1}`
      );
      if (episodeResult) {
        setEpisode(episodeResult.episodes);
        setEpisodeId(episodeResult.episodes._id);
        setCount(episodeResult.count);
        setUpdate(update + 1);
      }
      dispatch({
        payload: LoadingType.CLOSE,
        type: LOADING_CLOSE,
      });
    } else {
      openNotification(
        "this is the first page",
        NotificationColor.Info,
        NotificationTitle.Info
      );
    }
  };

  const nextPage = async () => {
    const index = episodeId.indexOf("e");
    const number = episodeId.slice(index + 1, episodeId.length);
    const episodeString = episodeId.slice(0, index + 1);
    if (parseInt(number) < count) {
      dispatch({
        payload: LoadingType.OPEN,
        type: LOADING_OPEN,
      });
      const episodeResult = await episodeGetById(
        `${episodeString}${parseInt(number) + 1}`
      );
      if (episodeResult) {
        setEpisode(episodeResult.episodes);
        setEpisodeId(episodeResult.episodes._id);
        setCount(episodeResult.count);
        setUpdate(update + 1);
      }
      dispatch({
        payload: LoadingType.CLOSE,
        type: LOADING_CLOSE,
      });
    } else {
      openNotification(
        "This is the end",
        NotificationColor.Info,
        NotificationTitle.Info
      );
    }
  };

  return (
    <div
      onWheel={(e) => calculateHeight(e)}
      onMouseEnter={(e) => calculateHeight(e)}
    >
      <LoadingBox>
        <div className={loading == LoadingType.OPEN ? "mask" : "noMask"}>
          <img src={`${loadingImg}`} />
        </div>
      </LoadingBox>
      <EpisodeShowDiv>
        <EpisodeShowHeader>
          <EpisodeShowHeaderLeft
            style={{ fontSize: getWidth() > 600 ? "20px" : "13px" }}
            onClick={() => history.push("/showcase/Manga")}
          >
            Back
          </EpisodeShowHeaderLeft>
          <EpisodeShowHeaderMiddle
            style={{ fontSize: getWidth() > 600 ? "20px" : "13px" }}
          >
            {episode?.title}
          </EpisodeShowHeaderMiddle>
          <EpisodeShowHeaderRight
            onClick={() => {
              setDrawerVisible(true);
            }}
            style={{ fontSize: getWidth() > 600 ? "20px" : "13px" }}
          >
            Episodes
          </EpisodeShowHeaderRight>
        </EpisodeShowHeader>
        <EpisodeShowPageDiv style={{ overflow: "scroll" }}>
          {getImages()}
        </EpisodeShowPageDiv>
        <EpisodeShowFooter>
          <EpisodeShowFooterLeft
            style={{ fontSize: getWidth() > 600 ? "20px" : "13px" }}
            onClick={() => prePage()}
          >
            PRE
          </EpisodeShowFooterLeft>
          <EpisodeShowFooterMiddle
            style={{ fontSize: getWidth() > 600 ? "20px" : "13px" }}
          >
            {`${scrollPosition}/${episode ? episode.imageArr.length : 0}`}
          </EpisodeShowFooterMiddle>
          <EpisodeShowFooterRight
            style={{ fontSize: getWidth() > 600 ? "20px" : "13px" }}
            onClick={() => nextPage()}
          >
            NEXT
          </EpisodeShowFooterRight>
        </EpisodeShowFooter>
        <EpisodeDrawer
          title="Episode"
          placement="right"
          onClose={onClose}
          visible={drawerVisible}
          headerStyle={{ display: "none" }}
          width={getWidth() > 600 ? "380px" : "150px"}
        >
          {getChapters()}
        </EpisodeDrawer>
      </EpisodeShowDiv>
    </div>
  );
};

export default EpisodeShow;
