import { Radio } from "antd";
import styled from "styled-components";

export const MallDiv = styled.div`
  width: 1140px;
  margin: 0 auto;
`;

export const MallShowDiv = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const MallTitleDiv = styled.div`
  margin-top: 8px;
  height: 68px;
  button {
    margin-top: 15px;
    height: 36px;
    margin-left: 16px;
  }
`;

export const MallTitle = styled.h1`
  font-size: 36px;
  color: #302d46;
  font-weight: bold;
  line-height: 52px;
  margin-bottom: 0px;
  padding: 8px 0px;
`;

export const MallDisplayText = styled.p`
  font-size: 16px;
  color: #302d46;
  height: auto;
  line-height: 32px;
  padding: 8px 0px;
  margin-bottom: 0px;
`;

// T-shirt

export const MallRadio = styled(Radio)`
  font-size: 16px;
  height: 32px;
  margin-bottom: 0px;
  .ant-space-item {
    margin-bottom: 0px;
  }
`;

//showcase side

export const MallSideDiv = styled.div`
  width: 276px;
  height: 648px;
  margin-left: 42px;
  margin-top: 8px;
`;
