import styled from "styled-components";

export const AnimOnePage = styled.div`
  height: auto;
`;

export const AnimOneHeader = styled.div`
  display: flex;
  height: 432px;
  margin-bottom: 16px;
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
    height: 88px;
    background-color: #302d46;
    width: 280px;
  }
  p {
    color: white;
    position: absolute;
    left: 45px;
    top: 50px;
    line-height: 32px;
    font-family: "Arial MT";
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
  height: 48px;
  margin-top: 8px;
  margin-bottom: 8px;
  h6 {
    color: #302d46;
    height: 24px;
    font-size: 16px !important;
    margin-right: 24px;
    font-weight: bold;
    line-height: 32px;
  }
  p {
    font-size: 16px;
    height: 100%;
    color: #4a4a4a;
    margin-bottom: 0;
    line-height: 32px;
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
  cursor: pointer;
  margin-right: 16px;
`;

export const AnimOneIcons = styled.div`
  height: 24px;
  display: flex;
  margin-top: 24px;
  img {
    height: 32px;
    width: 32px;
    margin-right: 16px;
    cursor: pointer;
  }
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
  height: 88px;
  background-color: #302d46;
  margin: 0 auto;
  width: 180px;
  position: absolute;
  margin-top: 16px;
`;

export const OnePageStarChildDiv = styled.div`
  padding-left: 46px;
  margin-top: 8px;
  img {
    margin-top: 10px;
  }
`;

// video

export const VideoDiv = styled.div`
  width: 100%;
  height: 784px;
  margin-bottom: 24px;
  background-color: #f6f6f6;
  text-align: center;
`;

export const VideoIframe = styled.iframe`
  width: 100%;
  height: 600px;
  padding-top: 24px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const VideoIframeDiv = styled.div`
  width: 100%;
  height: 600px;
  padding-top: 24px;
  margin-left: 16px;
  margin-right: 16px;
`;

export const VideoBottom = styled.div`
  display: flex;
  width: 303px;
  margin: 8px auto;
  height: 72px;
`;

export const AvatarSettingImg = styled.img`
  height: 24px;
  width: 24px;
  margin-top: 24px;
  cursor: pointer;
`;

export const TimeText = styled.p`
  color: #4a4a4a;
  font-family: "Arial MT";
  font-size: 14px;
  line-height: 32px;
  width: 72px;
  margin: 0px auto;
  margin-top: 20px;
`;

export const FromText = styled.p`
  color: #4a4a4a;
  font-family: "Arial MT";
  font-size: 14px;
  line-height: 32px;
  width: 28px;
  margin-top: 20px;
  margin-left: 16px;
  margin-bottom: 0px;
`;

export const VideoBottomImg = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 16px;
  margin-top: 16px;
`;

export const UserNameText = styled.p`
  color: #4a4a4a;
  font-family: "Arial MT";
  font-size: 14px;
  line-height: 32px;
  margin-top: 20px;
  font-weight: bold;
  margin-left: 4px;
  width: 87px;
  text-align: left;
`;

export const DeleteDiv = styled.div`
  width: 79px;
  height: 64px;
  margin-bottom: 16px;
  margin-top: 16px;
  margin: 16px auto;
  display: flex;
  img {
    width: 24px;
    height: 24px;
    margin-top: 20px;
  }
  button {
    margin-top: 16px;
  }
`;
