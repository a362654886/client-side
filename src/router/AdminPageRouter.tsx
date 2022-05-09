import * as React from "react";
import { Route, Switch } from "react-router-dom";
import AdminAnimePage from "../Pages/AdminPage/AdminAnimePage";
import AdminAwesomeLevelPage from "../Pages/AdminPage/AdminAwesomeLevelPage";
import AdminContentManagementPage from "../Pages/AdminPage/AdminContentManagementPage";
import AdminDataPage from "../Pages/AdminPage/AdminDataPage";
import AdminEmailPage from "../Pages/AdminPage/AdminEmailPage";
import AdminHomePage from "../Pages/AdminPage/AdminHomePage";
import AdminNewsPage from "../Pages/AdminPage/AdminNewsPage";
import AdminRedeemProductPage from "../Pages/AdminPage/AdminRedeemProductPage";
import AvatarSetting from "../Pages/AdminPage/sysSettingComponent/AvatarSetting";

const AdminPageRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={AdminNewsPage} path="/adminManagement/News" />
        <Route component={AdminHomePage} path="/adminManagement/Home Page" />
        <Route
          component={AdminAnimePage}
          path="/adminManagement/Anime Library"
        />
        <Route
          component={AdminAnimePage}
          path="/adminManagement/Anime Library"
        />
        <Route
          component={AdminAwesomeLevelPage}
          path="/adminManagement/Awesome Levels"
        />
        <Route
          component={AdminRedeemProductPage}
          path="/adminManagement/Redeem Products"
        />
        <Route component={AvatarSetting} path="/adminManagement/Avatars" />
        <Route
          component={AdminContentManagementPage}
          path="/adminManagement/Content Management"
        />
        <Route component={AdminDataPage} path="/adminManagement/Data" />
        <Route component={AdminEmailPage} path="/adminManagement/Mass Email" />
      </Switch>
    </>
  );
};

export default AdminPageRouter;
