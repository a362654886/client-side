import styled from "styled-components";

export const MarketPlaceDiv = styled.div`
  max-width: 1140px;
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
  width: 100%;
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
  height: 54px;
  display: flex;
  margin-top: 32px;
  div {
    width: 126px;
    margin-right: 32px;
    display: flex;
    cursor: pointer;
  }
  p {
    font-size: 16px;
    line-height: 16px;
    line-height: 32px;
    font-weight: bold;
    margin-top: 0px;
  }
  img {
    width: 32px;
    height: 32px;
    margin-right: 4px;
  }
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
  margin: 0 auto;
  margin-top: 56px;
`;

export const MarketImgLimitDiv = styled.div`
  max-width: 610px;
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
  img {
    border-radius: 20px;
  }
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
    height: 32px;
    margin-top: 0px;
    word-break: break-all;
    overflow: hidden;
  }
`;

export const MarketSortByDiv = styled.div`
  width: 320px;
  height: 528px;
  border: 10px solid #a0a0a0;
  padding: 0px 16px;
  input {
    height: 40px;
    width: 200px;
  }
  p {
    height: 32px;
    margin-bottom: 0px;
  }
`;

export const MarketSortLocation = styled.h3`
  height: 40px;
  padding: 8px 0px;
  line-height: 32px;
  font-size: 16px;
  color: #302d46;
  margin-top: 40px;
  margin-bottom: 16px;
  font-weight: bold;
`;

export const MarketSortPrice = styled.h3`
  height: 40px;
  padding: 8px 0px;
  line-height: 32px;
  font-size: 16px;
  color: #302d46;
  margin-top: 32px;
  margin-bottom: 16px;
  font-weight: bold;
`;

export const MarketFilterDiv = styled.div`
  width: 320px;
  height: auto;
  border: 10px solid #a0a0a0;
`;

export const MarketOneHotDiv = styled.div`
  width: 320px;
  height: auto;
  border: 10px solid #a0a0a0;
`;

export const MarketFilterCloseImg = styled.img`
  float: right;
  height: 32px;
  weight: 24px;
  padding: 4px 8px;
  cursor: pointer;
`;

export const MarketSortByCloseImg = styled.img`
  float: right;
  height: 32px;
  weight: 24px;
  padding-top: 8px;
  cursor: pointer;
`;

export const MarketFilterLatest = styled.p`
  height: 48px;
  padding: 16px 8px;
  margin-top: 32px;
  margin-bottom: 0px;
  :hover {
    background-color: #ecf9fe;
  }
  img {
    float: right;
  }
`;

export const MarketFilterPriceLatest = styled.p`
  height: 48px;
  padding: 16px 8px;
  margin-bottom: 0px;
  :hover {
    background-color: #ecf9fe;
  }
  img {
    float: right;
  }
`;

export const MarketFilterPriceHighest = styled.p`
  height: 48px;
  padding: 16px 8px;
  margin-bottom: 0px;
  :hover {
    background-color: #ecf9fe;
  }
  img {
    float: right;
  }
`;

export const MarketTagDiv = styled.div`
  margin-top: 46px;
  p {
    margin-left: 49px;
    height: 32px;
    padding: 8px 0px;
    font-size: 16px;
    cursor: pointer;
  }
`;

export const StringBar = styled.div`
  margin-top: 8px;
  height: 48px;
  background-color: #aaffc9;
  display: flex;
  position: relative;
  cursor: pointer;
  p {
    padding: 8px 0px;
    padding-left: 16px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    font-family: "Arial MT";
    margin-top: 0px;
  }
`;

export const StringClear = styled.div`
  display: flex;
  float: right;
  position: absolute;
  right: 16px;
  img {
    height: 24px;
    weight: 24px;
    margin-bottom: 0px;
    margin-top: 8px;
  }
  p {
    margin-bottom: 0px;
    margin-top: 0px;
    padding: 4px;
  }
`;

