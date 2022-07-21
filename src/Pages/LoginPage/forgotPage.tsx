import { Input } from "antd";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { emailPost } from "../../api/emailAPI";
import { userEmailGet } from "../../api/userApi";
import AnimeButton from "../../components/Button";
import {
  EmailInput,
  LoginBox,
  LogInHeaderImg,
  PasswordForgetGoBack,
  SignUpButtons,
} from "../../cssJs/loginCss";
import avatarUpload from "../../files/avatarUpload.png";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { LoadingType } from "../../types/EnumTypes";

const ForgetPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

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

  const checkEmailExist = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (email.trim() !== "") {
      const user = await userEmailGet(email);
      return user == null ? "this email don't exist" : true;
    } else {
      return "please input an email";
    }
  };

  const send = async () => {
    const r = await checkEmailExist();
    if (r !== true) {
      openNotification(
        r.toString(),
        NotificationColor.Error,
        NotificationTitle.Error
      );
    } else {
      await emailPost(window.btoa(email), "reset password", "Anime Park password assistance", "forget");
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
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
      <PasswordForgetGoBack onClick={() => toPage("/login")}>
        Go and try logging in again
      </PasswordForgetGoBack>
    </LoginBox>
  );
};

export default ForgetPage;
