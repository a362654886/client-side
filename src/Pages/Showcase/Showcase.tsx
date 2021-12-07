import * as React from "react";
import { useHistory } from "react-router-dom";
import {
  ShowCaseDiv,
} from "../../cssJs/ShowCasePage/showCaseCss";
import ShowCaseRouter from "../../router/ShowCaseRouter";

const Showcase = (): JSX.Element => {
  const history = useHistory();

  return (
    <ShowCaseDiv>
      <ShowCaseRouter />
    </ShowCaseDiv>
  );
};

export default Showcase;
