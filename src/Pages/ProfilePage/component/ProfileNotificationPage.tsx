import { Checkbox } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateNotification } from "../../../api/userApi";
import AnimeButton from "../../../components/Button";
import LoadingDiv from "../../../components/LoadingDiv";
import { ProfileAccountDiv } from "../../../cssJs/ProfilePage/ProfileAccountCss";
import { ContactSubmitButtonDiv } from "../../../cssJs/ProfilePage/ProfileContactCss";
import {
  NotificationCheckBox,
  NotificationSystemNews,
  NotificationTitle,
} from "../../../cssJs/ProfilePage/ProfileSettingCss";
import { LOGIN_USER_ADD } from "../../../redux/loginUser";
import { IStoreState } from "../../../types/IStoreState";
import { User } from "../../../types/User";

const ProfileNotificationPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [awesome, setAwesome] = useState<boolean>(false);
  const [comments, setComments] = useState<boolean>(false);
  const [bids, setBids] = useState<boolean>(false);
  const [newFollow, setNewFollow] = useState<boolean>(false);
  const [message, setMessage] = useState<boolean>(false);
  const [firstAnimeNews, setFirstAnimeNews] = useState<boolean>(false);

  const [ifLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setAwesome(loginUser ? loginUser.interactionAwesome : false);
    setComments(loginUser ? loginUser.interactionComments : false);
    setBids(loginUser ? loginUser.interactionBids : false);
    setNewFollow(loginUser ? loginUser.interactionNewFollowers : false);
    setMessage(loginUser ? loginUser.interactionMessages : false);
    setFirstAnimeNews(loginUser ? loginUser.interactionFirstAnimeNews : false);
  }, [loginUser]);

  const updateUser = async () => {
    const readyUpdateUser: User = {
      _id: loginUser ? loginUser._id : "",
      userEmail: loginUser ? loginUser.userEmail : "",
      contactEmail: loginUser ? loginUser.contactEmail : "",
      password: loginUser ? loginUser.password : "",
      firstName: loginUser ? loginUser.firstName : "",
      lastName: loginUser ? loginUser.lastName : "",
      country: loginUser ? loginUser.country : "",
      birthday: loginUser ? loginUser.birthday : new Date(),
      location: loginUser ? loginUser.location : "",
      facebook: loginUser ? loginUser.facebook : "",
      ins: loginUser ? loginUser.ins : "",
      tel: loginUser ? loginUser.tel : "",
      rate: loginUser ? loginUser.rate : [],
      likeAnime: loginUser?.likeAnime ? loginUser?.likeAnime : [],
      avatar: loginUser ? loginUser.avatar : "",
      avatarImage: loginUser ? loginUser.avatarImage : [],
      likeShowcase: loginUser?.likeShowcase ? loginUser?.likeShowcase : [],
      followManga: loginUser?.followManga ? loginUser?.followManga : [],
      followUsers: loginUser?.followUsers ? loginUser?.followUsers : [],
      followMarket: loginUser?.followMarket ? loginUser?.followMarket : [],
      awesomeNum: loginUser?.awesomeNum ? loginUser?.awesomeNum : 0,
      interactionAwesome: awesome,
      interactionComments: comments,
      interactionBids: bids,
      interactionNewFollowers: newFollow,
      interactionMessages: message,
      interactionFirstAnimeNews: firstAnimeNews,
      shipAddress: loginUser?.shipAddress ? loginUser?.shipAddress : "",
      shipCity: loginUser?.shipCity ? loginUser?.shipCity : "",
      shipSuburb: loginUser?.shipSuburb ? loginUser?.shipSuburb : "",
      postCode: loginUser?.postCode ? loginUser?.postCode : "",
      link: loginUser ? loginUser.link : "",
      block: loginUser?.block ? loginUser?.block : false,
      blockTime: loginUser ? loginUser.blockTime : 0,
      blockReason: loginUser ? loginUser.blockReason : "",
      role: loginUser ? loginUser.role : "general",
      registerTime: loginUser ? loginUser.registerTime : new Date().valueOf(),
    };
    setLoading(true);
    const r = await userUpdateNotification(readyUpdateUser);
    if (r == "success") {
      dispatch({
        payload: readyUpdateUser,
        type: LOGIN_USER_ADD,
      });
    }
    setLoading(false);
  };

  const getResult = () => {
    if (ifLoading) {
      return (
        <>
          <LoadingDiv height="150px" width="150px" />
        </>
      );
    } else {
      return (
        <>
          <NotificationTitle>
            <p>Allow us send you email about on the news type you opt</p>
          </NotificationTitle>
          <NotificationCheckBox>
            <h6>Interactions</h6>
            <Checkbox
              checked={awesome}
              onClick={(e) => {
                setAwesome((e.target as any).checked);
              }}
            >
              <p>Awesome</p>
            </Checkbox>
            <Checkbox
              checked={comments}
              onClick={(e) => {
                setComments((e.target as any).checked);
              }}
            >
              <p>Comments</p>
            </Checkbox>
            <Checkbox
              checked={bids}
              onClick={(e) => {
                setBids((e.target as any).checked);
              }}
            >
              <p>Bids</p>
            </Checkbox>
            <Checkbox
              checked={newFollow}
              onClick={(e) => {
                setNewFollow((e.target as any).checked);
              }}
            >
              <p>New followers</p>
            </Checkbox>
            <Checkbox
              checked={message}
              onClick={(e) => {
                setMessage((e.target as any).checked);
              }}
            >
              <p>Messages</p>
            </Checkbox>
          </NotificationCheckBox>
          <NotificationSystemNews>
            <h6>System News</h6>
            <Checkbox
              checked={firstAnimeNews}
              onClick={(e) => {
                setFirstAnimeNews((e.target as any).checked);
              }}
            >
              Be the first to get anime news
            </Checkbox>
          </NotificationSystemNews>
          <ContactSubmitButtonDiv>
            <AnimeButton
              para=""
              text="Submit"
              width="120px"
              height="36px"
              textColor="white"
              backGroundColor="#F5A623"
              borderColor="#F5A623"
              buttonClick={() => updateUser()}
            />
          </ContactSubmitButtonDiv>
        </>
      );
    }
  };

  return <ProfileAccountDiv>{getResult()}</ProfileAccountDiv>;
};

export default ProfileNotificationPage;
