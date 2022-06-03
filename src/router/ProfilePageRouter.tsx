import * as React from "react";
import { Route, Switch } from "react-router-dom";
import ProfileSettingPage from "../Pages/ProfilePage/ProfileSettingPage";
import ProfileMessagePage from "../Pages/ProfilePage/ProfileMessagePage";
import ProfileFollowPage from "../Pages/ProfilePage/profileFollowPage";
import ProfileLevelPage from "../Pages/ProfilePage/ProfileLevelPage";
import ProfileLoginPage from "../Pages/ProfilePage/ProfileLoginPage";

const ProfilePageRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={ProfileMessagePage} path="/ProfileMessage" />
        <Route component={ProfileSettingPage} path="/ProfileSetting" />
        <Route
          component={ProfileFollowPage}
          path="/profileFollow/:id"
        />
        <Route component={ProfileLevelPage} path="/profileLevel" />
        <Route component={ProfileLoginPage} path="/profileLoginUser/:id" />
      </Switch>
    </>
  );
};

export default ProfilePageRouter;
