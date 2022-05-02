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

  const [headlineNum, setHeadlineNum] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function anyNameFunction() {
      await getAllHeadlines();
    })();
  }, []);

  const getAllHeadlines = async () => {
    const headlinesResult = await headlineAllGet();
    setAllHeadlines(headlinesResult ? headlinesResult : []);
    setHeadlineNum(1);
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
          textColor="black"
          backGroundColor="#AAFFC9"
          borderColor="#AAFFC9"
          buttonClick={() => setChildHeadlineNum(1)}
        />
        <AnimeButton
          para=""
          text={"HeadLine2"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="#AAFFC9"
          borderColor="#AAFFC9"
          buttonClick={() => setChildHeadlineNum(2)}
        />
        <AnimeButton
          para=""
          text={"HeadLine3"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="#AAFFC9"
          borderColor="#AAFFC9"
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
