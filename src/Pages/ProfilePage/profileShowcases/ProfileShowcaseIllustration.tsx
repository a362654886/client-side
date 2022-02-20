import * as React from "react";
import { useEffect, useState } from "react";
import { showCaseAllGet } from "../../../api/showcaseAPI";
import getMoreImg from "../../../files/getMore.png";
import { LoadingImgDiv } from "../../../cssJs/homePageCss";
import { ShowCaseEnum, ShowCaseType } from "../../../types/showCaseType";
import loadingImg from "../../../files/loading.gif";
import ShowcaseForum from "../../Showcase/ShowcaseForum";
import { User } from "../../../types/User";
import { useSelector } from "react-redux";
import { IStoreState } from "../../../types/IStoreState";
import { ProfileMiddleDiv } from "../../../cssJs/ProfilePage/ProfileCss";

const ProfileShowcaseIllustration = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

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
      ShowCaseEnum.Illustrations,
      "hot",
      pageNum,
      pageSize,
      loginUser ? loginUser._id : "",
      "",
      ""
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
      ShowCaseEnum.Illustrations,
      "hot",
      pageNum,
      pageSize,
      loginUser ? loginUser._id : "",
      "",
      ""
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

  const getShocaseForums = () => {
    return (
      <>
        {typeLoading ? (
          <LoadingImgDiv>
            <img src={`${loadingImg}`} />
          </LoadingImgDiv>
        ) : (
          <>
            <ShowcaseForum showcases={allShowCases} />
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

export default ProfileShowcaseIllustration;
