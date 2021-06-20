import { Row, Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import * as React from "react";
import { useHistory } from "react-router-dom";
import UserManagementRouter from "../components/Router/UserManagementRouter";
import { SideMenu, UserManagementDiv } from "../cssJs/userManagementCss";

const UserManagementPage = (): JSX.Element => {
  const history = useHistory();

  const toPage = (url: string): void => {
    history.replace({
      pathname: `/mainPage/userManagement/${url}`,
    });
  };

  return (
    <>
      <UserManagementDiv>
        <SideMenu>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" title="Profile Management">
              <Menu.Item key="1" onClick={() => toPage("userInfoManagement")}>
                User Information
              </Menu.Item>
              <Menu.Item key="2" onClick={() => toPage("userLabelManagement")}>
                User Labels
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title="Posts">
              <Menu.Item key="3" onClick={() => toPage("userPostManagement")}>All Post</Menu.Item>
              <Menu.Item key="4" onClick={() => toPage("userPostMessageManagement")}>Post Messages</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title="Merchandises">
              <Menu.Item key="5" onClick={() => toPage("userMerchandiseManagement")}>All Merchandises</Menu.Item>
              <Menu.Item key="6" onClick={() => toPage("userMerchandiseMessageManagement")}>Merchandise Messages</Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" title="Video">
              <Menu.Item key="7">All Videos</Menu.Item>
              <Menu.Item key="8">Video Management</Menu.Item>
            </SubMenu>
          </Menu>
        </SideMenu>
        <UserManagementRouter />
      </UserManagementDiv>
    </>
  );
};

export default UserManagementPage;
