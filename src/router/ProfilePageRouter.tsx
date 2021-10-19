import * as React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUpPage from "../Pages/LoginPage/SignUpPage";
import ProfileLikesPage from "../Pages/ProfilePage/component/ProfileLikesPage";
import ProfileMallPage from "../Pages/ProfilePage/component/ProfileMallPage";
import ProfileMarketplacePage from "../Pages/ProfilePage/component/ProfileMarketplacePage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import ProfileShowcasePage from "../Pages/ProfilePage/component/ProfileShowcasePage";
import ProfileSettingPage from "../Pages/ProfilePage/ProfileSettingPage";
import ProfileMessagePage from "../Pages/ProfilePage/ProfileMessagePage";

const ProfilePageRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={ProfileMessagePage} path="/mainPage/ProfileMessage" />
        <Route component={ProfileSettingPage} path="/mainPage/ProfileSetting" />
      </Switch>
    </>
  );
};

export default ProfilePageRouter;
