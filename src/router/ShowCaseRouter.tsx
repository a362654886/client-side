import * as React from "react";
import { Route, Switch } from "react-router-dom";
import EpisodeCreate from "../Pages/Showcase/EpisodeCreate";
import EpisodeEdit from "../Pages/Showcase/EpisodeEdit";
import ShowcaseCollectionOne from "../Pages/Showcase/ShowcaseCollectionOne";
import ShowcaseCreate from "../Pages/Showcase/ShowcaseCreate";
import ShowcaseMangaOne from "../Pages/Showcase/ShowcaseMagaOne";
import ShowcaseMangaUpdate from "../Pages/Showcase/ShowcaseMangaUpdate";
import ShowcaseShowCollection from "../Pages/Showcase/ShowcaseShowCollection";
import ShowcaseShowIllustrations from "../Pages/Showcase/ShowcaseShowIllustrations";
import ShowcaseShowManga from "../Pages/Showcase/ShowcaseShowManga";
import ShowcaseShowTag from "../Pages/Showcase/ShowcaseShowTag";

const ShowCaseRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={ShowcaseCreate} path="/showcase/create" />
        <Route
          component={ShowcaseShowCollection}
          path="/showcase/showCollection"
        />
        <Route
          component={ShowcaseShowIllustrations}
          path="/showcase/showIllustrations"
        />
        <Route component={ShowcaseShowManga} path="/showcase/showManga" />
        <Route component={ShowcaseShowTag} path="/showcase/showTag" />
        <Route component={EpisodeCreate} path="/showcase/episodeAdd" />
        <Route component={ShowcaseMangaOne} path="/showcase/Manga/:id" />
        <Route
          component={ShowcaseCollectionOne}
          path="/showcase/showcaseCollectionOne/:id"
        />
        <Route
          component={ShowcaseMangaUpdate}
          path="/showcase/mangaUpdate/:id"
        />
        <Route component={EpisodeEdit} path="/showcase/episodeEdit" />
      </Switch>
    </>
  );
};

export default ShowCaseRouter;
