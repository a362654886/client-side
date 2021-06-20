import * as React from "react";
import { Route, Switch } from "react-router-dom";
import ForumContext from "../Forum/ForumContext";
import ForumPost from "../Forum/ForumPost";
import NewPost from "../Forum/NewPost";


const ForumRouter = (): JSX.Element => {
  return (
    <>
      <Switch>
        <Route component={ForumContext} path="/mainPage/forumMain/forum/:name" />
        <Route component={ForumPost} path="/mainPage/forumMain/post/:index/:name" />
        <Route component={NewPost} path="/mainPage/forumMain/newPost/:post" />
      </Switch>
    </>
  );
};

export default ForumRouter;
