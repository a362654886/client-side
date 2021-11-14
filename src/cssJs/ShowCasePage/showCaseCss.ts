import styled from "styled-components";

export const ShowCaseDiv = styled.div`
  width: 1170px;
  margin: 0 auto;
`;

export const ShowCaseTitleDiv = styled.div`
  display: flex;
  margin-top: 24px;
  button {
    margin-top: 15px;
    height: 36px;
    margin-left: 16px;
  }
`;

export const ShowCaseTitle = styled.p`
  font-size: 36px;
  color: #302d46;
  font-weight: bold;
`;

export const ShowCaseCreateImage = styled.div`
  max-width: 1170px;
  margin-bottom: 32px;
  text-align: center;
  button {
    margin-top: 32px;
    color: black;
    border: 1px solid #302d46;
    border-radius: 4px;
  }
`;

export const ShowcaseTextInput = styled.div`
  .ant-input-textarea,
  .ant-input {
    min-height: 300px !important;
  }
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const ShowcaseRadioDiv = styled.div`
  text-align: center;
  height: 22px;
  margin-bottom: 32px;
  label {
    font-weight: bold;
    margin-right: 24px;
  }
`;

//showcase body

export const ShowcaseSearchInputDiv = styled.div`
  display: flex;
  margin-bottom: 32px;
  input {
    height: 40px;
    width: 576px;
  }
  button {
    height: 40px;
    margin-left: 40px;
  }
`;

export const ShowName = styled.p`
  color: #302d46;
  font-weight: bold;
  line-height: 40px;
  margin-left: 8px;
  font-size: 14px;
`;

export const ShowTime = styled.p`
  color: #302d46;
  line-height: 40px;
  margin-left: 8px;
  font-size: 12px;
  color: #4a4a4a;
`;

export const ShowItemBox = styled.div`
  width: 864px;
  height: auto;
  padding: 24px 16px;
  border: 1px solid #7f7e82;
  margin-bottom: 16px;
  margin-top: 16px;
  button {
    text-align: left;
  }
`;

export const ShowIframe = styled.div`
  width: 896px;
  height: auto;
  padding: 24px 16px;
  border: 1px solid #7f7e82;
  margin-bottom: 16px;
  button {
    margin-left: 16px;
  }
`;

export const ShowImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const ShowcaseType = styled.p`
  margin-top: 16px;
  background-color: #f6f6f6;
  width: 90px;
  padding: 2px 9px;
  font-weight: bold;
`;
