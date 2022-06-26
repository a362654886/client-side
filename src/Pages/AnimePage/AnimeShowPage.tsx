import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { animeAllGet } from "../../api/animeAPI";
import AnimeButton from "../../components/Button";
import {
  AnimeBox,
  AnimeShowBox,
  AnimMainBox,
  AnimSearchBox,
  AnimSearchImg,
  AnimTapButton,
  AnimTitle,
  AnimTwoButtons,
  CenterDiv,
  LikeDiv,
  StarDiv,
} from "../../cssJs/AnimePage/AnimeShowCss";
import { ANIME_NONE } from "../../redux/anime";
import { Anime, RateBody } from "../../types/Amine";
import starBorder from "../../files/Star-border.svg";
import starFill from "../../files/Star-filled.svg";
import loadingImg from "../../files/loading.gif";
import searchImg from "../../files/search.svg";
import newIcon from "../../files/newIcon.svg";
import hotIcon from "../../files/hotIcon.svg";
import { LoadingImgDiv } from "../../cssJs/homePageCss";
import { getWidth } from "../../helperFns/widthFn";
import { Helmet } from "react-helmet";

const AnimeShowPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const [iniLoading, setIniLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [ifNew, setIfNew] = useState<boolean>(true);
  const [sortType, setSortType] = useState<string>("new");
  const pageSize = getWidth() > 600 ? 24 : 6;

  useEffect(() => {
    if (page >= 1) {
      (async function anyNameFunction() {
        await searchMore();
      })();
    }
  }, [page]);

  useEffect(() => {
    // getAnimeArr();
  }, [allAnime]);

  useEffect(() => {
    ifNew ? setSortType("new") : setSortType("hot");
  }, [ifNew]);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "title":
        setSearchValue((e.target as HTMLInputElement).value);
        break;
    }
  };

  const search = async (type: string, page: number) => {
    setIniLoading(true);
    const animeResult = await animeAllGet(searchValue, type, page, pageSize);
    if (animeResult) {
      setAllAnime(animeResult.result);
      setCount(animeResult.count);
    }
    setIniLoading(false);
  };

  const searchMore = async () => {
    setLoading(true);
    const animeResult = await animeAllGet(
      searchValue,
      sortType,
      page,
      pageSize
    );
    if (animeResult) {
      setAllAnime(allAnime.concat(animeResult.result));
      setCount(animeResult.count);
    }
    setLoading(false);
  };

  const chooseAnime = (anime: Anime) => {
    dispatch({
      payload: null,
      type: ANIME_NONE,
    });
    history.push(`anime?${anime._id}`);
  };

  const getStar = (rate: RateBody) => {
    const rateNum = rate.totalRate / rate.ratePeople;
    return [1, 2, 3, 4, 5].map((n, index) => {
      if (rateNum > n) {
        return (
          <img
            key={index}
            style={{
              width: "24px",
              height: "24px",
              marginRight: "6.4px",
              marginLeft: "6.4px",
              marginTop: "8px",
            }}
            src={starFill}
          />
        );
      } else {
        return (
          <img
            key={index}
            style={{
              width: "24px",
              height: "24px",
              marginRight: "6.4px",
              marginLeft: "6.4px",
              marginTop: "8px",
            }}
            src={starBorder}
          />
        );
      }
    });
  };

  const getAnimeDiv = (animeArr: Anime[] | null) => {
    if (animeArr) {
      return animeArr.map((anime: Anime, index: number) => {
        return getWidth() > 600 ? (
          <div
            className="col-xl-3 col-md-4 col-sm-6"
            style={{ marginBottom: "24px" }}
            key={index}
            onClick={() => chooseAnime(anime)}
          >
            <AnimeBox>
              <img src={`${anime.headImage}`} />
              <h6>{anime.title}</h6>
            </AnimeBox>
            <LikeDiv>
              <StarDiv>{getStar(anime.rate)}</StarDiv>
              <p>{anime.likes} Fans</p>
            </LikeDiv>
          </div>
        ) : (
          <div
            style={{ margin: "0px auto", marginBottom: "24px" }}
            key={index}
            onClick={() => chooseAnime(anime)}
          >
            <AnimeBox>
              <img src={`${anime.headImage}`} />
              <h6>{anime.title}</h6>
            </AnimeBox>
            <LikeDiv>
              <StarDiv>{getStar(anime.rate)}</StarDiv>
              <p>{anime.likes} Fans</p>
            </LikeDiv>
          </div>
        );
      });
    } else {
      return <></>;
    }
  };

  const getExistAnime = () => <>{getAnimeDiv(allAnime ? allAnime : null)}</>;

  const getLoading = () =>
    loading ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      <></>
    );

  const getMore = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  return (
    <>
      <Helmet>
        <title>Anime Library - Animepark.com</title>
        <meta
          name="keywords"
          content="anime database, anime library, anime list, anime videos, anime products, anime fans, anime community, anime social media"
        />
        <meta name="description" content="anime information collection"></meta>
      </Helmet>
      <AnimMainBox>
        <AnimTitle>Anime</AnimTitle>
        <AnimTwoButtons>
          <AnimTapButton
            style={{ backgroundColor: `${ifNew ? "#FFC300" : "white"}` }}
            onClick={() => {
              setIfNew(true);
              setPage(1);
              search("new", 1);
            }}
          >
            <img src={`${newIcon}`} />
            <p>New</p>
          </AnimTapButton>
          <AnimTapButton
            style={{ backgroundColor: `${ifNew ? "white" : "#FFC300"}` }}
            onClick={() => {
              setIfNew(false);
              setPage(1);
              search("hot", 1);
            }}
          >
            <img src={`${hotIcon}`} />
            <p>Hot</p>
          </AnimTapButton>
        </AnimTwoButtons>
        <AnimSearchBox>
          <Input placeholder={"title"} onChange={onChange}></Input>
          <AnimSearchImg
            src={`${searchImg}`}
            onClick={() => search(sortType, page)}
          />
        </AnimSearchBox>
        {!iniLoading ? (
          <AnimeShowBox className="row">{getExistAnime()}</AnimeShowBox>
        ) : (
          <LoadingImgDiv>
            <img src={`${loadingImg}`} />
          </LoadingImgDiv>
        )}
        {getLoading()}
        <CenterDiv>
          {allAnime.length < count ? (
            <AnimeButton
              para=""
              text="View more"
              width="120px"
              height="32px"
              textColor="white"
              backGroundColor="#FFC300"
              borderColor="white"
              buttonClick={() => getMore()}
            />
          ) : (
            <></>
          )}
        </CenterDiv>
      </AnimMainBox>
    </>
  );
};

export default AnimeShowPage;
