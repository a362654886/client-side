import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import AnimeButton from "../../components/Button";
import {
  ButtonsDiv,
  InfoDiv,
  LineDiv,
  MessageDiv,
  NamePic,
  NameText,
  ProfileBox,
  ProfileChildDiv,
  ProfileDiv,
} from "../../cssJs/ProfilePage/ProfileCss";
import { IStoreState } from "../../types/IStoreState";
import { Avatar, User } from "../../types/User";
import ProfileLikesPage from "./component/ProfileLikesPage";
import ProfileMallPage from "./component/ProfileMallPage";
import ProfileMarketplacePage from "./component/ProfileMarketplacePage";
import ProfileShowcasePage from "./component/ProfileShowcasePage";

const ProfilePage = (): JSX.Element => {
  const history = useHistory();

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

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

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
        break;
      case 1:
        return <ProfileMarketplacePage />;
        break;
      case 2:
        return <ProfileMallPage />;
        break;
      case 3:
        return <ProfileLikesPage />;
        break;
      default:
        return <></>;
    }
  };

  return (
    <ProfileBox>
      <ProfileDiv>
        <NamePic
          src={((loginUser as User).avatarImage as Avatar[])[0].imageUrl}
        />
        <NameText>{`${(loginUser as User).firstName}.${(
          loginUser as User
        ).lastName
          .substring(0, 1)
          .toUpperCase()}`}</NameText>
        <AnimeButton
          para=""
          text="Settings"
          width="120px"
          height="36px"
          textColor="#F5A623"
          backGroundColor="#FCF3CF "
          borderColor="#F5A623"
          buttonClick={() => toPage("/mainPage/ProfileSetting")}
        />
        <AnimeButton
          para=""
          text="Message"
          width="120px"
          height="36px"
          textColor="#F5A623"
          backGroundColor="#FCF3CF "
          borderColor="#F5A623"
          buttonClick={() => toPage("/mainPage/ProfileMessage")}
        />
      </ProfileDiv>
      <MessageDiv>
        <AnimeButton
          para=""
          text="Message"
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="white "
          borderColor="#E5E7E9"
          buttonClick={() => toPage("/mainPage/login")}
        />
      </MessageDiv>
      <InfoDiv>
        <h6>Email:</h6>
        <p style={{ color: "#4ba3c3" }}>{(loginUser as User).userEmail}</p>
      </InfoDiv>
      <InfoDiv>
        <h6>Tel:</h6>
        <p>{1111}</p>
      </InfoDiv>
      <InfoDiv>
        <h6>Location:</h6>
        <p>{(loginUser as User).location}</p>
      </InfoDiv>
      <ButtonsDiv>{getButtons()}</ButtonsDiv>
      <LineDiv></LineDiv>
      <ProfileChildDiv>{getProfileDiv()}</ProfileChildDiv>
    </ProfileBox>
  );
};

export default ProfilePage;
