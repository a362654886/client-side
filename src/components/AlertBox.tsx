import { Alert } from "antd";
import * as React from "react";
import styled from "styled-components";
import { AlertDiv } from "../cssJs/loginCss";

export enum ColorType {
  ERROR = "#FFA69E",
  SUCCESS = "#AAFFC9",
  WARNING = "#FFDF00",
  INFO = "#C1EEFF",
}

interface IProps {
  color: ColorType;
  text: string;
  show: boolean;
}

const AlertBox = ({ color, text, show }: IProps): JSX.Element => {
  return (
    <AlertDiv color={color} style={{ display: show ? "inline" : "none" }}>
      <p>{text}</p>
    </AlertDiv>
  );
};

export default AlertBox;
