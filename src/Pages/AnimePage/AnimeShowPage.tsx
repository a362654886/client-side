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
  AnimTitle,
  CenterDiv,
  LikeDiv,
  StarDiv,
} from "../../cssJs/AnimePage/AnimeShowCss";
import { ANIME_ADD } from "../../redux/anime";
import { Anime, RateBody } from "../../types/Amine";
import starBorder from "../../files/Star-border.svg";
import starFill from "../../files/Star-filled.svg";
import loadingImg from "../../files/loading.gif";
import { LoadingImgDiv } from "../../cssJs/homePageCss";

const AnimeShowPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const pageSize = 4;

  useEffect(() => {
    (async function anyNameFunction() {
      await search();
    })();
  }, [page]);

  useEffect(() => {
    // getAnimeArr();
  }, [allAnime]);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "searchValue":
        setSearchValue((e.target as HTMLInputElement).value);
        break;
    }
  };

  const search = async () => {
    setLoading(true);
    const animeResult = await animeAllGet(searchValue, page, pageSize);
    if (animeResult) {
      setAllAnime(allAnime.concat(animeResult.result));
      setCount(animeResult.count);
    }
    setLoading(false);
  };

  const chooseAnime = (anime: Anime) => {
    dispatch({
      payload: anime,
      type: ANIME_ADD,
    });
    history.replace("oneAnime");
  };

  const getStar = (rate: RateBody) => {
    const rateNum = rate.totalRate / rate.ratePeople;
    return [1, 2, 3, 4, 5].map((n, index) => {
      if (rateNum > n) {
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

  const getAnimeDiv = (animeArr: Anime[] | null) => {
    if (animeArr) {
      return animeArr.map((anime: Anime, index: number) => {
        return (
          <div
            className="col-xl-3 col-md-4 col-sm-6"
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
    <AnimMainBox>
      <AnimTitle>Anime</AnimTitle>
      <AnimSearchBox className="row">
        <Input
          className="col-xl-10 col-md-10 col-sm-10 col-10"
          placeholder={"searchValue"}
          onChange={onChange}
        ></Input>
        <div className="col-xl-2 col-md-2 col-sm-3 col-3">
          <AnimeButton
            para=""
            text="Search"
            width="120px"
            height="32px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="white"
            buttonClick={() => search()}
          />
        </div>
      </AnimSearchBox>
      <AnimeShowBox className="row">{getExistAnime()}</AnimeShowBox>
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
  );
};

export default AnimeShowPage;
