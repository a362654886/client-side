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
  ProfileFollowBox,
  ProfileFollowDiv,
} from "../../cssJs/ProfilePage/ProfileCss";
import { flagGet } from "../../helperFns/flag";
import { followByType } from "../../types/FollowBycopy";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";
import avatarSetting from "../../files/avatarSetting.png";
import ingfollow from "../../files/ingfollow.png";
import marketFollow from "../../files/Icon-Follow.svg";
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

  const profileUser: User | null = useSelector(
    (state: IStoreState) => state.profileUserState
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
    console.log(followers);
  }, [
    followers,
    followersCount,
    followIng,
    followIngCount,
    chooseButton,
    loginUser,
    profileUser,
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
    const user =
      (loginUser ? loginUser._id : "") == para.id ? loginUser : profileUser;
    const imageArr = user ? user.avatarImage : null;
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
              text={`${button.text} ${
                button.text == "Following" ? followIngCount : followersCount
              }`}
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
              text={`${button.text} ${
                button.text == "Following" ? followIngCount : followersCount
              }`}
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
                    type={null}
                    contextId={null}
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
                    type={null}
                    contextId={null}
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

  const getTitleUser = () => {
    const user =
      (loginUser ? loginUser._id : "") == para.id ? loginUser : profileUser;
    return (
      <ProfileFollowDiv>
        <NamePic src={getImage()} />
        <NameDiv>
          <NameSetting>
            <p>
              {`${user ? user.firstName : ""}.${
                user ? user.lastName.substring(0, 1).toUpperCase() : ""
              }`}
              <Flag
                style={{ marginLeft: "5px" }}
                country={flagGet(user ? user.country : "")}
              />
            </p>
            <SettingImg
              userId={user ? user._id : ""}
              userName={`${user ? user.firstName : ""}.${
                user ? user.lastName : ""
              }`}
              userImg={avatarSetting}
              marginTop="4px"
              type={null}
              contextId={null}
            />
          </NameSetting>
          <NameIdDiv>{`(ID: ${user ? user._id : ""})`}</NameIdDiv>
        </NameDiv>
      </ProfileFollowDiv>
    );
  };

  return (
    <ProfileFollowBox>
      {getTitleUser()}
      <FollowButtonsDiv>{getButtons()}</FollowButtonsDiv>
      <LineDiv></LineDiv>
      <div style={{ margin: "0px auto" }} className="row">
        {getPart()}
      </div>
    </ProfileFollowBox>
  );
};

export default ProfileFollowPage;
