import { Input, Pagination, Radio } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AnimeButton from "../../../components/Button";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { LoadingType } from "../../../types/EnumTypes";
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
import { REPORT_BLOCK_UPDATE } from "../../../redux/reportBlock";
import { useHistory } from "react-router-dom";
import {
  AdminContentPageDiv,
  AdminReportTypeButtons,
} from "../../../cssJs/AdminPage/adminCss";
import AdminDataHeader from "./AdminDataHeader";
import { _getDate } from "../../../helperFns/timeFn";
import { openReportContextPath } from "../../../helperFns/windowsFn";
import { CenterDiv } from "../../../cssJs/AnimePage/AnimeShowCss";

const ReportSearch = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [allReports, setAllReports] = useState<ReportShowType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [searchType, setSearchType] = useState<string>("pending");

  useEffect(() => {
    (async function anyNameFunction() {
      await search(page);
    })();
  }, [page]);

  useEffect(() => {
    //console.log(allReports);
  }, [allReports]);

  useEffect(() => {
    (async function anyNameFunction() {
      await search(1);
    })();
  }, [searchType]);

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
    const result = await blockGet(searchValue, page ? page : 1, searchType);
    if (result) {
      setAllReports(
        page == 1 ? result.result : allReports.concat(result.result)
      );
      setCount(result.count);
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const toContextPage = (report: ReportShowType) => {
    dispatch({
      payload: report,
      type: REPORT_BLOCK_UPDATE,
    });
    setTimeout(()=>{
      openReportContextPath();
    },500)
  };

  return (
    <AdminContentPageDiv>
      <AdminDataHeader buttonString={"Reports"} />
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
      <AdminReportTypeButtons
        onChange={(e) => setSearchType(e.target.value)}
        value={searchType}
      >
        <Radio value={"pending"}>Pending</Radio>
        <Radio value={"delete"}>Deleted</Radio>
        <Radio value={"ignore"}>Ignored</Radio>
      </AdminReportTypeButtons>
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
            <ReportSearchTime>
              {_getDate(new Date(report.uploadTime))}
            </ReportSearchTime>
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
      <CenterDiv>
        {allReports.length < count ? (
          <AnimeButton
            para=""
            text="View more"
            width="120px"
            height="32px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="white"
            buttonClick={() => search(page + 1)}
          />
        ) : (
          <></>
        )}
      </CenterDiv>
    </AdminContentPageDiv>
  );
};

export default ReportSearch;
