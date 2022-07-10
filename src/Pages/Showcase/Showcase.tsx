import * as React from "react";
import { Helmet } from "react-helmet";
import { ShowCaseDiv } from "../../cssJs/ShowCasePage/showCaseCss";
import ShowCaseRouter from "../../router/ShowCaseRouter";

const Showcase = (): JSX.Element => {
  return (
    <>
      <Helmet>
        <title>Showcase - Animepark.com</title>
        <meta
          name="keywords"
          content="anime pictures, anime images, amine collections, anime collectables, anime illustrations, anime drawings, manga, original manga, anime fans, anime community, anime social media, anime sharing resource"
        />
        <meta name="description" content="Animepark.com is a social community for connecting anime fans and sharing various anime information. Talk about animation works. Share shopping channels for anime products. Post personal anime collections. Trade second-hand anime items. Publish original fan artworks."></meta>
      </Helmet>
      <ShowCaseDiv>
        <ShowCaseRouter />
      </ShowCaseDiv>
    </>
  );
};

export default Showcase;
