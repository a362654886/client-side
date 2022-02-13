import { Button } from "antd";
import * as React from "react";
import styled from "styled-components";

interface IProps {
  para: string | number;
  text: string;
  width: string;
  height: string;
  textColor: string;
  backGroundColor: string;
  borderColor: string;
  buttonClick: (value: string | number | null) => void;
  padding?: string;
}

export const AnimeButton = ({
  para,
  text,
  width,
  height,
  textColor,
  backGroundColor,
  borderColor,
  buttonClick,
  padding,
}: IProps): JSX.Element => {
  const border = "1px solid " + borderColor;

  return (
    <Button
      style={{
        width: width,
        height: height,
        color: textColor,
        backgroundColor: backGroundColor,
        borderRadius: "4px",
        border: border,
        fontWeight: "bold",
        fontSize: " 16px",
        textAlign: "center",
        padding: padding,
      }}
      onClick={() => buttonClick(para)}
    >
      {text}
    </Button>
  );
};

export default AnimeButton;

export const MiddleDiv = styled.div`
  width: 120px;
  margin: 0 auto;
`;

export const MiddleBiggerDiv = styled.div`
  width: 200px;
  margin: 0 auto;
`;

export const MoreButtonDiv = styled.div`
  width: 100%;
  height: 64px;
  cursor: pointer;
  div {
    display: flex;
    margin: 0 auto;
    width: 120px;
    img {
      width: 32px;
      height: 32px;
      margin-top: 16px;
    }
    p {
      height: 32px;
      font-family: "Arial MT";
      margin-left: 8px;
      margin-top: 16px;
      line-height: 32px;
    }
  }
`;
