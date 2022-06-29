import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AdminLeftMenuDiv, AdminPageDiv } from "../../cssJs/AdminPage/adminCss";
import {
  AdminLogoutDiv,
  AdminMainDiv,
  AdminMenuDiv,
  AdminText,
  LogoutButton,
  MenuButton,
  MenuChooseButton,
} from "../../cssJs/AdminPage/adminManagementCss";
import { LoadingBox } from "../../cssJs/headerCss";
import AdminPageRouter from "../../router/AdminPageRouter";
import { LoadingType } from "../../types/EnumTypes";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";
import loadingImg from "../../files/loading.gif";
import AdminPage from "./AdminPage";
import { LOGIN_USER_NONE } from "../../redux/loginUser";
import { ADMIN_LOGIN_USER_NONE } from "../../redux/adminLoginUser";

const AdminMainPage = (): JSX.Element => {
  const AdminLoginUser: User | null = useSelector(
    (state: IStoreState) => state.adminLoginUserState
  );

  const loading: LoadingType = useSelector(
    (state: IStoreState) => state.loadingState
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (AdminLoginUser == null) {
      //toPage("/adminPage");
    }
    if (AdminLoginUser && history.location.pathname == "/adminManagement") {
      toPage("/adminManagement/Home Page");
    }
  }, [AdminLoginUser]);

  const [menuNum, setMenu] = useState<number>(0);

  useEffect(() => {
    //toPage("adminManagement/News")
  }, [menuNum]);

  const toPage = (url: string) => history.push(url);
  const menu = [
    "Home Page",
    "News",
    "Anime Library",
    "Awesome Levels",
    "Redeem Products",
    "Avatars",
    "Blocked",
    "Data",
    "Mass Email",
  ];

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
            <MenuChooseButton>
              {menuString == "Blocked" ? "Content Management" : menuString}
            </MenuChooseButton>
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
            <MenuButton>
              {menuString == "Blocked" ? "Content Management" : menuString}
            </MenuButton>
          </div>
        );
      }
    });
  };

  const logOut = () => {
    dispatch({
      payload: null,
      type: ADMIN_LOGIN_USER_NONE,
    });
  };

  return (
    <AdminMainDiv>
      {AdminLoginUser !== null ? (
        <>
          <LoadingBox>
            <div className={loading == LoadingType.OPEN ? "mask" : "noMask"}>
              <img src={`${loadingImg}`} />
            </div>
          </LoadingBox>
          <AdminLogoutDiv>
            <AdminText>{AdminLoginUser?.userEmail}</AdminText>
            <LogoutButton onClick={() => logOut()}>Log out</LogoutButton>
          </AdminLogoutDiv>
          <AdminPageDiv>
            <AdminLeftMenuDiv>
              <AdminMenuDiv>{getMenu()}</AdminMenuDiv>
            </AdminLeftMenuDiv>
            <AdminPageRouter />
          </AdminPageDiv>
        </>
      ) : (
        <AdminPage />
      )}
    </AdminMainDiv>
  );
};

export default AdminMainPage;
