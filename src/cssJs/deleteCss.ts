import { Modal } from "antd";
import styled from "styled-components";

export const DeleteModal = styled(Modal)`
  .ant-modal-content,
  .ant-modal-body {
    width: 320px;
    height: 144px;
  }
`;

export const DeleteText = styled.p`
  margin-top: 16px;
  height: 48px;
  width: 160px;
  margin-left: 56px;
  padding: 8px 0px;
  line-height: 32px;
  font-size: 16px;
  color: #979797;
`;

export const DeleteButtons = styled.div`
  display: flex;
  button {
    margin-right: 16px;
  }
`;
