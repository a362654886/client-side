import * as React from "react";
import { useEffect, useState } from "react";
import Flag from "react-flagkit";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { followByGetByUserId } from "../../api/followByAPI";
import { userFollowsGets } from "../../api/userApi";
import SettingImg from "../../components/SettingImg";
import {
  LineDiv,
  NameDiv,
  NameIdDiv,
  NamePic,
  NameSetting,
  ProfileBox,
  ProfileDiv,
  ProfileFollowBox,
  ProfileFollowDiv,
} from "../../cssJs/ProfilePage/ProfileCss";
import { flagGet } from "../../helperFns/flag";
import { followByType } from "../../types/FollowBycopy";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";
import avatarSetting from "../../files/avatarSetting.png";
import ingfollow from "../../files/ingfollow.png";
import marketFollow from "../../files/marketFollow.png";
import AnimeButton from "../../components/Button";
import {
  FollowBottomDiv,
  FollowButtonsDiv,
  FollowElementDiv,
  FollowElementProfileDiv,
  FollowElementProfileNameSetting,
} from "../../cssJs/ProfilePage/ProfileFollowCss";
import { LOGIN_USER_UPDATE_FOLLOW } from "../../redux/loginUser";

const buttonsColor = [
  {
    text: "Following",
    color: "black",
    backColor: "#F6F6F6",
  },
  {
    text: "Followers",
    color: "black",
    backColor: "white",
  },
];

interface Para {
  id: string;
}

const ProfileFollowPage = (): JSX.Element => {
  const para: Para = useParams();
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [chooseButton, setChooseButton] = useState<number>(0);
  const [followIng, setFollowing] = useState<User[] | null>([]);
  const [followIngCount, setFollowIngCount] = useState<number>(0);
  const [followers, setFollowers] = useState<followByType[] | null>([]);
  const [followersCount, setFollowersCount] = useState<number>(0);

  useEffect(() => {
    (async function anyNameFunction() {
      await getFollowers(para.id);
      await getFollowing(para.id);
    })();
  }, []);

  useEffect(() => {
    console.log(loginUser);
    console.log(followers)
  }, [
    followers,
    followersCount,
    followIng,
    followIngCount,
    chooseButton,
    loginUser,
  ]);

  const getFollowers = async (userId: string) => {
    const followerResult = await followByGetByUserId(userId, 1, 10, 0);
    setFollowers(followerResult ? followerResult.result : null);
    setFollowersCount(followerResult ? followerResult.count : 0);
  };

  const getFollowing = async (userId: string) => {
    const followingResult = await userFollowsGets(userId, 1, 10);
    setFollowing(followingResult ? followingResult.result : null);
    setFollowIngCount(followingResult ? followingResult.count : 0);
  };

  const getImage = () => {
    const imageArr = loginUser ? loginUser.avatarImage : null;
    return imageArr ? imageArr[0].imageUrl : "";
  };

  const followUser = (id: string) => {
    dispatch({
      payload: id,
      type: LOGIN_USER_UPDATE_FOLLOW,
    });
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
              text={`${button.text} ${followIngCount}`}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="#AAFFC9"
              borderColor="white"
              buttonClick={() => setChooseButton(index)}
            />
          );
        } else {
          return (
            <AnimeButton
              para=""
              text={`${button.text} ${followersCount}`}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="white "
              borderColor="black"
              buttonClick={() => setChooseButton(index)}
            />
          );
        }
      }
    );
  };

  const getPart = () => {
    if (chooseButton == 0) {
      return followIng ? (
        followIng.map((item: User, index: number) => {
          return (
            <FollowElementDiv key={index}>
              <FollowElementProfileDiv>
                <img
                  src={`https://animeimagebucket.s3.amazonaws.com/${item.avatar}`}
                />
                <FollowElementProfileNameSetting>
                  <p>
                    {`${item ? item.firstName : ""}.${
                      item ? item.lastName.substring(0, 1).toUpperCase() : ""
                    }`}
                    <Flag
                      style={{ marginLeft: "5px" }}
                      country={flagGet(item ? item.country : "")}
                    />
                  </p>
                  <SettingImg
                    userId={item ? item._id : ""}
                    userName={`${item ? item.firstName : ""}.${
                      item ? item.lastName : ""
                    }`}
                    userImg={avatarSetting}
                    marginTop="4px"
                  />
                </FollowElementProfileNameSetting>
              </FollowElementProfileDiv>
              <FollowBottomDiv
                onClick={() => {
                  followUser(item._id);
                }}
              >
                <img
                  src={
                    loginUser?.followUsers.indexOf(item._id) == -1
                      ? marketFollow
                      : ingfollow
                  }
                />
                <h6>
                  {loginUser?.followUsers.indexOf(item._id) == -1
                    ? `Follow`
                    : `Following`}
                </h6>
              </FollowBottomDiv>
            </FollowElementDiv>
          );
        })
      ) : (
        <></>
      );
    } else {
      return followers ? (
        followers.map((item: followByType, index: number) => {
          return (
            <FollowElementDiv key={index}>
              <FollowElementProfileDiv>
                <img src={`${item.userAvatar}`} />
                <FollowElementProfileNameSetting>
                  <p>
                    {`${item ? item.userName : ""}`}
                    <Flag
                      style={{ marginLeft: "5px" }}
                      country={flagGet(
                        item ? (item.country ? item.country : "") : ""
                      )}
                    />
                  </p>
                  <SettingImg
                    userId={item ? item._id : ""}
                    userName={`${item ? item.userName : ""}`}
                    userImg={avatarSetting}
                    marginTop="4px"
                  />
                </FollowElementProfileNameSetting>
              </FollowElementProfileDiv>
              <FollowBottomDiv
                onClick={() => {
                  followUser(item.userId);
                }}
              >
                <img
                  src={
                    loginUser?.followUsers.indexOf(item.userId) == -1
                      ? marketFollow
                      : ingfollow
                  }
                />
                <h6>
                  {loginUser?.followUsers.indexOf(item.userId) == -1
                    ? `Follow`
                    : `Following`}
                </h6>
              </FollowBottomDiv>
            </FollowElementDiv>
          );
        })
      ) : (
        <></>
      );
    }
  };

  return (
    <ProfileFollowBox>
      <ProfileFollowDiv>
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
      </ProfileFollowDiv>
      <FollowButtonsDiv>{getButtons()}</FollowButtonsDiv>
      <LineDiv></LineDiv>
      <div style={{ margin: "0px auto" }} className="row">
        {getPart()}
      </div>
    </ProfileFollowBox>
  );
};

export default ProfileFollowPage;
