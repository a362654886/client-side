import { Input, Radio, Select } from "antd";
import styled from "styled-components";

export const ShowCaseDiv = styled.div`
  width: 1140px;
  margin: 0 auto;
`;

export const ShowCaseTitleDiv = styled.div`
  margin-top: 8px;
  height: 68px;
  button {
    margin-top: 15px;
    height: 36px;
    margin-left: 16px;
  }
`;

export const ShowCaseTitle = styled.h1`
  font-size: 36px;
  color: #302d46;
  font-weight: bold;
  line-height: 52px;
  margin-bottom: 0px;
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

export const ShowcaseSearch = styled.div`
  img {
    height: 40px;
    width: 40px;
  }
`;

//showcase body

export const ShowcaseSearchInputDiv = styled.div`
  display: flex;
  margin-bottom: 16px;
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
  line-height: 32px;
  margin-left: 8px;
  margin-top: 4px;
  margin-bottom: 4px;
  height: 32px;
  font-size: 16px;
  width: 47px;
`;

export const ShowcaseSettingImg = styled.img`
  height: 24px;
  width: 24px;
  margin-top: 8px;
  margin-left: 16px;
  cursor: pointer;
`;

export const ShowTime = styled.p`
  color: #302d46;
  line-height: 40px;
  margin-left: 8px;
  font-size: 14px;
  color: #4a4a4a;
  font-family: "Arial MT";
`;

export const ShowcaseSource = styled.div`
  height: 56px;
  width: 214px;
  padding-top: 8px;
  padding-bottom: 8px;
  p {
    background-color: #fae7d5;
    height: 40px;
    padding: 4px;
    margin-bottom: 0px;
    line-height: 32px;
    font-size: 16px;
    font-family: "Arial MT";
  }
`;

export const ShowcaseTaDiv = styled.div`
  height: 56px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
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
  padding: 16px;
  border: 1px solid #7f7e82;
  margin-bottom: 16px;
  button {
    margin-left: 16px;
  }
`;

export const ShowAvatarDiv = styled.div`
  display: flex;
  height: 72px;
  width: 100%;
  padding-top: 16px;
  padding-bottom: 16px;
`;

export const ShowImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const ShowcaseReply = styled.div`
  width: 100%;
  height: auto;
`;

export const ShowcaseTag = styled.div`
  margin-top: 8px;
  margin-bottom: 8px;
  p {
    background-color: #c1eeff;
    height: 40px;
    padding: 4px 8px;
    margin-bottom: 0px;
    line-height: 32px;
    font-size: 16px;
    font-family: "Arial MT";
  }
`;

export const ShowcasePostDiv = styled.div`
  width: 100%;
  height: 128px;
  margin-top: 16px;
  margin-bottom: 16px;
  p {
    background-color: #c1eeff;
    height: 48px;
    padding: 8px 21px;
    line-height: 32px;
    margin-bottom: 0px;
  }
  button {
    margin: 0px auto;
    margin-top: 24px;
  }
`;

export const ShowcaseMiddleDivPost = styled.div`
  width: 200px;
  margin: 0 auto;
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
  display: flex;
  height: 64px;
  padding-top: 16px;
  padding-bottom: 16px;
  cursor: pointer;
  img {
    width: 40px;
    height: 32px;
  }
  p {
    margin-left: 4px;
    line-height: 32px;
    margin-bottom: 0px;
    line-height: 32px;
    font-size: 16px;
    font-family: "Arial MT";
  }
  h6 {
    margin-left: 8px;
    margin-top: 5px;
    margin-bottom: 0px;
  }
`;

export const ShowCaseIcons = styled.div`
  height: 64px;
  display: flex;
  padding-top: 16px;
  padding-bottom: 16px;
  img {
    height: 32px;
    width: 32px;
    margin-right: 16px;
    cursor: pointer;
  }
`;

export const ShowcaseEditAndDeleteDiv = styled.div`
  display: flex;
  height: 64px;
  padding-top: 16px;
  padding-bottom: 16px;
  cursor: pointer;
  div {
    display: flex;
  }
  img {
    height: 24px;
    width: 24px;
    cursor: pointer;
    margin-top: 4px;
  }
  p {
    margin-left: 8px;
    margin-right: 32px;
    margin-bottom: 0px;
    line-height: 32px;
    font-size: 16px;
    font-family: "Arial MT";
  }
`;

export const EditAndDeleteDiv = styled.div`
  display: flex;
  margin-top: 32px;
  img {
    height: 24px;
    width: 24px;
    cursor: pointer;
  }
  p {
    margin-left: 8px;
    margin-right: 32px;
  }
