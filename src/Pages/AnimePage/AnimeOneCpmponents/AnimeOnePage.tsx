import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AnimOneHeader,
  AnimOneHeaderLabel,
  AnimOneHeaderLeft,
  AnimOnePage,
  AnimOneWhereWatchImg,
  AnimOneWhereWatchLabel,
  LikeButton,
  OnePageStarChildDiv,
  OnePageStarDiv,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import { Anime, AnimeSource, RateBody } from "../../../types/Amine";
import { IStoreState } from "../../../types/IStoreState";
import starBorder from "../../../files/Star-border.svg";
import starFill from "../../../files/Star-filled.svg";
import likePng from "../../../files/like.svg";
import unLikePng from "../../../files/unLike.svg";
import AnimeOneForum from "./AnimeOneForums";
import {
  AnimeLikeButton,
  AnimeOneTitle,
} from "../../../cssJs/AnimePage/AnimeOneCss";
import AnimeOneProducts from "./AnimeOneProducts";
import AnimeOneVideo from "./AnimeOneVideo";
import { User } from "../../../types/User";
import { useEffect, useState } from "react";
import { animeOneGet, animeUpdateRate } from "../../../api/animeAPI";
import { userUpdateRate } from "../../../api/userApi";
import {
  LOGIN_USER_ADD,
  LOGIN_USER_UPDATE_LIKE,
} from "../../../redux/loginUser";
import { ANIME_ADD } from "../../../redux/anime";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../../helperFns/popUpAlert";
import ShareDiv from "../../../components/ShareDiv";
import { useHistory } from "react-router-dom";
import { getWidth } from "../../../helperFns/widthFn";
import { animeSourcesGet } from "../../../api/animeSourceAPI";

interface IProps {
  toPage: (page: number) => void;
  updateAnime: boolean;
}

