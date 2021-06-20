import { Button } from "antd";
import Sider from "antd/lib/layout/Sider";
import { Container } from "react-bootstrap";
import styled from "styled-components";

export const Header = styled(Container)`
  background-color: #ee6fa9;
  margin: 0;
  height: 50px;
  max-width: 100%;
`;

export const MainBody = styled.div`
  display: flex;
  margin: 1rem;
  background: #f2f2f2;
  height: auto;
  min-height: 800px;
`;

export const SideMenu = styled(Sider)`
  background-color: #ee6fa9;
  width: 300px;
  max-width: 300px;
  .ant-menu {
    background-color: #ee6fa9;
    color: white;
  }
  .ant-menu-item,
  .ant-menu-submenu-title {
    color: white;
  }
  .ant-menu-item-selected {
    color: black;
  }
`;

export const RightBody = styled.div`
  display: flex;
  margin: 1rem;
`;

//PlateAdd

export const PlateAddDiv = styled.div`
  margin: 1rem auto;
`;

export const ImageShow = styled.img`
  height: 50px;
  width: 50px;
`;

export const IconDiv = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  label {
    background-color: #ee6fa9;
    height: 28px;
    width: 150px;
    text-align: center;
    padding-top: 1px;
    padding-left: 0px;
    color: white;
    border-radius: 15px 0 0 15px;
  }
  div {
    width: 80%;
  }
`;

//PlateManagement

export const PlateManagementDiv = styled.div`
  margin: 1rem;
  width: 100%;
`;

export const OnePlateDiv = styled.div`
  display: flex;
  width: 100%;
  border: 1px solid black;
  margin: 10px;
  position: relative;
`;

export const OnePlateText = styled.div`
  margin: 5px;
  p {
    margin-top: 20px;
    color: #ee6fa9;
  }
`;

export const OnePlateImg = styled.div`
  margin: 5px;
  width: 10%;
  text-align: center;
`;

export const PlateImg = styled.img`
  width: 50px;
  height: 50px;
`;

export const PlateManagementText = styled.p`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  color: #ee6fa9;
`;

export const ButtonDelete = styled(Button)`
  background-color: #ee6fa9;
  height: 25px;
  width: 100px;
  border-radius: 20px 20px 20px 20px;
  padding: 0;
  line-height: 25px;
  margin: 0;
  color: white;
  font-size: 12px;
  bottom: 5px;
  bottom: ${(props) => props.style?.bottom};
  right: ${(props) => props.style?.right};
  position: absolute;
`;

export const PostsManagement = styled.div`
  display: ${(props) => props.style?.display};
  border: 1px solid #ee6fa9;
  margin: auto 2rem;
`;

export const OnePostDiv = styled.div`
  display: flex;
  width: 90%;
  position: relative;
  border-bottom: 1px solid #ee6fa9;
  margin: 10px;
`;
