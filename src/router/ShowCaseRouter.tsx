import * as React from "react";
import { Route, Switch } from "react-router-dom";
import EpisodeCreate from "../Pages/Showcase/EpisodeCreate";
import EpisodeEdit from "../Pages/Showcase/EpisodeEdit";
import ShowcaseCreate from "../Pages/Showcase/ShowcaseCreate";
import ShowcaseMangaOne from "../Pages/Showcase/ShowcaseMagaOne";
import ShowcaseShow from "../Pages/Showcase/ShowcaseShow";

const ShowCaseRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={ShowcaseCreate} path="/mainPage/showcase/create" />
        <Route component={ShowcaseShow} path="/mainPage/showcase/show" />
        <Route component={EpisodeCreate} path="/mainPage/showcase/episodeAdd" />
        <Route component={ShowcaseMangaOne} path="/mainPage/showcase/Manga" />
        <Route component={EpisodeEdit} path="/mainPage/showcase/episodeEdit" />
        
      </Switch>
    </>
  );
};

export default ShowCaseRouter;
