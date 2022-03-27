import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { newAllGet } from "../../api/newsAPI";
import AnimeButton from "../../components/Button";
import LoadingDiv from "../../components/LoadingDiv";
import { CenterDiv } from "../../cssJs/AnimePage/AnimeShowCss";
import {
  NewBody,
  NewBodyContext,
  NewHeaderTitle,
  NewMainBox,
} from "../../cssJs/newsCss";
import { NEW_ADD } from "../../redux/newBody";
import { NewType } from "../../types/NewsType";

const NewsPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  //const [count, setCount] = useState<number>(0);
  const [allNews, setAllNews] = useState<NewType[]>([]);
  const pageSize = 1;

  useEffect(() => {
    (async function anyNameFunction() {
      await search();
    })();
  }, [page]);

  const search = async () => {
    setLoading(true);
    const animeResult = await newAllGet("", page, pageSize);
    if (animeResult) {
      setAllNews(allNews.concat(animeResult.result));
      //setCount(animeResult.count);
    }
    setLoading(false);
  };

  const setNew = (newBody: NewType) => {
    dispatch({
      payload: newBody,
      type: NEW_ADD,
    });
    history.push("oneNew");
  };

  const getExistNews = () =>
    allNews.map((newBody: NewType, index: number) => {
      const time = new Date(newBody.time);
      return (
        <NewBody key={index} onClick={() => setNew(newBody)}>
          <h2>{newBody.header}</h2>
          <p>{`${
            time.getMonth() + 1
          }-${time.getDate()}-${time.getFullYear()}`}</p>
          <NewBodyContext
            style={{ marginTop: "16px" }}
            dangerouslySetInnerHTML={{ __html: newBody.html }}
          ></NewBodyContext>
          ......
        </NewBody>
      );
    });

  const getResult = () => {
    if (loading) {
      return <LoadingDiv height="300px" width="300px" />;
    } else {
      return <></>;
    }
  };

  const getMore = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  return (
    <NewMainBox>
      <NewHeaderTitle>
        <h1>News</h1>
      </NewHeaderTitle>
      {getExistNews()}
      {getResult()}
      <CenterDiv>
        <AnimeButton
          para=""
          text="View more"
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="white"
          buttonClick={() => getMore()}
        />
      </CenterDiv>
    </NewMainBox>
  );
};

export default NewsPage;
