import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { newAllGet, newDelete } from "../../../api/newsAPI";
import AnimeButton, { MoreButtonDiv } from "../../../components/Button";
import LoadingDiv from "../../../components/LoadingDiv";
import {
  AnimeTableElement,
  AnimeTableItem,
  SearchDiv,
  SearchNewsDiv,
  SearchTableDiv,
  ViewButton,
} from "../../../cssJs/AdminPage/animeSearchCss";
import { NewType } from "../../../types/NewsType";
import editIcon from "../../../files/editIcon.svg";
import deleteIcon from "../../../files/deleteIcon.svg";
import getMoreImg from "../../../files/getMore.png";
import { useDispatch } from "react-redux";
import { LoadingType } from "../../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { useHistory } from "react-router-dom";
import { openNewWindow, openNewWindowPath } from "../../../helperFns/windowsFn";

interface IProps {
  editNew: (news: NewType) => void;
}

const NewsSearch = ({ editNew }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [allNews, setAllNews] = useState<NewType[]>([]);
  const [count, setCount] = useState<number>(0);
  const pageSize = 10;

  useEffect(() => {
    (async function anyNameFunction() {
      await search();
    })();
  }, [page]);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "searchValue":
        setSearchValue((e.target as HTMLInputElement).value);
        break;
    }
  };

  const search = async () => {
    setLoading(true);
    const animeResult = await newAllGet(searchValue, page, pageSize);
    if (animeResult) {
      setAllNews(animeResult.result);
      setCount(Math.ceil(animeResult.count / pageSize));
    }
    setLoading(false);
  };

  const deleteAnime = async (id: string) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const r = await newDelete(id);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (r == 200) {
      const newAnimeArr: NewType[] = [];
      allNews.map((oneNew) => {
        if (oneNew._id != id) {
          newAnimeArr.push(oneNew);
        }
      });
      setAllNews(newAnimeArr as NewType[]);
    }
  };

  const getTableFn = () => {
    if (loading) {
      return <LoadingDiv height="100px" width="100px" />;
    } else {
      return (
        <>
          {allNews.map((newBody, index) => (
            <AnimeTableElement key={index}>
              <AnimeTableItem
                style={{ cursor: "pointer" }}
                onClick={() => openNewWindowPath(`${newBody._id}`)}
              >
                {newBody.header}
              </AnimeTableItem>
              <div>
                <ViewButton onClick={() => editNew(newBody)}>
                  <img src={editIcon} />
                  <p>Edit</p>
                </ViewButton>
                <ViewButton onClick={() => deleteAnime(newBody._id)}>
                  <img src={deleteIcon} />
                  <p>Delete</p>
                </ViewButton>
              </div>
            </AnimeTableElement>
          ))}
        </>
      );
    }
  };

  const getMore = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  return (
    <>
      <SearchNewsDiv>
        <Input placeholder={"searchValue"} onChange={onChange}></Input>
        <AnimeButton
          para=""
          text="Search"
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="white"
          buttonClick={() => search()}
        />
      </SearchNewsDiv>
      <SearchTableDiv>{getTableFn()}</SearchTableDiv>
      {allNews.length < count ? (
        <MoreButtonDiv onClick={() => getMore()}>
          <div>
            <img src={`${getMoreImg}`} />
            <p>Load More</p>
          </div>
        </MoreButtonDiv>
      ) : (
        <></>
      )}
    </>
  );
};

export default NewsSearch;
