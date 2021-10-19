import * as React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpPage from "../Pages/LoginPage/SignUpPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";

const MainPageRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/mainPage/home" />
        <Route component={LoginPage} path="/mainPage/login" />
        <Route component={SignUpPage} path="/mainPage/signUpPage" />
        <Route component={ProfilePage} path="/mainPage/profilePage" />
      </Switch>
    </>
  );
};

export default MainPageRouter;
