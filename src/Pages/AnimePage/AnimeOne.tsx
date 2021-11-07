import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AnimeButton from "../../components/Button";
import {
  AnimeButtonsDiv,
  AnimOne,
  AnimOneMain,
  AnimOneSide,
} from "../../cssJs/AnimePage/AnimeOneCss";
import { Anime } from "../../types/Amine";
import { IStoreState } from "../../types/IStoreState";
import AnimeOneForum from "./AnimeOneCpmponents/AnimeOneForums";
import AnimeOnePage from "./AnimeOneCpmponents/AnimeOnePage";
import AnimeOneProductAdd from "./AnimeOneCpmponents/AnimeOneProductAdd";
import AnimeOneProducts from "./AnimeOneCpmponents/AnimeOneProducts";
import AnimeOneVideo from "./AnimeOneCpmponents/AnimeOneVideo";
import AnimeOneVideoAdd from "./AnimeOneCpmponents/AnimeOneVideoAdd";

const AnimeOne = (): JSX.Element => {
  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

  const [chooseButton, setChooseButton] = useState<number>(0);

  useEffect(() => {
    console.log(chooseAnime);
  }, [chooseAnime, chooseButton]);

  const buttonsColor = [
    {
      text: "Page",
      color: "#4BA3C3",
      backColor: "white",
    },
    {
      text: "Videos",
      color: "#4BA3C3",
      backColor: "white",
    },
    {
      text: "Products",
      color: "#4BA3C3",
      backColor: "white",
    },
    {
      text: "Forums",
      color: "#4BA3C3",
      backColor: "white",
    },
  ];

  const changeButton = (index: number) => setChooseButton(index);

  const getButtons = () => {
    let indexNum = chooseButton;
    if (chooseButton == 4) {
      indexNum = 1;
    }
    if (chooseButton == 5) {
      indexNum = 2;
    }
    return buttonsColor.map((button, index) => {
      if (index == indexNum) {
        return (
          <div key={index}>
            <AnimeButton
              para=""
              text={button.text}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="#F6F6F6 "
              borderColor="white"
              buttonClick={() => changeButton(index)}
            />
          </div>
        );
      } else {
        return (
          <div key={index}>
            <AnimeButton
              para=""
              text={button.text}
              width="120px"
              height="32px"
              textColor="#4BA3C3"
              backGroundColor="white "
              borderColor="#4BA3C3"
              buttonClick={() => changeButton(index)}
            />
          </div>
        );
      }
    });
  };

  const getChildDiv = () => {
    switch (chooseButton) {
      case 0:
        return <AnimeOnePage toVideo={(page: number) => changeButton(page)} />;
      case 1:
        return (
          <AnimeOneVideo
            anime={chooseAnime}
            pageSizeSetting={1}
            ifShowHeader={true}
            ifShowAdd={false}
          />
        );
      case 2:
        return (
          <AnimeOneProducts
            anime={chooseAnime}
            pageSizeSetting={3}
            ifShowHeader={true}
            ifShowAdd={false}
          />
        );
      case 3:
        return (
          <AnimeOneForum
            anime={chooseAnime}
            pageSizeSetting={3}
            ifShowHeader={true}
            ifShowAdd={false}
          />
        );
      case 4:
        return <AnimeOneVideoAdd />;
      case 5:
        return <AnimeOneProductAdd />;
      default:
        return <></>;
    }
  };

  return (
    <AnimOne>
      <AnimOneMain>
        <h6>Anime</h6>
        <h6>{chooseAnime?.title}</h6>
        <AnimeButtonsDiv>{getButtons()}</AnimeButtonsDiv>
        {getChildDiv()}
      </AnimOneMain>
      <AnimOneSide></AnimOneSide>
    </AnimOne>
  );
};

export default AnimeOne;
