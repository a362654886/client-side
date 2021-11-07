import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { animeAllGet } from "../../api/animeAPI";
import AnimeButton from "../../components/Button";
import LoadingDiv from "../../components/LoadingDiv";
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
import { Anime } from "../../types/Amine";
import starBorder from "../../files/Star-border.png";
import starFill from "../../files/Star-filled.png";

const AnimeShowPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [animeArr, setAnimeArr] = useState<Anime[][] | null>(null);
  const pageSize = 4;

  useEffect(() => {
    (async function anyNameFunction() {
      setLoading(true);
      await search();
      setLoading(false);
    })();
  }, [page]);

  useEffect(() => {
    console.log(allAnime)
    getAnimeArr();
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

  const getResult = () => {
    if (loading) {
      return <LoadingDiv height="300px" width="300px" />;
    } else {
      return <></>;
    }
  };

  const getAnimeArr = () => {
    const arr1: Anime[] = [];
    const arr2: Anime[] = [];
    const arr3: Anime[] = [];
    const arr4: Anime[] = [];
    allAnime?.forEach((anime, index) => {
      if (index% 4 == 0 || index == 0) {
        arr1.push(anime);
      }
      if (index% 4 == 1 || index == 1) {
        arr2.push(anime);
      }
      if (index% 4 == 2 || index == 2) {
        arr3.push(anime);
      }
      if (index% 4 == 3 || index == 3) {
        arr4.push(anime);
      }
    });
    setAnimeArr([arr1, arr2, arr3, arr4]);
  };

  const chooseAnime = (anime: Anime) => {
    dispatch({
      payload: anime,
      type: ANIME_ADD,
    });
    history.replace("oneAnime");
  };

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

  const getAnimeDiv = (animeArr: Anime[] | null) => {
    if (animeArr) {
      return animeArr.map((anime: Anime, index: number) => {
        return (
          <div key={index} onClick={() => chooseAnime(anime)}>
            <AnimeBox>
              <img src={`${anime.headImage}`} />
              <h6>{anime.title}</h6>
            </AnimeBox>
            <LikeDiv>
              <StarDiv>{getStar(anime.likes.length)}</StarDiv>
              <p>{anime.likes.length} Fans</p>
            </LikeDiv>
          </div>
        );
      });
    } else {
      return <></>;
    }
  };

  const getExistAnime = () => {
    return (
      <>
        <div>{getAnimeDiv(animeArr ? animeArr[0] : null)}</div>
        <div>{getAnimeDiv(animeArr ? animeArr[1] : null)}</div>
        <div>{getAnimeDiv(animeArr ? animeArr[2] : null)}</div>
        <div>{getAnimeDiv(animeArr ? animeArr[3] : null)}</div>
      </>
    );
  };

  const getMore = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  return (
    <AnimMainBox>
      <AnimTitle>Anime</AnimTitle>
      <AnimSearchBox>
        <Input placeholder={"searchValue"} onChange={onChange}></Input>
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
      </AnimSearchBox>
      <AnimeShowBox>
        {getExistAnime()}
      </AnimeShowBox>
      {getResult()}
      <CenterDiv>
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
      </CenterDiv>
    </AnimMainBox>
  );
};

export default AnimeShowPage;
