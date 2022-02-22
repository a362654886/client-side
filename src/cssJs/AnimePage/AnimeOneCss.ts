import { Button } from "antd";
import styled from "styled-components";

export const AnimOne = styled.div`
  margin-top: 32px;
  max-width: 1172px;
  height: auto;
  margin: auto;
  display: flex;
`;

export const AnimOneMain = styled.div`
  max-width: 896px;
  h1 {
    font-size: 36px;
    margin-top: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    margin-bottom: 0px;
    font-weight: bold;
    line-height: 52px;
  }
`;

export const AnimOneSide = styled.div`
  padding: 16px;
  h3 {
    height: 48px;
    line-height: 32px;
    font-size: 16px;
    font-weight: bold;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  p {
    height: 64px;
    margin-top: 8px;
    margin-bottom: 8px;
    color: #4a4a4a;
    font-size: 16px;
    font-family: "Arial MT";
    line-height: 32px;
    cursor: pointer;
  }
`;

export const AnimOneSideTwo = styled.div`
  background-color: #f6f6f6;
  padding: 23px 16px;
  margin: 23px 16px;
  p {
    margin-top: 16px;
    height: 24px;
    font-size: 16px;
    color: #4a4a4a;
  }
`;

export const AnimeButtonsDiv = styled.div`
  height: auto;
  padding-top: 16px;
  padding-bottom: 16px;
  button {
    margin-right: 32px;
  }
`;

export const AnimeMobileButtonsDiv = styled.div`
  display: flex;
  width: 280px;
  flex-flow: wrap;
  margin: 0 auto;
  button {
    margin-right: 16px;
    margin-bottom: 8px;
  }
`;

export const AnimeOneTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: #302d46;
  line-height: 24px;
`;

export const AnimeAddButtonDiv = styled.div`
  button {
    margin: 0 auto;
  }
  h6 {
    font-size: 16px;
    font-weight: bold;
    color: #302d46;
    line-height: 36px;
    margin-bottom: 0px;
    height: 36px;
    margin-right: 16px;
  }
`;

export const AnimeLikeButton = styled(Button)`
  height: 32px;
  width: 120px;
  display: flex;
  background-color: #892e2f;
  padding: 0px;
  :hover {
    background-color: #892e2f;
  }
  img {
    height: 24px;
    width: 24px;
    margin-top: 4px;
    margin-left: 18px;
    margin-right: 10px;
  }
  p {
    color: white;
    font-size: 16px;
    font-weight: bold;
  }
  :focus {
    background-color: #892e2f;
  }
`;

export const AnimeAddButtonLeftDiv = styled.div`
  button {
    text-align: left;
  }
  h6 {
    font-size: 16px;
    font-weight: bold;
    color: #302d46;
    line-height: 36px;
    margin-bottom: 0px;
    height: 36px;
    margin-right: 16px;
  }
`;

export const DiscoveryHead = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #302d46;
  line-height: 32px;
  margin-bottom: 0px;
  padding-top: 16px;
`;
