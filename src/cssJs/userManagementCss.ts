import styled from "styled-components";
import Sider from "antd/lib/layout/Sider";
import { Button } from "antd";

export const UserManagementDiv = styled.div`
  height: auto;
  min-height: 1000px;
  width: 100%;
  margin: 10px auto;
  background-color: white;
  position: relative;
  display: flex;
`;

export const SideMenu = styled(Sider)`
  background-color: #ee6fa9;
  width: 300px;
  max-width: 300px;
  height: auto;
  min-height: 1000px;
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

//user info management

export const UserInfoDiv = styled.div`
  margin: 1rem auto;
`;

export const ButtonDelete = styled(Button)`
  background-color: #ee6fa9;
  height: 32px;
  width: 100px;
  border-radius: 20px 20px 20px 20px;
  padding: 0;
  line-height: 32px;
  margin: 0;
  color: white;
  position: absolute;
  right: 5px;
  bottom: 10px;
`;

//user label management

export const LabelButtonBody = styled.div`
  margin: 1rem;
  height: 300px;
  background-color: #fff5f6;
`;

export const LabelChooseBody = styled.div`
  margin: 1rem;
  display: flex;
`;

export const LabelMainBody = styled.div`
  margin: 1rem;
  display: inline;
  width: 100%;
`;

//all post
export const AllPost = styled.div`
  margin: 1rem;
  width: 100%;
  background-color: #f2f2f2;
  position: relative;
`;

export const OnePost = styled.div`
  border: 1px solid #ee6fa9;
  margin: 10px;
  padding: 10px 20px 10px 20px;
  h5 {
    width: 80%;
    color: #ee6fa9;
    border-bottom: 1px solid #ee6fa9;
  }
  position: relative;
`;

export const PostManagementAttribute = styled.div`
  display: flex;
  p {
    margin-right: 1rem;
  }
`;

export const PostManagementSubTitle = styled.p`
  font-size: 12px;
  font-style: italic;
  margin-top: 5px;
  a {
    border-bottom: 1px solid blue;
  }
`;

//post management

export const PostMessageManagement = styled.div`
  margin: 1rem;
  width: 100%;
  background-color: #f2f2f2;
  position: relative;
`;

export const PostMessage = styled.div`
  margin: 10px;
  border: 1px solid #d0d1d1;
  padding: 5px 10px 5px 10px;
  position: relative;
`;

export const PostMessageSubTitle = styled.div`
  font-size: 12px;
  font-style: italic;
  margin-top: 5px;
  a {
    border-bottom: 1px solid blue;
  }
`;

export const PostMessageBody = styled.div`
  margin-top: 10px;
  p {
    margin: 0;
  }
`;

//all merchandises

export const MerchandiseMessageManagement = styled.div`
  margin: 1rem;
  width: 100%;
  background-color: #f2f2f2;
  position: relative;
`;

export const OneMerchandise = styled.div`
  margin: 10px;
  border: 1px solid blue;
  position: relative;
  height: 110px;
`;

export const MerchandisePart = styled.div`
  display: flex;
  width: ${(props) => props.style?.width};
`;

export const OneMerchandiseTitle = styled.label`
  color: #ee6fa9;
  padding: 2px 5px 2px 15px;
`;

export const OneMerchandiseText = styled.p`
  padding: 2px 0 0 5px;
  margin: 0;
  height: 27px;
`;

export const IconButtonDelete = styled(Button)`
  font-size: 1px;
  background-color: #ee6fa9;
  margin: 2px;
  position: absolute;
  bottom: 5px;
  right: 5px;
`;

//video add

export const VideoAddDiv = styled.div`
  margin: 1rem auto;
`;