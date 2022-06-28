import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { showCaseOneMangaGet } from "../../api/showcaseAPI";
import { LoadingImgDiv } from "../../cssJs/homePageCss";
import { ShowCaseDiv } from "../../cssJs/ShowCasePage/showCaseCss";
import { ShowCaseType } from "../../types/showCaseType";
import loadingImg from "../../files/loading.gif";
import ShowcaseSide from "./ShowcaseSide";
import { getWidth } from "../../helperFns/widthFn";
import ShowcaseForum from "./ShowcaseForum";
import { getShowCaseOnePage } from "../../helperFns/getPage";

interface Para {
  id: string;
}

const ShowcaseCollectionOne = (): JSX.Element => {
  const para: Para = useParams();

  const [loading, setLoading] = useState(false);
  const [showCase, setShowCase] = useState<ShowCaseType | null>(null);

  useEffect(() => {
    //console.log(para.id);
    //console.log(loading);
  }, [loading, showCase]);

  useEffect(() => {
    (async function anyNameFunction() {
      await getShowCase(para.id);
    })();
  }, []);

  const getShowCase = async (id: string) => {
    setLoading(true);
    const showcaseResult = await showCaseOneMangaGet(id);
    if (showcaseResult) {
      showcaseResult.edit = true;
      setShowCase(showcaseResult);
    }
    setLoading(false);
  };

  const getLoading = () =>
    loading ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      <>{getShowcaseForums()}</>
    );

  const getShowCaseArr = () =>
    showCase ? (
      <ShowcaseForum showcases={[showCase]} editLink={false} />
    ) : (
      <></>
    );

  const getShowcaseForums = () => {
    return (
      <>
        {loading ? (
          <LoadingImgDiv>
            <img src={`${loadingImg}`} />
          </LoadingImgDiv>
        ) : (
          getShowCaseArr()
        )}
      </>
    );
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          minHeight: getWidth() > 600 ? "1400px" : "auto",
        }}
      >
        <ShowCaseDiv
          style={{
            width:
              getWidth() > 1200 ? "100%" : getWidth() > 600 ? "896px" : "100%",
            paddingLeft: getWidth() > 600 ? "" : "8px",
            marginTop: "32px",
          }}
        >
          {getLoading()}
        </ShowCaseDiv>
        <div
          style={{
            width: "276px",
            marginLeft: "10px",
            display:
              document.documentElement.clientWidth > 1181 ? "inline" : "none",
          }}
        >
          <ShowcaseSide />
        </div>
      </div>
    </>
  );
};

export default ShowcaseCollectionOne;
