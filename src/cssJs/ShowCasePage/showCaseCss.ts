import { Input, Radio, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import styled from "styled-components";

export const ShowCaseDiv = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  height: auto;
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
  width:100%;
  button {
    margin-top: 32px;
    color: black;
    border: 1px solid #302d46;
    border-radius: 4px;
  }
`;

export const ShowCaseCreateImageHeader = styled.h3`
  font-family: "Arial";
  font-size: 16px;
  font-weight: bold;
  line-height: 32px;
`;

export const ShowcaseTextInput = styled.div`
  .ant-input-textarea,
  .ant-input {
  }
  margin-bottom: 32px;
`;

export const ShowcaseRadioDiv = styled.div`
  text-align: left;
  height: 140px;
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
  .ant-space-item {
    margin-bottom: 0px !important;
    height: 45px;
    span {
      margin-top: 8px;
      line-height: 32px;
      font-size: 16px;
      font-family: "Arial MT";
    }
  }
  .ant-radio-inner {
    width: 16px;
    height: 16px;
  }
`;

export const ShowcaseSearch = styled.div`
  img {
    cursor: pointer;
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
  margin-right: 16px;
  height: 32px;
  font-size: 16px;
  width: auto;
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
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
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
  height: auto;
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
  border-radius: 50%;
`;

export const ShowcaseReply = styled.div`
  width: 100%;
  height: auto;
`;

export const ShowcaseTag = styled.div`
  margin-top: 8px;
  height: 40px;
  margin-bottom: 8px;
  margin-right: 16px;
  p {
    background-color: #c1eeff;
    height: 40px;
    padding: 4px 8px;
    margin-bottom: 0px;
    line-height: 32px;
    font-size: 16px;
    font-family: "Arial MT";
    cursor: pointer;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const ShowcasePostDiv = styled.div`
  width: 100%;
  height: auto;
  margin-top: 16px;
  margin-bottom: 16px;
  p {
    background-color: #c1eeff;
    height: auto;
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
  p {
    height: 32px;
    margin-right: 14px;
    font-weight: bold;
    line-height: 32px;
  }
  margin-bottom: 16px;
`;

export const TagSelect = styled(Select)`
  width: 80%;
  .ant-select-selection-overflow {
    height: 32px;
  }
  .ant-select-selection-item {
    background-color: #c1eeff;
    height: 32px;
    line-height: 32px;
    margin: 0px;
  }
`;

export const TagRadioInput = styled(Radio)`
  width: 20px;
  span {
    p {
      height: 30px;
      line-height: 30px;
    }
    input {
      margin-left: 0px;
      height: 30px;
      min-height: 30px;
      min-width: 250px;
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

export const DescriptionInput = styled(TextArea)`
  height: 300px !important;
  margin-bottom: 16px;
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
    margin-left: 4px;
    height: 24px;
    weight: 24px;
  }
`;

export const ReplyBox = styled.div`
  max-width: 794px;
  height: auto;
  padding: 8px 0px;
  button {
    text-align: left;
  }
`;

export const ReplySecondBox = styled.div`
  max-width: 760px;
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
  width:100%;
  button {
    margin-top: 16px;
    padding-left: 0px;
    margin-left: 0px;
  }
`;

//images

export const ShowcaseImage = styled.img`
  max-width: 100%;
`;

//showcase manga

export const ShowcaseMangaHeader = styled.div`
  display: flex;
`;

export const ShowcaseMangaDescription = styled.p`
  width: 100%;
  max-width: 866px;
  word-wrap: break-word;
`;

export const ShowcaseMangaHeaderTitle = styled.h2`
  font-family: "Arial";
  line-height: 40px;
  font-size: 24px;
  margin-top: 8px;
  margin-bottom: 0px;
  font-weight: bold;
`;

export const ShowcaseMangaHeaderP = styled.p`
  width: 100px;
  font-family: "Arial MT";
  line-height: 32px;
  font-size: 16px;
  margin-top: 20px;
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
`;

export const ShowMangaIframeSource = styled.p`
  font-family: "Arial MT";
  font-size: 16px;
  line-height: 32px;
  color: #302d46;
  margin-bottom: 0px;
`;

export const ShowMangaMiddleButton = styled.div`
  width: 240px;
  margin: 0 auto;
  button {
    margin-left: 0px;
  }
`;

//showcase manga one

export const ShowMangaIframeOne = styled.div`
  max-width: 896px;
  height: auto;
  margin-bottom: 16px;
  button {
    margin-left: 16px;
  }
`;

export const ShowMangaIframeEpisodesButtons = styled.div`
  display: flex;
`;

export const ShowMangaButtons = styled.div`
  display: flex;
  margin: 12px 24px;
  Button {
  }
`;

export const EpisodesText = styled.h3`
  color: #302d46;
  font-size: 16px;
  line-height: 32px;
  font-weight: bold;
  padding-top: 8px;
  height: 48px;
  padding-bottom: 8px;
  margin-bottom: 0px;
  img {
    margin-right: 4px;
  }
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
    font-family:"Arial MT"
    font-size: 16px;
    line-height: 32px;
    margin: 0 auto;
  }
`;

export const EpisodesEditDiv = styled.div`
  height: 64px;
  padding-top:16px;
  padding-bottom:16px;
  display: flex;
  cursor: pointer;
  img {
    height: 24px;
    width: 24px;
    margin-right: 8px;
    margin-top:4px;
  }
  h6 {
    font-family:"Arial MT"
    font-size: 16px;
    line-height: 32px;
    margin: 0px;
    margin-left: 16px;
    font-weight: bold;
  }
  p{
    font-family:"Arial MT"
    font-size: 16px;
    line-height: 32px;
    margin: 0px;
  }
`;

export const EpisodesDeleteDiv = styled.div`
  height: 64px;
  padding-top:16px;
  padding-bottom:16px;
  display:flex;
  cursor: pointer;
  img {
    height: 24px;
    width: 24px;
    margin-right: 8px;
    margin-top:4px;
  }
  h6 {
    font-family:"Arial MT"
    font-size: 16px;
    line-height: 32px;
    margin: 0px;
    margin-left: 16px;
    font-weight: bold;
  }
  p{
    font-family:"Arial MT"
    font-size: 16px;
    line-height: 32px;
    margin: 0px;
  }
  border-bottom: 1px solid #aaffc9;
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
  margin-left: 42px;
  margin-top: 8px;
`;

export const ShowcaseSideDivHeader = styled.div`
  width: 276px;
  height: 56px;
  padding: 8px 16px;
  background-color: #424242;
  div {
    display: flex;
  }
  img {
    height: 40px;
    width: 40px;
    margin-left: 16px;
    margin-top: 4px;
  }
  h2 {
    font-size: 24px;
    color: #ffdf00;
    line-height: 40px;
    margin-bottom: 0px;
  }
`;

export const ShowcaseSideDivTagHeader = styled.div`
  width: 276px;
  height: 56px;
  padding: 8px 16px;
  background-color: #263e7d;
  div {
    display: flex;
  }
  img {
    height: 40px;
    width: 40px;
    margin-right: 16px;
  }
  h2 {
    font-size: 24px;
    color: #ffdf00;
    line-height: 40px;
    margin-bottom: 0px;
  }
`;

export const ShowcaseSideUser = styled.div`
  display: flex;
  padding-top: 16px;
  height: 73px;
  width: 276px;
  position: relative;
  img {
    height: 40px;
    width: 40px;
  }
  p {
    margin-left: 14px;
    line-height: 40px;
  }
  border-bottom: 1px solid #e2f6fe;
`;

export const ShowcaseSideTag = styled.div`
  display: flex;
  padding-top: 8px;
  padding-bottom: 8px;
  height: 47px;
  width: 276px;
  position: relative;
  background-color: #e2f6fe;
  p {
    cursor: pointer;
    margin-left: 14px;
    margin-bottom: 0px;
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    font-family: "Arial MT";
  }
  border-bottom: 1px solid #e2f6fe;
`;

export const ShowcaseSideName = styled.h6`
  line-height: 40px;
  font-weight: bold;
  margin-left: 4px;
  font-size: 16px;
  img {
    height: 16px;
  }
`;

export const ShowcaseSideNum = styled.p`
  position: absolute;
  line-height: 40px;
  width: 64px;
  float: right;
  background-color: #ffdf00;
  right: 0px;
  text-align: center;
  border-radius: 20px;
  font-weight: bold;
  color: #ef392a;
`;

export const ShowcaseTagText = styled.h2`
  height: 56px;
  margin-top: 8px;
  margin-bottom: 8px;
  background-color: #c1eeff;
  padding: 8px 8px;
  line-height: 40px;
  font-size: 24px;
  width: 100%;
`;
