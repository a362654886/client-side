import { Button } from "antd";
import styled from "styled-components";
import { Input } from "antd";
import { Footer } from "antd/lib/layout/layout";
import { Link } from "react-router-dom";

export const HeaderRow1 = styled.div`
  display: flex;
  width: 100%;
`;

export const HeaderRow2 = styled.div`
  width: 100%;
`;

//menu
export const Menu = styled.div`
  width: 40%;
  display: flex;
`;

export const MenuButtons = styled.div`
  display: flex;
  width: 100%;
  margin-left: 20px;
`;

export const MenuButton = styled(Link)`
  height: 32px;
  width: 20%;
  padding: 0 5px 0 5px;
  background-color: #5c7ef9;
  border-radius: ${(props) => props.property};
  color: white;
  p {
    text-align: center;
    padding-top: 5px;
  }
`;

// search
export const SearchMenu = styled.div`
  width: 40%;
  display: flex;
  margin: 0 auto;
`;

export const SearchInput = styled(Input)`
  border-radius: 15px 0 0 15px;
  height: 32px;
  width: 70%;
  margin-left: 10%;
  //margin: 1rem;
`;

export const SearchButton = styled(Button)`
  height: 32px;
  width: 20%;
  margin-right: 5px;
  padding: 0 5px 0 5px;
  background-color: #5c7ef9;
  border-radius: 0 15px 15px 0;
  color: white;
`;

//profile
export const Profile = styled.div`
  flex-grow: 0.1;
  width: 20%;
  text-align: center;
`;

export const LoginButton = styled(Button)`
  height: 30px;
  width: 50%;
  margin-right: 5px;
  padding: 0 5px 0 5px;
  background-color: #5c7ef9;
  border-radius: 15px;
  color: white;
`;

export const ProfileDiv = styled.div`
  display: flex;
  margin-left: 2rem;
`;

//footer
export const FooterDiv = styled(Footer)`
  background-color: #ee6fa9;
`;
