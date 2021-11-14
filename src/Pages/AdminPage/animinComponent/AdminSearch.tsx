import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { animeAllGet, animeDelete } from "../../../api/animeAPI";
import AnimeButton from "../../../components/Button";
import { PaginationDiv } from "../../../components/Pagination";
import {
  AnimeTableElement,
  AnimeTableItem,
  AnimeTableTitle,
  SearchDiv,
  SearchTableDiv,
  ViewButton,
  ViewButtonText,
} from "../../../cssJs/AdminPage/animeSearchCss";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { Anime } from "../../../types/Amine";
import { LoadingType } from "../../../types/EnumTypes";

interface IProps {
  editAnime: (anime: Anime) => void;
}

const AdminSearch = ({ editAnime }: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
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

  const newPage = async (page: number) => setPage(page);

  const search = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const animeResult = await animeAllGet(searchValue, page, pageSize);
    if (animeResult) {
      setAllAnime(animeResult.result);
      setCount(Math.ceil(animeResult.count / pageSize));
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

  const getTable = () =>
    allAnime.map((anime, index) => (
      <AnimeTableElement key={index}>
        <AnimeTableItem>{anime.title}</AnimeTableItem>
        <ViewButton onClick={() => editAnime(anime)}>edit</ViewButton>
        <ViewButton onClick={() => deleteAnime(anime._id)}>delete</ViewButton>
      </AnimeTableElement>
    ));

  const getTableFn = () => (
    <>
      <AnimeTableTitle>
        <AnimeTableItem>
          <h6>title</h6>
        </AnimeTableItem>
        <ViewButtonText>Edit</ViewButtonText>
        <ViewButtonText>Delete</ViewButtonText>
      </AnimeTableTitle>
      {getTable()}
    </>
  );

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
          buttonClick={() => search()}
        />
      </SearchDiv>
      <SearchTableDiv>
        {getTableFn()}
        <PaginationDiv pageSize={pageSize} propFn={newPage} count={count} />
      </SearchTableDiv>
    </>
  );
};

export default AdminSearch;
