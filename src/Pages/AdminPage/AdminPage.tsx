import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Route } from "react-router-dom";
import { userAuth } from "../../api/userApi";
import AnimeButton from "../../components/Button";
import LoadingDiv from "../../components/LoadingDiv";
import {
  AdminLeftMenuDiv,
  AdminPageDiv,
  AdminTitle,
  EmailInput,
  PasswordInput,
  SubmitButton,
} from "../../cssJs/AdminPage/adminCss";
import { AUTH_FAIL, AUTH_LOADING, AUTH_SUCCESS } from "../../redux/auth";
import { LOGIN_USER_ADD } from "../../redux/loginUser";
import { LoginType } from "../../types/EnumTypes";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";
import AdminMainPage from "./AdminMainPage";

const AdminPage = (): JSX.Element => {

  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ifLoading, setLoading] = useState<boolean>(false);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "email":
        setUserEmail((e.target as HTMLInputElement).value);
        break;
      case "password":
        setPassword((e.target as HTMLInputElement).value);
        break;
    }
  };

  const toPage = (url: string) => history.replace(url);

  const login = async () => {
    setLoading(true);
    dispatch({
      payload: LoginType.LOADING,
      type: AUTH_LOADING,
    });
    const user = await userAuth(email, password);
    if (user == null) {
      dispatch({
        payload: LoginType.FAIL,
        type: AUTH_FAIL,
      });
    } else {
      dispatch({
        payload: LoginType.SUCCESS,
        type: AUTH_SUCCESS,
      });
      dispatch({
        payload: user,
        type: LOGIN_USER_ADD,
      });
    }
    setLoading(false);
  };

  const loadingShow = (): JSX.Element => {
    if (ifLoading) {
      return (
        <>
          <div style={{ marginLeft: "180px", marginTop: "30px" }}>
            <LoadingDiv height="180px" width="180px" />
          </div>
        </>
      );
    } else {
      return (
        <>
          <EmailInput placeholder={"email"} onChange={onChange}></EmailInput>
          <PasswordInput
            placeholder={"password"}
            onChange={onChange}
          ></PasswordInput>
          <SubmitButton>
            <AnimeButton
              para=""
              text="Log In"
              width="120px"
              height="32px"
              textColor="white"
              backGroundColor="#FFC300"
              borderColor="#FFC300"
              buttonClick={() => login()}
            />
          </SubmitButton>
        </>
      );
    }
  };

  return (
    <AdminPageDiv>
      <AdminLeftMenuDiv />
      <div style={{ display: "inline" }}>
        <AdminTitle>Animepark.com-Admin</AdminTitle>
        {loadingShow()}
      </div>
    </AdminPageDiv>
  );
};

export default AdminPage;
