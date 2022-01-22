import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import AnimeButton from "../../components/Button";
import SettingImg from "../../components/SettingImg";
import {
  ButtonsDiv,
  ContactInfoContext,
  ContactInfoDiv,
  InfoDiv,
  LineDiv,
  NameDiv,
  NameIdDiv,
  NamePic,
  NameSetting,
  ProfileBox,
  ProfileChildDiv,
  ProfileDiv,
  SettingAwesomeDiv,
  SettingFollowDiv,
  SettingFollowerDiv,
  SettingFollowingDiv,
  SettingIconDiv,
  SettingIconsDiv,
  SocialDiv,
} from "../../cssJs/ProfilePage/ProfileCss";
import { IStoreState } from "../../types/IStoreState";
import { Avatar, User } from "../../types/User";
import ProfileLikesPage from "./component/ProfileLikesPage";
import ProfileMallPage from "./component/ProfileMallPage";
import ProfileMarketplacePage from "./component/ProfileMarketplacePage";
import ProfileShowcasePage from "./component/ProfileShowcasePage";
import avatarSetting from "../../files/avatarSetting.png";
import IconSettings from "../../files/IconSettings.svg";
import IconInbox from "../../files/IconInbox.svg";
import facebook from "../../files/facebook.svg";
import insImage from "../../files/insImage.svg";
import profileLink from "../../files/profileLink.png";
import { followByGetByUserId } from "../../api/followByAPI";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.svg";
import arrows from "../../files/arrows.svg";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";

const ProfilePage = (): JSX.Element => {
  const history = useHistory();

  const [follow, setFollow] = useState<number>(0);
  const [contactInfo, setContactInfo] = useState<boolean>(false);

  const buttonsColor = [
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
      text: "Mall",
      color: "#4BA3C3",
      backColor: "white",
    },
    {
      text: "Likes",
      color: "#4BA3C3",
      backColor: "white",
    },
  ];

  const profileUser: User | null = useSelector(
    (state: IStoreState) => state.profileUserState
  );

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  useEffect(() => {
    (async function anyNameFunction() {
      await getFollowers(profileUser ? profileUser._id : "");
    })();
  }, []);

  const getFollowers = async (userId: string) => {
    const followerResult = await followByGetByUserId(userId, 1, 1);
    setFollow(followerResult ? followerResult.count : 0);
  };

  const toPage = (url: string) => history.replace(url);
  const [chooseButton, setChooseButton] = useState<number>(0);

  const changeButton = (index: number) => setChooseButton(index);

  const getButtons = () => {
    return buttonsColor.map(
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
        return <ProfileShowcasePage />;
      case 1:
        return <ProfileMarketplacePage />;
      case 2:
        return <ProfileMallPage />;
      case 3:
        return <ProfileLikesPage />;
      default:
        return <></>;
    }
  };

  return (
    <ProfileBox>
      <ProfileDiv>
        <NamePic
          src={((profileUser as User).avatarImage as Avatar[])[0].imageUrl}
        />
        <NameDiv>
          <NameSetting>
            <p>
              {`${(profileUser as User).firstName}.${(
                profileUser as User
              ).lastName
                .substring(0, 1)
                .toUpperCase()}`}
              <Flag
                style={{ marginLeft: "5px" }}
                country={flagGet(profileUser ? profileUser.country : "")}
              />
            </p>
            <SettingImg
              userId={(profileUser as User)._id}
              userName={`${(profileUser as User).firstName}.${
                (profileUser as User).lastName
              }`}
              userImg={avatarSetting}
              marginTop="4px"
            />
          </NameSetting>
          <NameIdDiv>(ID: 202201)</NameIdDiv>
        </NameDiv>
      </ProfileDiv>
      {loginUser && profileUser && loginUser._id == profileUser._id ? (
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
      ) : (
        <></>
      )}
      <SettingFollowDiv>
        <SettingFollowingDiv>
          <h6>
            {profileUser
              ? profileUser.followUsers
                ? profileUser.followUsers.length
                : 0
              : 0}
          </h6>
          <p>Following</p>
        </SettingFollowingDiv>
        <SettingFollowerDiv>
          <h6>{follow}</h6>
          <p>Followers</p>
        </SettingFollowerDiv>
        <SettingAwesomeDiv>
          <h6>{profileUser ? profileUser.awesomeNum : 0}</h6>
          <p>
            <img src={showCaseAwesomeClick} style={{ marginRight: "4px" }} />
            Awesome!
          </p>
        </SettingAwesomeDiv>
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
      <ButtonsDiv>{getButtons()}</ButtonsDiv>
      <LineDiv></LineDiv>
      <ProfileChildDiv>{getProfileDiv()}</ProfileChildDiv>
    </ProfileBox>
  );
};

export default ProfilePage;
