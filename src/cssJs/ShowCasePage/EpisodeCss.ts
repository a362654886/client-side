import { Drawer } from "antd";
import styled from "styled-components";

export const EpisodeDiv = styled.div`
  width: 1140px;
  margin: 24px auto;
`;

export const EpisodeTitle = styled.h1`
  height: 44px;
  font-size: 36px;
  font-weight: bold;
  font-family: Arial;
`;

export const EpisodeNumber = styled.div`
  display: flex;
  p {
    font-size: 14px;
    margin-left: 16px;
    line-height: 22px;
    margin-bottom: 0px;
  }
  h6 {
    line-height: 22px;
    margin-bottom: 0px;
  }
`;

export const EpisodeImage = styled.div`
  text-align: center;
  button {
    margin-top: 32px;
    color: black;
    border: 1px solid #302d46;
    border-radius: 4px;
    margin-bottom: 32px;
  }
`;

export const EpisodeImages = styled.div`
  margin-top: 32px;
  margin-bottom: 32px;
  width: 840px;
`;

//episode show

export const EpisodeShowPageDiv = styled.div`
  max-width: 840px;
  margin: 0 auto;
  overflow: scroll;
  img {
    margin-top: 8px;
  }
`;

export const EpisodeShowDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #302d46;
`;

export const EpisodeShowHeader = styled.div`
  width: 80%;
  height: 48px;
  margin-left: 10%;
  display: flex;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0) 0%,
    #959595 50%,
    rgba(0, 0, 0, 0) 100%
  );
  position: fixed;
`;

export const EpisodeShowFooter = styled.div`
  top: calc(100vh - 48px);
  width: 100%;
  height: 48px;
  display: flex;
  background: #959595 ;
  position: fixed;
  opacity: 0.7;
`;

export const EpisodeShowHeaderLeft = styled.p`
  line-height: 48px;
  color: white;
  text-align: center;
  margin-bottom: 0px;
  width: 33%;
  cursor: pointer;
`;

export const EpisodeShowHeaderMiddle = styled.p`
  line-height: 48px;
  color: white;
  text-align: center;
  margin-bottom: 0px;
  width: 33%;
  cursor: pointer;
`;

export const EpisodeShowHeaderRight = styled.p`
  line-height: 48px;
  color: white;
  text-align: right;
  margin-bottom: 0px;
  width: 33%;
  cursor: pointer;
`;

export const EpisodeShowFooterLeft = styled.p`
  line-height: 48px;
  color: black;
  text-align: right;
  margin-bottom: 0px;
  width: 25%;
  cursor: pointer;
`;

export const EpisodeShowFooterMiddle = styled.p`
  line-height: 48px;
  color: white;
  text-align: center;
  margin-bottom: 0px;
  width: 50%;
  cursor: pointer;
`;

export const EpisodeShowFooterRight = styled.p`
  line-height: 48px;
  color:black;
  text-align: left;
  margin-bottom: 0px;
  width: 25%;
  cursor: pointer;
`;

export const EpisodeDrawer = styled(Drawer)`
  .ant-drawer-wrapper-body,
  .ant-drawer-header {
    background-color: #302d46;
  }
  .ant-drawer-content-wrapper {
    width: 500px;
  }
`;

export const EpisodeChapter = styled.h3`
  color: white;
  line-height: 24px;
  margin-bottom: 24px;
  cursor: pointer;
`;

//modal

export const EpisodeModalDiv = styled.div`
  display: inline;
`;

export const EpisodeSelectDiv = styled.div`
  width: 128px;
`;

export const EpisodeButtonDiv = styled.div`
  height: 64px;
  padding-top: 16px;
  width: 100%;
  display: flex;
  button {
    border: 1px solid white;
    padding: 0px;
    margin-right: 32px;
  }
  img {
    height: 24px;
    width: 24px;
    margin-right: 8px;
  }
`;
