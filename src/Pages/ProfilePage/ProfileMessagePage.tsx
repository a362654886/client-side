import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  LevelPic,
  NameDiv,
  NameIdDiv,
  NamePic,
  NameSetting,
  ProfileAwesomePic,
  ProfileBox,
  ProfileDiv,
  ProfileMessageBox,
  ProfileMessageBoxText,
  ProfileMessageButtons,
  ProfileMessageMore,
  ProfileReply,
  ProfileSlider,
  SettingIconDiv,
  SettingIconsDiv,
} from "../../cssJs/ProfilePage/ProfileCss";
import { IStoreState } from "../../types/IStoreState";
import { Avatar, User } from "../../types/User";
import getMoreImg from "../../files/getMore.svg";
import SettingImg from "../../components/SettingImg";
import IconSettings from "../../files/IconSettings.svg";
import IconInbox from "../../files/IconInbox.svg";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";
import AnimeButton from "../../components/Button";
import loadingImg from "../../files/loading.gif";
import { useEffect, useState } from "react";
import avatarUpload from "../../files/avatarUpload.png";
import {
  messagesAllGetByUserId,
  messagesAllGetByReceivedId,
  messageAdd,
} from "../../api/messageAPI";
import { MessageType } from "../../types/MessageType";
import ProfileWrapperDiv from "../../components/ProfileWrapperDiv";
import {
  ForumImg,
  ForumName,
  ForumTime,
} from "../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import { _getDate } from "../../helperFns/timeFn";
import { LoadingImgDiv } from "../../cssJs/homePageCss";
import { MessageDiv, MessageModal } from "../../cssJs/settingImgCss";
import TextArea from "antd/lib/input/TextArea";
import { Button, Slider } from "antd";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import { getWidth } from "../../helperFns/widthFn";
import { AwesomeLevelType } from "../../types/awesomeLevel";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.svg";
import { getLevel } from "../../helperFns/profileFn";
import { Helmet } from "react-helmet";
import { AutoReplyEnum } from "../../types/autoReplyType";
import { autoReplyAdd } from "../../api/autoReplyAPI";
import { ReportContextType } from "../../types/blockType";
import { windowLink } from "../../globalValues";

