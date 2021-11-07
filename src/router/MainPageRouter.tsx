import * as React from "react";
import { Route, Switch } from "react-router-dom";
import AnimeOne from "../Pages/AnimePage/AnimeOne";
import AnimeOnePage from "../Pages/AnimePage/AnimeOne";
import AnimeShowPage from "../Pages/AnimePage/AnimeShowPage";
import Discovery from "../Pages/Discovery/Discovery";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpPage from "../Pages/LoginPage/SignUpPage";
import Mall from "../Pages/Mall/Mall";
import Marketplace from "../Pages/Marketplace/Marketplace";
import NewsPage from "../Pages/NewsPage/NewsPage";
import NewPage from "../Pages/NewsPage/NewsPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import Showcase from "../Pages/Showcase/Showcase";

const MainPageRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/mainPage/home" />
        <Route component={LoginPage} path="/mainPage/login" />
        <Route component={SignUpPage} path="/mainPage/signUpPage" />
        <Route component={ProfilePage} path="/mainPage/profilePage" />
        <Route component={AnimeShowPage} path="/mainPage/animeShowPage" />
        <Route component={AnimeOne} path="/mainPage/oneAnime" />
        <Route component={Discovery} path="/mainPage/discovery" />
        <Route component={Showcase} path="/mainPage/showcase" />
        <Route component={Marketplace} path="/mainPage/marketplace" />
        <Route component={Mall} path="/mainPage/mall" />
        <Route component={NewsPage} path="/mainPage/news" />
      </Switch>
    </>
  );
};

export default MainPageRouter;