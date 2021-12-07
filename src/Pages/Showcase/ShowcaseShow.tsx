import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { showCaseAllGet } from "../../api/showcaseAPI";
import AnimeButton, { MiddleDiv } from "../../components/Button";
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
import searchImg from "../../files/search.png";
import ShowcaseManga from "./ShowcaseMaga";
import { useDispatch } from "react-redux";
import { SHOWCASE_MANGA_ADD } from "../../redux/showcaseManga";

const ShowcaseShow = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [typeLoading, setTypeLoading] = useState(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [allShowCases, setAllShowCases] = useState<ShowCaseType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [chooseButton, setChooseButton] = useState<number>(0);
  const [showCaseType, setShowCaseType] = useState<ShowCaseEnum>(
    history.location.state as ShowCaseEnum
  );

  const pageSize = 1;

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
    const showcaseType = history.location.state;
    console.log(showcaseType);
    if (showcaseType == "Illustrations") {
      changeButton(1);
    }
  }, []);

  useEffect(() => {
    (async function anyNameFunction() {
      await searchType(showCaseType);
    })();
  }, [showCaseType]);

  const changeButton = (index: number) => {
    setChooseButton(index);
    switch (index) {
      case 0:
        setShowCaseType(ShowCaseEnum.Collections);
        break;
      case 1:
        setShowCaseType(ShowCaseEnum.Illustrations);
        break;
      case 2:
        setShowCaseType(ShowCaseEnum.Manga);
        break;
    }
  };

  const getButtons = () => {
    const indexNum = chooseButton;
    return buttonsColor.map((button, index) => {
      if (index == indexNum) {
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
              buttonClick={() => changeButton(index)}
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
              buttonClick={() => changeButton(index)}
            />
          </div>
        );
      }
    });
  };

  const getHeader = () => {
    switch (showCaseType) {
      case ShowCaseEnum.Collections:
        return (
          <ShowcasePostDiv>
            <p>
              The “Collections” is a place for you to share and enjoy anime
              accessories.
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
                  history.push({
                    pathname: "/mainPage/showcase/create",
                    state: { type: ShowCaseEnum.Collections },
                  });
                }}
              />
            </MiddleDiv>
          </ShowcasePostDiv>
        );
      case ShowCaseEnum.Illustrations:
        return (
          <ShowcasePostDiv>
            <p>
              The “Illustrations” is a place for you to post and appreciate
              single artworks like Fanart or creative figure designs.
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
                  history.push({
                    pathname: "/mainPage/showcase/create",
                    state: { type: ShowCaseEnum.Illustrations },
                  });
                }}
              />
            </MiddleDiv>
          </ShowcasePostDiv>
        );
      case ShowCaseEnum.Manga:
        return (
          <ShowcasePostDiv>
            <p>
              The “Manga” is a place for you to share and enjoy manga works.
            </p>
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
                  history.push({
                    pathname: "/mainPage/showcase/create",
                    state: { type: ShowCaseEnum.Manga },
                  });
                }}
              />
            </MiddleDiv>
          </ShowcasePostDiv>
        );
    }
  };

  useEffect(() => {
    (async function anyNameFunction() {
      await searchPage();
    })();
  }, [pageNum]);

  useEffect(() => {
    console.log(allShowCases);
  }, [allShowCases]);

  const searchType = async (type: ShowCaseEnum) => {
    setTypeLoading(true);
    const showcaseResult = await showCaseAllGet(type, pageNum, pageSize);
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
      pageNum,
      pageSize
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
        <ShowcaseSearchInputDiv>
          <Input />
          <ShowcaseSearch>
            <img
              onClick={() => searchType(showCaseType)}
              src={`${searchImg}`}
            />
          </ShowcaseSearch>
        </ShowcaseSearchInputDiv>
        {typeLoading ? (
          <LoadingImgDiv>
            <img src={`${loadingImg}`} />
          </LoadingImgDiv>
        ) : (
          <>
            {showCaseType !== ShowCaseEnum.Manga ? (
              <ShowcaseForum showcases={allShowCases} />
            ) : (
              <ShowcaseManga
                showcases={allShowCases}
                toMangaOne={(index) => toManga(index)}
              />
            )}
          </>
        )}
        {getLoading()}
        {allShowCases.length < count ? (
          <MiddleDiv>
            <AnimeButton
              para=""
              text={"View More"}
              width="120px"
              height="32px"
              textColor="#F5A623"
              backGroundColor="#FBFCDB"
              borderColor="#F5A623"
              buttonClick={() => getMore()}
            />
          </MiddleDiv>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      <ShowCaseTitleDiv>
        <ShowCaseTitle>Showcase</ShowCaseTitle>
      </ShowCaseTitleDiv>
      <div style={{ display: "flex" }}>
        <ShowCaseDiv className="col-xl-9 col-md-9 col-sm-9 col-9">
          <AnimeButtonsDiv>{getButtons()}</AnimeButtonsDiv>
          {getHeader()}
          {getShocaseForums()}
        </ShowCaseDiv>
        <div className="col-xl-3 col-md-3 col-sm-3 col-3">side</div>
      </div>
    </>
  );
};

export default ShowcaseShow;
