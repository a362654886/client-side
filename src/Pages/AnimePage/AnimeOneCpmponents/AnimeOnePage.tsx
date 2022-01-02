import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AnimOneHeader,
  AnimOneHeaderLabel,
  AnimOneHeaderLeft,
  AnimOneHeaderRight,
  AnimOneIcons,
  AnimOnePage,
  AnimOneWhereWatchImg,
  AnimOneWhereWatchLabel,
  LikeButton,
  OnePageStarChildDiv,
  OnePageStarDiv,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import { Anime, RateBody } from "../../../types/Amine";
import { IStoreState } from "../../../types/IStoreState";
import crunchyroll from "../../../files/cunp.png";
import Funimation from "../../../files/Funimation.png";
import tubi from "../../../files/Tubi.png";
import hidive from "../../../files/Hidive.png";
import VIZ from "../../../files/VIZ.png";
import AnimePlant from "../../../files/AnimePlant.png";
import AnimeButton from "../../../components/Button";
import starBorder from "../../../files/Star-border.svg";
import starFill from "../../../files/Star-filled.svg";
import facebook from "../../../files/facebook.svg";
import insImage from "../../../files/insImage.svg";
import twitter from "../../../files/twitterP.svg";
import copy from "../../../files/copy.svg";
import AnimeOneForum from "./AnimeOneForums";
import { AnimeOneTitle } from "../../../cssJs/AnimePage/AnimeOneCss";
import AnimeOneProducts from "./AnimeOneProducts";
import AnimeOneVideo from "./AnimeOneVideo";
import { User } from "../../../types/User";
import { useEffect, useState } from "react";
import { animeUpdateLike, animeUpdateRate } from "../../../api/animeAPI";
import { userUpdateLike, userUpdateRate } from "../../../api/userApi";
import { LOGIN_USER_ADD } from "../../../redux/loginUser";
import { ANIME_ADD } from "../../../redux/anime";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../../helperFns/popUpAlert";

interface IProps {
  toPage: (page: number) => void;
}

