import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  NameDiv,
  NameIdDiv,
  NamePic,
  NameSetting,
  ProfileBox,
  ProfileDiv,
  ProfileMessageBox,
  ProfileMessageButtons,
  ProfileSettingBox,
  SettingIconDiv,
  SettingIconsDiv,
} from "../../cssJs/ProfilePage/ProfileCss";
import { IStoreState } from "../../types/IStoreState";
import { Avatar, User } from "../../types/User";
import avatarSetting from "../../files/avatarSetting.png";
import SettingImg from "../../components/SettingImg";
import IconSettings from "../../files/IconSettings.svg";
import IconInbox from "../../files/IconInbox.svg";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";
import AnimeButton from "../../components/Button";
import { useEffect, useState } from "react";
import {
  messagesAllGetByUserId,
  messagesAllGetByReceivedId,
} from "../../api/messageAPI";
import { MessageType } from "../../types/MessageType";
import ProfileWrapperDiv from "../../components/ProfileWrapperDiv";
import {
  ForumImg,
  ForumName,
  ForumTime,
} from "../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import { _getDate } from "../../helperFns/timeFn";

const ProfileMessagePage = (): JSX.Element => {
  const history = useHistory();

  const [ifIn, setIfIn] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [count, setCount] = useState<number>(0);
  const pageSize = 2;

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  useEffect(() => {
    (async function anyNameFunction() {
      if (loginUser) {
        if (ifIn) {
          const r = await messagesAllGetByUserId(
            loginUser?._id,
            page,
            pageSize
          );
          setMessages(r ? r.result : []);
          console.log(r ? r.result : []);
          setCount(r ? r.count : 0);
        } else {
          const r = await messagesAllGetByReceivedId(
            loginUser?._id,
            page,
            pageSize
          );
          setMessages(r ? r.result : []);
          setCount(r ? r.count : 0);
        }
      }
    })();
  }, [ifIn]);

  useEffect(() => {
    //
  }, [messages]);

  const toPage = (url: string) => history.replace(url);

  const getInMessage = () =>
    messages.map((message, index) => {
      const date = new Date(message.uploadTime);
      return (
        <ProfileMessageBox key={index}>
          <div style={{ display: "flex" }}>
            <ProfileWrapperDiv
              userId={message.receiveId}
              element={
                <>
                  <ForumImg src={`${message.receiveAvatar}`} />
                  <ForumName>
                    {message.receiveName}
                    <Flag
                      style={{ marginLeft: "5px", marginRight: "10px" }}
                      country={flagGet(
                        message.receiveCountry ? message.receiveCountry : ""
                      )}
                    />
                  </ForumName>
                </>
              }
            ></ProfileWrapperDiv>
            <SettingImg
              userId={message.receiveId}
              userName={message.receiveName ? message.receiveName : ""}
              userImg={message.receiveAvatar ? message.receiveAvatar : ""}
              marginTop="24px"
            />
            <ForumTime>{_getDate(date)}</ForumTime>
          </div>
          <p>{message.message}</p>
        </ProfileMessageBox>
      );
    });

  const getOutMessage = () =>
    messages.map((message, index) => {
      const date = new Date(message.uploadTime);
      return (
        <ProfileMessageBox key={index}>
          <div style={{ display: "flex" }}>
            <ProfileWrapperDiv
              userId={message.userId}
              element={
                <>
                  <ForumImg src={`${message.userAvatar}`} />
                  <ForumName>
                    {message.userName}
                    <Flag
                      style={{ marginLeft: "5px", marginRight: "10px" }}
                      country={flagGet(
                        message.userCountry ? message.userCountry : ""
                      )}
                    />
                  </ForumName>
                </>
              }
            ></ProfileWrapperDiv>
            <SettingImg
              userId={message.userId}
              userName={message.userName ? message.userName : ""}
              userImg={message.userAvatar ? message.userAvatar : ""}
              marginTop="24px"
            />
            <ForumTime>{_getDate(date)}</ForumTime>
          </div>
          <p>{message.message}</p>
        </ProfileMessageBox>
      );
    });

  return (
    <ProfileBox>
      <ProfileDiv>
        <NamePic
          src={((loginUser as User).avatarImage as Avatar[])[0].imageUrl}
        />
        <NameDiv>
          <NameSetting>
            <p>
              {`${(loginUser as User).firstName}.${(loginUser as User).lastName
                .substring(0, 1)
                .toUpperCase()}`}
              <Flag
                style={{ marginLeft: "5px" }}
                country={flagGet(loginUser ? loginUser.country : "")}
              />
            </p>
            <SettingImg
              userId={(loginUser as User)._id}
              userName={`${(loginUser as User).firstName}.${
                (loginUser as User).lastName
              }`}
              userImg={avatarSetting}
              marginTop="4px"
            />
          </NameSetting>
          <NameIdDiv>(ID: 202201)</NameIdDiv>
        </NameDiv>
      </ProfileDiv>
      <SettingIconsDiv>
        <SettingIconDiv onClick={() => toPage("/mainPage/ProfileSetting")}>
          <img src={IconSettings} />
          <p>Profile</p>
        </SettingIconDiv>
        <SettingIconDiv onClick={() => toPage("/mainPage/ProfileMessage")}>
          <img src={IconInbox} />
          <p>Inbox</p>
        </SettingIconDiv>
      </SettingIconsDiv>
      <ProfileMessageButtons>
        <AnimeButton
          para=""
          text={"In"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor={ifIn ? "#AAFFC9" : "white"}
          borderColor={ifIn ? "#AAFFC9" : "#302D46"}
          buttonClick={() => setIfIn(true)}
        />
        <AnimeButton
          para=""
          text={"Out"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor={!ifIn ? "#AAFFC9" : "white"}
          borderColor={!ifIn ? "#AAFFC9" : "#302D46"}
          buttonClick={() => setIfIn(false)}
        />
      </ProfileMessageButtons>
      {ifIn ? getInMessage() : getOutMessage()}
    </ProfileBox>
  );
};

export default ProfileMessagePage;
