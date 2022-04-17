import * as React from "react";
import { Route, Switch } from "react-router-dom";
import EpisodeCreate from "../Pages/Showcase/EpisodeCreate";
import EpisodeEdit from "../Pages/Showcase/EpisodeEdit";
import ShowcaseCollectionOne from "../Pages/Showcase/ShowcaseCollectionOne";
import ShowcaseCreate from "../Pages/Showcase/ShowcaseCreate";
import ShowcaseMangaOne from "../Pages/Showcase/ShowcaseMagaOne";
import ShowcaseShowCollection from "../Pages/Showcase/ShowcaseShowCollection";
import ShowcaseShowIllustrations from "../Pages/Showcase/ShowcaseShowIllustrations";
import ShowcaseShowManga from "../Pages/Showcase/ShowcaseShowManga";
import ShowcaseShowTag from "../Pages/Showcase/ShowcaseShowTag";

const ShowCaseRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={ShowcaseCreate} path="/mainPage/showcase/create" />
        <Route
          component={ShowcaseShowCollection}
          path="/mainPage/showcase/showCollection"
        />
        <Route
          component={ShowcaseShowIllustrations}
          path="/mainPage/showcase/showIllustrations"
        />
        <Route
          component={ShowcaseShowManga}
          path="/mainPage/showcase/showManga"
        />
        <Route component={ShowcaseShowTag} path="/mainPage/showcase/showTag" />
        <Route component={EpisodeCreate} path="/mainPage/showcase/episodeAdd" />
        <Route
          component={ShowcaseMangaOne}
          path="/mainPage/showcase/Manga/:id"
        />
        <Route
          component={ShowcaseCollectionOne}
          path="/mainPage/showcase/showcaseCollectionOne/:id"
        />
        <Route component={EpisodeEdit} path="/mainPage/showcase/episodeEdit" />
      </Switch>
    </>
  );
};

export default ShowCaseRouter;
