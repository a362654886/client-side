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

export const ShowCaseImgDiv = styled.img`
  width: 1200px;
  height: 500px;
  margin-top: 28px;
`;

export const LoadingImgDiv = styled.div`
  text-align: center;
  margin-top: 10%;
  img {
    opacity: 0.5;
  }
`;

export const MarketPlaceTitle = styled.div`
  display: flex;
  h2 {
    color: #f5a623;
    font-size: 23px;
    line-height: 40px;
    font-family: Arial;
    height: 40px;
    width: auto;
    margin-right: 16px;
    font-weight: bold;
  }
`;

export const MarketPlaceMore = styled.div`
  height: 32px;
  margin-top: 4px;
  margin-bottom: 8px;
  width: 160px;
  background-color: #fae7d5;
  display: flex;
  cursor: pointer;
  img {
    height: 24px;
    width: 24px;
    margin-right: 8px;
    margin-top: 4px;
    margin-left: 4px;
  }
  p {
    height: 32px;
    line-height: 32px;
    color: #302d46;
    font-weight: bold;
    margin-top: 0px;
    margin-bottom: 0px;
  }
`;

export const CustomerProductBottomImg = styled.img`
  width: 1200px;
  height: 500px;
  margin-bottom: 56px;
`;

export const ProductDealerDiv = styled.div`
  width: 247px;
  height: 494px;
  background-color: #302c44;
  padding: 8px 16px 0px 16px;
  h2 {
    font-weight: bold;
    font-size: 24px;
    color: #f5a623;
    line-height: 40px;
    height: 40px;
  }
  p {
    color: white;
    font-size: 16px;
    line-height: 32px;
  }
  button {
    border: 1px solid #4ba3c3;
    color: #4ba3c3;
    background-color: #302c44;
    margin-bottom: 20px;
  }
`;

export const ProductContextDiv = styled.div`
  margin-top: 40px;
  display: flex;
`;

export const MarketContextDiv = styled.div`
  margin-top: 40px;
  display: flex;
`;

export const MarketHomeBox = styled.div`
  width: 240px;
  height: 360px;
  margin-right: 60px;
  padding: 0px;
  img {
    width: 240px;
    height: 240px;
  }
  h6 {
    height: 40px;
    line-height: 40px;
    color: #f5a623;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 0px;
    background-color: white;
    padding-left: 8px;
  }
  p {
    margin-bottom: 0px;
    font-size: 16px;
    line-height: 32px;
    margin-top: 0px;
    word-break: break-all;
    background-color: white;
    padding-left: 8px;
  }
`;
