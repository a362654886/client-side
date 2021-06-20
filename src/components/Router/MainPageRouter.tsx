import * as React from "react";
import { Route, Switch } from "react-router-dom";
import ForumMainPage from "../../container/ForumMainPage";
import MerchandisePage from "../../container/MerchandisePage";
import UserManagementPage from "../../container/UserManagementPage";
import HomePage from "../HomePage/HomePage";


const MainPageRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={HomePage} path="/mainPage/home" />
        <Route component={MerchandisePage} path="/mainPage/merchandise" />
        <Route component={ForumMainPage} path="/mainPage/forumMain" />
        <Route component={UserManagementPage} path="/mainPage/userManagement"/>
      </Switch>
    </>
  );
};

export default MainPageRouter;
