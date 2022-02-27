import styled from "styled-components";
import { Checkbox, Space } from "antd";

//news
export const ReportDiv = styled.div`
  margin-top: 32px;
  max-width: 1121px;
  margin: auto;
  height: 880px;
  h1 {
    height: 52px;
    line-height: 52px;
    font-size: 36px;
  }
  button {
  }
`;

export const ReportUserDiv = styled.div`
  display: flex;
  width: 303px;
  height: 72px;
`;

const CheckboxGroup = Checkbox.Group;
export const CheckBoxDiv = styled(CheckboxGroup)`
  width: 100%;
  .ant-checkbox-group-item {
    display: flex;
    margin-right: 0;
    height: 48px;
    line-height: 32px;
    font-size: 16px;
  }
`;

export const ReportUserImg = styled.img`
  width: 40px;
  height: 40px;
  margin-top: 16px;
  border-radius: 50%;
`;
