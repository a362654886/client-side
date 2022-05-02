import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { animeAllGet, animeDelete } from "../../../api/animeAPI";
import AnimeButton, { MoreButtonDiv } from "../../../components/Button";
import {
  AnimeTableElement,
  AnimeTableItem,
  SearchDiv,
  SearchTableDiv,
  ViewButton,
} from "../../../cssJs/AdminPage/animeSearchCss";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { Anime } from "../../../types/Amine";
import { LoadingType } from "../../../types/EnumTypes";
import editIcon from "../../../files/editIcon.svg";
import deleteIcon from "../../../files/deleteIcon.svg";
import getMoreImg from "../../../files/getMore.png";

interface IProps {
  editAnime: (anime: Anime) => void;
}

const AdminSearch = ({ editAnime }: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [count, setCount] = useState<number>(0);
  const pageSize = 2;

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
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const animeResult = await animeAllGet(
      searchValue,
      "general",
      page,
      pageSize
    );
    if (animeResult) {
      setAllAnime(
        page == 1 ? animeResult.result : allAnime.concat(animeResult.result)
      );
      setCount(animeResult.count);
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const deleteAnime = async (id: string) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const r = await animeDelete(id);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (r == 200) {
      const newAnimeArr: Anime[] = [];
      allAnime.map((anime) => {
        if (anime._id != id) {
          newAnimeArr.push(anime);
        }
      });
      setAllAnime(newAnimeArr as Anime[]);
    }
  };

  const getTableFn = () => (
    <>
      {allAnime.map((anime, index) => (
        <AnimeTableElement key={index}>
          <AnimeTableItem>{anime.title}</AnimeTableItem>
          <div>
            <ViewButton onClick={() => editAnime(anime)}>
              <img src={editIcon} />
              <p>Edit</p>
            </ViewButton>
            <ViewButton onClick={() => deleteAnime(anime._id)}>
              <img src={deleteIcon} />
              <p>Delete</p>
            </ViewButton>
          </div>
        </AnimeTableElement>
      ))}
    </>
  );

  const getMore = () => {
    const newPage = page + 1;
    setPage(newPage);
  };

  return (
    <>
      <SearchDiv>
        <Input placeholder={"searchValue"} onChange={onChange}></Input>
        <AnimeButton
          para=""
          text="Search"
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="white"
          buttonClick={() => {
            setPage(1);
          }}
        />
      </SearchDiv>
      <SearchTableDiv>{getTableFn()}</SearchTableDiv>
      {allAnime.length < count ? (
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

export default AdminSearch;
