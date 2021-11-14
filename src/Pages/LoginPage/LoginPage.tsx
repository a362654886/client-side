import { Input } from "antd";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userAuth } from "../../api/userApi";
import AnimeButton from "../../components/Button";
import {
  EmailInput,
  LoginBox,
  LoginButton,
  LoginClickButton,
  LoginTitle,
  PasswordInput,
  SignUpButton,
} from "../../cssJs/loginCss";
import { AUTH_FAIL, AUTH_LOADING, AUTH_SUCCESS } from "../../redux/auth";
import { LOGIN_USER_ADD } from "../../redux/loginUser";
import { LoadingType, LoginType } from "../../types/EnumTypes";
import AlertBox, { ColorType } from "../../components/AlertBox";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";

const LoginPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ifLoadingAlert, setLoadingAlert] = useState<boolean>(false);

  const toPage = (url: string) => history.replace(url);

  const login = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    dispatch({
      payload: LoginType.LOADING,
      type: AUTH_LOADING,
    });
    const user = await userAuth(email, password);
    setLoadingAlert(false);
    if (user == null) {
      dispatch({
        payload: LoginType.FAIL,
        type: AUTH_FAIL,
      });
      setLoadingAlert(true);
    } else {
      dispatch({
        payload: LoginType.SUCCESS,
        type: AUTH_SUCCESS,
      });
      dispatch({
        payload: user,
        type: LOGIN_USER_ADD,
      });
      toPage("/mainPage/home");
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
      <LoginTitle>Welcome to ANIMEPARK</LoginTitle>
      <AlertBox
        text="wrong email or password"
        color={ColorType.ERROR}
        show={ifLoadingAlert}
      />
      <SignUpButton>
        <AnimeButton
          para=""
          text="Sign Up"
          width="120px"
          height="32px"
          textColor="#4BA3C3"
          backGroundColor="white"
          borderColor="#4BA3C3"
          buttonClick={() => toPage("/mainPage/signUpPage")}
        />
      </SignUpButton>
      <LoginButton>
        <AnimeButton
          para=""
          text="Log in"
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="#F6F6F6"
          borderColor="white"
          buttonClick={() => toPage("/mainPage/login")}
        />
      </LoginButton>
      <EmailInput>
        <p>Email:</p>
        <Input placeholder={"email"} onChange={onChange}></Input>
      </EmailInput>
      <PasswordInput>
        <p>Password:</p>
        <Input placeholder={"password"} onChange={onChange}></Input>
      </PasswordInput>
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
