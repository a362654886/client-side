import * as React from "react";
import { useHistory } from "react-router-dom";
import { popUpBlock } from "../components/conponentDivs/PopUpDiv";
import SideMenuDiv from "../components/Forum/SideMenuDiv";
import ForumRouter from "../components/Router/ForumRouter";
import {
  ForumDiv,
} from "../cssJs/forumCss";

export type LabelBlock = {
  plateName: string;
  labels: popUpBlock[];
};


const ForumMainPage = (): JSX.Element => {
  const history = useHistory();

  const toForum = (name: string) => {
    history.replace({
      pathname: `/mainPage/forumMain/forum/${name}`,
    });
  };
  return (
    <>
      <ForumDiv>
        <SideMenuDiv toPage={toForum}/>
        <ForumRouter />
      </ForumDiv>
    </>
  );
};

export default ForumMainPage;
