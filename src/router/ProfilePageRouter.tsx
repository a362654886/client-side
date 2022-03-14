import * as React from "react";
import { Route, Switch } from "react-router-dom";
import ProfileSettingPage from "../Pages/ProfilePage/ProfileSettingPage";
import ProfileMessagePage from "../Pages/ProfilePage/ProfileMessagePage";
import ProfileFollowPage from "../Pages/ProfilePage/profileFollowPage";

const ProfilePageRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={ProfileMessagePage} path="/mainPage/ProfileMessage" />
        <Route component={ProfileSettingPage} path="/mainPage/ProfileSetting" />
        <Route
          component={ProfileFollowPage}
          path="/mainPage/profileFollow/:id"
        />
      </Switch>
    </>
  );
};

export default ProfilePageRouter;
