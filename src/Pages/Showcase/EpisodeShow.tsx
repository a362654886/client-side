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

  useEffect(() => {
    const id = history.location.state;
    if (id) {
      setEpisodeId(id as string);
    }
  }, []);

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
    console.log(loading);
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
        return <img style={{ width: "840px" }} key={index} src={image} />;
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
      setCount(episodeResult.count);
      setUpdate(update + 1);
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const getChapters = () =>
    Array.from({ length: count + 1 }, (v, k) => k).map((n, index) => {
      return (
        <EpisodeChapter key={index} onClick={() => toChapter(index + 1)}>
          {`Episode ${index + 1}`}
        </EpisodeChapter>
      );
    });

  return (
    <>
      <LoadingBox>
        <div className={loading == LoadingType.OPEN ? "mask" : "noMask"}>
          <img src={`${loadingImg}`} />
        </div>
      </LoadingBox>
      <EpisodeShowDiv>
        <EpisodeShowHeader>
          <EpisodeShowHeaderLeft>Back</EpisodeShowHeaderLeft>
          <EpisodeShowHeaderMiddle>{episode?.title}</EpisodeShowHeaderMiddle>
          <EpisodeShowHeaderRight
            onClick={() => {
              setDrawerVisible(true);
            }}
          >
            Episodes
          </EpisodeShowHeaderRight>
        </EpisodeShowHeader>
        <EpisodeShowPageDiv>{getImages()}</EpisodeShowPageDiv>
        <EpisodeDrawer
          title="Episode"
          placement="right"
          onClose={onClose}
          visible={drawerVisible}
          headerStyle={{ display: "none" }}
          width={"380px"}
        >
          {getChapters()}
        </EpisodeDrawer>
      </EpisodeShowDiv>
    </>
  );
};

export default EpisodeShow;
