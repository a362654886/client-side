import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userGetUserLikes } from "../../../api/userApi";
import {
  AnimeBox,
  AnimeShowBox,
  LikeDiv,
  StarDiv,
} from "../../../cssJs/AnimePage/AnimeShowCss";
import { LoadingImgDiv } from "../../../cssJs/homePageCss";
import { ANIME_ADD } from "../../../redux/anime";
import { Anime, RateBody } from "../../../types/Amine";
import { IStoreState } from "../../../types/IStoreState";
import { User } from "../../../types/User";
import starBorder from "../../../files/Star-border.svg";
import starFill from "../../../files/Star-filled.svg";
import loadingImg from "../../../files/loading.gif";

const ProfileLikesPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  /*const [count, setCounts] = useState<number>(
    loginUser ? loginUser.likeAnime.length : 0
  );*/
  const [allAnime, setAllAnime] = useState<Anime[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function anyNameFunction() {
      await getAnimes();
    })();
  }, []);

  useEffect(() => {
    //
  }, [loading]);

  const getAnimes = async () => {
    if (loginUser) {
      setLoading(true);
      const animeResult = await userGetUserLikes(loginUser?.userEmail, 1, 24);
      setAllAnime(animeResult);
      setLoading(false);
    }
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

  return (
    <>
      <AnimeShowBox className="row">{getExistAnime()}</AnimeShowBox>
      {getLoading()}
    </>
  );
};

export default ProfileLikesPage;