`;

export const ShowcaseMoreButtonDiv = styled.div`
  width: 100%;
  display: flex;
  height: 32px;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: #e2f6fe;
  cursor: pointer;
  img {
    height: 24px;
    width: 24px;
    margin: 4px;
  }
  p {
    line-height: 32px;
  }
`;

export const ReplyDiv = styled.div`
  display: flex;
  height: 32px;
  text-align: left;
  margin-top: 8px;
  cursor: pointer;
  button {
    margin-left: 0px;
    padding: 0px;
  }
  img {
    margin-top: 4px;
    height: 24px;
    weight: 24px;
  }
`;

export const ReplyBox = styled.div`
  width: 794px;
  height: auto;
  padding: 8px 0px;
  button {
    text-align: left;
  }
`;

export const ReplySecondBox = styled.div`
  width: 760px;
  height: auto;
  padding: 8px 0px;
  button {
    text-align: left;
  }
`;

export const ReplyAddDiv = styled.div`
  margin-top: 8px;
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

//showcase manga

export const ShowcaseMangaHeader = styled.div`
  display: flex;
  p {
    font-size: 14px;
    line-height: 40px;
    margin-right: 8px;
  }
`;

export const ShowMangaIframe = styled.div`
  max-width: 896px;
  height: auto;
  padding: 24px 16px;
  border: 1px solid #7f7e82;
  margin-bottom: 16px;
  button {
    margin-left: 16px;
  }
  h2 {
    margin-top: 16px;
  }
`;

export const ShowMangaIframeSource = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: #302d46;
  font-weight: bold;
`;

export const ShowMangaMiddleButton = styled.div`
  width: 240px;
  margin: 0 auto;
`;

//showcase manga one

export const ShowMangaIframeOne = styled.div`
  max-width: 896px;
  height: auto;
  margin-bottom: 16px;
  button {
    margin-left: 16px;
  }
  h2 {
    margin-top: 16px;
  }
`;

export const ShowMangaIframeEpisodesButtons = styled.div`
  display: flex;
`;

export const ShowMangaButtons = styled.div`
  display: flex;
  margin: 24px 28px;
  Button {
  }
`;

export const EpisodesText = styled.h3`
  color: #302d46;
  font-size: 16px;
  line-height: 24px;
  font-weight: bold;
  margin-top: 44px;
`;

export const EpisodesAddButton = styled.div`
  display: flex;
  height: 32px;
  width: 80px;
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
    margin-top: 4px;
  }
  p {
    font-size: 14px;
    line-height: 32px;
  }
`;

export const EpisodesGeneralButton = styled.div`
  display: flex;
  height: 32px;
  width: 80px;
  cursor: pointer;
  border: 1px solid black;
  margin-right: 16px;
  margin-bottom: 16px;
  text-align: center;
  p {
    font-size: 14px;
    line-height: 32px;
    margin: 0 auto;
  }
`;

export const EpisodesEditAndDelete = styled.div`
  margin-top: 32px;
  height: 140px;
  border-bottom: 1px solid #aaffc9;
  div {
    display: flex;
    margin-bottom: 32px;
  }
  img {
    height: 24px;
    width: 24px;
    margin-right: 8px;
  }
  h6 {
    font-weight: bold;
    font-size: 16px;
    margin-left: 16px;
  }
`;

export const EpisodesComments = styled.div`
  margin-top: 32px;
  margin-bottom: 24px;
  display: flex;
  cursor: pointer;
  h6 {
    font-weight: bold;
    font-size: 14px;
    color: #4ba3c3;
    line-height: 20px;
  }
  img {
    margin-left: 8px;
  }
`;

//showcase side

export const ShowcaseSideDiv = styled.div`
  width: 276px;
  height: 648px;
  margin-left: 86px;
  margin-top: 8px;
  background-color: #424242;
`;

export const ShowcaseSideDivHeader = styled.div`
  width: 276px;
  height: auto;
  padding-top: 19px;
  padding-bottom: 19px;
  div {
    display: flex;
    margin-left: 16px;
  }
  img {
    height: 32px;
    width: 32px;
  }
  h2 {
    font-size: 24px;
    color: #f5a623;
    font-weight: bold;
    line-height: 32px;
    margin-left: 8px;
  }
`;

export const ShowcaseSideUser = styled.div`
  display: flex;
  margin-top: 16px;
  height: 40px;
  img {
    height: 40px;
    width: 40px;
  }
  h6 {
    line-height: 40px;
    color: white;
    font-weight: bold;
    margin-left: 16px;
  }
  p {
    margin-left: 14px;
    color: #ffdf00;
    line-height: 40px;
  }
`;
