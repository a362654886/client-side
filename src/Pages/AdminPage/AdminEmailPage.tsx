import { Checkbox, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { cloneDeep } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { emailsPost, userEmailsGet } from "../../api/emailAPI";
import AnimeButton from "../../components/Button";
import {
  AdminEmailPageContext,
  AdminEmailPageDiv,
  AdminEmailPageHeader,
  AdminEmailPageReceiveAddress,
  AdminEmailPageReceiveContext,
  AdminEmailPageReceiveTitle,
  AdminEmailSubmitButton,
} from "../../cssJs/AdminPage/adminCss";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { LoadingType } from "../../types/EnumTypes";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";
import SCVUpload from "./CSVUpload/SCVUpload";

const AdminEmailPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [userAuthorized, setShowUserAuthorized] = useState<boolean>(false);
  const [manuallyAddress, setManuallyAddress] = useState<boolean>(false);
  const [header, setHeader] = useState<string[]>([]);
  const [CSVValues, setCSVValues] = useState<unknown[]>([]);
  const [emailAddress, setEmailAddresses] = useState<string>("");

  const [emailTitle, setEmailTitle] = useState<string>("");
  const [emailContext, setEmailContext] = useState<string>("");

  useEffect(() => {
    if (manuallyAddress) {
      const emails: string[] = [];
      CSVValues.forEach((item: any) => {
        emails.push(item.EmailAddress);
      });
      const newEmailAddress = cloneDeep(emailAddress) + emails.join(",");
      setEmailAddresses(newEmailAddress);
    }
  }, [CSVValues]);

  useEffect(() => {
    (async function anyNameFunction() {
      if (userAuthorized) {
        dispatch({
          payload: LoadingType.OPEN,
          type: LOADING_OPEN,
        });
        const emails = await userEmailsGet(
          false,
          false,
          false,
          false,
          false,
          false
        );
        if (emails) {
          const newEmailAddress =
            cloneDeep(emailAddress) + emails.join(",") + ",";
          setEmailAddresses(newEmailAddress);
        }
        dispatch({
          payload: LoadingType.CLOSE,
          type: LOADING_CLOSE,
        });
      }
    })();
  }, [userAuthorized]);

  const submit = async () => {
    const lastone = emailAddress.substr(emailAddress.length-1,1)
    const emails = lastone==','?emailAddress.substr(0,emailAddress.length-1).split(","):emailAddress.split(",")
    await emailsPost(emails,emailContext,emailTitle)
  };

  const uploadAddress = () => {
    console.log(CSVValues);
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
          <SCVUpload
            onWrongFormat={() => {
              console.log("wrong");
            }}
            setExcelOutput={(value: unknown[]) => setCSVValues(value)}
            setHeaders={(value) => setHeader(value)}
            upLoadSuccess={uploadAddress}
          />
          <TextArea
            value={emailAddress}
            onChange={(e) => {
              if (manuallyAddress) {
                setEmailAddresses(e.target.value);
              }
            }}
          />
        </div>
      </AdminEmailPageReceiveAddress>
      <AdminEmailPageReceiveContext>
        <h6>Context: </h6>
        <AdminEmailPageReceiveTitle>
          <div>
            <h6>Title</h6>
            <Input
              value={emailTitle}
              onChange={(e) => setEmailTitle(e.target.value)}
            />
          </div>
        </AdminEmailPageReceiveTitle>
      </AdminEmailPageReceiveContext>
      <AdminEmailPageContext
        style={{ height: "200px", marginLeft: "60px", width: "95%" }}
        value={emailContext}
        onChange={(e) => setEmailContext(e.target.value)}
      />
      <AdminEmailSubmitButton>
        <AnimeButton
          para=""
          text={"Submit"}
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="white"
          buttonClick={() => submit()}
        />
      </AdminEmailSubmitButton>
    </AdminEmailPageDiv>
  );
};

export default AdminEmailPage;
