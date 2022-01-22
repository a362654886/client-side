import { Button } from "antd";
import styled from "styled-components";

export const Header = styled.div`
  height: auto;
  width: 100%;
  background-color: #892e2f;
`;

export const HeaderContainer = styled.div`
  padding-left: 20px;
  display: flex;
  margin: auto;
`;

export const FootContainer = styled.div`
  padding-left: 20px;
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
  margin-bottom: 0px;
  p {
    margin-bottom: 0px;
  }
`;

export const HeaderContext = styled.div`
  display: flex;
  height: 96px;
  p {
    line-height: 96px;
    margin-right: 32px;
    color: #fae7d5;
    font-size: 16px;
    font-family: "Arial";
    font-weight: bold;
    cursor: pointer;
  }
`;

export const LoginImg = styled.img`
  width: 40px;
  height: 40px;
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
    cursor: pointer;
  }
`;

export const LoginOutImg = styled.img`
  width: 32px;
  height: 32px;
  margin-top: 30px;
  margin-left: 10px;
  cursor: pointer;
`;

export const LoginCountry = styled.div`
  margin-top: 33px;
  margin-left: 10px;
`;

export const LoadingBox = styled.div`
  .mask {
    background-color: #e5e7e9;
    opacity: 0.9;
    z-index: 1000;
    height: 100vw;
    position: fixed;
    width: 100vw;
    pointer-events: none;
    text-align: center;
    align-items: center;
  }
  .noMask {
    display: none;
  }
  img {
    margin-top: 10vw;
    opacity: 1;
  }
`;

export const ProfileDiv = styled.div`
  display: flex;
`;

export const MenuButton = styled(Button)`
  margin-top: 32px;
  margin-left: 50px;
  background-color: #892e2f;
  border: 1px solid #892e2f;
  color: white;
  font-size: 17px;
`;

export const AnimeParkImg = styled.img`
  width: 235.2px;
  height: 32px;
  color: white;
`;
