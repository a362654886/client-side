import * as React from "react";
import { useEffect, useState } from "react";

const HomePage = (): JSX.Element => {
  useEffect(() => {
    //
  }, []);

  return (
    <>
      <iframe
        src="https://www.youtube.com/embed/E7wJTI-1dvQ"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="video"
      />
    </>
  );
};

export default HomePage;
