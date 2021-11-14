import * as React from "react";
import { useEffect, useState } from "react";
import AnimeButton from "../../components/Button";
import { AnimeButtonsDiv } from "../../cssJs/AnimePage/AnimeOneCss";
import {
  DiscoveryBox,
  DiscoveryTitle,
} from "../../cssJs/DiscoveryPage/discoveryPageCss";
import AnimeOneForum from "../AnimePage/AnimeOneCpmponents/AnimeOneForums";
import AnimeOneProducts from "../AnimePage/AnimeOneCpmponents/AnimeOneProducts";
import AnimeOneVideo from "../AnimePage/AnimeOneCpmponents/AnimeOneVideo";

const Discovery = (): JSX.Element => {
  const [chooseButton, setChooseButton] = useState<number>(0);

  useEffect(() => {
    console.log(chooseButton);
  }, [chooseButton]);

  const buttonsColor = [
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
    const indexNum = chooseButton;
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
        return (
          <AnimeOneVideo
            anime={null}
            pageSizeSetting={1}
            ifShowHeader={false}
            ifShowAdd={false}
          />
        );
      case 1:
        return (
          <AnimeOneProducts
            anime={null}
            pageSizeSetting={3}
            ifShowHeader={false}
            ifShowAdd={false}
          />
        );
      case 2:
        return (
          <AnimeOneForum
            anime={null}
            pageSizeSetting={1}
            ifShowHeader={false}
            ifShowAdd={false}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <DiscoveryBox>
      <DiscoveryTitle>Discovery</DiscoveryTitle>
      <AnimeButtonsDiv>{getButtons()}</AnimeButtonsDiv>
      {getChildDiv()}
    </DiscoveryBox>
  );
};

export default Discovery;
