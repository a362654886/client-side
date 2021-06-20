import { Button } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { Label } from "../../types/Label";

const LightButton = styled(Button)`
  background-color: #a9e7f1;
  color: black;
  border-radius: 15px;
  margin:1rem;
  margin: ${props => props.property};
`;

const DarkButton = styled(Button)`
  background-color: #ee6fa9;
  color: white;
  border-radius: 15px;
  margin:1rem;
  margin: ${props => props.property};
`;

interface IProps {
  label: Label;
  onSave: (label: Label) => void;
  margin: string;
}

export const ChooseButton = ({ label, onSave, margin }: IProps): JSX.Element => {

  const onChoose = () => onSave(label);

  const getButton = () => {
    if (label.ifChoose) {
      return <DarkButton onClick={onChoose} property={margin}>{label.labelName}</DarkButton>;
    } else {
      return <LightButton onClick={onChoose} property={margin}>{label.labelName}</LightButton>;
    }
  };

  return getButton();
};
