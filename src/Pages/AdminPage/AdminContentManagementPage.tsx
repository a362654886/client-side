import * as React from "react";
import { useState } from "react";
import AnimeButton from "../../components/Button";
import { ButtonsDiv } from "../../cssJs/AdminPage/adminAdminCss";
import {
  AdminDateChildDiv,
  AdminDateDiv,
} from "../../cssJs/AdminPage/adminCss";
import AdminDataAccountComponent from "./dataComponent/AdminDataAccountComponent";
import AdminDataContentComponent from "./dataComponent/AdminDataContentsComponent";

const AdminContentManagementPage = (): JSX.Element => {
  const [buttonString, setButton] = useState<string>("Views");

  const menu = ["Views", "Contents"];

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
              buttonClick={() => setButton(menu[index])}
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
              buttonClick={() => setButton(menu[index])}
            />
          </div>
        );
      }
    });
  };

  return (
    <AdminDateDiv>
      <ButtonsDiv>{getButtonComponentDiv()}</ButtonsDiv>
      {buttonString == "Views" ? (
        <AdminDataAccountComponent />
      ) : (
        <AdminDataContentComponent />
      )}
    </AdminDateDiv>
  );
};

export default AdminContentManagementPage;
