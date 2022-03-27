import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AnimeButton from "../../components/Button";
import SettingImg from "../../components/SettingImg";
import {
  NameDiv,
  NameIdDiv,
  NamePic,
  NameSetting,
  ProfileDiv,
  ProfileSettingBox,
} from "../../cssJs/ProfilePage/ProfileCss";
import { SettingButtonsDiv } from "../../cssJs/ProfilePage/ProfileSettingCss";
import { IStoreState } from "../../types/IStoreState";
import { Avatar, User } from "../../types/User";
import ProfileAccountPage from "./component/ProfileAccountPage";
import ProfileContactPage from "./component/ProfileContactPage";
import avatarSetting from "../../files/avatarSetting.png";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";

const ProfileSettingPage = (): JSX.Element => {
  const history = useHistory();

  const buttonsColor = [
    {
      text: "Account",
      color: "black",
      backColor: "#F6F6F6",
    },
    {
      text: "Info",
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

  const toPage = (url: string) => history.push(url);

  const changeButton = (index: number) => {
    setChooseButton(index);
    if (index == 0) {
      setAccount(false);
    } else {
      setAccount(true);
    }
  };

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
              backGroundColor="#AAFFC9"
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
    account ? <ProfileContactPage /> : <ProfileAccountPage />;

  const getImage = () => {
    const imageArr = loginUser ? loginUser.avatarImage : null;
    return imageArr ? imageArr[0].imageUrl : "";
  };

  return (
    <ProfileSettingBox>
      <ProfileDiv>
        <NamePic src={getImage()} />
        <NameDiv>
          <NameSetting>
            <p>
              {`${loginUser ? loginUser.firstName : ""}.${
                loginUser
                  ? loginUser.lastName.substring(0, 1).toUpperCase()
                  : ""
              }`}
              <Flag
                style={{ marginLeft: "5px" }}
                country={flagGet(loginUser ? loginUser.country : "")}
              />
            </p>
            <SettingImg
              userId={loginUser ? loginUser._id : ""}
              userName={`${loginUser ? loginUser.firstName : ""}.${
                loginUser ? loginUser.lastName : ""
              }`}
              userImg={avatarSetting}
              marginTop="4px"
            />
          </NameSetting>
          <NameIdDiv>(ID: 202201)</NameIdDiv>
        </NameDiv>
      </ProfileDiv>
      <SettingButtonsDiv>{getButtons()}</SettingButtonsDiv>
      {getPart()}
    </ProfileSettingBox>
  );
};

export default ProfileSettingPage;
