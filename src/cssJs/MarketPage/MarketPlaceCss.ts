import styled from "styled-components";

export const MarketPlaceDiv = styled.div`
  width: 1140px;
  margin: 0 auto;
  display: flex;
  min-height: 1350px;
`;

export const MarketPlaceTitleDiv = styled.div`
  button {
    margin-top: 24px;
    height: 32px;
    margin-bottom: 32px;
  }
`;

export const MarketPlaceTitle = styled.h1`
  font-size: 36px;
  color: #302d46;
  font-weight: bold;
  line-height: 52px;
  margin-bottom: 0px;
  margin-top: 16px;
`;

export const MarketSearch = styled.div`
  img {
    height: 40px;
    width: 40px;
  }
  cursor: pointer;
`;

//market body

export const MarketSearchInputDiv = styled.div`
  display: flex;
  margin-bottom: 32px;
  input {
    height: 40px;
    width: 576px;
    font-size: 16px;
  }
  button {
    height: 40px;
    margin-left: 40px;
  }
`;

export const MarketBodyDiv = styled.div`
  height: auto;
  p {
    font-size: 16px;
    margin-bottom: 0px;
    color: #4a4a4a;
    line-height: 32px;
    margin-top: 16px;
  }
  h6 {
    height: 32px;
    font-size: 16px;
    margin-bottom: 0px;
    color: #4a4a4a;
    line-height: 32px;
  }
`;

export const MarketBorder = styled.div`
  height: 68px;
  width: 100%;
  background-color: #f6f6f6;
  margin-top: 32px;
`;

export const MarketUploadImage = styled.div`
  text-align: center;
  height: 320px;
  margin-left: 40px;
  button {
    margin-top: 16px;
    color: black;
    border: 1px solid #302d46;
    border-radius: 4px;
    margin-bottom: 32px;
  }
`;

export const MarketImgDiv = styled.div`
  position: relative;
  width: 610px;
  height: 650px;
  margin: 0 auto;
  margin-top: 56px;
`;

export const MarketImgLimitDiv = styled.div`
  width: 610px;
  margin: 0 auto;
  p {
    background-color: #c1eeff;
    margin-left: 40px;
    padding-left: 8px;
  }
`;

export const MarketInputDiv = styled.div`
  h6 {
    height: 32px;
    font-weight: bold;
  }
  p {
    margin-top: 0px;
  }

  input,
  .ant-input-number {
    height: 40px;
  }

  .ant-input-number {
    width: 320px;
  }

  textarea {
    margin-top: 8px;
  }
  margin-bottom: 8px;
`;

export const MarketLocationInputDiv = styled.div`
  h6 {
    height: 32px;
    font-weight: bold;
  }
  p {
    margin-top: 0px;
  }

  input {
    width: 320px;
  }
  margin-bottom: 8px;
`;

export const StateDiv = styled.div`
  margin-top: 8px;
  div {
    display: flex;
    img {
      width: 30px;
      height: 30px;
    }
    p {
      margin-left: 16px;
    }
  }
`;

export const PublishButtonsDiv = styled.div`
  height: 110px;
  margin-top: 24px;
  button {
    margin-top: 16px;
  }
`;

//market show

export const MarketShowBox = styled.div`
  margin-top: 31px;
  cursor: pointer;
`;

export const MarketBox = styled.div`
  width: 260px;
  height: 360px;
  margin-right: 19px;
  img {
    width: 260px;
    height: 260px;
  }
  h6 {
    height: 40px;
    line-height: 40px;
    color: #f5a623;
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 0px;
  }
  p {
    margin-bottom: 0px;
    font-size: 16px;
    line-height: 32px;
    margin-top: 0px;
    word-break: break-all;
  }
`;

//market show one

export const MarketShowOneTitle = styled.h2`
  line-height: 40px;
  font-weight: bold;
  font-size: 24px;
`;

export const MarketText = styled.p`
  text-align: center;
`;

export const MarketDiv = styled.div`
  display: flex;
`;

//market img

export const MarketItemImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const MarketItemName = styled.p`
  color: #302d46;
  font-weight: bold;
  margin-left: 8px;
  font-size: 14px;
`;

export const MarketItemTime = styled.p`
  color: #302d46;
  line-height: 40px;
  margin-left: 8px;
  font-size: 12px;
  color: #4a4a4a;
  margin-top: 0px;
`;

export const MarketBody = styled.div`
  margin-top: 36px;
  p {
    margin-top: 0px;
    height: 40px;
    line-height: 40px;
  }
`;

export const MarketDescription = styled.p`
  margin-top: 24px;
  height: auto;
`;

export const MarketSaveButton = styled.div`
  margin-top: 16px;
`;

export const WishBids = styled.h3`
  font-weight: bold;
  color: #302d46;
  margin-top: 36px;
  line-height: 32px;
  font-size: 16px;
`;

export const WishBidsContext = styled.p`
  background-color: #c1eeff;
  margin-top: 16px;
  line-height: 48px;
  height: 48px;
  padding-left: 28px;
`;

export const PriceInput = styled.div`
  display: flex;
  height: 48px;
  margin-bottom: 36px;
  input {
    height: 32px;
    width: 80px;
    margin-top: 16px;
    margin-left: 10px;
  }
  button {
    margin-top: 16px;
    margin-left: 86px;
  }
`;
