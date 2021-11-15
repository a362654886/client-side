import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AnimOneHeader,
  AnimOneHeaderLabel,
  AnimOneHeaderLeft,
  AnimOneHeaderRight,
  AnimOnePage,
  AnimOneWhereWatchImg,
  AnimOneWhereWatchLabel,
  LikeButton,
  OnePageStarDiv,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import { Anime } from "../../../types/Amine";
import { IStoreState } from "../../../types/IStoreState";
import crunchyroll from "../../../files/cunp.png";
import Funimation from "../../../files/Funimation.png";
import mal from "../../../files/mal.png";
import tubi from "../../../files/Tubi.png";
import hidive from "../../../files/Hidive.png";
import VIZ from "../../../files/VIZ.png";
import AnimePlant from "../../../files/AnimePlant.png";
import AnimeButton from "../../../components/Button";
import starBorder from "../../../files/Star-border.png";
import starFill from "../../../files/Star-filled.png";
import AnimeOneForum from "./AnimeOneForums";
import { AnimeOneTitle } from "../../../cssJs/AnimePage/AnimeOneCss";
import AnimeOneProducts from "./AnimeOneProducts";
import AnimeOneVideo from "./AnimeOneVideo";
import { User } from "../../../types/User";
import { useEffect, useState } from "react";
import { animeUpdateLike } from "../../../api/animeAPI";
import { userUpdateLike } from "../../../api/userApi";
import { LOGIN_USER_ADD } from "../../../redux/loginUser";
import { ANIME_ADD } from "../../../redux/anime";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";

interface IProps {
  toPage: (page: number) => void;
}

const AnimeOnePage = ({ toPage }: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const history = useHistory();

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

  const toOther = (url: string) => window.open(url);

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
      if (index != undefined) {
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

  const getStar = (length: number) => {
    const numArr = [0, 100, 200, 300, 400];
    return numArr.map((n) => {
      if (length > n) {
        return (
          <img
            style={{ width: "32px", height: "32px", marginRight: "8px" }}
            src={starFill}
          />
        );
      } else {
        return (
          <img
            style={{ width: "32px", height: "32px", marginRight: "8px" }}
            src={starBorder}
          />
        );
      }
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
          buttonClick={() => unlikeAnimeFn()}
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
          buttonClick={() => likeAnimeFn()}
        />
      );
    }
  };

  return (
    <AnimOnePage>
      <AnimOneHeader>
        <AnimOneHeaderLeft>
          <img src={chooseAnime?.headImage} />
          <OnePageStarDiv>
            {getStar(chooseAnime ? chooseAnime.likes : 0)}
          </OnePageStarDiv>
          <p>Give it a rate if you watched it</p>
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
        </AnimOneHeaderRight>
      </AnimOneHeader>
      <AnimeOneVideo
        anime={chooseAnime}
        pageSizeSetting={1}
        ifShowHeader={false}
        ifShowAdd={true}
        toAddVideo={toPage}
      />
      <AnimeOneProducts
        anime={chooseAnime}
        pageSizeSetting={3}
        ifShowHeader={false}
        ifShowAdd={true}
        toAddProduct={toPage}
      />
      <AnimeOneTitle>Forum</AnimeOneTitle>
      <AnimeOneForum
        anime={chooseAnime}
        pageSizeSetting={1}
        ifShowHeader={false}
        ifShowAdd={true}
      />
    </AnimOnePage>
  );
};

export default AnimeOnePage;
