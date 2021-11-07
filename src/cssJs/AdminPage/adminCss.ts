import { Button, Input } from "antd";
import styled from "styled-components";

export const AdminPageDiv = styled.div`
  display: flex;
  width: 1170px;
  margin: 0 auto;
  display: flex;
`;

export const AdminLeftMenuDiv = styled.div`
  width: 273px;
  height: 1030px;
  background-color: #f6f6f6;
`;

export const AdminRightMenuDiv = styled.div`
  height: calc(100vh);
`;

export const AdminTitle = styled.p`
  color: #302d46;
  font-weight: Bold;
  margin-top: 169px;
  margin-left: 195px;
`;

export const EmailInput = styled(Input)`
  width: 239px;
  margin-top: 32px;
  margin-left: 157px;
  margin-right: 200px;
`;

export const PasswordInput = styled(Input)`
  width: 239px;
  margin-top: 44px;
  margin-left: 157px;
  margin-left: 157px;
`;

export const SubmitButton = styled.div`
  width: 239px;
  margin-top: 69px;
  margin-left: 279px;
`;

export const AdminText = styled.p`
  width: 168px;
  height: 22px;
  color: #4a4a4a;
  margin-top: 55px;
  margin-left: 68px;
`;

export const LogoutButton = styled(Button)`
  width: 120px;
  height: 32px;
  margin-left: 68px;
  margin-top: 19px;
  font-weight: bold;
`;
