import { Checkbox } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import * as React from "react";
import { useEffect, useState } from "react";
import Flag from "react-flagkit";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { blockInsert } from "../api/blockAPI";
import { userGet } from "../api/userApi";
import AnimeButton from "../components/Button";
import ProfileWrapperDiv from "../components/ProfileWrapperDiv";
import SettingImg from "../components/SettingImg";
import { UserNameText } from "../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import {
  CheckBoxDiv,
  ReportDiv,
  ReportUserDiv,
  ReportUserImg,
} from "../cssJs/reportPage";
import { flagGet } from "../helperFns/flag";
import { formatName } from "../helperFns/nameFn";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../helperFns/popUpAlert";
import { LOADING_CLOSE, LOADING_OPEN } from "../redux/loading";
import { ReportContextType, ReportType } from "../types/blockType";
import { LoadingType } from "../types/EnumTypes";
import { IStoreState } from "../types/IStoreState";
import { User } from "../types/User";

const CheckboxGroup = Checkbox.Group;

const getPamas = (url: string) => {
  const _search = url.replace("?", "");
  const searchArr = _search.split("&");
  const obj: Record<string, string> = {};
  searchArr.forEach((item) => {
    const _item = item.split("=");
    const key = _item[0];
    obj[key] = _item[1];
  });
  return obj;
};

const Report = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [urlPamaObj, setUrlPamaObj] = useState<Record<string, string> | null>(
    null
  );

  const reportOptions = [
    "Sexual content",
    "Hateful or abusive content",
    "Harassment or bullying",
    "Child abuse",
    "Promotes terrorism",
    "infrings my rights",
    "Spam or misleading",
  ];

  const reportUser: string | null = useSelector(
    (state: IStoreState) => state.reportUserState
  );

  const [user, setUser] = useState<User | null>(null);
  const [checkedList, setCheckedList] = useState<CheckboxValueType[]>([]);

  useEffect(() => {
    const urlObj = getPamas(history.location.search);
    setUrlPamaObj(urlObj);
  }, []);

  useEffect(() => {
    (async function anyNameFunction() {
      if (reportUser) {
        const user = await userGet(reportUser);
        setUser(user);
      }
    })();
  }, []);

  const onChange = (list: CheckboxValueType[]) => setCheckedList(list);

  const sendReport = async () => {
    if (urlPamaObj) {
      const timeString = new Date();
      const reportBody: ReportType = {
        _id: `${urlPamaObj["forumUserId"]}${timeString.valueOf()}`,
        contextId: urlPamaObj["contextId"],
        type: urlPamaObj["type"] as ReportContextType,
        reportUserId: urlPamaObj["reportUserId"],
        forumUserId: urlPamaObj["forumUserId"],
        state: "pending",
        reason: checkedList.toString(),
        uploadTime: timeString.valueOf(),
      };
      dispatch({
        payload: LoadingType.OPEN,
        type: LOADING_OPEN,
      });
      const status = await blockInsert(reportBody);
      if (status == 200) {
        openNotification(
          "success",
          NotificationColor.Success,
          NotificationTitle.Success
        );
        setCheckedList([]);
      } else {
        openNotification(
          "send fail",
          NotificationColor.Error,
          NotificationTitle.Error
        );
      }
      dispatch({
        payload: LoadingType.CLOSE,
        type: LOADING_CLOSE,
      });
    }
  };

  return (
    <ReportDiv>
      <h1>Report</h1>
      <ReportUserDiv>
        <ProfileWrapperDiv
          userId={user ? user._id : ""}
          element={
            <>
              <ReportUserImg
                src={`https://animeimagebucket.s3.amazonaws.com/${
                  user ? user.avatar : ""
                }`}
              />
              <UserNameText>
                {user ? `${ formatName(user.showName?user.showName:"")}` : ""}
                <Flag
                  style={{ marginLeft: "5px" }}
                  country={flagGet(user ? user.country : "")}
                />
              </UserNameText>
            </>
          }
        ></ProfileWrapperDiv>
        <SettingImg
          userId={user ? user._id : ""}
          userName={user ? `${user.firstName} ${user.lastName}` : ""}
          userImg={`https://animeimagebucket.s3.amazonaws.com/${
            user ? user.avatar : ""
          }`}
          marginTop="24px"
          type={null}
          contextId={null}
        />
      </ReportUserDiv>
      <CheckBoxDiv>
        <CheckboxGroup
          options={reportOptions}
          value={checkedList}
          onChange={(e) => onChange(e)}
        />
      </CheckBoxDiv>
      <AnimeButton
        para=""
        text={"Send"}
        width="120px"
        height="32px"
        textColor="white"
        backGroundColor="#FFC300"
        borderColor="#FFC300"
        buttonClick={() => sendReport()}
      />
      <AnimeButton
        para=""
        text={"Cancel"}
        width="120px"
        height="32px"
        textColor="black"
        backGroundColor="white"
        borderColor="#302D46"
        buttonClick={() => window.history.back()}
      />
    </ReportDiv>
  );
};

export default Report;
