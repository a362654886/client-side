import { Input } from "antd";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import AnimeButton from "../../components/Button";
import {
  EmailInput,
  LoginBox,
  LoginClickButton,
  LogInHeaderImg,
  PasswordForgetGoBack,
  SignUpButtons,
} from "../../cssJs/loginCss";
import AlertBox, { ColorType } from "../../components/AlertBox";
import avatarUpload from "../../files/avatarUpload.png";

const ForgetPage = (): JSX.Element => {
  const history = useHistory();

  const [email, setUserEmail] = useState<string>("");

  const toPage = (url: string) => history.push(url);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "email":
        setUserEmail((e.target as HTMLInputElement).value);
        break;
    }
  };

  const send = () => {
    console.log("forget");
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
          buttonClick={() => toPage("/mainPage/signUpPage")}
        />
        <AnimeButton
          para=""
          text="Log in"
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="#AAFFC9"
          borderColor="white"
          buttonClick={() => toPage("/mainPage/login")}
        />
      </SignUpButtons>
      <EmailInput>
        <h3>Email Account:</h3>
        <Input placeholder={"email"} onChange={onChange}></Input>
      </EmailInput>
      <AnimeButton
        para=""
        text="Yes, reset my password!"
        width="100%"
        height="32px"
        textColor="white"
        backGroundColor="#FFC300"
        borderColor="#FFC300"
        buttonClick={() => send()}
      />
      <PasswordForgetGoBack onClick={() => toPage("/mainPage/login")}>
        Go and try logging in again
      </PasswordForgetGoBack>
    </LoginBox>
  );
};

export default ForgetPage;
