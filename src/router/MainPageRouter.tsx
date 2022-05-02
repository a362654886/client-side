import * as React from "react";
import { Route, Switch } from "react-router-dom";
import AnimeOne from "../Pages/AnimePage/AnimeOne";
import AnimeShowPage from "../Pages/AnimePage/AnimeShowPage";
import ContactUs from "../Pages/ContactUs";
import Discovery from "../Pages/Discovery/Discovery";
import HomePage from "../Pages/HomePage/HomePage";
import ForgetPage from "../Pages/LoginPage/forgotPage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpPage from "../Pages/LoginPage/SignUpPage";
import Mall from "../Pages/Mall/Mall";
import Marketplace from "../Pages/Marketplace/Marketplace";
import NewOnePage from "../Pages/NewsPage/NewOnePage";
import NewsPage from "../Pages/NewsPage/NewsPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import Report from "../Pages/Report";
import Showcase from "../Pages/Showcase/Showcase";

const MainPageRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/mainPage/home" />
        <Route component={LoginPage} path="/mainPage/login" />
        <Route component={SignUpPage} path="/mainPage/signUpPage" />
        <Route component={ForgetPage} path="/mainPage/forgetPasswordPage" />
        <Route component={ProfilePage} path="/mainPage/profilePage/:id" />
        <Route component={AnimeShowPage} path="/mainPage/animeShowPage" />
        <Route component={AnimeOne} path="/mainPage/oneAnime" />
        <Route component={Discovery} path="/mainPage/discovery" />
        <Route component={Showcase} path="/mainPage/showcase" />
        <Route component={Marketplace} path="/mainPage/marketplace" />
        <Route component={Mall} path="/mainPage/mall" />
        <Route component={NewsPage} path="/mainPage/news" />
        <Route component={NewOnePage} path="/mainPage/oneNew/:id" />
        <Route component={Report} path="/mainPage/report" />
        <Route component={ContactUs} path="/mainPage/contactUs" />
      </Switch>
    </>
  );
};

export default MainPageRouter;
