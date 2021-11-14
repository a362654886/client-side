import * as React from "react";
import { Route, Switch } from "react-router-dom";
import ShowcaseCreate from "../Pages/Showcase/ShowcaseCreate";
import ShowcaseShow from "../Pages/Showcase/ShowcaseShow";

const ShowCaseRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={ShowcaseCreate} path="/mainPage/showcase/create" />
        <Route component={ShowcaseShow} path="/mainPage/showcase/show" />
      </Switch>
    </>
  );
};

export default ShowCaseRouter;
