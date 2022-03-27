import * as React from "react";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AnimeButton } from "../../components/Button";
import { AdminPageDiv } from "../../cssJs/AdminPage/adminCss";
import {
  AdminSysDiv,
  ButtonsDiv,
} from "../../cssJs/AdminPage/adminSysSettingCss";
import AdminSysSettingRouter from "../../router/AdminSysSettingRouter";

const AdminSysSetting = (): JSX.Element => {
  const history = useHistory();

  useEffect(() => {
    if (history.location.pathname == "/adminManagement/Sys Setting") {
      toPage("/adminManagement/Sys Setting/avatar");
    }
  }, []);

  const toPage = (url: string) => history.push(url);

  return (
    <AdminSysDiv>
      <ButtonsDiv>
        <AnimeButton
          para=""
          text={"Avatars"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="#AAFFC9"
          borderColor="#AAFFC9"
          buttonClick={() => toPage("/adminManagement/Sys Setting/avatar")}
        />
      </ButtonsDiv>
      <AdminSysSettingRouter />
    </AdminSysDiv>
  );
};

export default AdminSysSetting;
