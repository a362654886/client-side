import * as React from "react";
import { Route, Switch } from "react-router-dom";
import MallCustom from "../Pages/Mall/MallCustom";
import MallRedeem from "../Pages/Mall/MallRedeem";

const MallRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        {/*
          <Route component={ShowcaseCreate} path="/mall/create" />
        */}
        <Route component={MallCustom} path="/mall/custom" />
        <Route component={MallRedeem} path="/mall/redeem" />
      </Switch>
    </>
  );
};

export default MallRouter;
