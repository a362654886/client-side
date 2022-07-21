import { Modal } from "antd";
import styled from "styled-components";

export const SettingPopUpDiv = styled.div`
  border: 10px solid #a0a0a0;
  padding: 5px;
  width: 100px;
  height: 145px;
  p {
    height: 38.3px;
    line-height: 32px;
    font-weight: bold;
    color: #302d46;
    margin-bottom: 0px;
    cursor: pointer;
    :hover {
      background-color: #892e2f;
      color: white;
    }
  }
`;

export const SettingDiv = styled.div`
  .ant-popover-inner-content {
    border: 1px solid red;
    padding: 0px;
  }
  .ant-modal-content {
    z-index: 20000;
  }
`;

export const MessageModal = styled(Modal)`
  .ant-modal-content,
  .ant-modal-body {
    width: 100%;
    height: 338px;
    z-index: 20000;
  }
`;

export const MessageDiv = styled.div`
  z-index: 100000;
  div {
    height: 56px;
    margin-top: 12px;
    padding: 8px 0px;
    display: flex;
    p {
      font-size: 24px;
      height: 40px;
      line-height: 40px;
      font-family: "Normal Italic ";
      font-style: italic;
    }
    h6 {
      font-size: 16px;
      height: 40px;
      line-height: 40px;
      margin-left: 8px;
    }
    img {
      margin-left: 8px;
      width: 40px;
      height: 40px;
    }
  }
  textArea {
    margin-top: 8px;
    width: 808px;
    height: 145px;
  }
`;
