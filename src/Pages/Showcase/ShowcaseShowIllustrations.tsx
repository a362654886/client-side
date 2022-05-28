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
import ShowcaseForum from "./ShowcaseForum";
import loadingImg from "../../files/loading.gif";
import searchImg from "../../files/search.svg";
import { useSelector } from "react-redux";
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
import { getShowCasePage } from "../../helperFns/getPage";

const ShowcaseShowIllustrations = (): JSX.Element => {
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [loading, setLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);
  const [pageNum, setPageNum] = useState<number>(0);
  const [allShowCases, setAllShowCases] = useState<ShowCaseType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [showCaseType] = useState<ShowCaseEnum>(ShowCaseEnum.Illustrations);
  const [ifNew, setIfNew] = useState<boolean>(true);
  const [searchValue, SetSearchValue] = useState<string>("");
  const [iniState, SetIniState] = useState<boolean>(true);
  const [allLoading, SetAllLoading] = useState<boolean>(false);

  const pageSize = 6;

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
    const propPage = getShowCasePage(search);
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
      if (index == 1) {
        return (
          <div
            key={index}
            style={{ marginTop: getWidth() > 800 ? "0px" : "8px" }}
            className={
              getWidth() > 800 ? "" : "col-xl-4 col-md-4 col-sm-6 col-6"
            }
          >
            <AnimeButton
              para=""
              text={button.text}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="#AAFFC9"
              borderColor="#AAFFC9"
              buttonClick={() => {
                console.log("");
              }}
            />
          </div>
        );
      } else {
        return (
          <div
            key={index}
            style={{ marginTop: getWidth() > 800 ? "0px" : "8px" }}
            className={
              getWidth() > 800 ? "" : "col-xl-4 col-md-4 col-sm-6 col-6"
            }
          >
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
                    ? `/showcase/showCollection?page=1`
                    : "/showcase/showManga?page=1"
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
        <p>
          The “Illustrations” is a place for you to post and appreciate single
          artworks like Fanart or creative figure designs.
        </p>
        <MiddleDiv>
          <AnimeButton
            para=""
            text={"Post"}
            width="120px"
            height="36px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="white"
            buttonClick={() => {
              IfLoginCheck(loginUser)
                ? history.push({
                    pathname: "/showcase/create",
                    state: { type: ShowCaseEnum.Illustrations },
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
        _pageNum,
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
    toPage(`showIllustrations?page=${newPage}`);
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
          <>
            <ShowcaseForum showcases={allShowCases} editLink={true} />
          </>
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
              display: getWidth() > 800 ? "flex" : "",
            }}
            className={getWidth() > 800 ? "" : "row"}
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

export default ShowcaseShowIllustrations;
