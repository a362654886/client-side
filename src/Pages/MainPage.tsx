import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoadingType, LoginType } from "../types/EnumTypes";
import { IStoreState } from "../types/IStoreState";
import avatar from "../files/avatar.png";
import titleTextWhite from "../files/titleTextWhite.png";
import MainPageRouter from "../router/MainPageRouter";
import { useHistory } from "react-router-dom";
import { User } from "../types/User";
import {
  AnimeParkImg,
  FootContainer,
  Header,
  HeaderContainer,
  HeaderContext,
  HeaderImg,
  HeaderMobileButtons,
  HeaderMobileHeader,
  HeaderMobileImg,
  HeaderSmallImg,
  HeaderTitle,
  LoadingBox,
  LoginBox,
  LoginCountry,
  LoginImg,
  LoginMobileCountry,
  LoginOutImg,
  MobileLoginBox,
  MobileLoginBoxDiv,
  MobileLoginOutImg,
  ProfileDiv,
} from "../cssJs/headerCss";
import ProfilePageRouter from "../router/ProfilePageRouter";
import {
  Footer,
  FooterLogo,
  FooterText1,
  FooterText2,
  FooterText3,
  FooterText4,
} from "../cssJs/footerCss";
import loadingImg from "../files/loading.gif";
import { Drawer, Dropdown, Menu, notification } from "antd";
import Flag from "react-flagkit";
import { flagGet } from "../helperFns/flag";
import logOut from "../files/logOut.png";
import ProfileWrapperDiv from "../components/ProfileWrapperDiv";
import { LOGIN_USER_ADD, LOGIN_USER_NONE } from "../redux/loginUser";
import LOGOMobile from "../files/LOGO-Mobile.svg";
import menuPng from "../files/menuPng.png";
import { userAuth } from "../api/userApi";
import { PROFILE_USER_UPDATE } from "../redux/profileUser";
import { CookieDiv } from "../cssJs/homePageCss";
import cookie from "react-cookies";

const MainPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });
  const [cookieValue, setCookieValue] = useState(true);

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const loading: LoadingType = useSelector(
    (state: IStoreState) => state.loadingState
  );

  const history = useHistory();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    const password = localStorage.getItem("password");
    if (
      userEmail !== null &&
      password !== null &&
      userEmail !== "null" &&
      password !== "null" &&
      loginUser == null
    ) {
      login(userEmail, password);
    }
  }, [loginUser]);

  useEffect(() => {
    console.log(mobileMenu);
  }, [mobileMenu]);

  const login = async (email: string, password: string) => {
    const user = await userAuth(email, password);
    dispatch({
      payload: user,
      type: PROFILE_USER_UPDATE,
    });
    dispatch({
      payload: user,
      type: LOGIN_USER_ADD,
    });
  };

  const onResize = React.useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
    localStorage.setItem(
      "animeWidth",
      document.documentElement.clientWidth.toString()
    );
  }, []);

  useEffect(() => {
    if (
      history.location.pathname == "/mainPage" ||
      history.location.pathname.indexOf("/mainPage") == -1
    ) {
      history.push({
        pathname: "/mainPage/home",
      });
    } else {
      console.log(history.location.pathname);
    }
    const cookieState = cookie.load("cookieAlert");
    if (cookieState && cookieState == "true") {
      setCookieValue(false);
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

  /*const authState: LoginType = useSelector(
    (state: IStoreState) => state.authState
  );*/

  const toProfile = (url: string) => history.push(url);

  const getProfile = () => {
    if (loginUser) {
      return (
        <>
          {size.width > 700 ? (
            <>
              <ProfileWrapperDiv
                userId={loginUser._id}
                element={
                  <>
                    <LoginImg
                      src={
                        loginUser && loginUser.avatarImage
                          ? loginUser.avatarImage[0].imageUrl
                          : avatar
                      }
                    />
                    <LoginBox
                      onClick={() =>
                        toProfile(`/mainPage/profilePage/${loginUser._id}`)
                      }
                    >
                      <p>{`${loginUser ? loginUser.firstName : ""}.${
                        loginUser
                          ? loginUser.lastName
                            ? loginUser.lastName.substring(0, 1).toUpperCase()
                            : ""
                          : ""
                      }`}</p>
                    </LoginBox>
                    <LoginCountry>
                      <Flag
                        country={flagGet(loginUser ? loginUser.country : "")}
                      />
                    </LoginCountry>
                  </>
                }
              ></ProfileWrapperDiv>
              <LoginOutImg
                src={logOut}
                onClick={() => {
                  localStorage.setItem("userEmail", "null");
                  localStorage.setItem("password", "null");
                  dispatch({
                    payload: null,
                    type: LOGIN_USER_NONE,
                  });
                }}
              />
            </>
          ) : (
            <MobileLoginBoxDiv>
              <ProfileWrapperDiv
                userId={loginUser._id}
                element={
                  <>
                    <HeaderImg
                      src={
                        loginUser && loginUser.avatarImage
                          ? loginUser.avatarImage[0].imageUrl
                          : avatar
                      }
                    />
                    <MobileLoginBox
                      onClick={() =>
                        toProfile(`/mainPage/profilePage/${loginUser._id}`)
                      }
                    >
                      <p>{`${loginUser.firstName.slice(
                        0,
                        12
                      )}.${loginUser.lastName
                        .substring(0, 1)
                        .toUpperCase()}`}</p>
                    </MobileLoginBox>
                    <LoginMobileCountry>
                      <Flag
                        country={flagGet(loginUser ? loginUser.country : "")}
                      />
                    </LoginMobileCountry>
                  </>
                }
              ></ProfileWrapperDiv>
              <MobileLoginOutImg
                src={logOut}
                onClick={() => {
                  localStorage.setItem("userEmail", "null");
                  localStorage.setItem("password", "null");
                  dispatch({
                    payload: null,
                    type: LOGIN_USER_NONE,
                  });
                }}
              />
            </MobileLoginBoxDiv>
          )}
        </>
      );
    } else {
      return (
        <>
          {size.width > 700 ? (
            <>
              <LoginImg src={avatar} />
              <LoginBox>
                <p
                  style={{ fontSize: size.width > 830 ? "16px" : "12px" }}
                  onClick={() => {
                    localStorage.setItem(
                      "url",
                      `${history.location.pathname}${history.location.search}`
                    );
                    toProfile("/mainPage/login");
                  }}
                >
                  Log In
                </p>
                <p>|</p>
                <p
                  style={{ fontSize: size.width > 830 ? "16px" : "12px" }}
                  onClick={() => toProfile("/mainPage/signUpPage")}
                >
                  Sign up
                </p>
              </LoginBox>
            </>
          ) : (
            <MobileLoginBoxDiv>
              <HeaderImg src={avatar} />
              <MobileLoginBox>
                <p
                  style={{ fontSize: size.width > 830 ? "16px" : "12px" }}
                  onClick={() => {
                    localStorage.setItem(
                      "url",
                      `${history.location.pathname}${history.location.search}`
                    );
                    toProfile("/mainPage/login");
                  }}
                >
                  Log In
                </p>
                <p>|</p>
                <p
                  style={{ fontSize: size.width > 830 ? "16px" : "12px" }}
                  onClick={() => toProfile("/mainPage/signUpPage")}
                >
                  Sign up
                </p>
              </MobileLoginBox>
            </MobileLoginBoxDiv>
          )}
        </>
      );
    }
  };

  return (
    <div
      onClick={() => {
        const alertShow = localStorage.getItem("alert");
        if (alertShow == "1") {
          notification.destroy();
          localStorage.setItem("alert", "0");
        }
      }}
    >
      <LoadingBox>
        <div className={loading == LoadingType.OPEN ? "mask" : "noMask"}>
          <img src={`${loadingImg}`} />
        </div>
      </LoadingBox>
      <Header>
        <HeaderContainer className="row">
          {size.width > 700 ? (
            <>
              {size.width > 1200 ? (
                <HeaderTitle
                  className="col-xl-3 col-lg-3 col-md-4 col-sm-5"
                  placeholder={"searchValue"}
                >
                  <AnimeParkImg
                    onClick={() => {
                      toProfile("/mainPage/home");
                    }}
                    src={titleTextWhite}
                  />
                </HeaderTitle>
              ) : (
                <HeaderSmallImg
                  onClick={() => {
                    toProfile("/mainPage/home");
                  }}
                  src={LOGOMobile}
                />
              )}
              <HeaderContext>
                <p
                  style={{ fontSize: size.width > 830 ? "16px" : "12px" }}
                  onClick={() => {
                    toProfile("/mainPage/discovery");
                  }}
                >
                  Explore
                </p>
                <p
                  style={{ fontSize: size.width > 830 ? "16px" : "12px" }}
                  onClick={() => {
                    toProfile("/mainPage/animeShowPage");
                  }}
                >
                  Anime
                </p>
                <p
                  style={{ fontSize: size.width > 830 ? "16px" : "12px" }}
                  onClick={() => {
                    toProfile("/mainPage/showcase/showCollection?page=1");
                  }}
                >
                  Showcase
                </p>
                <p
                  style={{ fontSize: size.width > 830 ? "16px" : "12px" }}
                  onClick={() => {
                    toProfile("/mainPage/marketplace/show/null");
                  }}
                >
                  Marketplace
                </p>
                <p
                  style={{ fontSize: size.width > 830 ? "16px" : "12px" }}
                  onClick={() => {
                    toProfile("/mainPage/mall");
                  }}
                >
                  Mall
                </p>
                <p
                  style={{ fontSize: size.width > 830 ? "16px" : "12px" }}
                  onClick={() => {
                    toProfile("/mainPage/news");
                  }}
                >
                  News
                </p>
              </HeaderContext>
              <ProfileDiv>{getProfile()}</ProfileDiv>
            </>
          ) : (
            <>
              <HeaderMobileHeader>
                <HeaderMobileImg src={LOGOMobile} />
                {getProfile()}
                <div
                  onClick={() => setMobileMenu(!mobileMenu)}
                  style={{ right: "20px", position: "absolute" }}
                >
                  <HeaderImg src={menuPng} />
                </div>
              </HeaderMobileHeader>
              {mobileMenu && (
                <HeaderMobileButtons>
                  <div>
                    <p
                      onClick={() => {
                        toProfile("/mainPage/discovery");
                      }}
                    >
                      Discovery
                    </p>
                    <p
                      onClick={() => {
                        toProfile("/mainPage/marketplace/show/null");
                      }}
                    >
                      Marketplace
                    </p>
                  </div>
                  <div>
                    <p
                      onClick={() => {
                        toProfile("/mainPage/animeShowPage");
                      }}
                    >
                      Anime
                    </p>
                    <p
                      onClick={() => {
                        toProfile("/mainPage/mall");
                      }}
                    >
                      Mall
                    </p>
                  </div>
                  <div>
                    <p
                      onClick={() => {
                        toProfile("/mainPage/showcase/showCollection?page=1");
                      }}
                    >
                      Showcase
                    </p>
                    <p
                      onClick={() => {
                        toProfile("/mainPage/news");
                      }}
                    >
                      News
                    </p>
                  </div>
                </HeaderMobileButtons>
              )}
            </>
          )}
        </HeaderContainer>
      </Header>
      <MainPageRouter />
      <ProfilePageRouter />
      <Footer>
        {size.width > 769 ? (
          <>
            <FootContainer className="col-xl-12 col-lg-12 col-md-12 col-sm-12 row">
              <FooterLogo className="col-xl-7 col-lg-2.4 col-md-2.4 col-sm-2.4">
                ©2021 AnimePark Limited Inc
              </FooterLogo>
              <FooterText1 className="col-xl-1.5 col-lg-2.4 col-md-2.4 col-sm-2.4">
                About Us
              </FooterText1>
              <FooterText2 className="col-xl-1.5 col-lg-2.4 col-md-2.4 col-sm-2.4">
                First time visitors
              </FooterText2>
              <FooterText3 className="col-xl-1.5 col-lg-2.4 col-md-2.4 col-sm-2.4">
                Help/FAQ
              </FooterText3>
              <FooterText4
                className="col-xl-1.5 col-lg-2.4 col-md-2.4 col-sm-2.4"
                onClick={() => {
                  toProfile("/mainPage/contactUs");
                }}
              >
                Contact us
              </FooterText4>
            </FootContainer>
          </>
        ) : (
          <div style={{ display: "inline", marginLeft: "10px" }}>
            <FooterText1 className="col-xl-1.5 col-lg-2.4 col-md-2.4 col-sm-2.4">
              About Us
            </FooterText1>
            <FooterText2 className="col-xl-1.5 col-lg-2.4 col-md-2.4 col-sm-2.4">
              First time visitors
            </FooterText2>
            <FooterText3 className="col-xl-1.5 col-lg-2.4 col-md-2.4 col-sm-2.4">
              Help/FAQ
            </FooterText3>
            <FooterText4
              className="col-xl-1.5 col-lg-2.4 col-md-2.4 col-sm-2.4"
              onClick={() => {
                toProfile("/mainPage/contactUs");
              }}
            >
              Contact us
            </FooterText4>
          </div>
        )}
      </Footer>
      <CookieDiv
        placement="bottom"
        onClose={() => {
          setCookieValue(false);
          cookie.save("cookieAlert", "true", { path: "/" });
        }}
        visible={cookieValue}
        height={132}
      >
        <p>
          We and <a style={{ color: "blue" }}>our partners</a> use cookies to
          personalize your experience, to navigate between pages efficiently,
          and for measurement and analytics purposes. By using our website and
          services, you agree to our use of cookies as described in our{" "}
          <a style={{ color: "blue" }}>Cookie Policy</a>.
        </p>
      </CookieDiv>
    </div>
  );
};

export default MainPage;