const AnimeOnePage = ({ toPage }: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

  const [likeAnime, setLikeAnime] = useState<string[]>(
    loginUser?.likeAnime ? loginUser?.likeAnime : []
  );

  const [enterRate, setEnterRate] = useState<boolean>(false);
  const [chooseRate, setChooseRate] = useState<number>(0);

  const toOther = (url: string) => window.open(url);

  useEffect(() => {
    //console.log(enterRate);
  }, [enterRate]);

  useEffect(() => {
    //
  }, [loginUser, chooseAnime]);

  const likeAnimeFn = async () => {
    if (loading == false) {
      let likesArr: string[] = [];
      if (loginUser?.likeAnime) {
        likesArr = loginUser?.likeAnime;
      }
      likesArr.push(chooseAnime?._id as string);

      changeLikeUi(likesArr, 1);
      //post like num
      setLoading(true);
      const animeLikeResult = await animeUpdateLike(
        chooseAnime?._id as string,
        chooseAnime?.likes ? chooseAnime?.likes : 0
      );
      const userLikeResult = await userUpdateLike(
        loginUser?._id as string,
        likesArr
      );
      setLoading(false);
    } else {
      console.log("please wait some seconds");
    }
  };

  const changeLikeUi = (likesArr: string[], num: number) => {
    setLikeAnime(likesArr);

    const readyUpdateUser: User = loginUser as User;
    readyUpdateUser.likeAnime = likesArr;

    dispatch({
      payload: readyUpdateUser,
      type: LOGIN_USER_ADD,
    });

    const readyUpdateAnime: Anime = chooseAnime as Anime;
    readyUpdateAnime.likes = readyUpdateAnime.likes + num;

    dispatch({
      payload: readyUpdateAnime,
      type: ANIME_ADD,
    });
  };

  const unlikeAnimeFn = async () => {
    if (loading == false) {
      const likesArr = loginUser?.likeAnime as string[];
      const index = loginUser?.likeAnime.indexOf(chooseAnime?._id as string);
      if (index != undefined && index != -1) {
        likesArr.splice(index, 1);
      }

      changeLikeUi(likesArr, -1);
      //post like num
      setLoading(true);
      //post like num
      const animeLikeResult = await animeUpdateLike(
        chooseAnime?._id as string,
        chooseAnime?.likes as number
      );
      console.log(animeLikeResult);
      const userLikeResult = await userUpdateLike(
        loginUser?._id as string,
        likesArr
      );
      setLoading(false);
    } else {
      console.log("please wait some seconds");
    }
  };

  const getWhereToWatch = () =>
    chooseAnime?.whereToWatch.map((img, index) => {
      switch (img) {
        case "Funimation":
          return (
            <AnimOneWhereWatchImg
              src={Funimation}
              key={index}
              onClick={() => toOther("https://www.funimation.com")}
            />
          );
        case "crunchyroll":
          return (
            <AnimOneWhereWatchImg
              src={crunchyroll}
              key={index}
              onClick={() => toOther("https://www.crunchyroll.com")}
            />
          );
        case "hidive":
          return (
            <AnimOneWhereWatchImg
              src={hidive}
              key={index}
              onClick={() => toOther("https://www.hidive.com/dashboard")}
            />
          );
        case "tubi":
          return (
            <AnimOneWhereWatchImg
              src={tubi}
              key={index}
              onClick={() => toOther("https://tubitv.com/")}
            />
          );
        case "VIZ":
          return (
            <AnimOneWhereWatchImg
              src={VIZ}
              key={index}
              onClick={() => toOther("https://www.viz.com/")}
            />
          );
        case "AnimePlant":
          return (
            <AnimOneWhereWatchImg
              src={AnimePlant}
              key={index}
              onClick={() => toOther("https://www.anime-planet.com/ ")}
            />
          );
      }
    });

  const isLogin = (likeFn: () => Promise<void>) => {
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
      return [1, 2, 3, 4, 5].map((n) => {
        if (rateNum > n) {
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
    const index = likeAnime.find((anime) => anime == chooseAnime?._id);
    if (index) {
      return (
        <AnimeButton
          para=""
          text={"Like it"}
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#892E2F "
          borderColor="#892E2F"
          buttonClick={() => isLogin(() => unlikeAnimeFn())}
        />
      );
    } else {
      return (
        <AnimeButton
          para=""
          text={"Like it"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="white"
          borderColor="#892E2F"
          buttonClick={() => isLogin(() => likeAnimeFn())}
        />
      );
    }
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
      <AnimOneHeader>
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
        <AnimOneHeaderRight>
          <AnimOneHeaderLabel>
            <h6>Aired:</h6>
            <p>{chooseAnime?.aired}</p>
          </AnimOneHeaderLabel>
          <AnimOneHeaderLabel>
            <h6>Producers:</h6>
            <p>{chooseAnime?.producers}</p>
          </AnimOneHeaderLabel>
          <AnimOneHeaderLabel>
            <h6>Rating:</h6>
            <p>{chooseAnime?.rating}</p>
          </AnimOneHeaderLabel>
          <AnimOneWhereWatchLabel>
            <h6>Where to Watch:</h6>
            {getWhereToWatch()}
          </AnimOneWhereWatchLabel>
          <LikeButton>{getLikesButton()}</LikeButton>
          <AnimOneIcons>
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
          </AnimOneIcons>
        </AnimOneHeaderRight>
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
      />
      <AnimeOneTitle>Forum</AnimeOneTitle>
      <AnimeOneForum
        anime={chooseAnime}
        pageSizeSetting={3}
        ifShowHeader={false}
        ifShowAdd={true}
        toForum={(num: number) => toPage(num)}
      />
    </AnimOnePage>
  );
};

export default AnimeOnePage;
