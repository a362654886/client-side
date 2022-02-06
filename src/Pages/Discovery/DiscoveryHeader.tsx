import * as React from "react";
import { useEffect, useState } from "react";
import { animeAllGet } from "../../api/animeAPI";
import { Anime, RateBody } from "../../types/Amine";
import starBorder from "../../files/Star-border.svg";
import starFill from "../../files/Star-filled.svg";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ANIME_ADD, ANIME_NONE } from "../../redux/anime";
import { AnimeBox, LikeDiv, StarDiv } from "../../cssJs/AnimePage/AnimeShowCss";
import {
  DiscoveryHeaderDiv,
  DiscoveryHeaderTopThree,
  DiscoveryViewAll,
  MiddleViewAll,
  ViewAll,
} from "../../cssJs/DiscoveryPage/discoveryPageCss";
import moreRightImg from "../../files/moreRightArrow.png";
import { MiddleBiggerDiv, MiddleDiv } from "../../components/Button";

const DiscoveryHeader = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);

  useEffect(() => {
    (async function anyNameFunction() {
      await searchAnimes();
    })();
  }, []);

  const searchAnimes = async () => {
    setLoading(true);
    const animeResult = await animeAllGet("", "hot", 1, 3);
    if (animeResult) {
      setAllAnime(animeResult.result);
    }
    setLoading(false);
  };

  const chooseAnime = (anime: Anime) => {
    dispatch({
      payload: null,
      type: ANIME_NONE,
    });
    history.replace(`oneAnime?${anime._id}`);
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

  const getAnimeDiv = () => {
    if (allAnime) {
      return allAnime.map((anime: Anime, index: number) => {
        return (
          <div
            className="col-xl-3 col-md-4 col-sm-6"
            style={{
              marginBottom: "24px",
              marginRight: "24px",
              cursor: "pointer",
            }}
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

  return (
    <>
      <DiscoveryHeaderTopThree>Top 3 - NZ favorite</DiscoveryHeaderTopThree>
      <DiscoveryHeaderDiv>{getAnimeDiv()}</DiscoveryHeaderDiv>
      <MiddleViewAll>
        <DiscoveryViewAll>View All to meet your favorite.</DiscoveryViewAll>
      </MiddleViewAll>
      <MiddleBiggerDiv>
        <ViewAll
          onClick={() => {
            history.replace("animeShowPage");
          }}
        >
          <img src={moreRightImg} />
          <p>View All</p>
        </ViewAll>
      </MiddleBiggerDiv>
    </>
  );
};

export default DiscoveryHeader;
