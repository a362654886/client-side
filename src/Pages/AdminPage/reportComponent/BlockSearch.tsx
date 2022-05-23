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

const BlockSearch = (): JSX.Element => {
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
    console.log("search");
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
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
      BlockSearch
    </>
  );
};

export default BlockSearch;
