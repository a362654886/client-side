import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { animeAllGet } from "../../../api/animeAPI";
import AnimeButton from "../../../components/Button";
import LoadingDiv from "../../../components/LoadingDiv";
import { PaginationDiv } from "../../../components/Pagination";
import {
  AnimeTableElement,
  AnimeTableItem,
  AnimeTableTitle,
  SearchDiv,
  SearchTableDiv,
  ViewButton,
} from "../../../cssJs/AdminPage/animeSearchCss";
import { Anime } from "../../../types/Amine";

interface IProps {
  editAnime: (anime:Anime) =>void;
}

const AdminSearch = ({
  editAnime,
}: IProps): JSX.Element => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const animeResult = await animeAllGet(searchValue, page, pageSize);
    if (animeResult) {
      setAllAnime(animeResult.result);
      setCount(Math.ceil(animeResult.count/pageSize));
    }
    setLoading(false);
  };

  const getTable = () =>
    allAnime.map((anime, index) => (
      <AnimeTableElement key={index}>
        <AnimeTableItem>{anime.title}</AnimeTableItem>
        <AnimeTableItem>{anime.aired}</AnimeTableItem>
        <AnimeTableItem>{anime.producers}</AnimeTableItem>
        <AnimeTableItem>{anime.rating}</AnimeTableItem>
        <ViewButton onClick={() => editAnime(anime)}>edit</ViewButton>
      </AnimeTableElement>
    ));

  const getTableFn = () => {
    if (loading) {
      return <LoadingDiv height="100px" width="100px" />;
    } else {
      return (
        <>
          <AnimeTableTitle>
            <AnimeTableItem>
              <h6>title</h6>
            </AnimeTableItem>
            <AnimeTableItem>
              <h6>aired</h6>
            </AnimeTableItem>
            <AnimeTableItem>
              <h6>producers</h6>
            </AnimeTableItem>
            <AnimeTableItem>
              <h6>rating</h6>
            </AnimeTableItem>
          </AnimeTableTitle>
          {getTable()}
        </>
      );
    }
  };

  return (
    <>
      <SearchDiv>
        <Input placeholder={"searchValue"} onChange={onChange}></Input>
        <AnimeButton
          para=""
          text="Submit"
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
