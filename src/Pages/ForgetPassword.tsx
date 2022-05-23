import { Input } from "antd";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { userUpdatePassword } from "../api/userApi";
import AnimeButton from "../components/Button";
import { ContactUsDiv, InputDiv } from "../cssJs/contactUs";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../helperFns/popUpAlert";
import { LOADING_CLOSE, LOADING_OPEN } from "../redux/loading";
import { LoadingType } from "../types/EnumTypes";

interface Para {
  email: string;
}

const ForgetPassword = (): JSX.Element => {
  const para: Para = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const sendEmail = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const r = await userUpdatePassword(window.atob(para.email), password);
    if (r == "success") {
      openNotification(
        "update success",
        NotificationColor.Success,
        NotificationTitle.Success
      );
      history.push("/login");
    } else {
      openNotification(
        "update fail,please contact administer ",
        NotificationColor.Error,
        NotificationTitle.Error
      );
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  return (
    <ContactUsDiv>
      <h1>Reset Password</h1>
      <InputDiv>
        <h3>Account</h3>
        <Input value={window.atob(para.email)} disabled />
      </InputDiv>
      <InputDiv>
        <h3>New password</h3>
        <Input
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />
      </InputDiv>
      <InputDiv>
        <h3>Confirm password</h3>
        <Input
          value={confirmPassword}
          onChange={(e: any) => setConfirmPassword(e.target.value)}
        />
      </InputDiv>
      <AnimeButton
        para=""
        text={"Send"}
        width="120px"
        height="32px"
        textColor="white"
        backGroundColor="#FFC300"
        borderColor="#FFC300"
        buttonClick={() => sendEmail()}
      />
    </ContactUsDiv>
  );
};

export default ForgetPassword;
