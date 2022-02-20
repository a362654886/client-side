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
import { useDispatch, useSelector } from "react-redux";
import { SHOWCASE_MANGA_ADD } from "../../redux/showcaseManga";
import ShowcaseSide from "./ShowcaseSide";
import {
  AnimTapButton,
  AnimTwoButtons,
} from "../../cssJs/AnimePage/AnimeShowCss";
import newIcon from "../../files/newIcon.png";
import hotIcon from "../../files/hotIcon.png";
import getMoreImg from "../../files/getMore.png";
import { IfLoginCheck } from "../../helperFns/loginCheck";
import { User } from "../../types/User";
import { IStoreState } from "../../types/IStoreState";
import { getWidth } from "../../helperFns/widthFn";

const ShowcaseShowManga = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [loading, setLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [allShowCases, setAllShowCases] = useState<ShowCaseType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [showCaseType] = useState<ShowCaseEnum>(ShowCaseEnum.Manga);
  const [ifNew, setIfNew] = useState<boolean>(true);
  const [searchValue, SetSearchValue] = useState<string>("");

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
    if (pageNum == 1) {
      (async function anyNameFunction() {
        await searchType(showCaseType);
      })();
    } else {
      setPageNum(1);
    }
  }, [ifNew]);

  const toPage = (url: string) => history.replace(url);

  const getButtons = () => {
    return buttonsColor.map((button, index) => {
      if (index == 2) {
        return (
          <div key={index}>
            <AnimeButton
              para=""
              text={button.text}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="#AAFFC9"
              borderColor="#AAFFC9"
              buttonClick={() => console.log("")}
            />
          </div>
        );
      } else {
        return (
          <div key={index}>
            <AnimeButton
              para=""
              text={button.text}
              width="120px"
              height="32px"
              textColor="#4BA3C3"
              backGroundColor="white "
              borderColor="#4BA3C3"
              buttonClick={() => {
                toPage(
                  index == 0
                    ? `/mainPage/showcase/showCollection`
                    : "/mainPage/showcase/showIllustrations"
                );
              }}
            />
          </div>
        );
      }
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
                    pathname: "/mainPage/showcase/create",
                    state: { type: ShowCaseEnum.Manga },
                  })
                : "";
            }}
          />
        </MiddleDiv>
      </ShowcasePostDiv>
    );
  };

  useEffect(() => {
    if (pageNum > 1) {
      (async function anyNameFunction() {
        await searchPage();
      })();
    }
  }, [pageNum]);

  useEffect(() => {
    //console.log(allShowCases);
  }, [allShowCases, searchValue]);

  const searchType = async (type: ShowCaseEnum) => {
    setTypeLoading(true);
    const showcaseResult = await showCaseAllGet(
      type,
      ifNew ? "new" : "hot",
      pageNum,
      pageSize,
      "",
      searchValue,
      searchValue
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
      showCaseType,
      ifNew ? "new" : "hot",
      pageNum,
      pageSize,
      "",
      searchValue,
      searchValue
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
            <img
              onClick={() => searchType(showCaseType)}
              src={`${searchImg}`}
            />
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
        {getLoading()}
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
          }}
        >
          <ShowCaseTitleDiv>
            <ShowCaseTitle>Showcase</ShowCaseTitle>
          </ShowCaseTitleDiv>
          <AnimeButtonsDiv
            style={{
              display: getWidth() > 800 ? "flex" : "inline",
            }}
          >
            {getButtons()}
          </AnimeButtonsDiv>
          {getHeader()}
          {getShowcaseForums()}
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