import * as React from "react";
import { ColorType } from "../../types/EnumTypes";
import styled from "styled-components";
import { FlexBody } from "../../cssJs/publicCss";

const MiddleBody = styled.div`
  width: 400px;
  height: 30px;
  color:white;
  padding-left:10px;
  padding-top:2px;
  background-color: ${props => props.color};
`;

const LineBody = styled.div`
  display: inline;
  height: 30px;
`;

const FirstUpperBody = styled.div`
  width: 0;
  height: 0;
  border: 7.5px solid transparent;
  border-top-color: ${props => props.color};
  border-right-color: ${props => props.color};
`;

const FirstLowerBody = styled.div`
  width: 0;
  height: 0;
  border: 7.5px solid transparent;
  border-bottom-color: ${props => props.color};
  border-right-color: ${props => props.color};
`;

const LastUpperBody = styled.div`
  width: 0;
  height: 0;
  border: 7.5px solid transparent;
  border-bottom-color: ${props => props.color};
  border-left-color: ${props => props.color};
`;

const LastLowerBody = styled.div`
  width: 0;
  height: 0;
  border: 7.5px solid transparent;
  border-top-color: ${props => props.color};
  border-left-color: ${props => props.color};
`;

export const getTriangleDiv = (
  color: ColorType,
  showFirstPart: boolean,
  text:string,
  margin: string
): JSX.Element => {
  const getFirstPart = (): JSX.Element => {
    if (showFirstPart) {
      return (
        <LineBody>
          <FirstUpperBody color={color} />
          <FirstLowerBody color={color} />
        </LineBody>
      );
    } else {
      return <></>;
    }
  };

  return (
    <FlexBody property={margin}>
      {getFirstPart()}
      <MiddleBody color={color}>{text}</MiddleBody>
      <LineBody>
        <LastUpperBody color={color} />
        <LastLowerBody color={color} />
      </LineBody>
    </FlexBody>
  );
};
