import * as React from "react";
import { Route, Switch } from "react-router-dom";
import AdminAnimePage from "../Pages/AdminPage/AdminAnimePage";
import AdminAwesomeLevelPage from "../Pages/AdminPage/AdminAwesomeLevelPage";
import AdminContentManagementPage from "../Pages/AdminPage/AdminContentManagementPage";
import AdminDataPage from "../Pages/AdminPage/reportComponent/AdminDataHeader";
import AdminEmailPage from "../Pages/AdminPage/AdminEmailPage";
import AdminHomePage from "../Pages/AdminPage/AdminHomePage";
import AdminNewsPage from "../Pages/AdminPage/AdminNewsPage";
import AdminRedeemProductPage from "../Pages/AdminPage/AdminRedeemProductPage";
import ReportContext from "../Pages/AdminPage/reportComponent/ReportContext";
import AvatarSetting from "../Pages/AdminPage/sysSettingComponent/AvatarSetting";
import BlockSearch from "../Pages/AdminPage/reportComponent/BlockSearch";
import ReportSearch from "../Pages/AdminPage/reportComponent/ReportSearch";
import AdminTests from "../Pages/AdminPage/AdminTests";
import AdminNotificationEmail from "../Pages/AdminPage/AdminNotificationEmail";
import AdminAdminAuthorization from "../Pages/AdminPage/AdminAdminAuthorization";

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
        <Route component={BlockSearch} path="/adminManagement/Blocked" />
        <Route component={ReportSearch} path="/adminManagement/Reports" />
        <Route component={ReportContext} path="/adminManagement/BlockContext" />
        <Route
          component={AdminContentManagementPage}
          path="/adminManagement/Data"
        />
        <Route component={AdminEmailPage} path="/adminManagement/Mass Email" />
        <Route
          component={AdminNotificationEmail}
          path="/adminManagement/Notification Emailing"
        />
        <Route
          component={AdminAdminAuthorization}
          path="/adminManagement/Admin Authorization"
        />
        <Route component={AdminTests} path="/adminManagement/Tests" />
      </Switch>
    </>
  );
};

export default AdminPageRouter;
