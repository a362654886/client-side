import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import * as React from "react";
import { useState } from "react";
import { emailPost } from "../api/emailAPI";
import AnimeButton from "../components/Button";
import { ContactUsDiv, InputDiv, TextAreaDiv } from "../cssJs/contactUs";
import { popUpAPIResult } from "../helperFns/popUpAlert";

const ErrorPage = (): JSX.Element => {
  return <ContactUsDiv>404 page</ContactUsDiv>;
};

export default ErrorPage;
