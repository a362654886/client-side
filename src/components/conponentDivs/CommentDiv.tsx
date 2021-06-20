import * as React from "react";
import { useEffect, useState, useImperativeHandle } from "react";
import { Modal } from "react-bootstrap";
import ReactQuill from "react-quill";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { messageAdd } from "../../api/messageApPI";
import { ButtonDiv, ButtonPrimary } from "../../cssJs/publicCss";
import { getModel } from "../../helperFns/quillModel";
import { IStoreState } from "../../types/IStoreState";
import { Merchandise } from "../../types/MerchandiseType";
import { Message, MessageReturnBody, parentType } from "../../types/MessageType";
import { Post } from "../../types/PostType";

const PoPup = styled(Modal)`
  .modal-dialog {
    min-height: 700px;
    margin: 0 auto;
    position: relative;
    max-width: 90%;
  }
  .modal-content {
    min-height: 300px;
    height: auto;
    border-radius: 30px;
    position: absolute;
    top: 50%;
    margin: -160px 0 0 0;
    width: 100%;
  }
  .modal-header {
    background-color: #ee6fa9;
    border-radius: 30px 30px 0 0;
    color: white;
  }
`;

const InputText = styled(ReactQuill)`
  margin: 1rem;
  margin-right: 0;
  height: 300px;
  padding-bottom: 60px;
`;

interface IProps {
  childRef: React.RefObject<{ popUp: (upperMessage: string) => void }>;
  postObj?: Post;
  merchandiseObj?: Merchandise;
  type: string;
  sendBack: (newMessage: Message) => void;
}

const CommentDiv = ({ childRef, postObj, merchandiseObj,type,sendBack}: IProps): JSX.Element => {
  const [show, setShow] = useState(false);
  const [context, setContext] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const messageState: MessageReturnBody = useSelector(
    (state: IStoreState) => state.messagesState
  );

  useEffect(() => {
    //authState == LoginType.SUCCESS ? handleClose() : "";
    //console.log(messageState)
  },[messageState]);

  useImperativeHandle(childRef, () => ({
    popUp: (upperMessage: string) => {
      upperMessage == "" ? setContext("") : setContext(`"${upperMessage}"`);
      handleShow();
    },
  }));

  const submitPostMessage = async () => {
    console.log(messageState)
    if(postObj){
      const message: Message = {
        _id: postObj._id + (new Date().valueOf()),
        messageId: postObj._id + (new Date().valueOf()),
        time: new Date(),
        userEmail: postObj.userEmail,
        parentType: parentType.post,
        parentId: postObj.postId,
        context: context,
        likeNum:0
      };
      const result = await messageAdd(message);
      if (result == 200) {
        //parentObj.messages = parentObj.messages ? parentObj.messages + 1 : 0;
        sendBack(message);
        handleClose();
      }
    }
  };

  const submitMerchandiseMessage = async () => {
    if(merchandiseObj){
      const message: Message = {
        _id: merchandiseObj._id + (new Date().valueOf()),
        messageId: merchandiseObj._id + (new Date().valueOf()),
        time: new Date(),
        userEmail: merchandiseObj.userEmail,
        parentType: parentType.merchandise,
        parentId: merchandiseObj._id,
        context: context,
        likeNum:0
      };
      const result = await messageAdd(message);
      if (result == 200) {
        //parentObj.messages = parentObj.messages ? parentObj.messages + 1 : 0;
        sendBack(message);
        handleClose();
      }
    }
  };

  const getButton = () =>{
    switch (type) {
      case "Post":
        return (
          <ButtonDiv>
            <ButtonPrimary onClick={submitPostMessage}>Submit</ButtonPrimary>
          </ButtonDiv>
        )
      case "Merchandise":
        return (
          <ButtonDiv>
            <ButtonPrimary onClick={submitMerchandiseMessage}>Submit</ButtonPrimary>
          </ButtonDiv>
        )
    }
  }

  return (
    <>
      <PoPup show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputText
            theme="snow"
            value={context}
            modules={getModel()}
            onChange={setContext}
          ></InputText>
          {getButton()}
        </Modal.Body>
      </PoPup>
    </>
  );
};

export default CommentDiv;
