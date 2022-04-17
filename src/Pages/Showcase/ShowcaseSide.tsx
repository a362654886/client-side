import * as React from "react";
import { useEffect, useState } from "react";
import {
  ShowcasePointerText,
  ShowcaseSideDiv,
  ShowcaseSideDivHeader,
  ShowcaseSideDivTagHeader,
  ShowcaseSideName,
  ShowcaseSideNum,
  ShowcaseSideTag,
  ShowcaseSideUser,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { userAwesomeGet } from "../../api/userApi";
import { User } from "../../types/User";
import hotLike from "../../files/hotLike.png";
import hotTag from "../../files/hotTag.png";
import ProfileWrapperDiv from "../../components/ProfileWrapperDiv";
import { AnimOneSide, AnimOneSideTwo } from "../../cssJs/AnimePage/AnimeOneCss";
import { MoreRight } from "../../cssJs/basicCss";
import moreRightImg from "../../files/moreRightArrow.png";
import { newAllGet } from "../../api/newsAPI";
import { NewType } from "../../types/NewsType";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";
import { TagType } from "../../types/tagType";
import { tagAllGet } from "../../api/tagAPI";
import { useHistory } from "react-router-dom";

const ShowcaseSide = (): JSX.Element => {
  const history = useHistory();

  const [users, setUsers] = useState<User[]>([]);
  const [allNews, setAllNews] = useState<NewType[]>([]);
  const [allTags, setAllTags] = useState<TagType[]>([]);

  useEffect(() => {
    (async function anyNameFunction() {
      await searchAwesome();
    })();
  }, []);

  useEffect(() => {
    //
  }, [users, allTags]);

  useEffect(() => {
    (async function anyNameFunction() {
      await getNews();
      await getTags();
    })();
  }, []);

  const toPage = (url: string) => history.push(url);

  const getNews = async () => {
    const animeResult = await newAllGet("", 1, 3);
    if (animeResult) {
      setAllNews(animeResult.result);
    }
  };

  const getTags = async () => {
    const tagsResult = await tagAllGet();
    setAllTags(tagsResult);
  };

  const searchAwesome = async () => {
    const showcaseResult = await userAwesomeGet();
    if (showcaseResult) {
      setUsers(showcaseResult);
    }
  };

  const formatNum = (num: number) => {
    if (num > 1000) {
      return `${(num * 0.01).toFixed(2)}M`;
    } else {
      return num;
    }
  };

  return (
    <div
      style={{
        display:
          document.documentElement.clientWidth > 1181 ? "inline" : "none",
      }}
    >
      <ShowcaseSideDiv>
        <ShowcaseSideDivHeader>
          <div>
            <h2>Awesome Board</h2>
            <img src={hotLike} />
          </div>
        </ShowcaseSideDivHeader>
        {users.map((user, index) => {
          return (
            <ShowcaseSideUser key={index}>
              <ProfileWrapperDiv
                userId={user._id}
                element={
                  <>
                    <img
                      style={{ borderRadius: "50%" }}
                      src={`https://animeimagebucket.s3.amazonaws.com/${user.avatar}`}
                    />
                    <ShowcaseSideName>
                      {`${user.firstName.slice(0, 12)}.${user.lastName
                        .substring(0, 1)
                        .toUpperCase()}`}
                      <Flag
                        style={{ marginLeft: "5px" }}
                        country={flagGet(user.country ? user.country : "")}
                      />
                    </ShowcaseSideName>
                  </>
                }
              ></ProfileWrapperDiv>
              <ShowcaseSideNum>{formatNum(user.awesomeNum)}</ShowcaseSideNum>
            </ShowcaseSideUser>
          );
        })}
        <ShowcaseSideDivTagHeader>
          <div>
            <img src={hotTag} />
            <h2>Hot Tags</h2>
          </div>
        </ShowcaseSideDivTagHeader>
        {allTags.map((tag, index) => {
          return (
            <ShowcaseSideTag key={index}>
              <ShowcasePointerText
                onClick={() => {
                  toPage(
                    `/mainPage/showcase/showTag?tag=${tag.text.replace(
                      "#",
                      ""
                    )}`
                  );
                }}
              >
                {tag.text}
              </ShowcasePointerText>
            </ShowcaseSideTag>
          );
        })}
        <div
          style={{
            width: "276px",
            marginTop: "16px",
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
      </ShowcaseSideDiv>
    </div>
  );
};

export default ShowcaseSide;
