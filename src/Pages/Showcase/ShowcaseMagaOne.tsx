import * as React from "react";
import { useEffect, useState } from "react";
import { showCaseAwesomeUpdate } from "../../api/showcaseAPI";
import {
  AweSomeDiv,
  EpisodesAddButton,
  EpisodesGeneralButton,
  EpisodesText,
  ShowCaseDiv,
  ShowCaseIcons,
  ShowcaseImage,
  ShowcaseMangaHeader,
  ShowcaseTag,
  ShowCaseTitle,
  ShowCaseTitleDiv,
  ShowIframe,
  ShowImg,
  ShowMangaButtons,
  ShowMangaIframe,
  ShowMangaIframeEpisodesButtons,
  ShowMangaIframeOne,
  ShowMangaIframeSource,
  ShowMangaMiddleButton,
  ShowName,
  ShowTime,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { ShowCaseType } from "../../types/showCaseType";
import showCaseAwesomeUnClick from "../../files/showCaseAwesomeUnClick.png";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.png";
import { User } from "../../types/User";
import { IStoreState } from "../../types/IStoreState";
import { openNotification } from "../../helperFns/popUpAlert";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateShowcases } from "../../api/userApi";
import { LOGIN_USER_ADD } from "../../redux/loginUser";
import AnimeButton, { MiddleDiv } from "../../components/Button";
import facebook from "../../files/facebook.png";
import insImage from "../../files/insImage.png";
import twitter from "../../files/twitterP.png";
import copy from "../../files/copy.png";
import add from "../../files/Add.png";
import { useHistory } from "react-router-dom";
import { AnimeButtonsDiv } from "../../cssJs/AnimePage/AnimeOneCss";
import { episodeGet } from "../../api/episodeAPI";
import { Spin } from "antd";

