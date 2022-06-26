import { Button } from "antd";
import styled from "styled-components";

export const AdminMainDiv = styled.div`
  margin: auto 120px;
`;

export const AdminLogoutDiv = styled.div`
  height: 118px;
  width: 100%;
  background-color: #e2f6fe;
  min-width: 1041px;
`;

export const AdminMenuDiv = styled.div`
  margin-top: 3px;
  margin-left: 10px;
  height: 138px;
  width: 273px;
`;

export const MenuButton = styled.div`
  color: #302d46;
  font-weight: bold;
  margin-top: 24px;
  cursor: pointer;
`;

export const MenuChooseButton = styled.div`
  color: #4a4a4a;
  margin-top: 24px;
  cursor: pointer;
`;

export const AdminText = styled.p`
  width: 168px;
  height: 54px;
  color: #4a4a4a;
  padding-top: 22px;
  padding-left: 30px;
  margin-bottom: 0px;
`;

export const LogoutButton = styled(Button)`
  width: 120px;
  height: 32px;
  margin-left: 54px;
  margin-top: 19px;
  font-weight: bold;
`;

//admin home page

export const AdminHomePageDiv = styled.div`
  display: inline;
  margin: 8px 16px;
`;

export const AdminHomePageButtonsDiv = styled.div`
  display: flex;
  margin-bottom: 32px;
  button {
    margin-right: 32px;
  }
`;

export const HeadlineInput = styled.div`
  margin-bottom: 28px;
  h6 {
    text-align: left;
    width: 100%;
    color: #302d46;
    font-size: 16px;
    font-weight: bold;
    margin-top: 16px;
    margin-bottom: 16px;
    padding-top: 8px;
    padding-bottom: 8px;
    height: 48px;
  }
  input {
    width: 90%;
  }
`;

export const AdminBlockEle = styled.div`
  margin-left: 16px;
  width: 100%;
  border-bottom: 1px solid black;
`;

export const AdminBlockEleId = styled.div`
  p {
    color: #bbbbbb;
    font-size: 14px;
  }
`;

export const AdminBlockChildEle = styled.div`
  display: flex;
  img {
    height: 38px;
    weight: 38px;
    border-radius: 50%;
  }
  h6 {
    margin-left: 8px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    font-weight: bold;
  }
  button {
    margin-left: 100px;
  }
`;

export const AdminBlockEleReason = styled.div`
  p {
    font-size: 14px;
    font-weight: bold;
  }
`;

export const AdminBlockTime = styled.div`
  p {
    font-size: 14px;
  }
`;

export const AdminBlockAllBlock = styled.h6`
  margin: 43px 16px;
  font-weight: bold;
`;
