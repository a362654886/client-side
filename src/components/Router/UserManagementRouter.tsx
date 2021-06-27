import * as React from "react";
import { Route, Switch } from "react-router-dom";
import UserInfoManagement from "../UserManagement/UserInfoManagement";
import UserLabelManagement from "../UserManagement/UserLabelManagement";
import UserMerchandiseManagement from "../UserManagement/UserMerchandiseManagement";
import UserMerchandiseMessageManagement from "../UserManagement/UserMerchandiseMessageManagement";
import UserPostManagement from "../UserManagement/UserPostManagement";
import UserPostMessageManagement from "../UserManagement/UserPostMessageManagement";
import UserVideoUpload from "../UserManagement/UserVideoUpload";

const UserManagementRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route
          component={UserInfoManagement}
          path="/mainPage/userManagement/userInfoManagement"
        />
        <Route
          component={UserLabelManagement}
          path="/mainPage/userManagement/userLabelManagement"
        />
        <Route
          component={UserPostManagement}
          path="/mainPage/userManagement/userPostManagement"
        />
        <Route
          component={UserPostMessageManagement}
          path="/mainPage/userManagement/userPostMessageManagement"
        />
        <Route
          component={UserMerchandiseManagement}
          path="/mainPage/userManagement/userMerchandiseManagement"
        />
        <Route
          component={UserMerchandiseMessageManagement}
          path="/mainPage/userManagement/userMerchandiseMessageManagement"
        />
        <Route
          component={UserVideoUpload}
          path="/mainPage/userManagement/userVideoUpload"
        />
      </Switch>
    </>
  );
};

export default UserManagementRouter;
