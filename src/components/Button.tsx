import * as React from "react";
import { InputBoxType } from "../types/EnumTypes";
import { DatePicker, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { SelectValue } from "antd/lib/select";
import styled from "styled-components";

const InputDiv = styled.div`
  display: flex;
  margin: 1rem auto;
  width: 100%;
`;

export const Label = styled.label`
  background-color: #ee6fa9;
  height: 32px;
  width: 150px;
  border-radius: 20px 0 0 20px;
  padding-left: 25px;
  line-height: 32px;
  margin: 0;
  color: white;
`;

const InputBody = styled(Input)`
  height: 32px;
  width: 80%;
  border-radius: 0 20px 20px 0;
`;

const SelectBody = styled(Select)`
  height: 32px;
  width: 80%;
`;

const DatePickerBody = styled(DatePicker)`
  height: 32px;
  width: 80%;
`;

const { Option } = Select;

interface IProps {
  para: string | number;
  text: string;
  width: string;
  height: string;
  textColor: string;
  backGroundColor: string;
  borderColor: string;
  buttonClick: (value: string | number | null) => void;
}

const AnimeButton = ({
  para,
  text,
  width,
  height,
  textColor,
  backGroundColor,
  borderColor,
  buttonClick,
}: IProps): JSX.Element => {
  const border = "1px solid " + borderColor;

  return (
    <button
      style={{
        width: width,
        height: height,
        color: textColor,
        backgroundColor: backGroundColor,
        borderRadius:"4px",
        border: border,
        fontWeight:"bold",
        fontSize:" 14px"
      }}
      onClick={() => buttonClick(para)}
    >
      {text}
    </button>
  );
};

export default AnimeButton;
