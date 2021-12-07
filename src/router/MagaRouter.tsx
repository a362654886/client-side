import * as React from "react";
import { Route, Switch } from "react-router-dom";
import ShowcaseMangaOne from "../Pages/Showcase/ShowcaseMagaOne";

const MagaRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={ShowcaseMangaOne} path="/mainPage/showcase/show/Manga" />
      </Switch>
    </>
  );
};

export default MagaRouter;
