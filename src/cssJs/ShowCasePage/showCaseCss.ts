import { Input, Radio, Select } from "antd";
import styled from "styled-components";

export const ShowCaseDiv = styled.div`
  width: 1140px;
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
  }
  margin-top: 32px;
  margin-bottom: 32px;
`;

export const ShowcaseRadioDiv = styled.div`
  text-align: left;
  height: 22px;
  margin-bottom: 32px;
  padding-left: 51px;
  label {
    font-weight: bold;
    margin-right: 24px;
  }
  .ant-radio-group {
    display: inline;
  }
  .ant-space {
    text-align: left;
  }
  span {
    font-weight: normal;
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
  max-width: 896px;
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

export const ShowcaseTag = styled.div`
  margin-top: 16px;
  p {
    background-color: #c1eeff;
    width: auto;
    padding: 2px 9px;
    font-weight: normal;
    margin-bottom: 0px;
  }
`;

export const ShowcasePostDiv = styled.div`
  height: 120px;
  p {
    padding-left: 5%;
    padding-top: 7px;
    background-color: #c1eeff;
    height: 36px;
  }
  button {
    margin: auto;
  }
`;

export const TagSelectDiv = styled.div`
  display: flex;
  p {
    height: 32px;
    margin-right: 14px;
    font-weight: bold;
    line-height: 32px;
  }
`;

export const TagSelect = styled(Select)`
  width: 80%;
`;

export const TagRadioInput = styled(Radio)`
  width: 20px;
  span {
    display: flex;
    p {
      height: 30px;
      line-height: 30px;
    }
    input {
      margin-left: 16px;
      height: 30px;
      min-height: 30px;
      width: 420px;
      z-index: 1000;
    }
  }
`;

export const CancelButton = styled.div`
  margin-top: 32px;
  text-align: center;
`;

export const TitleInput = styled(Input)`
  height: 44px;
  margin-bottom: 32px;
`;

export const DescriptionInput = styled(Input)`
  height: 96px;
`;

export const AweSomeImg = styled.img`
  width: 100px;
  height: 32px;
  margin-top: 36px;
`;

export const AweSomeDiv = styled.div`
  margin-top: 32px;
  display: flex;
  img {
    width: 100px;
    height: 32px;
  }
  p {
    margin-top: 5px;
    margin-bottom: 0px;
  }
`;

export const ShowCaseIcons = styled.div`
  height: 32px;
  display: flex;
  margin-top: 32px;
  img {
    height: 24px;
    width: 24px;
    margin-right: 16px;
    cursor: pointer;
  }
`;

export const EditAndDeleteDiv = styled.div`
  display: flex;
  margin-top: 32px;
  img {
    height: 24px;
    width: 53px;
    margin-right: 32px;
    cursor: pointer;
  }
`;

export const ReplyDiv = styled.div`
  display: flex;
  margin-top: 32px;
  margin-bottom: 25px;
  button {
    margin-left: 0px;
  }
`;

export const ReplyBox = styled.div`
  width: 794px;
  height: auto;
  padding: 24px 16px;
  border: 1px solid #7f7e82;
  margin-bottom: 16px;
  margin-top: 16px;
  button {
    text-align: left;
  }
`;

export const ReplySecondBox = styled.div`
  width: 760px;
  height: auto;
  padding: 24px 16px;
  border: 1px solid #7f7e82;
  margin-bottom: 16px;
  margin-top: 16px;
  button {
    text-align: left;
  }
`;

export const ReplyAddDiv = styled.div`
  button {
    margin-left: 0px;
    padding-left: 0px;
    text-align: left;
  }
`;

export const ShowcaseEditDiv = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  button {
    margin-top: 16px;
    padding-left: 0px;
    margin-left: 0px;
  }
`;

//images

export const ShowcaseImage = styled.img`
  width: 794px;
`;
