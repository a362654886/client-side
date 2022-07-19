import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import AnimeButton from "../../components/Button";
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
import { MessageDiv, MessageModal } from "../../cssJs/settingImgCss";
import TextArea from "antd/lib/input/TextArea";
import { useParams } from "react-router-dom";
import { userGet } from "../../api/userApi";
import { PROFILE_USER_UPDATE } from "../../redux/profileUser";
import { getWidth } from "../../helperFns/widthFn";
import { Slider } from "antd";
import { AwesomeLevelType } from "../../types/awesomeLevel";
import { getLevel } from "../../helperFns/profileFn";
import avatarUpload from "../../files/avatarUpload.png";

interface Para {
  id: string;
}

const ProfileLoginPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const para: Para = useParams();

  const history = useHistory();

  const [follow, setFollow] = useState<number>(0);
  const [contactInfo, setContactInfo] = useState<boolean>(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageValue, setMessageValue] = useState("");
  const [chooseButton, setChooseButton] = useState<number>(0);

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const allLevels: AwesomeLevelType[] | null = useSelector(
    (state: IStoreState) => state.allLevelState
  );

  useEffect(() => {
    (async function anyNameFunction() {
      const user = await userGet(para.id.replace("Like", ""));
      dispatch({
        payload: user,
        type: PROFILE_USER_UPDATE,
      });
      await getFollowers(para.id.replace("Like", ""));
    })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (para.id.indexOf("Like") != -1) {
      setChooseButton(2);
    }
  }, [para]);

  useEffect(() => {
    const market = history.location.search.replace("?market=", "");
    if (market == "true") {
      setChooseButton(1);
    }
  }, []);

  const buttonsColor = () => {
    if (loginUser) {
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
        return <ProfileShowcasePage paraId={loginUser ? loginUser._id : ""} />;
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

  const getNameImg = () => {
    return loginUser
      ? loginUser.avatarImage
        ? loginUser.avatarImage[0].imageUrl
        : avatarUpload
      : avatarUpload;
  };

  const getOneLevel = getLevel(allLevels, loginUser ? loginUser.awesomeNum : 0);

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
                {`${loginUser ? loginUser.firstName : ""}.${
                  loginUser
                    ? loginUser.lastName.substring(0, 1).toUpperCase()
                    : "Not Logged In"
                }`}
                <Flag
                  style={{ marginLeft: "5px" }}
                  country={flagGet(loginUser ? loginUser.country : "")}
                />
              </p>
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
      {loginUser ? (
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
            toPage(`/profileFollow/${loginUser?._id}true`);
          }}
        >
          <h6>
            {loginUser
              ? loginUser.followUsers
                ? loginUser.followUsers.length
                : 0
              : 0}
          </h6>
          <p>Following</p>
        </SettingFollowingDiv>
        <SettingFollowerDiv
          onClick={() => {
            toPage(`/profileFollow/${loginUser?._id}false`);
          }}
        >
          <h6>{follow}</h6>
          <p>Followers</p>
        </SettingFollowerDiv>
      </SettingFollowDiv>
      <ContactInfoDiv onClick={() => setContactInfo(!contactInfo)}>
        <p>Contact Info</p>
        <img src={arrows} />
      </ContactInfoDiv>
      {contactInfo ? (
        <ContactInfoContext>
          <InfoDiv>
            <h6>Email:</h6>
            <p style={{ color: "#4ba3c3" }}>
              {(loginUser as User).contactEmail}
            </p>
          </InfoDiv>
          <InfoDiv>
            <h6>Tel:</h6>
            <p>{1111}</p>
          </InfoDiv>
          <InfoDiv>
            <h6>Location:</h6>
            <p>{(loginUser as User).location}</p>
          </InfoDiv>
          <SocialDiv>
            <h6>Social Pages</h6>
            <p>
              <img src={facebook} />
              {(loginUser as User).facebook}
            </p>
            <p>
              <img src={insImage} />
              {(loginUser as User).ins}
            </p>
            <p>
              <img src={profileLink} />
              {(loginUser as User).ins}
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
                loginUser
                  ? `https://animeimagebucket.s3.amazonaws.com/${loginUser.avatar}`
                  : ""
              }
            />
            <h6>{`${loginUser ? loginUser.firstName : ""}.${
              loginUser ? loginUser.lastName : "".substring(0, 1).toUpperCase()
            }`}</h6>
          </div>
          <TextArea
            value={messageValue}
            onChange={(e) => setMessageValue(e.target.value)}
          />
        </MessageDiv>
      </MessageModal>
    </ProfileBox>
  );
};

export default ProfileLoginPage;
