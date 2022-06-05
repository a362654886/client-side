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
import getMoreImg from "../../../files/getMore.svg";
import { ReportShowType } from "../../../types/blockType";
import { blockGet } from "../../../api/blockAPI";
import {
  ReportDiv,
  ReportHederDiv,
  ReportSearchDiv,
  ReportSearchReason,
  ReportSearchState,
  ReportSearchTime,
} from "../../../cssJs/AdminPage/animeReport";

const ReportSearch = (): JSX.Element => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [allReports, setAllReports] = useState<ReportShowType[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    (async function anyNameFunction() {
      await search();
    })();
  }, [page]);

  useEffect(() => {
    console.log(allReports);
  }, [allReports]);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "searchValue":
        setSearchValue((e.target as HTMLInputElement).value);
        break;
    }
  };

  const search = async (page?: number) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const result = await blockGet(searchValue, page ? page : 1);
    if (result) {
      setAllReports(result.result);
      setCount(result.count);
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const toContextPage = (report: ReportShowType) => {
    console.log(report);
  };

  return (
    <>
      <ReportSearchDiv>
        <Input
          value={searchValue}
          placeholder={"searchValue"}
          onChange={onChange}
        ></Input>
        <AnimeButton
          para=""
          text="Search"
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="white"
          buttonClick={() => {
            search(1);
          }}
        />
      </ReportSearchDiv>
      {allReports.map((report, index) => {
        return (
          <ReportDiv key={index}>
            <ReportHederDiv>
              <img src={report.forumUserAvatar} />
              <h6>{report.forumUserName}</h6>
              <p>reported by </p>
              <img src={report.reportUserAvatar} />
              <h6>{report.reportUserName}</h6>
            </ReportHederDiv>
            <ReportSearchTime>{report.uploadTime}</ReportSearchTime>
            <ReportSearchReason>{report.reason}</ReportSearchReason>
            <AnimeButton
              para=""
              text={"Content"}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="white"
              borderColor="black"
              buttonClick={() => toContextPage(report)}
            />
            <ReportSearchState>{report.state}</ReportSearchState>
          </ReportDiv>
        );
      })}
    </>
  );
};

export default ReportSearch;
