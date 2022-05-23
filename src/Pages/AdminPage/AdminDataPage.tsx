import * as React from "react";
import { useState } from "react";
import AnimeButton from "../../components/Button";
import { ButtonsDiv } from "../../cssJs/AdminPage/adminAdminCss";
import { AdminPageDiv } from "../../cssJs/AdminPage/adminCss";
import BlockSearch from "./reportComponent/BlockSearch";
import ReportSearch from "./reportComponent/ReportSearch";

const AdminDataPage = (): JSX.Element => {
  const [buttonString, setButton] = useState<string>("Blocked");

  const menu = ["Blocked", "Reports"];

  const tabButton = (value: string) => {
    setButton(value);
  };

  const getButtonComponentDiv = () => {
    return menu.map((menuString: string, index: number) => {
      if (menuString == buttonString) {
        return (
          <div key={index}>
            <AnimeButton
              para=""
              text={menuString}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="#AAFFC9"
              borderColor="#AAFFC9"
              buttonClick={() => tabButton(menu[index])}
            />
          </div>
        );
      } else {
        return (
          <div key={index}>
            <AnimeButton
              para=""
              text={menuString}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="white"
              borderColor="black"
              buttonClick={() => tabButton(menu[index])}
            />
          </div>
        );
      }
    });
  };

  const getAminComponent = () => {
    return buttonString == "Blocked" ? <BlockSearch /> : <ReportSearch />;
  };

  return (
    <AdminPageDiv>
      <div style={{ display: "inline" }}>
        <ButtonsDiv>{getButtonComponentDiv()}</ButtonsDiv>
        <div>{getAminComponent()}</div>
      </div>
    </AdminPageDiv>
  );
};

export default AdminDataPage;
