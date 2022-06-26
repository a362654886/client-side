import * as React from "react";
import { useHistory } from "react-router-dom";
import AnimeButton from "../../../components/Button";
import { ButtonsDiv } from "../../../cssJs/AdminPage/adminAdminCss";

interface IProps {
  buttonString: string;
}

const AdminDataHeader = ({ buttonString }: IProps): JSX.Element => {

  const history = useHistory();

  const menu = ["Blocked", "Reports"];

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
              buttonClick={() => history.push(`/adminManagement/${menuString}`)}
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
              buttonClick={() => history.push(`/adminManagement/${menuString}`)}
            />
          </div>
        );
      }
    });
  };
  return (
    <div style={{ display: "inline" }}>
      <ButtonsDiv>{getButtonComponentDiv()}</ButtonsDiv>
    </div>
  );
};

export default AdminDataHeader;
