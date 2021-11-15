import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AnimeButton from "../../components/Button";
import {
  NamePic,
  NameText,
  ProfileBox,
  ProfileDiv,
} from "../../cssJs/ProfilePage/ProfileCss";
import { SettingButtonsDiv } from "../../cssJs/ProfilePage/ProfileSettingCss";
import { IStoreState } from "../../types/IStoreState";
import { Avatar, User } from "../../types/User";
import ProfileAccountPage from "./component/ProfileAccountPage";
import ProfileContactPage from "./component/ProfileContactPage";

const ProfileSettingPage = (): JSX.Element => {
  const history = useHistory();

  const buttonsColor = [
    {
      text: "Account",
      color: "black",
      backColor: "#F6F6F6",
    },
    {
      text: "Contact",
      color: "black",
      backColor: "white",
    },
  ];

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [chooseButton, setChooseButton] = useState<number>(0);
  const [account, setAccount] = useState<boolean>(true);

  useEffect(() => {
    //
  }, [account]);

  const toPage = (url: string) => history.replace(url);

  const changeButton = (index: number) => {
    setChooseButton(index);
    setAccount(!account);
  }

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
              backGroundColor="#F6F6F6 "
              borderColor="white"
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
              textColor="black"
              backGroundColor="white "
              borderColor="black"
              buttonClick={() => changeButton(index)}
            />
          );
        }
      }
    );
  };

  const getPart = () =>
    account ? <ProfileContactPage />:<ProfileAccountPage /> ;

  return (
    <ProfileBox>
      <ProfileDiv>
        <NamePic
          src={
            (loginUser as User).avatarImage
              ? ((loginUser as User).avatarImage as Avatar[])[0].imageUrl
              : ""
          }
        />
        <NameText onClick={() => toPage("/mainPage/profilePage")}>
          {(loginUser as User).name}
        </NameText>
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
      <SettingButtonsDiv>{getButtons()}</SettingButtonsDiv>
      {getPart()}
    </ProfileBox>
  );
};

export default ProfileSettingPage;
