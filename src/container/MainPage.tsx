import * as React from "react";
import { useEffect, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { LoginType } from "../types/EnumTypes";
import { IStoreState } from "../types/IStoreState";
import LoginModel from "../components/Login/LoginModel";
import {
  BackGroundBody,
  Header,
  LOGO,
  MainBody,
  TitleWhite,
} from "../cssJs/publicCss";
import logo from "../files/logo.png";
import MainPageRouter from "../components/Router/MainPageRouter";
import { useHistory } from "react-router-dom";
import {
  FooterDiv,
  HeaderRow1,
  HeaderRow2,
  LoginButton,
  Menu,
  MenuButton,
  MenuButtons,
  Profile,
  ProfileDiv,
  SearchButton,
  SearchInput,
  SearchMenu,
} from "../cssJs/mianPageCss";
import { User } from "../types/User";

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

  const authState: LoginType = useSelector(
    (state: IStoreState) => state.authState
  );

  const childrenRef: React.MutableRefObject<{ popUp: () => void }> =
    useRef() as React.MutableRefObject<{ popUp: () => void }>;

  const getLoginForm = () => {
    switch (authState) {
      case LoginType.SUCCESS:
        if (loginUser?.admin == true) {
          return (
            <ProfileDiv>
              <LoginButton
                onClick={() => toProfile("/mainPage/userManagement")}
              >
                Profile
              </LoginButton>
              <LoginButton onClick={() => toProfile("/adminManagement")}>
                Admin Profile
              </LoginButton>
            </ProfileDiv>
          );
        } else {
          return (
            <LoginButton onClick={() => toProfile("/mainPage/userManagement")}>
              Profile
            </LoginButton>
          );
        }
      case LoginType.LOADING:
        return <Spinner animation="border" variant="light" />;
      default:
        return (
          <>
            <LoginButton onClick={login}>Log In</LoginButton>
          </>
        );
    }
  };

  const login = () => childrenRef.current.popUp();

  const toProfile = (url: string) => history.replace(url);

  return (
    <div className="backBody">
      <Header>
        <LOGO>
          <img src={`https://animevideobucket.s3.amazonaws.com/onepiece.jpg`} />
        </LOGO>
        <div style={{ width: "100%" }}>
          <HeaderRow1>
            <Menu>
              <MenuButtons>
                <MenuButton to="/mainPage/home" property="16px 0 0 16px">
                  <p>Home</p>
                </MenuButton>
                <MenuButton to="/mainPage/merchandise">
                  <p>Videos</p>
                </MenuButton>
                <MenuButton to="/mainPage/merchandise/filterMerchandise">
                  <p>Market</p>
                </MenuButton>
                <MenuButton to="/mainPage/forumMain">
                  <p>Forum</p>
                </MenuButton>
                <MenuButton to="/mainPage/merchandise" property="0 16px 16px 0">
                  <p>Other2</p>
                </MenuButton>
              </MenuButtons>
            </Menu>
            <SearchMenu>
              <SearchInput placeholder="Search" />
              <SearchButton>Search</SearchButton>
            </SearchMenu>
            <Profile>{getLoginForm()}</Profile>
          </HeaderRow1>
          <HeaderRow2>
            <TitleWhite>Web Name or some introduction text</TitleWhite>
          </HeaderRow2>
        </div>
      </Header>
      <BackGroundBody>
        <MainBody>
          <MainPageRouter />
        </MainBody>
      </BackGroundBody>
      <video width="750" height="500" controls>
        <source src="https://dqw58loehfh4p.cloudfront.net/sss.mp4" type="video/mp4" />
      </video>
      <FooterDiv style={{ textAlign: "center" }}>
        anime web ©2021 Created by XXX
      </FooterDiv>
      <LoginModel childRef={childrenRef} />
    </div>
  );
};

export default MainPage;
