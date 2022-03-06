import styled from "styled-components";

export const ProfileBox = styled.div`
  height: auto;
  max-width: 1121px;
  margin: auto;
`;

export const ProfileSettingBox = styled.div`
  height: auto;
  max-width: 320px;
  margin: auto;
`;

export const ProfileDiv = styled.div`
  height: 112px;
  width: 332px;
  margin-top: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  div {
    display: inline;
  }
`;

export const ProfileMiddleDiv = styled.div`
  max-width: 896px;
  height: 64px;
  cursor: pointer;
  div {
    display: flex;
    margin: 0 auto;
    width: 120px;
    img {
      width: 32px;
      height: 32px;
      margin-top: 16px;
    }
    p {
      height: 32px;
      font-family: "Arial MT";
      margin-left: 8px;
      margin-top: 16px;
      line-height: 32px;
    }
  }
`;

export const NameDiv = styled.div`
  display: inline;
  margin-left: 16px;
`;

export const NameSetting = styled.div`
  display: flex !important;
  height: 48px;
  padding-top: 8px;
  padding-bottom: 8px;
  p {
    font-size: 16px;
    line-height: 32px;
    height: 32px;
    font-weight: bold;
    margin-bottom: 0px;
    margin-right: 16px;
  }
`;

export const NameIdDiv = styled.p`
  font-size: 16px;
  line-height: 32px;
  height: 32px;
  font-weight: bold;
  margin-bottom: 0px;
  margin-right: 16px;
  color: #bbbbbb;
`;

export const NamePic = styled.img`
  width: 80px;
  height: 80px;
  cursor: point;
`;

export const NameText = styled.p`
  width: 153px;
  height: 44px;
  font-size: 36px;
  font-weight: bold;
  font-family: "Arial";
  line-height: 44px;
  margin-left: 7px;
  margin-bottom: 0px;
  cursor: pointer;
`;

export const MessageDiv = styled.div`
  margin-top: 16px;
`;

export const InfoDiv = styled.div`
  height: 80px;
  h6 {
    font-weight: bold;
    height: 48px !important;
    padding-top: 8px;
    padding-bottom: 8px;
    height: 32px;
    line-height: 32px;
    margin-bottom: 0px;
    font-size: 16px;
  }
  p {
    height: 32px;
    height: 32px;
    line-height: 32px;
    margin-bottom: 0px;
    font-size: 16px;
  }
`;

export const SocialDiv = styled.div`
  height: 144px;
  h6 {
    font-weight: bold;
    height: 32px !important;
    height: 32px;
    line-height: 32px;
    margin-bottom: 0px;
    font-size: 16px;
  }
  p {
    height: 32px;
    height: 32px;
    line-height: 32px;
    margin-bottom: 0px;
    font-size: 16px;
  }
  img {
    height: 24px;
    weight: 24px;
    margin-right: 4px;
  }
`;

export const ButtonsDiv = styled.div`
  margin-top: 38px;
  display: flex;
  button {
    margin-right: 32px;
  }
`;

export const ProfileChildDiv = styled.div`
  //margin-top: 38px;
`;
export const LineDiv = styled.div`
  height: 31px;
  width: 70%;
  margin: 0 auto;
  border-bottom: 1px solid #aaffc9;
`;

export const ProfileCollectionDiv = styled.div`
  margin-top: 32px;
`;

export const ProfileSubDiv = styled.div`
  display: flex;
  width: 119px;
  margin-right: 32px;
  cursor: pointer;
  img {
    height: 24px;
    width: 24px;
    margin-right: 4px;
    margin-top: 4px;
  }
  h6 {
    height: 32px;
    line-height: 32px;
    color: #302d46;
    font-weight: bold;
  }
`;

export const SettingIconsDiv = styled.div`
  height: 64px;
  display: flex;
`;

export const SettingIconDiv = styled.div`
  height: 64px;
  width:84px;
  display: flex;
  padding-top:16px;
  margin-right:16px;
  cursor:pointer;
  img{
    height: 24px;
    width:24px;
    margin-top:4px;
  }
  p{
    margin-left:8px;
    font-family:"Arial MT"
    font-size:16px;
    line-height:32px;
    margin-bottom:0px;
    height:32px;
  }
`;

export const SettingFollowDiv = styled.div`
  height: 96px;
  display: flex;
  h6 {
    height: 32px;
    line-height: 32px;
    margin-bottom: 0px;
    font-weight: bold;
  }
  p {
    height: 32px;
    line-height: 32px;
    margin-bottom: 0px;
  }
`;

export const SettingFollowingDiv = styled.div`
  height: 64px;
  margin-top: 16px;
  margin-bottom: 16px;
  display: inline;
  margin-right: 54px;
  width: 60px;
  text-align: center;
`;

export const SettingFollowerDiv = styled.div`
  height: 64px;
  margin-top: 16px;
  margin-bottom: 16px;
  display: inline;
  margin-right: 42px;
  width: 64px;
  text-align: center;
`;

export const SettingAwesomeDiv = styled.div`
  height: 64px;
  margin-top: 16px;
  margin-bottom: 16px;
  display: inline;
  width: 102px;
  text-align: center;
`;

export const ContactInfoDiv = styled.div`
  height: 48px;
  width: 840px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  cursor: pointer;
  p {
    height: 32px;
    line-height: 32px;
    margin-bottom: 0px;
    color: #4ba3c3;
    font-weight: bold;
  }
  img {
    margin-top: 4px;
    margin-left: 4px;
    height: 24px;
    width: 24px;
  }
`;

export const ContactInfoContext = styled.div`
  height: 384px;
  width: 840px;
  padding: 8px;
  background-color: #e2f6fe;
`;

export const ProfileMessageButtons = styled.div`
  height: 48px;
  width: 100%;
  padding: 8px 0px;
  button {
    margin-right: 32px;
  }
`;

export const ProfileMessageBox = styled.div`
  height: 264px;
  width: 840px;
  background-color: #ecf9fe;
  margin-top: 8px;
`;

export const ProfileMessageMore = styled.div`
  width: 100%;
  max-width: 840px;
  height: 64px;
  cursor: pointer;
  div {
    display: flex;
    margin: 0 auto;
    width: 120px;
    img {
      width: 32px;
      height: 32px;
      margin-top: 16px;
    }
    p {
      height: 32px;
      font-family: "Arial MT";
      margin-left: 8px;
      margin-top: 16px;
      line-height: 32px;
    }
  }
`;
