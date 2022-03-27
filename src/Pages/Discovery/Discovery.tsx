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
import { MoreRight } from "../../cssJs/basicCss";
import {
  DiscoveryBox,
  DiscoverySubTitle,
  DiscoveryTitle,
} from "../../cssJs/DiscoveryPage/discoveryPageCss";
import { NewType } from "../../types/NewsType";
import AnimeOneForum from "../AnimePage/AnimeOneCpmponents/AnimeOneForums";
import AnimeOneProducts from "../AnimePage/AnimeOneCpmponents/AnimeOneProducts";
import AnimeOneVideo from "../AnimePage/AnimeOneCpmponents/AnimeOneVideo";
import DiscoveryHeader from "./DiscoveryHeader";
import moreRightImg from "../../files/moreRightArrow.png";
import { getWidth } from "../../helperFns/widthFn";

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
            pageSizeSetting={6}
            ifShowHeader={false}
            ifShowAdd={false}
            discovery={true}
          />
        );
      case 1:
        return (
          <AnimeOneProducts
            anime={null}
            pageSizeSetting={6}
            ifShowHeader={false}
            ifShowAdd={false}
            discovery={true}
          />
        );
      case 2:
        return (
          <AnimeOneForum
            anime={null}
            pageSizeSetting={6}
            ifShowHeader={false}
            ifShowAdd={false}
            discovery={true}
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
          <DiscoveryTitle>Explore</DiscoveryTitle>
          <DiscoveryHeader />
          <DiscoverySubTitle>The latest posts</DiscoverySubTitle>
          {getWidth() > 600 ? (
            <AnimeButtonsDiv>{getButtons()}</AnimeButtonsDiv>
          ) : (
            getButtons()
          )}
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
            <h6 style={{ fontWeight: "bold" }}>News</h6>
            {allNews.map((news, index) => {
              return (
                <p key={index}>
                  {news.header.length > 35
                    ? `${news.header.substring(0, 35)}.....`
                    : news.header}
                </p>
              );
            })}
            <MoreRight
              onClick={() => {
                console.log("more");
              }}
            >
              <img src={moreRightImg} />
              <p
                style={{
                  height: "32px",
                  lineHeight: "32px;",
                  color: "#302d46;",
                  fontWeight: "bold",
                  marginTop: "0px",
                  marginBottom: "0px",
                }}
              >
                More
              </p>
            </MoreRight>
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
