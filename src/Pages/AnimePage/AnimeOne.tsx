import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { newAllGet } from "../../api/newsAPI";
import AnimeButton from "../../components/Button";
import {
  AnimeButtonsDiv,
  AnimeMobileButtonsDiv,
  AnimOne,
  AnimOneMain,
  AnimOneSide,
  AnimOneSideTwo,
} from "../../cssJs/AnimePage/AnimeOneCss";
import { MoreRight } from "../../cssJs/basicCss";
import { Anime } from "../../types/Amine";
import { IStoreState } from "../../types/IStoreState";
import { NewType } from "../../types/NewsType";
import AnimeOneForum from "./AnimeOneCpmponents/AnimeOneForums";
import AnimeOnePage from "./AnimeOneCpmponents/AnimeOnePage";
import AnimeOneProductAdd from "./AnimeOneCpmponents/AnimeOneProductAdd";
import AnimeOneProducts from "./AnimeOneCpmponents/AnimeOneProducts";
import AnimeOneVideo from "./AnimeOneCpmponents/AnimeOneVideo";
import AnimeOneVideoAdd from "./AnimeOneCpmponents/AnimeOneVideoAdd";
import moreRightImg from "../../files/moreRightArrow.png";
import { getWidth } from "../../helperFns/widthFn";

const AnimeOne = (): JSX.Element => {
  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

  const [chooseButton, setChooseButton] = useState<number>(0);
  const [allNews, setAllNews] = useState<NewType[]>([]);

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

  useEffect(() => {
    //
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
              backGroundColor="#AAFFC9 "
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

  const getChildDiv = () => {
    switch (chooseButton) {
      case 0:
        return <AnimeOnePage toPage={(page: number) => changeButton(page)} />;
      case 1:
        return (
          <AnimeOneVideo
            anime={chooseAnime}
            pageSizeSetting={6}
            ifShowHeader={true}
            ifShowAdd={true}
            toAddVideo={(page: number) => changeButton(page)}
            toVideo={(num: number) => setChooseButton(num)}
          />
        );
      case 2:
        return (
          <AnimeOneProducts
            anime={chooseAnime}
            pageSizeSetting={getWidth() > 600 ? 18 : 6}
            ifShowHeader={true}
            ifShowAdd={true}
            toAddProduct={(page: number) => changeButton(page)}
            discovery={false}
          />
        );
      case 3:
        return (
          <AnimeOneForum
            anime={chooseAnime}
            pageSizeSetting={6}
            ifShowHeader={true}
            ifShowAdd={true}
          />
        );
      case 4:
        return (
          <AnimeOneVideoAdd toVideo={(num: number) => setChooseButton(num)} />
        );
      case 5:
        return (
          <AnimeOneProductAdd
            toProduct={(num: number) => setChooseButton(num)}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      <AnimOne
        style={{
          width:
            getWidth() > 1200 ? "100%" : getWidth() > 600 ? "896px" : "100%",
          paddingLeft: getWidth() > 600 ? "" : "8px",
        }}
      >
        <AnimOneMain>
          <h1>Anime</h1>
          <h1 style={{ marginTop: "0px" }}>{chooseAnime?.title}</h1>
          {getWidth() > 600 ? (
            <AnimeButtonsDiv>{getButtons()}</AnimeButtonsDiv>
          ) : (
            <AnimeMobileButtonsDiv
              style={{ display: "flex", width: "100%", flexFlow: "wrap" }}
            >
              {getButtons()}
            </AnimeMobileButtonsDiv>
          )}
          <div>{getChildDiv()}</div>
        </AnimOneMain>
        <div
          style={{
            width: "276px",
            marginLeft: "10px",
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
    </>
  );
};

export default AnimeOne;
