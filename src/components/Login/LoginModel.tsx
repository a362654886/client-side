import * as React from "react";
import { useEffect, useState, useImperativeHandle } from "react";
import { Spinner, Modal, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { LoginType } from "../../types/EnumTypes";
import { IStoreState } from "../../types/IStoreState";
import LoginForm from "./LoginForm";

const PoPup = styled(Modal)`
  .modal-dialog {
    height: 700px;
    position: relative;
  }
  .modal-content {
    height: 320px;
    border-radius: 30px;
    position: absolute;
    top: 50%;
    margin: -160px 0 0 0; 
  }
  .modal-header {
    background-color: #ee6fa9;
    border-radius: 30px 30px 0 0;
    color: white;
  }
`;

interface IProps {
  childRef: React.RefObject<{ popUp: () => void }>;
}

const LoginModel = ({ childRef }: IProps): JSX.Element => {
  const authState: LoginType = useSelector(
    (state: IStoreState) => state.authState
  );

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    authState == LoginType.SUCCESS ? handleClose() : "";
  });

  useImperativeHandle(childRef, () => ({
    popUp: () => handleShow(),
  }));

  const getBody = () => {
    switch (authState) {
      case LoginType.LOADING:
        return <Spinner animation="border" variant="info" />;
      case LoginType.FAIL:
        return (
          <>
            <Alert variant={"danger"}>
              Please provide a valid email address and password.
            </Alert>
            <LoginForm />
          </>
        );
      default:
        return <>
            <div style={{color:"white",backgroundColor:"white",height:"50px"}}>
              please input your email and password
            </div>
            <LoginForm />
          </>;
    }
  };

  return (
    <>
      <PoPup show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>{getBody()}</Modal.Body>
      </PoPup>
    </>
  );
};

export default LoginModel;
