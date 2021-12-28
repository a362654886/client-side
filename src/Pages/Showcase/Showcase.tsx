import * as React from "react";
import {
  ShowCaseDiv,
} from "../../cssJs/ShowCasePage/showCaseCss";
import ShowCaseRouter from "../../router/ShowCaseRouter";

const Showcase = (): JSX.Element => {

  return (
    <ShowCaseDiv>
      <ShowCaseRouter />
    </ShowCaseDiv>
  );
};

export default Showcase;
