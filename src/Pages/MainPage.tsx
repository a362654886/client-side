import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LoadingType, LoginType } from "../types/EnumTypes";
import { IStoreState } from "../types/IStoreState";
import avatar from "../files/avatar.png";
import titleTextWhite from "../files/titleTextWhite.png";
import MainPageRouter from "../router/MainPageRouter";
import { useHistory, useParams } from "react-router-dom";
import { User } from "../types/User";
import {
  AnimeParkImg,
  FootContainer,
  Header,
  HeaderContainer,
  HeaderContext,
  HeaderTitle,
  LoadingBox,
  LoginBox,
  LoginImg,
  MenuButton,
  ProfileDiv,
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
import { Button, Dropdown, Menu } from "antd";

const MainPage = (): JSX.Element => {
  const param = useParams();

  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const loading: LoadingType = useSelector(
    (state: IStoreState) => state.loadingState
  );

  const history = useHistory();

  const onResize = React.useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
  }, []);

  useEffect(() => {
    if (
      history.location.pathname == "/mainPage" ||
      history.location.pathname.indexOf("/mainPage") == -1
    ) {
      history.push({
        pathname: "/mainPage/home",
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (
      history.location.pathname == "/mainPage" ||
      history.location.pathname.indexOf("/mainPage") == -1
    ) {
      history.push({
        pathname: "/mainPage/home",
      });
    }
  }, []);

  useEffect(() => {
    //console.log(size.width);
  }, [size]);

  const authState: LoginType = useSelector(
    (state: IStoreState) => state.authState
  );

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

  const getMenu = () => {
    if (size.width > 1200) {
      return (
        <>
          <HeaderContext className="col-xl-6 col-lg-5">
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
          <ProfileDiv className="col-xl-2 col-lg-2">{getProfile()}</ProfileDiv>
        </>
      );
    } else {
      const menu = (
        <Menu>
          <Menu.Item>
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
          </Menu.Item>
        </Menu>
      );
      return (
        <>
          <ProfileDiv>
            {getProfile()}
            <Dropdown overlay={menu}>
              <MenuButton
                className="ant-dropdown-link"
                onClick={(e) => e.preventDefault()}
              >
                Menu
              </MenuButton>
            </Dropdown>
          </ProfileDiv>
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
        <HeaderContainer className="row">
          <HeaderTitle
            className="col-xl-3 col-lg-3 col-md-4 col-sm-5"
            placeholder={"searchValue"}
          >
            <AnimeParkImg src={titleTextWhite} />
          </HeaderTitle>
          {getMenu()}
        </HeaderContainer>
      </Header>
      <MainPageRouter />
      <ProfilePageRouter />
      <Footer>
        <FootContainer className="col-xl-12 col-lg-12 col-md-12 col-sm-12 row">
          <FooterLogo className="col-xl-6 col-lg-3 col-md-3 col-sm-3">
            ©2021 AnimePark Limited Inc
          </FooterLogo>
          <FooterText1 className="col-xl-2 col-lg-3 col-md-3 col-sm-3">
            First time visitors
          </FooterText1>
          <FooterText2 className="col-xl-2 col-lg-3 col-md-3 col-sm-3">
            Help/FAQ
          </FooterText2>
          <FooterText3 className="col-xl-2 col-lg-3 col-md-3 col-sm-3">
            About Us
          </FooterText3>
        </FootContainer>
      </Footer>
    </div>
  );
};

export default MainPage;