export const MarketSortButton = styled.div`
  margin-top: 32px;
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
  border-radius: 50%;
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

export const MarketLocation = styled.div`
  height: 40px;
  margin-top: 8px;
  background-color: #fae7d5;
  p {
    padding-left: 8px;
    padding-top: 4px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 16px;
    height: 32px;
    line-height: 32px;
    font-family: "Arial MT";
  }
`;

export const MarketFollow = styled.div`
  margin-top: 8px;
  max-width: 380px;
  display: flex;
  height: 64px;
  div {
    width: 180px;
    margin-right: 20px;
    padding: 16px 0px;
    display: flex;
    cursor: pointer;
  }
  p {
    font-size: 16px;
    font-weight: bold;
    line-height: 32px;
    height: 32px;
    color: #302d46;
    margin-top: 0px;
  }
  img {
    height: 32px;
    width: 32px;
    margin-right: 12px;
  }
`;

export const MarketEditAndDeleteDiv = styled.div`
  display: flex;
  margin-top: 20px;
  margin-left: 0px;
  height: 64px;
  img {
    margin-top: 4px;
    height: 24px;
    width: 24px;
  }
  p {
    margin-left: 8px;
    margin-right: 32px;
    line-height: 32px;
    margin-bottom: 0px;
    margin-top: 0px;
  }
  div {
    padding-top: 16px;
    padding-bottom: 16px;
    display: flex;
    cursor: pointer;
  }
`;

export const MarketViewMore = styled.div`
  height: 32px;
  margin-top: 4px;
  margin-bottom: 8px;
  width: 200px;
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

export const WishBidsContext = styled.div`
  p {
    background-color: #c1eeff;
    margin-top: 16px;
    line-height: 48px;
    height: auto;
    font-size: 16px;
    padding-left: 28px;
    margin-bottom: 0px;
  }
`;

export const PriceInput = styled.div`
  height: 48px;
  margin: 0px auto;
  max-width: 366px;
  margin-bottom: 24px;
  input {
    height: 32px;
    width: 80px;
    margin-top: 16px;
    margin-left: 10px;
    margin-right: 4px;
  }
  button {
    margin-top: 16px;
    margin-left: 86px;
  }
  p {
    width: 24px;
  }
`;

export const MarketPriceDiv = styled.div`
  margin-top: 24px;
  width: 70%;
  margin: 0px auto;
`;

export const LoadingBidImg = styled.div`
  margin-top: 24px;
  padding: 28px 0px;
  width: 100%;
  text-align: center;
  img {
    height: 80px;
    weight: 80px;
  }
`;

export const MarketPriceContextDiv = styled.div`
  display: flex;
  margin: 0px auto;
  max-width: 517px;
  height: 72px;
`;

export const MarketPricePriceName = styled.div`
  color: #302d46;
  font-weight: bold;
  margin-left: 8px;
  font-size: 14px;
  margin-top: 8px;
`;

export const MarketPriceNum = styled.p`
  color: #302d46;
  margin-left: 32px;
  font-size: 14px;
  margin-top: 4px !important;
`;

export const MarketPriceImg = styled.img`
  height: 32px;
  weight: 32px;
  margin-right: 32px;
  margin-top: 4px;
`;

export const MarketPriceMoreDiv = styled.div`
  width: 70%;
  margin: 0px auto;
  display: flex;
  height: 32px;
  background-color: #e2f6fe;
  cursor: pointer;
  p {
    line-height: 32px;
    margin-top: 0px;
    margin-bottom: 0px;
    font-size: 16px;
  }
  img {
    height: 24px;
    weight: 24px;
    margin-top: 4px;
    margin-left: 8px;
    margin-right: 8px;
  }
`;

//tag

export const MarketTag = styled.span`
  span {
    margin-top: 8px;
    min-height: 40px;
    height: auto;
    margin-bottom: 8px;
    margin-right: 16px;
    display: "inline";
    width: 100%;
    background-color: #c1eeff;
    min-height: 40px;
    height: auto;
    width: auto;
    display: "inline";
    padding: 4px 8px;
    margin-bottom: 0px;
    line-height: 32px;
    font-size: 16px;
    font-family: "Arial MT";
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
