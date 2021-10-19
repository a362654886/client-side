import * as React from "react";
import { useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LoginType } from "../types/EnumTypes";
import { IStoreState } from "../types/IStoreState";
import avatar from "../files/avatar.png";
import MainPageRouter from "../router/MainPageRouter";
import { useHistory } from "react-router-dom";
import { User } from "../types/User";
import {
  Header,
  HeaderContainer,
  HeaderContext,
  HeaderTitle,
  LoginBox,
  LoginImg,
} from "../cssJs/headerCss";
import ProfilePageRouter from "../router/ProfilePageRouter";

const MainPage = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const history = useHistory();

  useEffect(() => {
    history.push({
      pathname: "/mainPage/home",
    });
    console.log(loginUser);
  }, []);

  useEffect(() => {
    console.log(loginUser);
  }, [loginUser]);

  const authState: LoginType = useSelector(
    (state: IStoreState) => state.authState
  );

  const childrenRef: React.MutableRefObject<{ popUp: () => void }> =
    useRef() as React.MutableRefObject<{ popUp: () => void }>;

  const login = () => childrenRef.current.popUp();

  const toProfile = (url: string) => history.replace(url);

  const getProfile = () => {
    if (loginUser) {
      return (
        <>
          <LoginImg
            src={
              loginUser.avatarImage ? loginUser.avatarImage[0].imageUrl : avatar
            }
          />
          <LoginBox onClick={() => toProfile("/mainPage/profilePage")}>
            <p>{loginUser.name}</p>
          </LoginBox>
        </>
      );
    } else {
      return (
        <>
          <LoginImg src={avatar} />
          <LoginBox>
            <p onClick={() => toProfile("/mainPage/login")}>Log In</p>
            <p>|</p>
            <p onClick={() => toProfile("/mainPage/signUpPage")}>Sign up</p>
          </LoginBox>
        </>
      );
    }
  };

  return (
    <div className="backBody">
      <Header>
        <HeaderContainer>
          <HeaderTitle>ANIMEPARK</HeaderTitle>
          <HeaderContext>
            <p>Discovery</p>
            <p>Anime</p>
            <p>Showcase</p>
            <p>Marketplace</p>
            <p>Mall</p>
            <p>News</p>
          </HeaderContext>
          {getProfile()}
        </HeaderContainer>
      </Header>
      <MainPageRouter />
      <ProfilePageRouter />
    </div>
  );
};

export default MainPage;
