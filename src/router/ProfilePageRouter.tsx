import * as React from "react";
import { Route, Switch } from "react-router-dom";
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