const ProfileMessagePage = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [ifIn, setIfIn] = useState<boolean>(true);
  const [inPage, setInPage] = useState<number>(1);
  const [outPage, setOutPage] = useState<number>(1);
  const [inMessages, setInMessages] = useState<MessageType[]>([]);
  const [outMessages, setOutMessages] = useState<MessageType[]>([]);
  const [inCount, setInCount] = useState<number>(0);
  const [outCount, setOutCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 6;

  //message
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const [userImg, setUserImg] = useState("");
  const [userName, setUserName] = useState("");
  const [messageUserId, setMessageUserId] = useState("");

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const allLevels: AwesomeLevelType[] | null = useSelector(
    (state: IStoreState) => state.allLevelState
  );

  useEffect(() => {
    (async function anyNameFunction() {
      if (loginUser) {
        if (ifIn) {
          await getInMessages(inPage, pageSize);
        } else {
          await getOutMessages(outPage, pageSize);
        }
      }
    })();
  }, [ifIn, loginUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    //
  }, [inMessages, outMessages, loading]);

  const getInMessages = async (page: number, pageSize: number) => {
    setLoading(true);
    if (loginUser) {
      const r = await messagesAllGetByUserId(loginUser?._id, page, pageSize);
      if (page == 1) {
        setInMessages(r ? r.result : []);
        setInCount(r ? r.count : 0);
      } else {
        setInMessages(r ? inMessages.concat(r.result) : []);
      }
    }
    setLoading(false);
  };

  const getOutMessages = async (page: number, pageSize: number) => {
    setLoading(true);
    if (loginUser) {
      const r = await messagesAllGetByReceivedId(
        loginUser?._id,
        page,
        pageSize
      );
      if (page == 1) {
        setOutMessages(r ? r.result : []);
        setOutCount(r ? r.count : 0);
      } else {
        setOutMessages(r ? outMessages.concat(r.result) : []);
      }
    }
    setLoading(false);
  };

  const toPage = (url: string) => history.push(url);

  const getMoreInMessage = async () => {
    setInPage(inPage + 1);
    await getInMessages(inPage + 1, pageSize);
  };

  const getMoreOutMessage = async () => {
    setOutPage(outPage + 1);
    await getOutMessages(outPage + 1, pageSize);
  };

  const reply = (message: MessageType) => {
    setUserImg(message.userAvatar ? message.userAvatar : "");
    setUserName(message.userName ? message.userName : "");
    setMessageUserId(message.userId);
    setMessageVisible(true);
  };

  const replyOut = (message: MessageType) => {
    setUserImg(message.receiveAvatar ? message.receiveAvatar : "");
    setUserName(message.receiveName ? message.receiveName : "");
    setMessageUserId(message.receiveId);
    setMessageVisible(true);
  };

  const getOneLevel = getLevel(allLevels, loginUser ? loginUser.awesomeNum : 0);

  const sendMessage = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const messageBody: MessageType = {
        _id: `${loginUser?._id}${messageUserId}${new Date().valueOf()}`,
        userId: loginUser._id,
        receiveId: messageUserId,
        uploadTime: new Date(),
        message: messageValue,
        hide: false,
      };
      const r = await messageAdd(messageBody);
      if (r && r < 300) {
        setMessageVisible(false);
        setMessageValue("");
        await autoReplyAdd({
          _id: Math.random().toString().slice(-9),
          sendUserId: loginUser._id,
          receiveUserId: messageUserId,
          link: `${windowLink}/ProfileMessage`,
          uploadTime: new Date().valueOf(),
          type: AutoReplyEnum.Message,
        });
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

  const getInMessage = () =>
    inMessages.map((message, index) => {
      const date = new Date(message.uploadTime);
      return !message.hide ? (
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
              type={ReportContextType.MESSAGE}
              contextId={message._id}
              resourceLink={``}
            />
            <ForumTime>{_getDate(date)}</ForumTime>
          </div>
          <ProfileMessageBoxText>{message.message}</ProfileMessageBoxText>
          <ProfileReply onClick={() => replyOut(message)}>Reply</ProfileReply>
        </ProfileMessageBox>
      ) : (
        <></>
      );
    });

  const getOutMessage = () =>
    outMessages.map((message, index) => {
      const date = new Date(message.uploadTime);
      return !message.hide ? (
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
              type={ReportContextType.MESSAGE}
              contextId={message._id}
              resourceLink={``}
            />
            <ForumTime>{_getDate(date)}</ForumTime>
          </div>
          <p>{message.message}</p>
          <ProfileReply onClick={() => reply(message)}>Reply</ProfileReply>
        </ProfileMessageBox>
      ) : (
        <></>
      );
    });

  const getLoadingElement = () => {
    return ifIn ? (
      <>
        {getInMessage()}
        {loading ? (
          <LoadingImgDiv>
            <img src={`${loadingImg}`} />
          </LoadingImgDiv>
        ) : inMessages.length < inCount ? (
          <ProfileMessageMore onClick={() => getMoreInMessage()}>
            <div>
              <img src={`${getMoreImg}`} />
              <p>Load More</p>
            </div>
          </ProfileMessageMore>
        ) : (
          <></>
        )}
      </>
    ) : (
      <>
        {getOutMessage()}
        {loading ? (
          <LoadingImgDiv>
            <img src={`${loadingImg}`} />
          </LoadingImgDiv>
        ) : outMessages.length < outCount ? (
          <ProfileMessageMore onClick={() => getMoreOutMessage()}>
            <div>
              <img src={`${getMoreImg}`} />
              <p>Load More</p>
            </div>
          </ProfileMessageMore>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <>
      <Helmet>
        <title>Message - Animepark.com</title>
      </Helmet>
      <ProfileBox
        style={{
          marginLeft: getWidth() > 600 ? "" : "8px",
          marginRight: getWidth() > 600 ? "" : "8px",
        }}
      >
        <ProfileDiv>
          <div style={{ display: "flex" }}>
            <NamePic
              src={
                loginUser
                  ? (loginUser.avatarImage as Avatar[])[0].imageUrl
                  : avatarUpload
              }
            />
            <NameDiv>
              <NameSetting>
                <p>
                  {loginUser
                    ? `${loginUser ? loginUser.firstName : ""}.${
                        loginUser
                          ? loginUser.lastName.substring(0, 1).toUpperCase()
                          : ""
                      }`
                    : `Not Logged In`}
                  <Flag
                    style={{ marginLeft: "5px" }}
                    country={flagGet(loginUser ? loginUser.country : "")}
                  />
                </p>
                <SettingImg
                  userId={loginUser ? loginUser._id : ""}
                  userName={
                    loginUser
                      ? `${(loginUser as User).firstName}.${
                          (loginUser as User).lastName
                        }`
                      : ""
                  }
                  userImg={`https://animeimagebucket.s3.amazonaws.com/${
                    loginUser ? loginUser.avatar : ""
                  }`}
                  marginTop="4px"
                  type={null}
                  contextId={null}
                  resourceLink={``}
                />
              </NameSetting>
              <NameIdDiv>{`(ID: ${loginUser ? loginUser._id : ""})`}</NameIdDiv>
            </NameDiv>
          </div>
          <div style={{ display: "flex" }}>
            <LevelPic
              onClick={() => toPage("/profileLevel")}
              src={getOneLevel.image}
            />
            <ProfileAwesomePic
              src={showCaseAwesomeClick}
              style={{ marginRight: "4px" }}
            />
            <ProfileSlider style={{ display: "flex" }}>
              <p>{`${loginUser ? loginUser.awesomeNum : ""}/${
                getOneLevel.awesomeRequire
              }`}</p>
              <Slider
                defaultValue={
                  ((loginUser ? loginUser.awesomeNum : 0) /
                    getOneLevel.awesomeRequire) *
                  100
                }
                style={{ width: "200px" }}
                disabled={true}
              ></Slider>
            </ProfileSlider>
          </div>
        </ProfileDiv>
        <SettingIconsDiv>
          <SettingIconDiv onClick={() => toPage("/ProfileSetting")}>
            <img src={IconSettings} />
            <p>Profile</p>
          </SettingIconDiv>
          <SettingIconDiv onClick={() => toPage("/ProfileMessage")}>
            <img src={IconInbox} />
            <p>Inbox</p>
          </SettingIconDiv>
        </SettingIconsDiv>
        <ProfileMessageButtons>
          <AnimeButton
            para=""
            text={"Out"}
            width="120px"
            height="32px"
            textColor="black"
            backGroundColor={ifIn ? "#AAFFC9" : "white"}
            borderColor={ifIn ? "#AAFFC9" : "#302D46"}
            buttonClick={() => setIfIn(true)}
          />
          <AnimeButton
            para=""
            text={"In"}
            width="120px"
            height="32px"
            textColor="black"
            backGroundColor={!ifIn ? "#AAFFC9" : "white"}
            borderColor={!ifIn ? "#AAFFC9" : "#302D46"}
            buttonClick={() => setIfIn(false)}
          />
        </ProfileMessageButtons>
        {getLoadingElement()}
      </ProfileBox>
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
    </>
  );
};

export default ProfileMessagePage;
