import { Button, Input } from "antd";
import styled from "styled-components";

export const AdminPageDiv = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh);
  margin: 0 auto;
  display: flex;
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
