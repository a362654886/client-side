import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import AnimeButton from "../../components/Button";
import {
  ShowCaseDiv,
  ShowCaseTitle,
  ShowCaseTitleDiv,
} from "../../cssJs/ShowCasePage/showCaseCss";
import ShowCaseRouter from "../../router/ShowCaseRouter";

const Showcase = (): JSX.Element => {
  const history = useHistory();

  const toPage = (url: string) => history.replace(url);

  return (
    <ShowCaseDiv>
      <ShowCaseRouter />
    </ShowCaseDiv>
  );
};

export default Showcase;
