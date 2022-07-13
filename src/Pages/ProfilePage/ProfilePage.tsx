import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import AnimeButton from "../../components/Button";
import SettingImg from "../../components/SettingImg";
import {
  ButtonsDiv,
  ContactInfoContext,
  ContactInfoDiv,
  InfoDiv,
  LevelPic,
  LineProfileDiv,
  MobileButtonsDiv,
  NameDiv,
  NameIdDiv,
  NamePic,
  NameSetting,
  ProfileAwesomePic,
  ProfileBox,
  ProfileChildDiv,
  ProfileDiv,
  ProfileSlider,
  SettingFollowDiv,
  SettingFollowerDiv,
  SettingFollowingDiv,
  SettingIconDiv,
  SettingIconsDiv,
  SocialDiv,
} from "../../cssJs/ProfilePage/ProfileCss";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";
import ProfileLikesPage from "./component/ProfileLikesPage";
import ProfileMallPage from "./component/ProfileMallPage";
import ProfileMarketplacePage from "./profileMarketPlace/ProfileMarketplacePage";
import ProfileShowcasePage from "./component/ProfileShowcasePage";
import IconSettings from "../../files/IconSettings.svg";
import IconInbox from "../../files/IconInbox.svg";
import facebook from "../../files/facebook.svg";
import insImage from "../../files/insImage.svg";
import profileLink from "../../files/profileLink.svg";
import { followByGetByUserId } from "../../api/followByAPI";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.svg";
import arrows from "../../files/arrows.svg";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";
import { MarketFollow } from "../../cssJs/MarketPage/MarketPlaceCss";
import marketFollow from "../../files/Icon-Follow.svg";
import marketFollowing from "../../files/IconFollowing.svg";
import marketMessage from "../../files/marketMessage.svg";
import { MessageDiv, MessageModal } from "../../cssJs/settingImgCss";
import TextArea from "antd/lib/input/TextArea";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { MessageType } from "../../types/MessageType";
import { messageAdd } from "../../api/messageAPI";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import { LOGIN_USER_UPDATE_FOLLOW } from "../../redux/loginUser";
import { useParams } from "react-router-dom";
import { userGet } from "../../api/userApi";
import { PROFILE_USER_UPDATE } from "../../redux/profileUser";
import { getWidth } from "../../helperFns/widthFn";
import { Slider } from "antd";
import { AwesomeLevelType } from "../../types/awesomeLevel";
import { getLevel } from "../../helperFns/profileFn";

interface Para {
  id: string;
}

