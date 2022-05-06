import { Input } from "antd";
import * as React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import AnimeButton from "../components/Button";
import { ContactUsDiv, InputDiv } from "../cssJs/contactUs";

interface Para {
  email: string;
}

const ForgetPassword = (): JSX.Element => {
  const para: Para = useParams();

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const sendEmail = async () => {
    console.log(password);
    console.log(confirmPassword);
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
