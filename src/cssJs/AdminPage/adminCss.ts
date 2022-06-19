import { Button, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import styled from "styled-components";

export const AdminPageDiv = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh);
  margin: 0 auto;
  display: flex;
`;

export const AdminDateDiv = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh);
  margin: 0 auto;
  display: inline;
  padding: 8px 16px;
`;

export const AdminDateChildDiv = styled.div`
  display: flex;
  h6{
    font-weight:bold;
    font-size:16px;
    line-height:32px;
  }
`;

export const AdminLeftMenuDiv = styled.div`
  width: 273px;
  height: 834px;
  border: 1px solid black;
`;

export const AdminRightMenuDiv = styled.div`
  height: calc(100vh);
`;

export const AdminTitle = styled.h1`
  color: #302d46;
  font-weight: Bold;
  width: 100%;
  height: 52px;
  line-height: 52px;
  margin-bottom: 0px;
  font-size: 32px;
  text-align: center;
`;

export const AdminLoginDiv = styled.p`
  width: 395px;
  height: 268px;
  margin: auto;
`;

export const EmailInput = styled(Input)`
  width: 239px;
  margin-left: 78px;
  margin-right: 78px;
  margin-top: 32px;
`;

export const PasswordInput = styled(Input)`
  width: 239px;
  margin-left: 78px;
  margin-right: 78px;
  margin-top: 32px;
`;

export const SubmitButton = styled.div`
  width: 120px;
  margin-left: 138px;
  margin-right: 138px;
  margin-top: 32px;
`;

export const AdminEmailPageDiv = styled.div`
  width: 100%;
  height: calc(100vh);
  margin-left: 16px;
`;

export const AdminEmailPageHeader = styled.div`
  display: flex;
  h6 {
    height: 32px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 8px;
    margin-bottom: 0px;
    line-height: 32px;
  }
`;

export const AdminEmailPageReceiveAddress = styled.div`
  display: flex;
  margin-top: 16px;
  h6 {
    width: 143px;
    height: 32px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 8px;
    margin-bottom: 0px;
    line-height: 32px;
  }
  div {
    margin-top: 56px;
    display: inline;
    .ant-checkbox-wrapper {
      width: 100%;
      margin-left: 0px;
    }
  }
  p {
    height: 32px;
    font-size: 16px;
    margin-right: 8px;
    margin-bottom: 0px;
    line-height: 32px;
  }
  button {
    margin-left: 25px;
    margin-top: 8px;
  }
  .ant-input {
    margin-top: 24px;
    height: 272px;
  }
`;

export const AdminEmailPageReceiveContext = styled.div`
  display: inline;
  margin-top: 16px;
  h6 {
    width: 40px;
    height: 32px;
    font-size: 16px;
    font-weight: bold;
    margin-right: 8px;
    margin-bottom: 0px;
    line-height: 32px;
  }
  p {
    height: 32px;
    font-size: 16px;
    margin-right: 8px;
    margin-bottom: 0px;
    line-height: 32px;
  }
  button {
    margin-left: 25px;
    margin-top: 8px;
  }
`;

export const AdminEmailPageReceiveTitle = styled.div`
  margin-left: 25px;
  width: 80%;
  div {
    display: flex;
  }
`;

export const AdminEmailPageContext = styled(TextArea)`
  margin-left: 25px;
  margin-top: 25px;
`;

export const AdminEmailSubmitButton = styled.div`
  margin: 275px;
  margin-top: 25px;
`;
