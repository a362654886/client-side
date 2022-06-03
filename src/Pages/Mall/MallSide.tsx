import * as React from "react";
import { useEffect, useState } from "react";
import { AnimOneSide, AnimOneSideTwo } from "../../cssJs/AnimePage/AnimeOneCss";
import { MoreRight } from "../../cssJs/basicCss";
import { MallSideDiv } from "../../cssJs/MallPage/MallPageCss";
import { NewType } from "../../types/NewsType";
import moreRightImg from "../../files/moreRightArrow.png";
import { newAllGet } from "../../api/newsAPI";
import { useHistory } from "react-router-dom";

const MallSide = (): JSX.Element => {
  
  const history = useHistory();
  
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

  return (
    <div
      style={{
        display:
          document.documentElement.clientWidth > 1181 ? "inline" : "none",
      }}
    >
      <MallSideDiv>
        <AnimOneSide>
          <h6 style={{ fontWeight: "bold" }}>News</h6>
          {allNews.map((news, index) => {
            return (
              <p
                key={index}
                onClick={() => {
                  history.push(`oneNew/${news._id}`);
                }}
              >
                {news.header.length > 35
                  ? `${news.header.substring(0, 35)}.....`
                  : news.header}
              </p>
            );
          })}
          <MoreRight
            onClick={() => {
              history.push(`news`);
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
      </MallSideDiv>
    </div>
  );
};

export default MallSide;
