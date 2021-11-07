import * as React from "react";
import { Route, Switch } from "react-router-dom";
import AdminAnimePage from "../Pages/AdminPage/AdminAnimePage";
import AdminCustomDesignPage from "../Pages/AdminPage/AdminCustomDesignPage";
import AdminNewsPage from "../Pages/AdminPage/AdminNewsPage";
import AdminRedeemLevelsPage from "../Pages/AdminPage/AdminRedeemLevelsPage";

const AdminPageRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={AdminNewsPage} path="/adminManagement/News" />
        <Route component={AdminAnimePage} path="/adminManagement/Anime" />
        <Route component={AdminRedeemLevelsPage} path="/adminManagement/Redeem Levels" />
        <Route component={AdminCustomDesignPage} path="/adminManagement/Custom Design" />
      </Switch>
    </>
  );
};

export default AdminPageRouter;
