import * as React from "react";
import { useEffect, useState } from "react";
import { newAllGet } from "../../api/newsAPI";
import AnimeButton from "../../components/Button";
import {
  AnimeButtonsDiv,
  AnimOne,
  AnimOneSide,
  AnimOneSideTwo,
} from "../../cssJs/AnimePage/AnimeOneCss";
import {
  DiscoveryBox,
  DiscoveryTitle,
} from "../../cssJs/DiscoveryPage/discoveryPageCss";
import { NewType } from "../../types/NewsType";
import AnimeOneForum from "../AnimePage/AnimeOneCpmponents/AnimeOneForums";
import AnimeOneProducts from "../AnimePage/AnimeOneCpmponents/AnimeOneProducts";
import AnimeOneVideo from "../AnimePage/AnimeOneCpmponents/AnimeOneVideo";

const Discovery = (): JSX.Element => {
  const [chooseButton, setChooseButton] = useState<number>(0);
  const [allNews, setAllNews] = useState<NewType[]>([]);

  useEffect(() => {
    //
  }, [chooseButton]);

  useEffect(() => {
    (async function anyNameFunction() {
      await getNews();
    })();
  }, []);

  const getNews = async () => {
    const animeResult = await newAllGet("", 1, 3);
    if (animeResult) {
      setAllNews(animeResult.result);
    }
  };

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
              backGroundColor="#AAFFC9 "
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
            pageSizeSetting={3}
            ifShowHeader={false}
            ifShowAdd={false}
            discovery={true}
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
            pageSizeSetting={3}
            ifShowHeader={false}
            ifShowAdd={false}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <div>
      <AnimOne>
        <DiscoveryBox className="col-xl-9 col-lg-9 col-md-12 col-sm-12">
          <DiscoveryTitle>Discovery</DiscoveryTitle>
          <AnimeButtonsDiv>{getButtons()}</AnimeButtonsDiv>
          {getChildDiv()}
        </DiscoveryBox>
        <div
          style={{
            width: "276px",
            display:
              document.documentElement.clientWidth > 1181 ? "inline" : "none",
          }}
        >
          <AnimOneSide>
            <h6>News</h6>
            {allNews.map((news, index) => {
              return (
                <p key={index}>
                  {news.header.length > 35
                    ? `${news.header.substring(0, 35)}.....`
                    : news.header}
                </p>
              );
            })}
            <AnimeButton
              para=""
              text={"More"}
              width="120px"
              height="36px"
              textColor="#F5A623"
              backGroundColor="#FBFCDB"
              borderColor="#F5A623"
              buttonClick={() => console.log("more")}
            />
          </AnimOneSide>
          <AnimOneSideTwo>
            <h6>FQA</h6>
            <p>How to gain points?</p>
            <p>How to redeem a gift product?</p>
            <p>How to share a resource?</p>
          </AnimOneSideTwo>
        </div>
      </AnimOne>
    </div>
  );
};

export default Discovery;
