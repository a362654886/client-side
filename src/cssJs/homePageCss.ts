import styled from "styled-components";

export const HomePageDiv = styled.div`
  width: 100%;
  height: 100%;
  background-color: #762324;
`;

export const HomePageBodyDiv = styled.div`
  max-width: 1170px;
  margin: 0 auto;
  padding-top: 19px;
`;

export const HomePageHeaderDiv = styled.div`
  display: flex;
`;

export const HomePageHeaderLeftDiv = styled.div`
  height: 470px;
  img {
    height: 470px;
    width: 100%;
  }
`;

export const HomePageHeaderRightDiv = styled.div`
  height: 470px;
  width: 100%;
  background-color: #302d46;
`;

//NEWS

export const HomePageNewDiv = styled.div`
  text-align: left;
  height: 182px;
  margin: 16px 18px 0px 12px;
  h2 {
    color: #f5a623;
    font-size: 24px;
    line-height: 32px;
    font-family: bold;
    font-family: Arial;
  }
  button {
    margin-top: 16px;
  }
`;

export const HomeNewsBodyDiv = styled.div`
  color: #ffffff;
  font-size: 14px;
  line-height: 22px;
  height: 22px;
  overflow: hidden;
`;

//ANIME

export const HomePageAnimeDiv = styled.div`
  margin-top: 40px;
  text-align: center;
  h1 {
    color: #f5a623;
    font-size: 36px;
    line-height: 44px;
    font-weight: bold;
    font-family: Arial;
  }
  h3 {
    color: #fae7d5;
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    font-family: Arial;
  }
`;
export const LoadingImgDiv = styled.div`
  text-align: center;
  margin-top: 10%;
  img {
    opacity: 0.5;
  }
`;
