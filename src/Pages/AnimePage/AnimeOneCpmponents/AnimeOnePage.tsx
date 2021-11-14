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
import crunchyroll from "../../../files/crun.jpg";
import mal from "../../../files/mal.png";
import tubi from "../../../files/tub.jpg";
import Funimation from "../../../files/fun.jpg";
import hidive from "../../../files/hi.jpg";
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

  useEffect(() => {
    //
  }, [loginUser, chooseAnime]);

  const likeAnimeFn = async () => {
    //post like num
    setLoading(true);
    const animeLikeResult = await animeUpdateLike(
      chooseAnime?._id as string,
      chooseAnime?.likes ? chooseAnime?.likes + 1 : 1
    );
    let likesArr: string[] = [];
    if (loginUser?.likeAnime) {
      likesArr = loginUser?.likeAnime;
    }
    likesArr.push(chooseAnime?._id as string);
    const userLikeResult = await userUpdateLike(
      loginUser?._id as string,
      likesArr
    );

    if (animeLikeResult == 200 && userLikeResult == 200) {
      setLikeAnime(likesArr);

      const readyUpdateUser: User = loginUser as User;
      readyUpdateUser.likeAnime = likesArr;

      dispatch({
        payload: readyUpdateUser,
        type: LOGIN_USER_ADD,
      });

      const readyUpdateAnime: Anime = chooseAnime as Anime;
      readyUpdateAnime.likes = readyUpdateAnime.likes + 1;

      dispatch({
        payload: readyUpdateAnime,
        type: ANIME_ADD,
      });
    }
    setLoading(false);
  };

  const unlikeAnimeFn = async () => {
    setLoading(true);
    //post like num
    const animeLikeResult = await animeUpdateLike(
      chooseAnime?._id as string,
      (chooseAnime?.likes as number) - 1
    );
    const likesArr = loginUser?.likeAnime as string[];
    const index = loginUser?.likeAnime.indexOf(chooseAnime?._id as string);
    if (index != undefined) {
      likesArr.splice(index, 1);
      console.log(likesArr);
    }
    const userLikeResult = await userUpdateLike(
      loginUser?._id as string,
      likesArr
    );

    if (animeLikeResult == 200 && userLikeResult == 200) {
      setLikeAnime(likesArr);

      const readyUpdateUser: User = loginUser as User;
      readyUpdateUser.likeAnime = likesArr;

      dispatch({
        payload: readyUpdateUser,
        type: LOGIN_USER_ADD,
      });

      const readyUpdateAnime: Anime = chooseAnime as Anime;
      readyUpdateAnime.likes = readyUpdateAnime.likes - 1;

      dispatch({
        payload: readyUpdateAnime,
        type: ANIME_ADD,
      });
    }
    setLoading(false);
  };

  const getWhereToWatch = () =>
    chooseAnime?.whereToWatch.map((img, index) => {
      switch (img) {
        case "Funimation":
          return <AnimOneWhereWatchImg src={Funimation} key={index} />;
        case "crunchyroll":
          return <AnimOneWhereWatchImg src={crunchyroll} key={index} />;
        case "mal":
          return <AnimOneWhereWatchImg src={mal} key={index} />;
        case "hidive":
          return <AnimOneWhereWatchImg src={hidive} key={index} />;
        case "tubi":
          return <AnimOneWhereWatchImg src={tubi} key={index} />;
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
          <LikeButton>{loading ? <Spin /> : getLikesButton()}</LikeButton>
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
