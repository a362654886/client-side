import styled from "styled-components";

export const Header = styled.div`
  height: 96px;
  width: 100%;
  background-color: #892e2f;
`;

export const HeaderContainer = styled.div`
  width: 1121px;
  display: flex;
  margin: auto;
`;

export const HeaderTitle = styled.p`
  font-size: 36px;
  font-family: "Baloo";
  line-height: 80px;
  color: white;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const HeaderContext = styled.div`
  margin-left: 40px;
  display: flex;
  height: 96px;
  p {
    line-height: 96px;
    margin-left: 32px;
    color: #fae7d5;
    font-size: 16px;
    font-family: "Arial";
    font-weight: bold;
    cursor:pointer;
  }
`;

export const LoginImg = styled.img`
  width: 40px;
  height: 40px;
  margin-left: 135px;
  margin-top: 28px;
`;

export const LoginBox = styled.div`
  height: 96px;
  display: flex;
  p {
    margin-left: 6px;
    line-height: 96px;
    color: #fae7d5;
    font-size: 16px;
    font-family: "Arial";
    font-weight: bold;
    cursor:pointer;
  }
`;