const AnimeOnePage = ({ toPage, updateAnime }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

  const [enterRate, setEnterRate] = useState<boolean>(false);
  const [chooseRate, setChooseRate] = useState<number>(0);

  //all where to watch
  const [whereToWatches, setWhereToWatches] = useState<AnimeSource[]>([]);

  const toOther = (url: string) => window.open(url);

  useEffect(() => {
    const para = history.location.search.substring(1);
    (async function anyNameFunction() {
      if (updateAnime) {
        const anime = await animeOneGet(para);
        dispatch({
          payload: anime,
          type: ANIME_ADD,
        });
      }
      const allSources = await animeSourcesGet();
      setWhereToWatches(allSources);
    })();
  }, []);

  useEffect(() => {
    console.log(chooseAnime)
  }, [loginUser, chooseAnime, enterRate]);

  const likeAnimeFn = () => {
    dispatch({
      payload: chooseAnime?._id as string,
      type: LOGIN_USER_UPDATE_LIKE,
    });
  };

  const getWhereToWatch = () => {
    if (chooseAnime?.whereToWatch) {
      return chooseAnime?.whereToWatch.map((img, index) => {
        const whereToWatchBody = whereToWatches.find(
          (item) => item.sourceName == img
        );
        return (
          <AnimOneWhereWatchImg
            src={`https://animeimagebucket.s3.amazonaws.com/${whereToWatchBody?.imageLink}`}
            key={index}
            onClick={() =>
              toOther(whereToWatchBody ? whereToWatchBody.link : "")
            }
          />
        );
      });
    }
  };

  const isLogin = (likeFn: () => Promise<void> | void) => {
    if (loginUser) {
      likeFn();
    } else {
      openNotification(
        "please login and then reply",
        NotificationColor.Error,
        NotificationTitle.Error
      );
    }
  };

  const rateAnime = async (n: number) => {
    //update user rate
    if (loginUser) {
      const userRate = loginUser ? loginUser.rate : [];
      userRate.push({
        animeId: chooseAnime ? chooseAnime._id : "",
        rate: n,
      });
      const newLoginUser = loginUser;
      newLoginUser.rate = userRate;
      dispatch({
        payload: newLoginUser,
        type: LOGIN_USER_ADD,
      });
      await userUpdateRate(loginUser._id, newLoginUser.rate);
    }
    //update anime rate
    if (chooseAnime) {
      const animeRate = chooseAnime
        ? chooseAnime.rate
        : {
            ratePeople: 0,
            totalRate: 0,
          };
      const newBody = {
        ratePeople: animeRate.ratePeople + 1,
        totalRate: animeRate.totalRate + n,
      };
      const newAnime = chooseAnime;
      newAnime.rate = newBody;
      dispatch({
        payload: newAnime,
        type: ANIME_ADD,
      });
      await animeUpdateRate(chooseAnime._id, newAnime.rate);
    }
  };

  const getStar = (rate: RateBody | null) => {
    if (rate) {
      const rateNum = rate.totalRate / rate.ratePeople;
      console.log(rateNum)
      return [1, 2, 3, 4, 5].map((n) => {
        if (rateNum >= n) {
          return (
            <img
              style={{ width: "24px", height: "24px", marginRight: "16px" }}
              src={starFill}
            />
          );
        } else {
          return (
            <img
              style={{ width: "24px", height: "24px", marginRight: "16px" }}
              src={starBorder}
            />
          );
        }
      });
    } else {
      return <></>;
    }
  };

  const getChooseStar = () => {
    return [1, 2, 3, 4, 5].map((n) => {
      return (
        <img
          key={n}
          onMouseEnter={() => setChooseRate(n)}
          onMouseLeave={() => setChooseRate(0)}
          onClick={() => rateAnime(n)}
          style={{ width: "32px", height: "32px", marginRight: "8px" }}
          src={chooseRate >= n ? starFill : starBorder}
        />
      );
    });
  };

  const getLikesButton = () => {
    const index = loginUser?.likeAnime.find(
      (anime) => anime == chooseAnime?._id
    );
    return (
      <AnimeLikeButton onClick={() => isLogin(() => likeAnimeFn())}>
        {index ? <img src={likePng} /> : <img src={unLikePng} />}
        <p>Like It</p>
      </AnimeLikeButton>
    );
  };

  const ifRate = () => {
    const userRateAnime = loginUser?.rate.map((item) => item.animeId);
    if (chooseAnime) {
      const index = userRateAnime?.indexOf(chooseAnime._id);
      if (index == -1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  return (
    <AnimOnePage>
      <AnimOneHeader style={{ display: getWidth() > 600 ? "flex" : "inline" }}>
        <AnimOneHeaderLeft>
          <img src={chooseAnime?.headImage} />
          <OnePageStarDiv
            onMouseEnter={() => setEnterRate(true)}
            onMouseLeave={() => setEnterRate(false)}
          >
            {!enterRate ? (
              <OnePageStarChildDiv>
                {getStar(chooseAnime ? chooseAnime.rate : null)}
              </OnePageStarChildDiv>
            ) : ifRate() ? (
              <OnePageStarChildDiv>{getChooseStar()}</OnePageStarChildDiv>
            ) : (
              <OnePageStarChildDiv>
                {getStar(chooseAnime ? chooseAnime.rate : null)}
              </OnePageStarChildDiv>
            )}
            <p>Give it a rate if you watched it</p>
          </OnePageStarDiv>
        </AnimOneHeaderLeft>
        <div
          style={{
            marginLeft: getWidth() > 600 ? "40px" : "0px",
            width: getWidth() > 600 ? "520px" : "100%",
            marginBottom: getWidth() > 600 ? "px" : "24px",
          }}
        >
          <AnimOneHeaderLabel
            style={{
              width: getWidth() > 600 ? "100%" : "269px",
            }}
          >
            <h6>Aired:</h6>
            <p>{chooseAnime?.aired}</p>
          </AnimOneHeaderLabel>
          <AnimOneHeaderLabel
            style={{
              width: getWidth() > 600 ? "100%" : "269px",
            }}
          >
            <h6>Producers:</h6>
            <p>{chooseAnime?.producers}</p>
          </AnimOneHeaderLabel>
          <AnimOneHeaderLabel
            style={{
              width: getWidth() > 600 ? "100%" : "269px",
            }}
          >
            <h6>Rating:</h6>
            <p>{chooseAnime?.rating}</p>
          </AnimOneHeaderLabel>
          <AnimOneWhereWatchLabel
            style={{
              width: getWidth() > 600 ? "100%" : "300px",
            }}
          >
            <h6
              style={{
                width: getWidth() > 600 ? "100%" : "269px",
              }}
            >
              Where to Watch:
            </h6>
            <div
              style={{
                width: getWidth() > 600 ? "100%" : "269px",
                margin: getWidth() > 600 ? "" : "0px auto",
                display: "flex",
              }}
            >
              {getWhereToWatch()}
            </div>
          </AnimOneWhereWatchLabel>
          <LikeButton
            style={{
              width: getWidth() > 600 ? "100%" : "269px",
            }}
          >
            {getLikesButton()}
            <p
              style={{
                cursor: "pointer",
                lineHeight: "32px",
                marginBottom: "0px",
                fontSize: "16px",
                color: "#4BA3C3",
                marginLeft: "8px",
              }}
              onClick={() => {
                history.push({
                  pathname: `/profileLoginUser/${
                    loginUser ? loginUser._id : ""
                  }Like`,
                });
              }}
            >
              see your like-it here
            </p>
          </LikeButton>
          <div
            style={{
              width: getWidth() > 600 ? "100%" : "269px",
              margin: getWidth() > 600 ? "" : "0px auto",
            }}
          >
            <ShareDiv marginTop={"24px"} />
          </div>
        </div>
      </AnimOneHeader>
      <AnimeOneVideo
        anime={chooseAnime}
        pageSizeSetting={1}
        ifShowHeader={false}
        ifShowAdd={true}
        toAddVideo={toPage}
        toVideo={(num: number) => toPage(num)}
      />
      <AnimeOneProducts
        anime={chooseAnime}
        pageSizeSetting={3}
        ifShowHeader={false}
        ifShowAdd={true}
        toAddProduct={toPage}
        toProduct={(num: number) => toPage(num)}
        discovery={false}
      />
      <AnimeOneTitle>Forum</AnimeOneTitle>
      <AnimeOneForum
        anime={chooseAnime}
        pageSizeSetting={6}
        ifShowHeader={false}
        ifShowAdd={true}
        toForum={(num: number) => toPage(num)}
        showLink={true}
      />
    </AnimOnePage>
  );
};

export default AnimeOnePage;
