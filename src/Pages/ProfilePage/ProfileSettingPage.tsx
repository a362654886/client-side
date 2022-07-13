import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AnimeButton from "../../components/Button";
import SettingImg from "../../components/SettingImg";
import {
  LevelPic,
  LineDiv,
  NameDiv,
  NameIdDiv,
  NamePic,
  NameSetting,
  ProfileAwesomePic,
  ProfileDiv,
  ProfileSettingBox,
  ProfileSlider,
} from "../../cssJs/ProfilePage/ProfileCss";
import { SettingButtonsDiv } from "../../cssJs/ProfilePage/ProfileSettingCss";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";
import ProfileAccountPage from "./component/ProfileAccountPage";
import ProfileContactPage from "./component/ProfileContactPage";
import avatarSetting from "../../files/avatarSetting.svg";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";
import ProfileNotificationPage from "./component/ProfileNotificationPage";
import ProfileShippingAddressPage from "./component/ProfileShippingAddressPage";
import { getWidth } from "../../helperFns/widthFn";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.svg";
import { getLevel } from "../../helperFns/profileFn";
import { AwesomeLevelType } from "../../types/awesomeLevel";
import { Slider } from "antd";
import { Helmet } from "react-helmet";

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
    {
      text: "Notification",
      color: "black",
      backColor: "white",
    },
    {
      text: "Shipping address",
      color: "black",
      backColor: "white",
    },
  ];

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [chooseButton, setChooseButton] = useState<number>(0);
  const [buttonType, setButtonType] = useState<number>(0);

  const allLevels: AwesomeLevelType[] | null = useSelector(
    (state: IStoreState) => state.allLevelState
  );

  useEffect(() => {
    //
  }, [buttonType]);

  useEffect(() => {
    console.log(loginUser);
  }, [loginUser]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toPage = (url: string) => history.push(url);

  const changeButton = (index: number) => {
    setChooseButton(index);
    setButtonType(index);
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
              width="200px"
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
              width="200px"
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

  const getPart = () => {
    switch (buttonType) {
      case 0:
        return <ProfileAccountPage />;
      case 1:
        return <ProfileContactPage />;
      case 2:
        return <ProfileNotificationPage />;
      case 3:
        return <ProfileShippingAddressPage />;
    }
  };

  const getImage = () => {
    const imageArr = loginUser ? loginUser.avatarImage : null;
    return imageArr ? imageArr[0].imageUrl : "";
  };

  const getOneLevel = getLevel(allLevels, loginUser ? loginUser.awesomeNum : 0);

  return (
    <>
      <Helmet>
        <title>Profile Setting - Animepark.com</title>
      </Helmet>
      <ProfileSettingBox
        style={{
          marginLeft: getWidth() > 600 ? "" : "8px",
          marginRight: getWidth() > 600 ? "" : "8px",
        }}
      >
        <ProfileDiv>
          <div style={{ display: "flex" }}>
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
        <LineDiv></LineDiv>
        <div style={{ display: getWidth() > 600 ? "flex" : "inline" }}>
          <div style={{ width: "233px" }}>
            <SettingButtonsDiv>{getButtons()}</SettingButtonsDiv>
          </div>
          {getPart()}
        </div>
      </ProfileSettingBox>
    </>
  );
};

export default ProfileSettingPage;
