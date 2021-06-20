import { Menu, Row } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import * as React from "react";
import { useHistory } from "react-router-dom";
import ManagementRouter from "../components/Router/ManagementRouter";
import { Header, MainBody, SideMenu } from "../cssJs/ManagementCss";
import { FooterDiv } from "../cssJs/mianPageCss";
import { TitleWhite } from "../cssJs/publicCss";

const AdminManagementPage = (): JSX.Element => {
  const history = useHistory();

  const toPage = (url: string): void => {
    history.replace({
      pathname: `/adminManagement/${url}`,
    });
  };

  return (
    <div className="backBody">
      <Header>
        <Row>
          <TitleWhite>Web Management</TitleWhite>
        </Row>
      </Header>
      <MainBody>
        <SideMenu>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <SubMenu key="sub1" title="Plate Management">
              <Menu.Item key="1" onClick={() => toPage("plateAdd")}>
                Plate Add
              </Menu.Item>
              <Menu.Item key="3" onClick={() => toPage("labelAdd")}>
                Label Add
              </Menu.Item>
              <Menu.Item key="2" onClick={() => toPage("plateManagement")}>
                Plates Management
              </Menu.Item>
            </SubMenu>
          </Menu>
        </SideMenu>
        <ManagementRouter />
      </MainBody>
      <FooterDiv style={{ textAlign: "center" }}>
        anime web ©2021 Created by XXX
      </FooterDiv>
    </div>
  );
};

export default AdminManagementPage;
