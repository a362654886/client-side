import * as React from "react";
import { Route, Switch } from "react-router-dom";
import NewMerchandise from "../Merchandise/NewMerchandise";
import FilterMerchandise from "../Merchandise/FilterMerchandise";
import MerchandisePage from "../Merchandise/MerchandisePage";

const MerchandiseRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route
          component={NewMerchandise}
          path="/mainPage/merchandise/newMerchandise"
        />
        <Route
          component={FilterMerchandise}
          path="/mainPage/merchandise/filterMerchandise"
        />
        <Route
          component={MerchandisePage}
          path="/mainPage/merchandise/merchandisePage/:index"
        />
      </Switch>
    </>
  );
};

export default MerchandiseRouter;
