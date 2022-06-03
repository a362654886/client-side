import loadingImg from "../../files/loading.gif";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  headlineAdd,
  headlineAllGet,
  headlineEditAsync,
} from "../../api/headlineAPI";
import AnimeButton from "../../components/Button";
import {
  AdminHomePageButtonsDiv,
  AdminHomePageDiv,
} from "../../cssJs/AdminPage/adminManagementCss";
import { LoadingImgDiv } from "../../cssJs/homePageCss";
import { popUpAPIResult } from "../../helperFns/popUpAlert";
import { HeadLineType } from "../../types/headLine";
import AdminHomeLinePage from "./adminHomeComponent/AdminHeadlinePage";

const AdminHomePage = (): JSX.Element => {
  const [allHeadlines, setAllHeadlines] = useState<HeadLineType[]>([]);
  const [chooseHeadLine, setChooseHeadLine] = useState<HeadLineType | null>(
    null
  );

  const [headlineNum, setHeadlineNum] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function anyNameFunction() {
      await getAllHeadlines(1);
    })();
  }, []);

  const getAllHeadlines = async (headline:number) => {
    setLoading(true);
    const headlinesResult = await headlineAllGet();
    setAllHeadlines(headlinesResult ? headlinesResult : []);
    setHeadlineNum(headline);
    setChooseHeadLine(headlinesResult[headline-1]);
    setLoading(false);
  };

  const setChildHeadlineNum = (index: number) => {
    setChooseHeadLine(
      allHeadlines.length > index - 1 ? allHeadlines[index - 1] : null
    );
    setHeadlineNum(index);
  };

  const saveNewOne = async (headline: HeadLineType) => {
    setLoading(true);
    await popUpAPIResult<Promise<number | null>>(
      headlineAdd(headline),
      "add new headline success",
      () => {
        //
      }
    );
    setLoading(false);
  };

  const editOne = async (headline: HeadLineType) => {
    setLoading(true);
    await popUpAPIResult<Promise<number | null>>(
      headlineEditAsync(headline),
      "edit new headline success",
      () => {
        //
      }
    );
    const index= allHeadlines.findIndex(item=>item._id == headline._id)
    getAllHeadlines(index+1);
    setLoading(false);
  };

  return (
    <AdminHomePageDiv>
      <AdminHomePageButtonsDiv>
        <AnimeButton
          para=""
          text={"HeadLine1"}
          width="120px"
          height="32px"
          textColor={headlineNum == 1 ? "black" : "black"}
          backGroundColor={headlineNum == 1 ? "#AAFFC9" : "white"}
          borderColor={headlineNum == 1 ? "#AAFFC9" : "black"}
          buttonClick={() => setChildHeadlineNum(1)}
        />
        <AnimeButton
          para=""
          text={"HeadLine2"}
          width="120px"
          height="32px"
          textColor={headlineNum == 2 ? "black" : "black"}
          backGroundColor={headlineNum == 2 ? "#AAFFC9" : "white"}
          borderColor={headlineNum == 2 ? "#AAFFC9" : "black"}
          buttonClick={() => setChildHeadlineNum(2)}
        />
        <AnimeButton
          para=""
          text={"HeadLine3"}
          width="120px"
          height="32px"
          textColor={headlineNum == 3 ? "black" : "black"}
          backGroundColor={headlineNum == 3 ? "#AAFFC9" : "white"}
          borderColor={headlineNum == 3 ? "#AAFFC9" : "black"}
          buttonClick={() => setChildHeadlineNum(3)}
        />
      </AdminHomePageButtonsDiv>
      {loading ? (
        <LoadingImgDiv>
          <img src={`${loadingImg}`} />
        </LoadingImgDiv>
      ) : (
        <AdminHomeLinePage
          headLine={chooseHeadLine}
          editHeadline={(headline: HeadLineType, ifNew: boolean) => {
            ifNew ? saveNewOne(headline) : editOne(headline);
          }}
          num={headlineNum}
        />
      )}
    </AdminHomePageDiv>
  );
};

export default AdminHomePage;
