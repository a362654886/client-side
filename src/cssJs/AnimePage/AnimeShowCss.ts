import styled from "styled-components";

export const AnimMainBox = styled.div`
  margin-top: 32px;
  max-width: 1141px;
  margin: auto;
  padding-left: 20px;
`;

export const AnimTitle = styled.p`
  font-size: 36px;
  color: #302d46;
  font-weight: bold;
`;

export const AnimSearchBox = styled.div`
  display: flex;
  Input {
    width: 576px;
  }
`;

export const AnimeShowBox = styled.div`
  margin-top: 31px;
  cursor: pointer;
`;

export const AnimeBox = styled.div`
  width: 260px;
  height: 305px;
  margin-right: 19px;
  img {
    width: 260px;
    height: 260px;
  }
  h6 {
    height: 55px;
    padding: 8px 16px;
    background-color: #f6f6f6;
    color: #4a4a4a;
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 0px;
  }
`;

export const LikeDiv = styled.div`
  width: 260px;
  height: 80px;
  background-color: #302d46;
  margin-bottom: 40px;
  margin-right: 19px;
  text-align: center;
  padding-top: 8px;
  p {
    color: white;
    padding-bottom: 14px;
    margin-bottom: 0px;
    padding-top: 8px;
  }
`;

export const CenterDiv = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

export const StarDiv = styled.div`
  display: flex;
  height: 36px;
  background-color: #302d46;
  margin: 0 auto;
  width: 212px;
`;
