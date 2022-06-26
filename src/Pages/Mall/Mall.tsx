import * as React from "react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { AnimeButton } from "../../components/Button";
import { AnimeButtonsDiv } from "../../cssJs/AnimePage/AnimeOneCss";
import {
  MallDiv,
  MallShowDiv,
  MallTitle,
  MallTitleDiv,
} from "../../cssJs/MallPage/MallPageCss";
import MallRouter from "../../router/MallRouter";
import MallSide from "./MallSide";

const MallPage = (): JSX.Element => {
  const history = useHistory();

  const [chooseButton, setChooseButton] = useState<number>(0);

  const buttonsColor = [
    /*{
      text: "Redeem",
      color: "#4BA3C3",
      backColor: "white",
    },*/
    {
      text: "Custom",
      color: "#4BA3C3",
      backColor: "white",
    },
  ];

  useEffect(() => {
    toPage("/mall/custom");
  }, []);

  const changeButton = (index: number) => {
    setChooseButton(index);
    /* index == 0
      ? toPage("/mall/redeem")
      : toPage("/mall/custom");*/
    toPage("/mall/custom");
  };

  const toPage = (url: string) => history.push(url);

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
              backGroundColor="#AAFFC9"
              borderColor="#AAFFC9"
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

  return (
    <>
      <Helmet>
        <title>Mall- Animepark.com</title>
        <meta
          name="keywords"
          content="custom, phone case, wall scroll, T-shirt, pillow"
        />
        <meta name="description" content="anime information collection"></meta>
      </Helmet>
      <MallDiv>
        <div style={{ display: "flex" }}>
          <MallShowDiv className="col-xl-9 col-md-9 col-sm-9 col-9">
            <MallTitleDiv>
              <MallTitle>Mall</MallTitle>
            </MallTitleDiv>
            <AnimeButtonsDiv>{getButtons()}</AnimeButtonsDiv>
            <MallRouter />
          </MallShowDiv>
          <div className="col-xl-3 col-md-3 col-sm-3 col-3">
            <MallSide />
          </div>
        </div>
      </MallDiv>
    </>
  );
};

export default MallPage;
