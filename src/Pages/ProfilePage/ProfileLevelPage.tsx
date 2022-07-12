import * as React from "react";
import { useSelector } from "react-redux";
import SettingImg from "../../components/SettingImg";
import {
  LevelPic,
  LineDiv,
  NameDiv,
  NameIdDiv,
  NamePic,
  NameSetting,
  ProfileAwesomePic,
  ProfileImgDiv,
  ProfileLevelAwesome,
  ProfileLevelBox,
  ProfileLevelDiv,
  ProfileLevelH2,
  ProfileLevelImgDiv,
  ProfileLevelMainDiv,
  ProfileSlider,
} from "../../cssJs/ProfilePage/ProfileCss";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";
import avatarSetting from "../../files/avatarSetting.svg";
import Flag from "react-flagkit";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.svg";
import { flagGet } from "../../helperFns/flag";
import { AwesomeLevelType } from "../../types/awesomeLevel";
import { Slider } from "antd";
import { getLevel } from "../../helperFns/profileFn";
import { Helmet } from "react-helmet";

const ProfileLevelPage = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const allLevels: AwesomeLevelType[] | null = useSelector(
    (state: IStoreState) => state.allLevelState
  );

  const getImage = () => {
    const imageArr = loginUser ? loginUser.avatarImage : null;
    return imageArr ? imageArr[0].imageUrl : "";
  };

  const moveToLevel = () => {
    let levelTo = "";
    let find = false;
    if (allLevels) {
      allLevels.forEach((level, index) => {
        if (
          find == false &&
          level.awesomeRequire > (loginUser ? loginUser.awesomeNum : 0)
        ) {
          find = true;
          levelTo = allLevels[index + 1]._id;
        }
      });
    }
    return levelTo;
  };

  const getOneLevel = getLevel(allLevels, loginUser ? loginUser.awesomeNum : 0);

  return (
    <>
      <Helmet>
        <title>Level - Animepark.com</title>
      </Helmet>
      <ProfileLevelBox>
        <ProfileLevelDiv>
          <div>
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
                <NameIdDiv>
                  ({`(ID: ${loginUser ? loginUser._id : ""})`})
                </NameIdDiv>
              </NameDiv>
            </div>
            <div style={{ display: "flex" }}>
              <LevelPic src={getOneLevel.image} />
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
          </div>
        </ProfileLevelDiv>
        <ProfileLevelH2>
          You are moving onto Level {moveToLevel()}
        </ProfileLevelH2>
        <LineDiv></LineDiv>
        <ProfileLevelMainDiv className="row">
          {allLevels ? (
            allLevels.map((item, index) => {
              return (
                <ProfileLevelImgDiv
                  key={index}
                  className="col-xl-6 col-md-6 col-sm-6"
                >
                  <h6>{`Level ${index + 1}`}</h6>
                  <ProfileImgDiv>
                    <img src={item.image} />
                  </ProfileImgDiv>
                  <div style={{ position: "relative" }}>
                    <img
                      src={showCaseAwesomeClick}
                      style={{ marginRight: "4px" }}
                    />
                    <p>{item.awesomeRequire}</p>
                    <Slider
                      style={{ width: "100%" }}
                      defaultValue={
                        ((loginUser ? loginUser.awesomeNum : 0) /
                          item.awesomeRequire) *
                        100
                      }
                      disabled={true}
                    ></Slider>
                  </div>
                </ProfileLevelImgDiv>
              );
            })
          ) : (
            <></>
          )}
        </ProfileLevelMainDiv>
      </ProfileLevelBox>
    </>
  );
};

export default ProfileLevelPage;
