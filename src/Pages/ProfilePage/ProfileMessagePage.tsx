import * as React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AnimeButton from "../../components/Button";
import {
  NamePic,
  NameText,
  ProfileBox,
  ProfileDiv,
} from "../../cssJs/ProfilePage/ProfileCss";
import { IStoreState } from "../../types/IStoreState";
import { Avatar, User } from "../../types/User";

const ProfileMessagePage = (): JSX.Element => {
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const toPage = (url: string) => history.replace(url);

  return (
    <ProfileBox>
      <ProfileDiv>
        <NamePic
          src={((loginUser as User).avatarImage as Avatar[])[0].imageUrl}
        />
        <NameText onClick={() => toPage("/mainPage/profilePage")}>
          {`${(loginUser as User).firstName}.${(loginUser as User).lastName
            .substring(0, 1)
            .toUpperCase()}`}
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
      message
    </ProfileBox>
  );
};

export default ProfileMessagePage;
