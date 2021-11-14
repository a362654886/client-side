import * as React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoadingType, LoginType } from "../types/EnumTypes";
import { IStoreState } from "../types/IStoreState";
import avatar from "../files/avatar.png";
import MainPageRouter from "../router/MainPageRouter";
import { useHistory, useParams } from "react-router-dom";
import { User } from "../types/User";
import {
  Header,
  HeaderContainer,
  HeaderContext,
  HeaderTitle,
  LoadingBox,
  LoginBox,
  LoginImg,
} from "../cssJs/headerCss";
import ProfilePageRouter from "../router/ProfilePageRouter";
import {
  Footer,
  FooterLogo,
  FooterText1,
  FooterText2,
  FooterText3,
} from "../cssJs/footerCss";
import loadingImg from "../files/loading.gif";

const MainPage = (): JSX.Element => {
  const param = useParams();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const loading: LoadingType = useSelector(
    (state: IStoreState) => state.loadingState
  );

  const history = useHistory();

  useEffect(() => {
    console.log(param);
    if (param != null) {
      history.push({
        pathname: "/mainPage/home",
      });
    }
  }, []);

  useEffect(() => {
    console.log(loginUser);
  }, [loginUser]);

  const authState: LoginType = useSelector(
    (state: IStoreState) => state.authState
  );

  const toProfile = (url: string) => history.replace(url);

  const getProfile = () => {
    console.log(loginUser);
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
    <div>
      <LoadingBox>
        <div className={loading == LoadingType.OPEN ? "mask" : "noMask"}>
          <img src={`${loadingImg}`} />
        </div>
      </LoadingBox>
      <Header>
        <HeaderContainer>
          <HeaderTitle>ANIMEPARK</HeaderTitle>
          <HeaderContext>
            <p
              onClick={() => {
                toProfile("/mainPage/discovery");
              }}
            >
              Discovery
            </p>
            <p
              onClick={() => {
                toProfile("/mainPage/animeShowPage");
              }}
            >
              Anime
            </p>
            <p
              onClick={() => {
                toProfile("/mainPage/showcase/show");
              }}
            >
              Showcase
            </p>
            <p
              onClick={() => {
                toProfile("/mainPage/marketplace");
              }}
            >
              Marketplace
            </p>
            <p
              onClick={() => {
                toProfile("/mainPage/mall");
              }}
            >
              Mall
            </p>
            <p
              onClick={() => {
                toProfile("/mainPage/news");
              }}
            >
              News
            </p>
          </HeaderContext>
          {getProfile()}
        </HeaderContainer>
      </Header>
      <MainPageRouter />
      <ProfilePageRouter />
      <Footer>
        <HeaderContainer>
          <FooterLogo>©2021 AnimePark Limited Inc</FooterLogo>
          <FooterText1>First time visitors</FooterText1>
          <FooterText2>Help/FAQ</FooterText2>
          <FooterText3>About Us</FooterText3>
        </HeaderContainer>
      </Footer>
    </div>
  );
};

export default MainPage;
