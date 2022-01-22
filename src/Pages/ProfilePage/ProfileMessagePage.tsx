import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  NameDiv,
  NameIdDiv,
  NamePic,
  NameSetting,
  ProfileDiv,
  ProfileSettingBox,
  SettingIconDiv,
  SettingIconsDiv,
} from "../../cssJs/ProfilePage/ProfileCss";
import { IStoreState } from "../../types/IStoreState";
import { Avatar, User } from "../../types/User";
import avatarSetting from "../../files/avatarSetting.png";
import SettingImg from "../../components/SettingImg";
import IconSettings from "../../files/IconSettings.svg";
import IconInbox from "../../files/IconInbox.svg";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";

const ProfileMessagePage = (): JSX.Element => {
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const toPage = (url: string) => history.replace(url);

  return (
    <ProfileSettingBox>
      <ProfileDiv>
        <NamePic
          src={((loginUser as User).avatarImage as Avatar[])[0].imageUrl}
        />
        <NameDiv>
          <NameSetting>
            <p>
              {`${(loginUser as User).firstName}.${(loginUser as User).lastName
                .substring(0, 1)
                .toUpperCase()}`}
              <Flag
                style={{ marginLeft: "5px" }}
                country={flagGet(loginUser ? loginUser.country : "")}
              />
            </p>
            <SettingImg
              userId={(loginUser as User)._id}
              userName={`${(loginUser as User).firstName}.${
                (loginUser as User).lastName
              }`}
              userImg={avatarSetting}
              marginTop="4px"
            />
          </NameSetting>
          <NameIdDiv>(ID: 202201)</NameIdDiv>
        </NameDiv>
      </ProfileDiv>
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
      message
    </ProfileSettingBox>
  );
};

export default ProfileMessagePage;
