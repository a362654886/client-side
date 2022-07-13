import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { showCaseAllGet } from "../../api/showcaseAPI";
import AnimeButton, { MiddleDiv, MoreButtonDiv } from "../../components/Button";
import { AnimeButtonsDiv } from "../../cssJs/AnimePage/AnimeOneCss";
import { LoadingImgDiv } from "../../cssJs/homePageCss";
import {
  ShowCaseDiv,
  ShowcasePostDiv,
  ShowcaseSearch,
  ShowcaseSearchInputDiv,
  ShowCaseTitle,
  ShowCaseTitleDiv,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { ShowCaseEnum, ShowCaseType } from "../../types/showCaseType";
import loadingImg from "../../files/loading.gif";
import searchImg from "../../files/search.svg";
import ShowcaseManga from "./ShowcaseMaga";
import { useSelector } from "react-redux";
import ShowcaseSide from "./ShowcaseSide";
import {
  AnimTapButton,
  AnimTwoButtons,
} from "../../cssJs/AnimePage/AnimeShowCss";
import newIcon from "../../files/newIcon.svg";
import hotIcon from "../../files/hotIcon.svg";
import getMoreImg from "../../files/getMore.svg";
import { IfLoginCheck } from "../../helperFns/loginCheck";
import { User } from "../../types/User";
import { IStoreState } from "../../types/IStoreState";
import { getWidth } from "../../helperFns/widthFn";
import { openNewWindow } from "../../helperFns/windowsFn";

const ShowcaseShowManga = (): JSX.Element => {
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [loading, setLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);
  const [pageNum, setPageNum] = useState<number>(0);
  const [allShowCases, setAllShowCases] = useState<ShowCaseType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [showCaseType] = useState<ShowCaseEnum>(ShowCaseEnum.Manga);
  const [ifNew, setIfNew] = useState<boolean>(true);
  const [searchValue, SetSearchValue] = useState<string>("");
  const [iniState, SetIniState] = useState<boolean>(true);
  const [allLoading, SetAllLoading] = useState<boolean>(false);

  const pageSize = 3;

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

  useEffect(() => {
    const { search } = history.location;
    const propPage = search.replace("?page=", "");
    setPageNum(parseInt(propPage));
    SetIniState(true);
  }, []);

  useEffect(() => {
    //console.log(loading);
  }, [loading]);

  useEffect(() => {
    if (iniState == false) {
      //setAllShowCases([]);
      searchPage(1);
    }
  }, [ifNew]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async function anyNameFunction() {
      await searchPage();
      SetIniState(false);
    })();
  }, [pageNum]);

  useEffect(() => {
    //console.log(allShowCases);
  }, [allShowCases, searchValue]);

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
            textColor={index == 2 ? "black" : "#4BA3C3"}
            backGroundColor={index == 2 ? "#AAFFC9" : "white"}
            borderColor={index == 2 ? "#AAFFC9" : "#4BA3C3"}
            buttonClick={() =>
              index == 3
                ? console.log(index)
                : toPage(
                    index == 1
                      ? `/showcase/showIllustrations?page=1`
                      : "/showcase/showCollection?page=1"
                  )
            }
          />
        </div>
      );
    });
  };

  const getHeader = () => {
    return (
      <ShowcasePostDiv>
        <p>The “Manga” is a place for you to share and enjoy manga works.</p>
        <MiddleDiv style={{ width: "200px" }}>
          <AnimeButton
            para=""
            text={"Create a new Series"}
            width="200px"
            height="36px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="white"
            buttonClick={() => {
              IfLoginCheck(loginUser)
                ? history.push({
                    pathname: "/showcase/create",
                    state: { type: ShowCaseEnum.Manga },
                  })
                : "";
            }}
          />
        </MiddleDiv>
      </ShowcasePostDiv>
    );
  };

  const searchPage = async (searchPage?: number) => {
    if (pageNum > 0) {
      setLoading(true);
      const _pageNum = searchPage != undefined ? searchPage : pageNum;
      const showcaseResult = await showCaseAllGet(
        showCaseType,
        ifNew ? "new" : "hot",
        pageNum,
        pageSize,
        "",
        searchValue,
        searchValue
      );
      if (showcaseResult) {
        setAllShowCases(
          _pageNum !== 1
            ? allShowCases.concat(showcaseResult.result)
            : showcaseResult.result
        );
        setCount(showcaseResult.count);
      }
      setLoading(false);
    }
  };

  const getMore = () => {
    SetAllLoading(true);
    const newPage = pageNum + 1;
    toPage(`showManga?page=${newPage}`);
    setPageNum(newPage);
  };

  const getLoading = () =>
    loading ? (
      <>
        {allLoading ? getShowcaseForums() : <></>}
        <LoadingImgDiv>
          <img src={`${loadingImg}`} />
        </LoadingImgDiv>
      </>
    ) : (
      <>{getShowcaseForums()}</>
    );

  const toManga = (index: number) =>
    openNewWindow(`/showcase/Manga/${allShowCases[index]._id}`);

  const getShowcaseForums = () => {
    return (
      <>
        <ShowcaseSearchInputDiv>
          <Input
            value={searchValue}
            onChange={(e) => {
              SetSearchValue(e.target.value);
            }}
          />
          <ShowcaseSearch>
            <img onClick={() => searchPage(1)} src={`${searchImg}`} />
          </ShowcaseSearch>
        </ShowcaseSearchInputDiv>
        <AnimTwoButtons>
          <AnimTapButton
            style={{ backgroundColor: `${ifNew ? "#FFC300" : "white"}` }}
            onClick={() => setIfNew(true)}
          >
            <img src={`${newIcon}`} />
            <p>New</p>
          </AnimTapButton>
          <AnimTapButton
            style={{ backgroundColor: `${ifNew ? "white" : "#FFC300"}` }}
            onClick={() => setIfNew(false)}
          >
            <img src={`${hotIcon}`} />
            <p>Hot</p>
          </AnimTapButton>
        </AnimTwoButtons>
        {typeLoading ? (
          <LoadingImgDiv>
            <img src={`${loadingImg}`} />
          </LoadingImgDiv>
        ) : (
          <ShowcaseManga
            showcases={allShowCases}
            toMangaOne={(index) => toManga(index)}
          />
        )}
        {allShowCases.length < count ? (
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
          {getHeader()}
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

export default ShowcaseShowManga;
