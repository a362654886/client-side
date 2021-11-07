import * as React from "react";
import styled from "styled-components";
import loading from "../files/loading.gif";

interface IProps {
  width: string;
  height: string;
}

const LoadingDiv = ({ width, height }: IProps): JSX.Element => {
  return (
    <img
      style={{
        width: width,
        height: height,
        border: "10px solid #C0C0C0",
      }}
      src={`${loading}`}
    />
  );
};

export default LoadingDiv;
