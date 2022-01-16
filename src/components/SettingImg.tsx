import * as React from "react";
import avatarSetting from "../files/avatarSetting.png";
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
import { followByGetByUserId } from "../api/followByAPI";
import { LOGIN_USER_UPDATE_FOLLOW } from "../redux/loginUser";

interface IProps {
  userId: string;
  userName: string;
  userImg: string;
  marginTop: string;
}

const SettingImg = ({
  userId,
  userName,
  userImg,
  marginTop,
}: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [messageVisible, setMessageVisible] = useState(false);
  const [messageValue, setMessageValue] = useState("");

  useEffect(() => {
    console.log(userId);
  }, [userId]);

  const content = () => {
    if (loginUser) {
      const exist = loginUser?.followUsers.indexOf(userId);
      return (
        <SettingPopUpDiv>
          <p onClick={() => followUser()}>
            {exist == -1 ? `Follow` : "Following"}
          </p>
          <p onClick={() => setMessageVisible(true)}>Message</p>
          <p>Report</p>
        </SettingPopUpDiv>
      );
    } else {
      return (
        <SettingPopUpDiv>
          <p>Follow</p>
          <p onClick={() => setMessageVisible(true)}>Message</p>
          <p>Report</p>
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

  const sendMessage = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const messageBody: MessageType = {
        _id: `${loginUser?._id}${userId}`,
        userId: loginUser._id,
        receiveId: userId,
        uploadTime: new Date(),
        message: messageValue,
      };
      const r = await messageAdd(messageBody);
      if (r && r < 300) {
        setMessageVisible(false);
        setMessageValue("");
      }
    } else {
      openNotification(
        "please login and then reply",
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