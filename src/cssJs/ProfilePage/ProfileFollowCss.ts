import styled from "styled-components";

export const FollowButtonsDiv = styled.div`
  display: flex;
  height: 64px;
  padding-top: 8px;
  padding-bottom: 8px;
  width: 304px;
  margin: 0px auto;
  button {
    margin-top: 8px;
    margin-bottom: 8px;
    margin-right: 32px;
  }
`;

export const FollowElementDiv = styled.div`
  height: 176px;
  width: 320px;
  margin: 16px 8px;
  border: 1px solid #d8d8d8;
  padding: 16px 8px;
`;

export const FollowElementProfileDiv = styled.div`
  display: flex;
  cursor:pointer ;
  img {
    height: 80px;
    width: 80px;
    border-radius: 40px;
  }
`;

export const FollowElementProfileNameSetting = styled.div`
  display: flex !important;
  height: 48px;
  padding-top: 8px;
  padding-bottom: 8px;
  margin-top: 16px;
  p {
    font-size: 14px;
    line-height: 32px;
    height: 32px;
    font-weight: bold;
    margin-bottom: 0px;
    margin-right: 16px;
    margin-left: 16px;
  }
  img {
    height: 16px;
    width: 20px;
    border-radius: 0px;
  }
`;

export const FollowBottomDiv = styled.div`
  display: flex;
  height: 64px;
  width: 180px;
  padding: 16px 0px;
  img {
    width: 32px;
    height: 32px;
  }
  h6 {
    height: 32px;
    line-height: 32px;
    margin-left: 12px;
    font-weight: bold;
  }
  cursor: pointer;
`;