const ShowcaseMangaOne = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const manga: ShowCaseType | null = useSelector(
    (state: IStoreState) => state.mangaState
  );

  const [showCase, setShowCase] = useState<ShowCaseType | null>(manga);
  const [update, setUpdate] = useState(0);
  const [awesomeArrState, setAwesomeArrState] = useState<string[]>(
    loginUser?.likeShowcase ? loginUser?.likeShowcase : []
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [episodeNum, setEpisodeNum] = useState(0);

  useEffect(() => {
    (async function anyNameFunction() {
      await getEpisode();
    })();
    console.log(new Array(episodeNum));
  }, []);

  useEffect(() => {
    setShowCase(manga);
  }, [manga]);

  useEffect(() => {
    //setShowCase(manga);
    console.log(episodeNum);
    console.log(new Array(2));
  }, [episodeNum, loading]);

  const getEpisode = async () => {
    setAddLoading(true);
    const episodeResult = await episodeGet(manga ? manga._id : "");
    setAddLoading(false);
    episodeResult?.count
      ? setEpisodeNum(episodeResult?.count)
      : setEpisodeNum(0);
  };

  // awesome
  const getAwesomeButton = (showCaseIdAndTitle: string) => {
    const r = awesomeArrState.find(
      (showcase) => showcase == showCaseIdAndTitle
    );
    if (r) {
      return (
        <img
          src={showCaseAwesomeClick}
          onClick={() => isLogin(() => cancelAwesomeFn(showCaseIdAndTitle))}
        />
      );
    } else {
      return (
        <img
          src={showCaseAwesomeUnClick}
          onClick={() => isLogin(() => awesomeFn(showCaseIdAndTitle))}
        />
      );
    }
  };

  const isLogin = (likeFn: () => Promise<void>) => {
    if (loginUser) {
      likeFn();
    } else {
      openNotification("error", "please login and then reply");
    }
  };

  const awesomeFn = async (showCaseIdAndTitle: string) => {
    if (loading == false) {
      let awesomeArr: string[] = [];
      if (loginUser?.likeShowcase) {
        awesomeArr = loginUser?.likeShowcase;
      }
      awesomeArr.push(showCaseIdAndTitle);

      //update state
      updateAllShowcaseAwesome(1, awesomeArr);
      //post like num
      setLoading(true);
      const animeLikeResult = await showCaseAwesomeUpdate(
        showCase ? showCase._id : "",
        showCase ? showCase.aweSome : 0
      );
      const userLikeResult = await userUpdateShowcases(
        loginUser?._id as string,
        awesomeArr
      );
      setLoading(false);
    } else {
      console.log("please wait some seconds");
    }
  };

  const cancelAwesomeFn = async (showCaseIdAndTitle: string) => {
    if (loading == false) {
      const awesomeArr = awesomeArrState;
      const r = awesomeArr.indexOf(showCaseIdAndTitle);
      if (r != -1) {
        awesomeArr.splice(r, 1);
        console.log(awesomeArr);
        //update state
        updateAllShowcaseAwesome(-1, awesomeArr);
        //post like num
        setLoading(true);
        const animeLikeResult = await showCaseAwesomeUpdate(
          showCase ? showCase._id : "",
          showCase ? showCase.aweSome : 0
        );
        const userLikeResult = await userUpdateShowcases(
          loginUser?._id as string,
          awesomeArr
        );
        setLoading(false);
      }
    } else {
      console.log("please wait some seconds");
    }
  };

  const updateAllShowcaseAwesome = (value: number, awesomeArr: string[]) => {
    //update showcase
    if (showCase) {
      const newAShowCases = showCase;
      newAShowCases.aweSome = newAShowCases.aweSome + value;
      setShowCase(newAShowCases);
    }

    //update user
    const readyUpdateUser: User = loginUser as User;
    readyUpdateUser.likeShowcase = awesomeArr;
    setAwesomeArrState(awesomeArr);
    setUpdate(update + 1);

    dispatch({
      payload: readyUpdateUser,
      type: LOGIN_USER_ADD,
    });
  };

  const getOneShowcase = () => {
    return (
      <ShowMangaIframeOne>
        {showCase?.imageArr ? (
          <ShowcaseImage src={showCase.imageArr[0]} />
        ) : (
          <></>
        )}
        <h2>{showCase?.title ? showCase.title : ""}</h2>
        <ShowMangaIframeSource>
          {showCase?.source ? showCase.source : ""}
        </ShowMangaIframeSource>
        <ShowcaseMangaHeader>
          <p>shared by </p>
          <ShowImg src={`${showCase?.userAvatar}`} />
          <ShowName>{showCase?.userName}</ShowName>
        </ShowcaseMangaHeader>
        <p>Updated to Episode 33</p>
        <p>{showCase?.description ? showCase.description : ""}</p>
        <div style={{ display: "flex" }}>
          {showCase?.tags.map((tag, index) => {
            return (
              <ShowcaseTag key={index}>
                <p>{tag.text}</p>
              </ShowcaseTag>
            );
          })}
        </div>
        <AweSomeDiv>
          {getAwesomeButton(`${showCase?._id}${showCase?.title}`)}
          <p>Awesome!</p>
          <h6>{showCase?.aweSome}</h6>
        </AweSomeDiv>
      </ShowMangaIframeOne>
    );
  };

  const getEpisodesPage = () =>
    Array.from({ length: episodeNum + 1 }, (v, k) => k).map((n, index) => {
      if (index == episodeNum) {
        return (
          <EpisodesAddButton
            onClick={() => {
              history.replace("/mainPage/showcase/episodeAdd");
            }}
          >
            <img src={`${add}`} />
            <p>Add</p>
          </EpisodesAddButton>
        );
      }
      return (
        <EpisodesGeneralButton
          key={index}
          onClick={() => {
            history.push({
              pathname: "/episodeShow",
              state: `${manga?._id}Episode${index + 1}`,
            });
          }}
        >
          <p>{index + 1}</p>
        </EpisodesGeneralButton>
      );
    });

  return (
    <>
      <ShowCaseTitleDiv>
        <ShowCaseTitle>Showcase</ShowCaseTitle>
      </ShowCaseTitleDiv>
      <div style={{ display: "flex" }}>
        <ShowCaseDiv className="col-xl-9 col-md-9 col-sm-9 col-9">
          <AnimeButtonsDiv>
            <AnimeButton
              para=""
              text="Collections"
              width="120px"
              height="32px"
              textColor="#4BA3C3"
              backGroundColor="white"
              borderColor="#4BA3C3"
              buttonClick={() => {
                history.push({
                  pathname: "/mainPage/showcase/show",
                  state: `Collections`,
                });
              }}
            />
            <AnimeButton
              para=""
              text="Illustrations"
              width="120px"
              height="32px"
              textColor="#4BA3C3"
              backGroundColor="white"
              borderColor="#4BA3C3"
              buttonClick={() => {
                history.push({
                  pathname: "/mainPage/showcase/show",
                  state: `Illustrations`,
                });
              }}
            />
            <AnimeButton
              para=""
              text="Manga"
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="#AAFFC9"
              borderColor="#AAFFC9"
              buttonClick={() => {
                console.log("Manga");
              }}
            />
          </AnimeButtonsDiv>
          {getOneShowcase()}
          <AnimeButton
            para=""
            text={"Follow"}
            width="120px"
            height="36px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="#FFC300"
            buttonClick={() => {
              console.log("follow");
            }}
          />
          <ShowCaseIcons>
            <img
              onClick={() => {
                console.log("facebook");
              }}
              src={`${facebook}`}
            />
            <img
              onClick={() => {
                console.log("insImage");
              }}
              src={`${insImage}`}
            />
            <img
              onClick={() => {
                console.log("twitter");
              }}
              src={`${twitter}`}
            />
            <img
              onClick={() => {
                console.log("copy");
              }}
              src={`${copy}`}
            />
          </ShowCaseIcons>
          <EpisodesText>Episodes</EpisodesText>
          <ShowMangaIframeEpisodesButtons>
            <AnimeButton
              para=""
              text={`1-50`}
              width="120px"
              height="32px"
              textColor="#892E2F"
              backGroundColor="#FAE7D5"
              borderColor="#FAE7D5"
              buttonClick={() => {
                console.log("1-50");
              }}
            />
          </ShowMangaIframeEpisodesButtons>
          <ShowMangaButtons className="row">
            {addLoading ? <Spin /> : <></>}
            {getEpisodesPage()}
          </ShowMangaButtons>
        </ShowCaseDiv>
        <div className="col-xl-3 col-md-3 col-sm-3 col-3">side</div>
      </div>
    </>
  );
};

export default ShowcaseMangaOne;
