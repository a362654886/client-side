import * as React from "react";
import { Route, Switch } from "react-router-dom";
import AdminSysSetting from "../Pages/AdminPage/AdminSysSetting";
import AvatarSetting from "../Pages/AdminPage/sysSettingComponent/AvatarSetting";

const AdminSysSettingRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route
          component={AvatarSetting}
          path="/adminManagement/Sys Setting/avatar"
        />
      </Switch>
    </>
  );
};

export default AdminSysSettingRouter;
