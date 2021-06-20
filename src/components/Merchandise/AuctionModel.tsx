import { Modal } from "react-bootstrap";
import { useState, useImperativeHandle } from "react";
import styled from "styled-components";
import * as React from "react";
import InputBox from "../InputBox";
import { InputBoxType } from "../../types/EnumTypes";
import { ButtonDiv, ButtonPrimary } from "../../cssJs/publicCss";

const PoPup = styled(Modal)`
  .modal-dialog {
    height: 700px;
    position: relative;
  }
  .modal-content {
    height: 220px;
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
  childRef: React.RefObject<{ popUp: (value?:string) => void; popClose: () => void }>;
  saveAuction: (auction: string) => void;
  value: string;
}

const AuctionModel = ({
  childRef,
  saveAuction,
  value,
}: IProps): JSX.Element => {
  const [show, setShow] = useState(false);
  const [auctionValue, setAuctionValue] = useState(value);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useImperativeHandle(childRef, () => ({
    popUp: (value?:string) => {
      handleShow();
      if(value){
        setAuctionValue(value)
      }
    },
    popClose: () => handleClose(),
  }));

  const onChange = (e: React.ChangeEvent<Element>): void => {
    setAuctionValue((e.target as HTMLInputElement).value);
  };

  const save = () => {
    saveAuction(auctionValue);
  };

  return (
    <div>
      <PoPup show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Auction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputBox
            Title="New Auction"
            onChange={onChange}
            type={InputBoxType.INPUT}
            value={auctionValue}
          />
          <ButtonDiv>
            <ButtonPrimary onClick={save}>Auction</ButtonPrimary>
          </ButtonDiv>
        </Modal.Body>
      </PoPup>
    </div>
  );
};

export default AuctionModel;
