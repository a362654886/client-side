import styled from "styled-components";

export const AnimOnePage = styled.div`
  height: auto;
`;

export const AnimOneHeader = styled.div`
  display: flex;
  height: 370px;
`;

export const AnimOneHeaderLeft = styled.div`
  width: 280px;
  display: inline;
  position: relative;
  img {
    height: 280px;
    width: 280px;
  }
  div {
    position: absolute;
    height: 77px;
    background-color: #302d46;
    width: 280px;
    top: 278px;
  }
  p {
    color: white;
    position: absolute;
    left: 35px;
    top: 330px;
  }
`;

export const AnimOneHeaderRight = styled.div`
  width: 520px;
  margin-left: 40px;
  display: inline;
`;

export const AnimOneHeaderLabel = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  h6 {
    color: #302d46;
    height: 24px;
    font-size: 16px !important;
    margin-right: 24px;
    font-weight: bold;
    line-height: 24px;
  }
  p {
    font-size: 16px;
    height: 100%;
    color: #4a4a4a;
    margin-bottom: 0;
    line-height: 24px;
    width: 520px;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
  }
`;

export const AnimOneWhereWatchLabel = styled.div`
  display: inline;
  h6 {
    color: #302d46;
    height: 24px;
    font-size: 16px !important;
    margin-right: 24px;
    font-weight: bold;
    line-height: 24px;
    margin-bottom: 16px;
  }
`;

export const AnimOneWhereWatchImg = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 16px;
`;

export const LikeButton = styled.div`
  margin-top: 33px;
  display: flex;
`;

export const VideoButton = styled.div`
  margin-top: 51px;
  margin-bottom: 32px;
  display: flex;
  h6 {
    color: #302d46;
    height: 32px;
    font-size: 16px;
    margin-right: 44px;
    font-weight: bold;
    line-height: 32px;
    margin-bottom: 0px;
  }
`;

export const OnePageStarDiv = styled.div`
  display: flex;
  height: 36px;
  background-color: #302d46;
  margin: 0 auto;
  width: 180px;
  position: absolute;
  padding-left: 34px;
  padding-top: 5px;
`;

// video

export const VideoDiv = styled.div`
  width: 840px;
  height: 428px;
  margin-bottom: 16px;
  background-color: #f6f6f6;
`;

export const VideoIframe = styled.iframe`
  width: 560px;
  height: 316px;
  margin: 24px 140px 24px 140px;
`;

export const VideoBottom = styled.div`
  display: flex;
`;

export const TimeText = styled.p`
  margin-left: 284px;
  color: #4a4a4a;
  font-family: "Arial MT";
  font-size: 14px;
  margin-right: 32px;
  line-height: 22px;
  margin-top: 9px;
`;

export const FromText = styled.p`
  color: #4a4a4a;
  font-family: "Arial MT";
  font-size: 14px;
  line-height: 22px;
  margin-top: 9px;
`;

export const VideoBottomImg = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 16px;
`;

export const UserNameText = styled.p`
  color: #4a4a4a;
  font-family: "Arial MT";
  font-size: 14px;
  line-height: 22px;
  margin-top: 9px;
  font-weight: bold;
  margin-left: 16px;
  margin-right: 32px;
`;
