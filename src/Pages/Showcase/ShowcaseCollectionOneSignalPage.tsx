import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { showCaseOneMangaGet } from "../../api/showcaseAPI";
import { LoadingImgDiv } from "../../cssJs/homePageCss";
import {
  ShowCaseDiv,
  ShowCaseTitle,
  ShowCaseTitleDiv,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { ShowCaseType } from "../../types/showCaseType";
import loadingImg from "../../files/loading.gif";
import ShowcaseSide from "./ShowcaseSide";
import { getWidth } from "../../helperFns/widthFn";
import ShowcaseForum from "./ShowcaseForum";
import AnimeButton from "../../components/Button";
import { AnimeButtonsDiv } from "../../cssJs/AnimePage/AnimeOneCss";

interface Para {
  id: string;
}

const buttonsColor = [
  {
    text: "Collections",
    color: "#4BA3C3",
    backColor: "white",
  },
  {
    text: "Illustrations",
    color: "#4BA3C3",
    backColor: "white",
  },
  {
    text: "Manga",
    color: "#4BA3C3",
    backColor: "white",
  },
];

const ShowcaseSignalPage = (): JSX.Element => {
  const para: Para = useParams();
  const history = useHistory();

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

  const toPage = (url: string) => history.push(url);

  const getButtons = () => {
    return buttonsColor.map((button, index) => {
      const style =
        getWidth() > 800
          ? {
              marginTop: "0px",
            }
          : {
              marginTop: "8px",
              position: button.text !== "Collections" ? "absolute" : undefined,
              left: button.text == "Illustrations" ? "138px" : "0px",
              top: button.text == "Manga" ? "58px" : "15px",
            };

      return (
        <div key={index} style={style as React.CSSProperties}>
          <AnimeButton
            para=""
            text={button.text}
            width="120px"
            height="32px"
            textColor={"#4BA3C3"}
            backGroundColor={"white"}
            borderColor={"#4BA3C3"}
            buttonClick={() =>
              index == 0
                ? toPage(`/showcase/showCollection?page=1`)
                : toPage(
                    index == 1
                      ? `/showcase/showIllustrations?page=1`
                      : "/showcase/showManga?page=1"
                  )
            }
          />
        </div>
      );
    });
  };

  const getShowCase = async (id: string) => {
    setLoading(true);
    const showcaseResult = await showCaseOneMangaGet(id);
    if (showcaseResult) {
      showcaseResult.edit = false;
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
            paddingRight: getWidth() > 600 ? "" : "8px",
            marginTop: "32px",
          }}
        >
          <ShowCaseTitleDiv>
            <ShowCaseTitle>Showcase</ShowCaseTitle>
          </ShowCaseTitleDiv>
          <AnimeButtonsDiv
            style={{
              height: getWidth() > 800 ? "64px" : "104px",
              position: "relative",
            }}
          >
            {getButtons()}
          </AnimeButtonsDiv>
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

export default ShowcaseSignalPage;
