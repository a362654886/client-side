import * as React from "react";
import { Helmet } from "react-helmet";
import { MarketPlaceDiv } from "../../cssJs/MarketPage/MarketPlaceCss";
import MarketRouter from "../../router/MarketRouter";

const Marketplace = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Marketplace - Animepark.com</title>
        <meta
          name="keywords"
          content="anime products, anime toys, anime posters, second-hand toys, animation peripheral products, amine collections, anime collectables, marketplace, trade in"
        />
        <meta name="description" content="anime information collection"></meta>
      </Helmet>
      <MarketPlaceDiv>
        <MarketRouter />
      </MarketPlaceDiv>
    </>
  );
};

export default Marketplace;
