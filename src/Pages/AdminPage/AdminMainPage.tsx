import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { LoadingBox } from "../../cssJs/headerCss";
import AdminPageRouter from "../../router/AdminPageRouter";
import { LoadingType } from "../../types/EnumTypes";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";
import loadingImg from "../../files/loading.gif";
import AdminPage from "./AdminPage";
import { LOGIN_USER_NONE } from "../../redux/loginUser";

const AdminMainPage = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const loading: LoadingType = useSelector(
    (state: IStoreState) => state.loadingState
  );

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(loginUser);
    if (loginUser == null) {
      //toPage("/adminPage");
    }
    if (loginUser && history.location.pathname == "/adminManagement") {
      toPage("/adminManagement/News");
    }
  }, [loginUser]);

  const [menuNum, setMenu] = useState<number>(0);

  useEffect(() => {
    //toPage("adminManagement/News")
  }, [menuNum]);

  const toPage = (url: string) => history.replace(url);
  const menu = [
    "News",
    "Anime",
    "Redeem Levels",
    "Custom Design",
    "Sys Setting",
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

  const logOut = () => {
    dispatch({
      payload: null,
      type: LOGIN_USER_NONE,
    });
  };

  return (
    <>
      {loginUser !== null ? (
        <>
          <LoadingBox>
            <div className={loading == LoadingType.OPEN ? "mask" : "noMask"}>
              <img src={`${loadingImg}`} />
            </div>
          </LoadingBox>
          <AdminPageDiv>
            <AdminLeftMenuDiv>
              <AdminLogoutDiv>
                <AdminText>{loginUser?.userEmail}</AdminText>
                <LogoutButton onClick={() => logOut()}>Log out</LogoutButton>
              </AdminLogoutDiv>
              <AdminMenuDiv>{getMenu()}</AdminMenuDiv>
            </AdminLeftMenuDiv>
            <AdminPageRouter />
          </AdminPageDiv>
        </>
      ) : (
        <AdminPage />
      )}
    </>
  );
};

export default AdminMainPage;
