import * as React from "react";
import { ContactUsDiv, InputDiv, TextAreaDiv } from "../cssJs/contactUs";
import { ErrorImageDiv, ErrorPageDiv } from "../cssJs/errorPage";
import errorImg from "../files/LOGO404.png";

const ErrorPage = (): JSX.Element => {
  return (
    <ErrorPageDiv>
      <ErrorImageDiv>
        <img src={errorImg} />
      </ErrorImageDiv>
      <h6>
        The page you visited displays abnormally, which may be under
        maintenance. Please try again later.
      </h6>
      <h6>
        Please contact us if you have failed to access it for a long time.
      </h6>
    </ErrorPageDiv>
  );
};

export default ErrorPage;
