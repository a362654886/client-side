import { Checkbox } from "antd";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import AnimeButton from "../../components/Button";
import {
  AdminEmailPageDiv,
  AdminEmailPageHeader,
  AdminEmailPageReceiveAddress,
} from "../../cssJs/AdminPage/adminCss";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";

const AdminEmailPage = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [userAuthorized, setShowUserAuthorized] = useState<boolean>(false);
  const [manuallyAddress, setManuallyAddress] = useState<boolean>(false);

  const uploadAddress = () => {
    console.log("asd");
  };

  return (
    <AdminEmailPageDiv>
      <AdminEmailPageHeader>
        <h6>Sender address: </h6>
        <h6>{loginUser?.userEmail}</h6>
      </AdminEmailPageHeader>
      <AdminEmailPageReceiveAddress>
        <h6>Receiver address: </h6>
        <div>
          <Checkbox
            checked={userAuthorized}
            onClick={(e) => {
              setShowUserAuthorized((e.target as any).checked);
            }}
          >
            <p>AnimePark Users authorized</p>
          </Checkbox>
          <Checkbox
            checked={manuallyAddress}
            onClick={(e) => {
              setManuallyAddress((e.target as any).checked);
            }}
          >
            <p>{`Full in the address manually(separate by ',')`}</p>
          </Checkbox>
          <AnimeButton
            para=""
            text={`Upload an address list in Excel format`}
            width="320px"
            height="32px"
            textColor="black"
            backGroundColor="white"
            borderColor="grey"
            buttonClick={() => uploadAddress()}
          />
        </div>
      </AdminEmailPageReceiveAddress>
    </AdminEmailPageDiv>
  );
};

export default AdminEmailPage;
