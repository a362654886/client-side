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
import { LoginType } from "../../types/EnumTypes";
import LoadingDiv from "../../components/LoadingDiv";
import AlertBox, { ColorType } from "../../components/AlertBox";

const LoginPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [ifLoading, setLoading] = useState<boolean>(false);
  const [ifLoadingAlert, setLoadingAlert] = useState<boolean>(false);

  const toPage = (url: string) => history.replace(url);

  const login = async () => {
    setLoading(true);
    dispatch({
      payload: LoginType.LOADING,
      type: AUTH_LOADING,
    });
    const user = await userAuth(email, password);
    setLoadingAlert(false);
    if (user == null) {
      console.log("Asd")
      dispatch({
        payload: LoginType.FAIL,
        type: AUTH_FAIL,
      });
      setLoadingAlert(true);
      console.log(ifLoadingAlert)
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
    setLoading(false);
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

  const loadingShow = (): JSX.Element => {
    if (ifLoading) {
      return (
        <div style={{ position: "absolute", top: "130px", left: "60px" }}>
          <LoadingDiv height="200px" width="200px" />
        </div>
      );
    } else {
      return (
        <>
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
        </>
      );
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
      {loadingShow()}
    </LoginBox>
  );
};

export default LoginPage;
