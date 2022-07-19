import { Input, notification } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userAuth } from "../../api/userApi";
import AnimeButton from "../../components/Button";
import {
  EmailInput,
  LoginBox,
  LoginClickButton,
  LogInHeaderImg,
  PasswordForget,
  SignUpButtons,
} from "../../cssJs/loginCss";
import { AUTH_FAIL, AUTH_LOADING, AUTH_SUCCESS } from "../../redux/auth";
import { LOGIN_USER_ADD } from "../../redux/loginUser";
import { LoadingType, LoginType } from "../../types/EnumTypes";
import AlertBox, { ColorType } from "../../components/AlertBox";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { PROFILE_USER_UPDATE } from "../../redux/profileUser";
import avatarUpload from "../../files/avatarUpload.png";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";

const LoginPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key == "Enter") {
        login();
      }
    });
  }, []);

  const toPage = (url: string) => history.push(url);

  const login = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    dispatch({
      payload: LoginType.LOADING,
      type: AUTH_LOADING,
    });
    const user = await userAuth(email, password, "general");
    if (user == null) {
      dispatch({
        payload: LoginType.FAIL,
        type: AUTH_FAIL,
      });
      openNotification(
        "Wrong Email or password",
        NotificationColor.Error,
        NotificationTitle.Error
      );
    } else {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("password", password);
      dispatch({
        payload: LoginType.SUCCESS,
        type: AUTH_SUCCESS,
      });
      dispatch({
        payload: user,
        type: PROFILE_USER_UPDATE,
      });
      dispatch({
        payload: user,
        type: LOGIN_USER_ADD,
      });
      const url = localStorage.getItem("url");
      url ? toPage(url) : toPage("/home");
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

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

  return (
    <LoginBox>
      <LogInHeaderImg>
        <img src={avatarUpload} />
      </LogInHeaderImg>
      <SignUpButtons>
        <AnimeButton
          para=""
          text="Sign Up"
          width="120px"
          height="32px"
          textColor="#4BA3C3"
          backGroundColor="white"
          borderColor="#4BA3C3"
          buttonClick={() => toPage("/signUpPage")}
        />
        <AnimeButton
          para=""
          text="Log in"
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="#AAFFC9"
          borderColor="white"
          buttonClick={() => toPage("/login")}
        />
      </SignUpButtons>
      <EmailInput>
        <h3>Account Email:</h3>
        <Input placeholder={"email"} onChange={onChange}></Input>
      </EmailInput>
      <EmailInput>
        <h3>Password:</h3>
        <Input.Password
          placeholder={"password"}
          onChange={onChange}
        ></Input.Password>
      </EmailInput>
      <PasswordForget onClick={() => toPage("/forgetPasswordPage")}>
        Forget Password?
      </PasswordForget>
      <LoginClickButton>
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
      </LoginClickButton>
    </LoginBox>
  );
};

export default LoginPage;