const ProfilePage = (): JSX.Element => {
  const dispatch = useDispatch();

  const para: Para = useParams();

  const history = useHistory();

  const [follow, setFollow] = useState<number>(0);
  const [contactInfo, setContactInfo] = useState<boolean>(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const [chooseButton, setChooseButton] = useState<number>(0);

  const profileUser: User | null = useSelector(
    (state: IStoreState) => state.profileUserState
  );

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const allLevels: AwesomeLevelType[] | null = useSelector(
    (state: IStoreState) => state.allLevelState
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async function anyNameFunction() {
      const user = await userGet(para.id);
      dispatch({
        payload: user,
        type: PROFILE_USER_UPDATE,
      });
      await getFollowers(para.id);
    })();
  }, []);

  useEffect(() => {
    const market = history.location.search.replace("?market=", "");
    if (market == "true") {
      setChooseButton(1);
    }
  }, []);

  useEffect(() => {
    //console.log(profileUser);
  }, [profileUser]);

  const buttonsColor = () => {
    if (loginUser && profileUser && loginUser._id == profileUser._id) {
      return [
        {
          text: "Showcase",
          color: "#4BA3C3",
          backColor: "white",
        },
        {
          text: "Marketplace",
          color: "#4BA3C3",
          backColor: "white",
        },
        {
          text: "Likes",
          color: "#4BA3C3",
          backColor: "white",
        },
        {
          text: "Mall",
          color: "#4BA3C3",
          backColor: "white",
        },
      ];
    } else {
      return [
        {
          text: "Showcase",
          color: "#4BA3C3",
          backColor: "white",
        },
        {
          text: "Marketplace",
          color: "#4BA3C3",
          backColor: "white",
        },
        {
          text: "Likes",
          color: "#4BA3C3",
          backColor: "white",
        },
      ];
    }
  };

  const getFollowers = async (userId: string) => {
    const followerResult = await followByGetByUserId(userId, 1, 1, 1);
    setFollow(followerResult ? followerResult.count : 0);
  };

  const toPage = (url: string) => history.push(url);

  const changeButton = (index: number) => setChooseButton(index);

  const getButtons = () => {
    return buttonsColor().map(
      (
        button: {
          text: string;
          color: string;
          backColor: string;
        },
        index: number
      ) => {
        if (index == chooseButton) {
          return (
            <AnimeButton
              para=""
              text={button.text}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="#AAFFC9 "
              borderColor="#AAFFC9"
              buttonClick={() => changeButton(index)}
            />
          );
        } else {
          return (
            <AnimeButton
              para=""
              text={button.text}
              width="120px"
              height="32px"
              textColor="#4BA3C3"
              backGroundColor="white "
              borderColor="#4BA3C3"
              buttonClick={() => changeButton(index)}
            />
          );
        }
      }
    );
  };

  const getProfileDiv = () => {
    switch (chooseButton) {
      case 0:
        return <ProfileShowcasePage paraId={para.id} />;
      case 1:
        return <ProfileMarketplacePage />;
      case 2:
        return <ProfileLikesPage />;
      case 3:
        return <ProfileMallPage />;
      default:
        return <></>;
    }
  };

  const sendMessage = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const messageBody: MessageType = {
        _id: `${loginUser._id}${
          (profileUser as User)._id
        }${new Date().valueOf()}`,
        userId: loginUser._id,
        receiveId: (profileUser as User)._id,
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

  const ifFollow = () => {
    if (profileUser) {
      const exist = loginUser?.followUsers.indexOf(profileUser?._id);
      return exist;
    } else {
      return -1;
    }
  };

  const followUser = () => {
    dispatch({
      payload: profileUser?._id,
      type: LOGIN_USER_UPDATE_FOLLOW,
    });
  };

  const getNameImg = () => {
    return profileUser
      ? profileUser.avatarImage
        ? profileUser.avatarImage[0].imageUrl
        : ""
      : "";
  };

  const getOneLevel = getLevel(
    allLevels,
    profileUser ? profileUser.awesomeNum : 0
  );

  return (
    <ProfileBox
      style={{
        marginLeft: getWidth() > 600 ? "" : "8px",
        marginRight: getWidth() > 600 ? "" : "8px",
      }}
    >
      <ProfileDiv>
        <div style={{ display: "flex" }}>
          <NamePic src={getNameImg()} />
          <NameDiv>
            <NameSetting>
              <p>
                {`${profileUser ? profileUser.firstName : ""}.${
                  profileUser
                    ? profileUser.lastName.substring(0, 1).toUpperCase()
                    : ""
                }`}
                <Flag
                  style={{ marginLeft: "5px" }}
                  country={flagGet(profileUser ? profileUser.country : "")}
                />
              </p>
              <SettingImg
                userId={profileUser ? profileUser._id : ""}
                userName={`${profileUser ? profileUser.firstName : ""}.${
                  profileUser ? profileUser.lastName : ""
                }`}
                userImg={`https://animeimagebucket.s3.amazonaws.com/${
                  profileUser ? profileUser.avatar : ""
                }`}
                marginTop="4px"
                type={null}
                contextId={null}
                resourceLink={``}
              />
            </NameSetting>
            <NameIdDiv>{`(ID: ${
              profileUser ? profileUser._id : ""
            })`}</NameIdDiv>
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
            <p>{`${profileUser ? profileUser.awesomeNum : ""}/${
              getOneLevel.awesomeRequire
            }`}</p>
            <Slider
              defaultValue={
                ((profileUser ? profileUser.awesomeNum : 0) /
                  getOneLevel.awesomeRequire) *
                100
              }
              style={{ width: "200px" }}
              disabled={true}
            ></Slider>
          </ProfileSlider>
        </div>
      </ProfileDiv>
      {loginUser && profileUser && loginUser._id == profileUser._id ? (
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
      ) : (
        <></>
      )}
      <SettingFollowDiv>
        <SettingFollowingDiv
          onClick={() => {
            toPage(`/profileFollow/${profileUser?._id}true`);
          }}
        >
          <h6>
            {profileUser
              ? profileUser.followUsers
                ? profileUser.followUsers.length
                : 0
              : 0}
          </h6>
          <p>Following</p>
        </SettingFollowingDiv>
        <SettingFollowerDiv
          onClick={() => {
            toPage(`/profileFollow/${profileUser?._id}false`);
          }}
        >
          <h6>{follow}</h6>
          <p>Followers</p>
        </SettingFollowerDiv>
      </SettingFollowDiv>
      {loginUser?._id !== profileUser?._id ? (
        <MarketFollow>
          <div>
            {ifFollow() == -1 ? (
              <>
                <img src={marketFollow} />
                <p onClick={() => followUser()}>Follow</p>
              </>
            ) : (
              <>
                <img src={marketFollowing} />
                <p onClick={() => followUser()}>Following</p>
              </>
            )}
          </div>
          <div onClick={() => setMessageVisible(true)}>
            <img src={marketMessage} />
            <p>Send a Message</p>
          </div>
        </MarketFollow>
      ) : (
        <></>
      )}
      <ContactInfoDiv onClick={() => setContactInfo(!contactInfo)}>
        <p>Contact Info</p>
        <img src={arrows} />
      </ContactInfoDiv>
      {contactInfo ? (
        <ContactInfoContext>
          <InfoDiv>
            <h6>Email:</h6>
            <p style={{ color: "#4ba3c3" }}>
              {(profileUser as User).userEmail}
            </p>
          </InfoDiv>
          <InfoDiv>
            <h6>Tel:</h6>
            <p>{1111}</p>
          </InfoDiv>
          <InfoDiv>
            <h6>Location:</h6>
            <p>{(profileUser as User).location}</p>
          </InfoDiv>
          <SocialDiv>
            <h6>Social Pages</h6>
            <p>
              <img src={facebook} />
              {(profileUser as User).facebook}
            </p>
            <p>
              <img src={insImage} />
              {(profileUser as User).ins}
            </p>
            <p>
              <img src={profileLink} />
              {(profileUser as User).ins}
            </p>
          </SocialDiv>
        </ContactInfoContext>
      ) : (
        <></>
      )}
      {getWidth() > 700 ? (
        <ButtonsDiv>{getButtons()}</ButtonsDiv>
      ) : (
        <MobileButtonsDiv>{getButtons()}</MobileButtonsDiv>
      )}
      <LineProfileDiv></LineProfileDiv>
      <ProfileChildDiv>{getProfileDiv()}</ProfileChildDiv>
      <MessageModal
        footer={[]}
        onCancel={() => setMessageVisible(false)}
        visible={messageVisible}
      >
        <MessageDiv>
          <div>
            <p>To:</p>
            <img
              src={
                profileUser
                  ? `https://animeimagebucket.s3.amazonaws.com/${profileUser.avatar}`
                  : ""
              }
            />
            <h6>{`${profileUser ? profileUser.firstName : ""}.${
              profileUser
                ? profileUser.lastName
                : "".substring(0, 1).toUpperCase()
            }`}</h6>
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
    </ProfileBox>
  );
};

export default ProfilePage;
