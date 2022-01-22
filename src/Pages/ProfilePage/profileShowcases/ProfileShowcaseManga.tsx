import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { showCaseAllGet } from "../../../api/showcaseAPI";
import AnimeButton, { MiddleDiv } from "../../../components/Button";
import { LoadingImgDiv } from "../../../cssJs/homePageCss";
import { ShowCaseEnum, ShowCaseType } from "../../../types/showCaseType";
import loadingImg from "../../../files/loading.gif";
import { User } from "../../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "../../../types/IStoreState";
import ShowcaseManga from "../../Showcase/ShowcaseMaga";
import { SHOWCASE_MANGA_ADD } from "../../../redux/showcaseManga";
import getMoreImg from "../../../files/getMore.png";
import { ProfileMiddleDiv } from "../../../cssJs/ProfilePage/ProfileCss";

const ProfileShowcaseManga = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [allShowCases, setAllShowCases] = useState<ShowCaseType[]>([]);
  const [count, setCount] = useState<number>(0);

  const pageSize = 1;

  useEffect(() => {
    (async function anyNameFunction() {
      await searchType();
    })();
  }, []);

  useEffect(() => {
    (async function anyNameFunction() {
      await searchPage();
    })();
  }, [pageNum]);

  useEffect(() => {
    console.log(allShowCases);
  }, [allShowCases]);

  const searchType = async () => {
    setTypeLoading(true);
    const showcaseResult = await showCaseAllGet(
      ShowCaseEnum.Manga,
      "hot",
      pageNum,
      pageSize,
      loginUser ? loginUser._id : ""
    );
    if (showcaseResult) {
      //setAllShowCases(allShowCases.concat(showcaseResult.result));
      setAllShowCases(showcaseResult.result);
      setCount(showcaseResult.count);
    }
    setTypeLoading(false);
  };

  const searchPage = async () => {
    setLoading(true);
    const showcaseResult = await showCaseAllGet(
      ShowCaseEnum.Manga,
      "hot",
      pageNum,
      pageSize,
      loginUser ? loginUser._id : ""
    );
    if (showcaseResult) {
      setAllShowCases(allShowCases.concat(showcaseResult.result));
      //setAllShowCases(showcaseResult.result);
      setCount(showcaseResult.count);
    }
    setLoading(false);
  };

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

  const toManga = (index: number) => {
    dispatch({
      payload: allShowCases[index],
      type: SHOWCASE_MANGA_ADD,
    });
    history.replace("/mainPage/showcase/Manga");
  };

  const getShocaseForums = () => {
    return (
      <>
        {typeLoading ? (
          <LoadingImgDiv>
            <img src={`${loadingImg}`} />
          </LoadingImgDiv>
        ) : (
          <>
            <ShowcaseManga
              showcases={allShowCases}
              toMangaOne={(index) => toManga(index)}
            />
          </>
        )}
        {getLoading()}
        {allShowCases.length < count ? (
          <ProfileMiddleDiv onClick={() => getMore()}>
            <div>
              <img src={`${getMoreImg}`} />
              <p>Load More</p>
            </div>
          </ProfileMiddleDiv>
        ) : (
          <></>
        )}
      </>
    );
  };

  return <>{getShocaseForums()}</>;
};

export default ProfileShowcaseManga;
