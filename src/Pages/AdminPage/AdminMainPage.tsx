import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  AdminLeftMenuDiv,
  AdminPageDiv,
  AdminText,
  LogoutButton,
} from "../../cssJs/AdminPage/adminCss";
import {
  AdminLogoutDiv,
  AdminMenuDiv,
  MenuButton,
  MenuChooseButton,
} from "../../cssJs/AdminPage/adminManagementCss";
import AdminPageRouter from "../../router/AdminPageRouter";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";

const AdminMainPage = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const history = useHistory();

  useEffect(() => {
    if (loginUser && history.location.pathname == "/adminManagement") {
      toPage("/adminManagement/News");
    }
  }, []);

  const [menuNum, setMenu] = useState<number>(0);

  useEffect(() => {
    //toPage("adminManagement/News")
  }, [menuNum]);

  const toPage = (url: string) => history.replace(url);
  const menu = ["News", "Anime", "Redeem Levels", "Custom Design"];

  const getMenu = () => {
    return menu.map((menuString: string, index: number) => {
      if (index == menuNum) {
        return (
          <div
            key={index}
            onClick={() => {
              toPage(menuString);
              setMenu(index);
            }}
          >
            <MenuChooseButton>{menuString}</MenuChooseButton>
          </div>
        );
      } else {
        return (
          <div
            key={index}
            onClick={() => {
              toPage(menuString);
              setMenu(index);
            }}
          >
            <MenuButton>{menuString}</MenuButton>
          </div>
        );
      }
    });
  };

  return (
    <AdminPageDiv>
      <AdminLeftMenuDiv>
        <AdminLogoutDiv>
          <AdminText>{loginUser?.userEmail}</AdminText>
          <LogoutButton>Log out</LogoutButton>
        </AdminLogoutDiv>
        <AdminMenuDiv>{getMenu()}</AdminMenuDiv>
      </AdminLeftMenuDiv>
      <AdminPageRouter />
    </AdminPageDiv>
  );
};

export default AdminMainPage;
