import * as React from "react";
import { AnimOneIcons } from "../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import facebook from "../files/facebook.svg";
import insImage from "../files/insImage.svg";
import twitter from "../files/twitter.svg";
import copy from "../files/copy.svg";

interface IProps {
  marginTop: string;
}

const ShareDiv = ({ marginTop }: IProps): JSX.Element => {
  const shareToTwitter = (url: string, title: string) => {
    return window.open(
      "http://twitter.com/share?url=" +
        encodeURIComponent(url) +
        "&text=" +
        encodeURIComponent(title),
      "",
      "left=0,top=0,width=550,height=450,personalbar=0,toolbar=0,scrollbars=0,resizable=0"
    );
  };

  const shareToFaceBook = (url: string, title: string) => {
    return window.open(
      "http://www.facebook.com/sharer.php?u=" +
        encodeURIComponent(url) +
        "&t=" +
        encodeURIComponent(title),
      "_blank",
      "toolbar=yes, location=yes, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=no, copyhistory=yes, width=600, height=450,top=100,left=350"
    );
  };

  return (
    <>
      <AnimOneIcons style={{ marginTop: marginTop }}>
        <img
          onClick={() => {
            shareToFaceBook("https://anime.come", "share to twitter");
          }}
          src={`${facebook}`}
        />
        <img
          onClick={() => {
            console.log("insImage");
          }}
          src={`${insImage}`}
        />
        <img
          onClick={() => {
            shareToTwitter("https://anime.come", "share to twitter");
          }}
          src={`${twitter}`}
        />
        <img
          onClick={() => {
            console.log("copy");
          }}
          src={`${copy}`}
        />
      </AnimOneIcons>
    </>
  );
};

export default ShareDiv;
