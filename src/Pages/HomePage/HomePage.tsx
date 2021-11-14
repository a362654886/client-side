import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { animeAllGet } from "../../api/animeAPI";
import { newAllGet } from "../../api/newsAPI";
import { AnimeButton } from "../../components/Button";
import {
  AnimeBox,
  CenterDiv,
  LikeDiv,
  StarDiv,
} from "../../cssJs/AnimePage/AnimeShowCss";
import {
  HomeNewsBodyDiv,
  HomePageAnimeDiv,
  HomePageBodyDiv,
  HomePageDiv,
  HomePageHeaderDiv,
  HomePageHeaderLeftDiv,
  HomePageHeaderRightDiv,
  HomePageNewDiv,
} from "../../cssJs/homePageCss";
import mainPagePic from "../../files/mainPagePic.jpg";
import starBorder from "../../files/Star-border.png";
import starFill from "../../files/Star-filled.png";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { Anime } from "../../types/Amine";
import { LoadingType } from "../../types/EnumTypes";
import { NewType } from "../../types/NewsType";

const HomePage = (): JSX.Element => {
  const dispatch = useDispatch();

  const [allNews, setAllNews] = useState<NewType[]>([]);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);

  useEffect(() => {
    (async function anyNameFunction() {
      await getNews();
      await getAnimes();
    })();
  }, []);

  const getNews = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const animeResult = await newAllGet("", 1, 2);
    if (animeResult) {
      setAllNews(animeResult.result);
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const getAnimes = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const animeResult = await animeAllGet("", 1, 4);
    if (animeResult) {
      setAllAnime(animeResult.result);
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const getNewDiv = () =>
    allNews.map((news, index) => (
      <HomePageNewDiv key={index}>
        <h2>{news.header}</h2>
        <HomeNewsBodyDiv
          dangerouslySetInnerHTML={{ __html: news.html }}
        ></HomeNewsBodyDiv>
        <AnimeButton
          para=""
          text="See All"
          width="120px"
          height="36px"
          textColor="#4BA3C3"
          backGroundColor="#302D46"
          borderColor="#4BA3C3"
          buttonClick={() => {
            console.log("asdqwe");
          }}
        />
      </HomePageNewDiv>
    ));

  const getStar = (length: number) => {
    const numArr = [0, 100, 200, 300, 400];
    return numArr.map((n, index) => {
      if (length > n) {
        return (
          <img key={index} style={{ marginRight: "8px" }} src={starFill} />
        );
      } else {
        return (
          <img key={index} style={{ marginRight: "8px" }} src={starBorder} />
        );
      }
    });
  };

  const getAnimeDiv = () =>
    allAnime.map((anime, index) => (
      <div key={index}>
        <AnimeBox>
          <img src={`${anime.headImage}`} />
          <h6>{anime.title}</h6>
        </AnimeBox>
        <LikeDiv>
          <StarDiv>{getStar(anime.likes)}</StarDiv>
          <p>{anime.likes} Fans</p>
        </LikeDiv>
      </div>
    ));

  return (
    <HomePageDiv>
      <HomePageBodyDiv>
        <HomePageHeaderDiv>
          <HomePageHeaderLeftDiv>
            <img src={mainPagePic} />
          </HomePageHeaderLeftDiv>
          <HomePageHeaderRightDiv>{getNewDiv()}</HomePageHeaderRightDiv>
        </HomePageHeaderDiv>
        <HomePageAnimeDiv>
          <h1>Meet your favourite anime</h1>
          <h3>
            Find the most popular anime, as well as the peripheral products and
            fans.
          </h3>
          <div style={{ display: "flex" }}>{getAnimeDiv()}</div>
        </HomePageAnimeDiv>
        <CenterDiv>
          <AnimeButton
            para=""
            text="See more"
            width="120px"
            height="32px"
            textColor="#F5A623"
            backGroundColor="#762324"
            borderColor="#F5A623"
            buttonClick={() => {
              console.log("s");
            }}
          />
        </CenterDiv>
        <HomePageAnimeDiv>
          <h1>Show your anime world</h1>
          <h3>
            Display your collections and anime drawing talents. Redeem Rewards
            by your Awesome pictures!
          </h3>
        </HomePageAnimeDiv>
      </HomePageBodyDiv>
    </HomePageDiv>
  );
};

export default HomePage;
