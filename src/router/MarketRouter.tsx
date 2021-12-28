import * as React from "react";
import { Route, Switch } from "react-router-dom";
import MarketplaceCreate from "../Pages/Marketplace/MarketplaceCreate";
import MarketplaceShow from "../Pages/Marketplace/MarketplaceShow";
import MarketplaceShowOne from "../Pages/Marketplace/MarketplaceShowOne";

const MarketRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={MarketplaceShow} path="/mainPage/marketplace/show" />
        <Route
          component={MarketplaceCreate}
          path="/mainPage/marketplace/create"
        />
        <Route
          component={MarketplaceShowOne}
          path="/mainPage/marketplace/showOne"
        />
      </Switch>
    </>
  );
};

export default MarketRouter;
