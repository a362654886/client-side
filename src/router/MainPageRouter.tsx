import * as React from "react";
import { Route, Switch, useParams } from "react-router-dom";
import AnimeOne from "../Pages/AnimePage/AnimeOne";
import AnimeOneSignalPage from "../Pages/AnimePage/AnimeOneSignalPage";
import AnimeShowPage from "../Pages/AnimePage/AnimeShowPage";
import ContactUs from "../Pages/ContactUs";
import Discovery from "../Pages/Discovery/Discovery";
import ErrorPage from "../Pages/ErrorPage";
import ForgetPassword from "../Pages/ForgetPassword";
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
        <Route component={HomePage} path="/home" />
        <Route component={LoginPage} path="/login" />
        <Route component={SignUpPage} path="/signUpPage" />
        <Route component={ForgetPage} path="/forgetPasswordPage" />
        <Route component={ProfilePage} path="/profilePage/:id" />
        <Route component={AnimeShowPage} path="/animelibrary" />
        <Route component={AnimeOne} path="/anime" />
        <Route component={AnimeOneSignalPage} path="/animeOneForum/:id" />
        <Route component={Discovery} path="/explore" />
        <Route component={Showcase} path="/showcase" />
        <Route component={Marketplace} path="/marketplace" />
        <Route component={Mall} path="/mall" />
        <Route component={NewsPage} path="/news" />
        <Route component={NewOnePage} path="/oneNew/:id" />
        <Route component={Report} path="/report" />
        <Route component={ContactUs} path="/contactUs" />
        <Route component={ForgetPassword} path="/forgetPassword/:email" />
        <Route component={ErrorPage} path="/" />
      </Switch>
    </>
  );
};

export default MainPageRouter;
