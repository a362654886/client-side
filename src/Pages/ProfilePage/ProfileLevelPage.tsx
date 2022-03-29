import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import SettingImg from "../../components/SettingImg";
import {
  LevelPic,
  LineDiv,
  NameDiv,
  NameIdDiv,
  NamePic,
  NameSetting,
  ProfileDiv,
  ProfileImgDiv,
  ProfileLevelAwesome,
  ProfileLevelBox,
  ProfileLevelDiv,
  ProfileLevelH2,
  ProfileLevelImgDiv,
  ProfileLevelMainDiv,
} from "../../cssJs/ProfilePage/ProfileCss";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";
import avatarSetting from "../../files/avatarSetting.png";
import Flag from "react-flagkit";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.svg";
import { flagGet } from "../../helperFns/flag";
import level1 from "../../files/level1.png";

const ProfileLevelPage = (): JSX.Element => {
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const profileUser: User | null = useSelector(
    (state: IStoreState) => state.profileUserState
  );

  const getImage = () => {
    const imageArr = loginUser ? loginUser.avatarImage : null;
    return imageArr ? imageArr[0].imageUrl : "";
  };

  return (
    <ProfileLevelBox>
      <ProfileLevelDiv>
        <LevelPic src={level1} />
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
      </ProfileLevelDiv>
      <ProfileLevelAwesome>
        <p>
          <img src={showCaseAwesomeClick} style={{ marginRight: "4px" }} />
          Awesome!
        </p>
        <h6>{profileUser ? profileUser.awesomeNum : 0}</h6>
      </ProfileLevelAwesome>
      <ProfileLevelH2>You are moving onto Level 3</ProfileLevelH2>
      <LineDiv></LineDiv>
      <ProfileLevelMainDiv className="row">
        <ProfileLevelImgDiv className="col-xl-6 col-md-6 col-sm-6">
          <ProfileImgDiv>
            <img src={level1} />
          </ProfileImgDiv>
          <div>
            <img src={showCaseAwesomeClick} style={{ marginRight: "4px" }} />
            <p>1k</p>
          </div>
        </ProfileLevelImgDiv>
        <ProfileLevelImgDiv className="col-xl-6 col-md-6 col-sm-6">
          <ProfileImgDiv>
            <img src={level1} />
          </ProfileImgDiv>
          <div>
            <img src={showCaseAwesomeClick} style={{ marginRight: "4px" }} />
            <p>1k</p>
          </div>
        </ProfileLevelImgDiv>
        <ProfileLevelImgDiv className="col-xl-6 col-md-6 col-sm-6">
          <ProfileImgDiv>
            <img src={level1} />
          </ProfileImgDiv>
          <div>
            <img src={showCaseAwesomeClick} style={{ marginRight: "4px" }} />
            <p>1k</p>
          </div>
        </ProfileLevelImgDiv>
        <ProfileLevelImgDiv className="col-xl-6 col-md-6 col-sm-6">
          <ProfileImgDiv>
            <img src={level1} />
          </ProfileImgDiv>
          <div>
            <img src={showCaseAwesomeClick} style={{ marginRight: "4px" }} />
            <p>1k</p>
          </div>
        </ProfileLevelImgDiv>
        <ProfileLevelImgDiv className="col-xl-6 col-md-6 col-sm-6">
          <ProfileImgDiv>
            <img src={level1} />
          </ProfileImgDiv>
          <div>
            <img src={showCaseAwesomeClick} style={{ marginRight: "4px" }} />
            <p>1k</p>
          </div>
        </ProfileLevelImgDiv>
        <ProfileLevelImgDiv className="col-xl-6 col-md-6 col-sm-6">
          <ProfileImgDiv>
            <img src={level1} />
          </ProfileImgDiv>
          <div>
            <img src={showCaseAwesomeClick} style={{ marginRight: "4px" }} />
            <p>1k</p>
          </div>
        </ProfileLevelImgDiv>
      </ProfileLevelMainDiv>
    </ProfileLevelBox>
  );
};

export default ProfileLevelPage;
