import * as React from "react";
import { useSelector } from "react-redux";
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
import crunchyroll from "../../../files/crunchyroll.png";
import hulu from "../../../files/hulu.jpg";
import mal from "../../../files/mal.png";
import tubi from "../../../files/tubi.png";
import AnimeButton from "../../../components/Button";
import starBorder from "../../../files/Star-border.png";
import starFill from "../../../files/Star-filled.png";
import AnimeOneForum from "./AnimeOneForums";
import { AnimeOneTitle } from "../../../cssJs/AnimePage/AnimeOneCss";
import AnimeOneProducts from "./AnimeOneProducts";
import AnimeOneVideo from "./AnimeOneVideo";

interface IProps {
  toPage: (page: number) => void;
}

const AnimeOnePage = ({ toPage }: IProps): JSX.Element => {
  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

  const getWhereToWatch = () =>
    chooseAnime?.whereToWatch.map((img, index) => {
      switch (img) {
        case "hulu":
          return <AnimOneWhereWatchImg src={hulu} key={index} />;
        case "crunchyroll":
          return <AnimOneWhereWatchImg src={crunchyroll} key={index} />;
        case "mal":
          return <AnimOneWhereWatchImg src={mal} key={index} />;
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

  return (
    <AnimOnePage>
      <AnimOneHeader>
        <AnimOneHeaderLeft>
          <img src={chooseAnime?.headImage} />
          <OnePageStarDiv>
            {getStar(chooseAnime ? chooseAnime.likes.length : 0)}
          </OnePageStarDiv>
          <p>Give it a rate if you watched it</p>
        </AnimOneHeaderLeft>
        <AnimOneHeaderRight>
          <AnimOneHeaderLabel>
            <h6>Aired</h6>
            <p>{chooseAnime?.aired}</p>
          </AnimOneHeaderLabel>
          <AnimOneHeaderLabel>
            <h6>Producers</h6>
            <p>{chooseAnime?.producers}</p>
          </AnimOneHeaderLabel>
          <AnimOneHeaderLabel>
            <h6>Rating</h6>
            <p>{chooseAnime?.rating}</p>
          </AnimOneHeaderLabel>
          <AnimOneWhereWatchLabel>
            <h6>Where to Watch</h6>
            {getWhereToWatch()}
          </AnimOneWhereWatchLabel>
          <LikeButton>
            <AnimeButton
              para=""
              text={"Like it"}
              width="120px"
              height="32px"
              textColor="white"
              backGroundColor="#892E2F "
              borderColor="#892E2F"
              buttonClick={() => {
                console.log("");
              }}
            />
          </LikeButton>
        </AnimOneHeaderRight>
      </AnimOneHeader>
      <AnimeOneTitle>Videos</AnimeOneTitle>
      <AnimeOneVideo
        anime={chooseAnime}
        pageSizeSetting={1}
        ifShowHeader={false}
        ifShowAdd={true}
        toAddVideo={toPage}
      />
      <AnimeOneTitle>Products</AnimeOneTitle>
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
