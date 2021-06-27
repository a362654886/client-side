import { Button } from "antd";
import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { GetAlertDiv } from "../components/conponentDivs/GetAlertDiv";
import MerchandiseRouter from "../components/Router/MeichandiseRouter";
import { MerchandiseDiv } from "../cssJs/MerchandiseCss";
import { TitleWithLine } from "../cssJs/publicCss";
import { showAlert } from "../helperFns/showFn";
import { BooleanType } from "../types/EnumTypes";
import { IStoreState } from "../types/IStoreState";
import { User } from "../types/User";

const NewMerchandiseButton = styled(Button)`
  position: absolute;
  right: 5px;
  background-color: #ee6fa9;
  color: white;
  border-radius: 20px;
`;

const pageSize = 10;

const MerchandisePage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [show, setShow] = useState("none");
  const [newMerchandiseShow, setNewMerchandise] = useState("block");

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const toForum = (url: string) => {
    if (!loginUser?.userEmail) {
      showAlert(setShow);
    } else {
      url == `newMerchandise` ? setNewMerchandise("none") : "";
      history.replace({
        pathname: url,
      });
    }
  };

  return (
    <MerchandiseDiv>
      <TitleWithLine>
        <h5>Market</h5>
        <NewMerchandiseButton
          style={{ display: newMerchandiseShow }}
          onClick={() => toForum(`newMerchandise`)}
        >
          New Item
        </NewMerchandiseButton>
      </TitleWithLine>
      <GetAlertDiv
        alert={{
          type: BooleanType.FAIL,
          context: "you can't add without login",
        }}
        show={show}
      />
      <MerchandiseRouter />
    </MerchandiseDiv>
  );
};

export default MerchandisePage;
