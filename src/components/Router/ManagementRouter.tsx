import * as React from "react";
import { Route, Switch } from "react-router-dom";
import LabelAdd from "../ProfileManagement/LabelAdd";
import PlateAdd from "../ProfileManagement/PlateAdd";
import PlateManagement from "../ProfileManagement/PlateManagement";
import PostManagement from "../ProfileManagement/PostManagement";

const ManagementRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={PlateAdd} path="/adminManagement/plateAdd" />
        <Route
          component={PlateManagement}
          path="/adminManagement/plateManagement"
        />
        <Route component={LabelAdd} path="/adminManagement/labelAdd" />
        <Route
          component={PostManagement}
          path="/adminManagement/postManagement"
        />
      </Switch>
    </>
  );
};

export default ManagementRouter;
