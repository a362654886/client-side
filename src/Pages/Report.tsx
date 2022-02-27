import { Checkbox, Space } from "antd";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import * as React from "react";
import { useEffect, useState } from "react";
import Flag from "react-flagkit";
import { useSelector } from "react-redux";
import { userGet } from "../api/userApi";
import AnimeButton from "../components/Button";
import ProfileWrapperDiv from "../components/ProfileWrapperDiv";
import SettingImg from "../components/SettingImg";
import {
  UserNameText,
  VideoBottom,
  VideoBottomImg,
} from "../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import {
  CheckBoxDiv,
  ReportDiv,
  ReportUserDiv,
  ReportUserImg,
} from "../cssJs/reportPage";
import { flagGet } from "../helperFns/flag";
import { IStoreState } from "../types/IStoreState";
import { User } from "../types/User";

const CheckboxGroup = Checkbox.Group;

const Report = (): JSX.Element => {
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
    (async function anyNameFunction() {
      if (reportUser) {
        const user = await userGet(reportUser);
        setUser(user);
      }
    })();
  }, []);

  const onChange = (list: CheckboxValueType[]) => setCheckedList(list);

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
                {user ? `${user.firstName} ${user.lastName}` : ""}
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
        buttonClick={() => console.log("send")}
      />
    </ReportDiv>
  );
};

export default Report;
