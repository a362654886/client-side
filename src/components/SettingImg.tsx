import * as React from "react";
import avatarSetting from "../files/avatarSetting.svg";
import { Popover } from "antd";
import {
  MessageDiv,
  MessageModal,
  SettingDiv,
  SettingPopUpDiv,
} from "../cssJs/settingImgCss";
import { useEffect, useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import AnimeButton from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../types/User";
import { IStoreState } from "../types/IStoreState";
import { LoadingType } from "../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../redux/loading";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../helperFns/popUpAlert";
import { MessageType } from "../types/MessageType";
import { messageAdd } from "../api/messageAPI";
import { LOGIN_USER_UPDATE_FOLLOW } from "../redux/loginUser";
import { REPORT_USER_UPDATE } from "../redux/reportUser";
import { useHistory } from "react-router-dom";
import { ReportContextType } from "../types/blockType";

interface IProps {
  userId: string;
  userName: string;
  userImg: string;
  marginTop: string;
  type: ReportContextType | null;
  contextId: string | null;
  resourceLink: string;
}

const SettingImg = ({
  userId,
  userName,
  userImg,
  marginTop,
  type,
  contextId,
  resourceLink,
}: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [messageVisible, setMessageVisible] = useState(false);
  const [messageValue, setMessageValue] = useState("");

  useEffect(() => {
    //console.log(userId);
  }, [userId]);

  const content = () => {
    if (loginUser) {
      const exist = loginUser?.followUsers.indexOf(userId);
      return (
        <SettingPopUpDiv
          style={{
            height: type == null && contextId == null ? "100px" : "145px",
          }}
        >
          <p onClick={() => followUser()}>
            {exist == -1 ? `Follow` : "Following"}
          </p>
          <p onClick={() => setMessageVisible(true)}>Message</p>
          {type == null && contextId == null ? (
            <></>
          ) : (
            <p onClick={() => reportUser(userId, type, contextId)}>Report</p>
          )}
        </SettingPopUpDiv>
      );
    } else {
      return (
        <SettingPopUpDiv
          style={{
            height: type == null && contextId == null ? "100px" : "145px",
          }}
        >
          <p
            onClick={() => {
              openNotification(
                "please login and follow",
                NotificationColor.Warning,
                NotificationTitle.Warning
              );
            }}
          >
            Follow
          </p>
          <p onClick={() => setMessageVisible(true)}>Message</p>
          {type == null && contextId == null ? (
            <></>
          ) : (
            <p onClick={() => reportUser(userId, type, contextId)}>Report</p>
          )}
        </SettingPopUpDiv>
      );
    }
  };

  const followUser = () => {
    dispatch({
      payload: userId,
      type: LOGIN_USER_UPDATE_FOLLOW,
    });
  };

  const reportUser = (
    id: string,
    type: ReportContextType | null,
    contextId: string | null
  ) => {
    dispatch({
      payload: id,
      type: REPORT_USER_UPDATE,
    });
    const url = `/report?forumUserId=${id}&reportUserId=${
      loginUser?._id
    }&type=${type}&contextId=${contextId}&resourceLink=${resourceLink
      .replace("=", "@20")
      .replace("=", "@20")
      .replace("&", "%%")}`;
    history.push(url);
  };

  const sendMessage = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const messageBody: MessageType = {
        _id: `${loginUser?._id}${userId}${new Date().valueOf()}`,
        userId: loginUser._id,
        receiveId: userId,
        uploadTime: new Date(),
        message: messageValue,
      };
      const r = await messageAdd(messageBody);
      if (r && r < 300) {
        setMessageVisible(false);
        setMessageValue("");
        openNotification(
          "send success",
          NotificationColor.Success,
          NotificationTitle.Success
        );
      }
    } else {
      openNotification(
        "please login and then send message",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  return (
    <SettingDiv>
      <Popover placement="right" content={content} trigger="click">
        <img
          style={{
            height: "24px",
            width: "24px",
            marginTop: marginTop,
            cursor: "pointer",
          }}
          src={`${avatarSetting}`}
        />
      </Popover>
      <MessageModal
        footer={[]}
        onCancel={() => setMessageVisible(false)}
        visible={messageVisible}
      >
        <MessageDiv>
          <div>
            <p>To:</p>
            <img src={userImg} />
            <h6>{userName}</h6>
          </div>
          <TextArea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
          <div style={{ marginTop: "20px", float: "right" }}>
            <AnimeButton
              para=""
              text={"Send"}
              width="120px"
              height="32px"
              textColor="white"
              backGroundColor="#FFC300"
              borderColor="#FFC300"
              buttonClick={() => sendMessage()}
            />
          </div>
        </MessageDiv>
      </MessageModal>
    </SettingDiv>
  );
};

export default SettingImg;
