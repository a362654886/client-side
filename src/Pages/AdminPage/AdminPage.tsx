import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userAuth } from "../../api/userApi";
import AnimeButton from "../../components/Button";
import LoadingDiv from "../../components/LoadingDiv";
import {
  AdminLoginDiv,
  AdminPageDiv,
  AdminTitle,
  EmailInput,
  PasswordInput,
  SubmitButton,
} from "../../cssJs/AdminPage/adminCss";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import { ADMIN_LOGIN_USER_ADD } from "../../redux/adminLoginUser";
import { AUTH_LOADING } from "../../redux/auth";
import { LoginType } from "../../types/EnumTypes";

const AdminPage = (): JSX.Element => {
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

  const login = async () => {
    setLoading(true);
    dispatch({
      payload: LoginType.LOADING,
      type: AUTH_LOADING,
    });
    const user = await userAuth(email, password, "admin");
    if (user == null) {
      openNotification(
        "this user isn't administrator account",
        NotificationColor.Error,
        NotificationTitle.Error
      );
    } else {
      dispatch({
        payload: user,
        type: ADMIN_LOGIN_USER_ADD,
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
      <AdminLoginDiv>
        <AdminTitle>Animepark.com-Admin</AdminTitle>
        {loadingShow()}
      </AdminLoginDiv>
    </AdminPageDiv>
  );
};

export default AdminPage;
