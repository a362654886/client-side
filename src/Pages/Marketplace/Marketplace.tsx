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
        <meta name="description" content="Animepark.com is a social community for connecting anime fans and sharing various anime information. Talk about animation works. Share shopping channels for anime products. Post personal anime collections. Trade second-hand anime items. Publish original fan artworks."></meta>
      </Helmet>
      <MarketPlaceDiv>
        <MarketRouter />
      </MarketPlaceDiv>
    </>
  );
};

export default Marketplace;
