import { Button } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import { Label } from "../../types/Label";

const SquareButton = styled(Button)`
  background-color: #ee6fa9;
  color: white;
  margin: 1rem;
  margin: ${(props) => props.property};
`;

interface IProps {
  label: Label;
  onSave: (label: Label) => void;
  margin: string;
}

export const DisappearButton = ({
  label,
  onSave,
  margin,
}: IProps): JSX.Element => {
  const onChoose = () => onSave(label);

  return (
    <SquareButton onClick={onChoose} property={margin} icon={<CloseOutlined />}>
      {label.labelName}
    </SquareButton>
  );
};
