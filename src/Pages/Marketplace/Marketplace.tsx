import * as React from "react";
import { MarketPlaceDiv } from "../../cssJs/MarketPage/MarketPlaceCss";
import MarketRouter from "../../router/MarketRouter";

const Marketplace = (): JSX.Element => {
  return (
    <MarketPlaceDiv>
      <MarketRouter />
    </MarketPlaceDiv>
  );
};

export default Marketplace;
