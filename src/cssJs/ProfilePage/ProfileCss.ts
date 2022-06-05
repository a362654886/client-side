import styled from "styled-components";

export const ProfileBox = styled.div`
  height: auto;
  max-width: 1121px;
  margin: auto;
  margin-top: 24px;
`;

export const ProfileFollowBox = styled.div`
  height: auto;
  max-width: 680px;
  margin: auto;
`;

export const ProfileSettingBox = styled.div`
  height: auto;
  max-width: 840px;
  margin: auto;
  margin-top: 24px;
`;

export const ProfileDiv = styled.div`
  height: 112px;
  max-width: 432px;
  margin-top: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
  display: inline;
  div {
    display: inline;
  }
`;

export const ProfileFollowDiv = styled.div`
  height: 112px;
  width: 432px;
  margin: 8px auto;
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
  border-radius: 40px;
`;

export const LevelPic = styled.img`
  width: 30.4px;
  height: 38.8px;
  margin-top: 10px;
  margin-right: 8px;
  cursor: pointer;
`;

export const ProfileAwesomePic = styled.img`
  width: 25px;
  height: 20px;
  margin-top: 20px;
  margin-right: 8px;
  cursor: pointer;
`;

export const ProfileSlider = styled.div`
  display: flex;
  position: relative;
  margin-top: 20px;
  p {
    position: absolute;
    line-height: 20px;
    margin-bottom: 0px;
    color: #ef392a;
    font-weight: bold;
    right: 100px;
    z-index: 10000;
  }
  .ant-slider,
  .ant-slider-disabled {
    height: 20px;
    margin: 0px;
    background-color: #f6f6f6;
    border-radius: 0px 20px 20px 0px;
  }
  .ant-slider-track {
    top: -1px;
    height: 20px;
    margin: 0px;
    background-color: #ffdf00 !important;
    border-radius: 20px 20px 20px 20px;
  }
  .ant-slider-step {
    height: 0px;
  }
  .ant-slider-handle {
    height: 0px;
    width: 0px;
    border: 0px solid white;
  }
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

export const MobileButtonsDiv = styled.div`
  margin-top: 16px;
  button {
    margin-right: 16px;
    margin-top: 8px;
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

export const LineProfileDiv = styled.div`
  height: 31px;
  width: 100%;
  max-width: 896px;
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
    margin-top:4px
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
  cursor: pointer;
`;

export const SettingFollowerDiv = styled.div`
  height: 64px;
  margin-top: 16px;
  margin-bottom: 16px;
  display: inline;
  margin-right: 42px;
  width: 64px;
  text-align: center;
  cursor: pointer;
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
  max-width: 840px;
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
  max-width: 840px;
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
  max-width: 840px;
  background-color: #ecf9fe;
  margin-top: 8px;
  position: relative;
  padding: 0px 8px;
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

export const ProfileAddButtonDiv = styled.div`
  margin-bottom: 16px;
`;

export const ProfileReply = styled.p`
  position: absolute;
  bottom: 5px;
  cursor: pointer;
  font-weight: bold;
  color: #4ba3c3;
`;

export const ProfileLevelBox = styled.div`
  height: auto;
  max-width: 840px;
  margin: auto;
`;

export const ProfileLevelDiv = styled.div`
  height: 152px;
  width: 380px;
  margin: 0px auto;
  margin-top: 8px;
  padding-top: 16px;
  padding-bottom: 16px;
  display: flex;
  div {
    display: inline;
  }
`;

export const ProfileLevelAwesome = styled.div`
  display: flex;
  width: 200px;
  margin: 0px auto;
  height: 64px;
  padding: 16px 0px;
  h6 {
    margin-left: 5px;
  }
`;

export const ProfileLevelH2 = styled.h2`
  width: 100%;
  margin: 0px auto;
  text-align: center;
  font-size: 24px;
  line-height: 32px;
  padding: 8px 0px;
`;

export const ProfileLevelImgBox = styled.div`
  width: 248px;
`;

export const ProfileLevelImgDiv = styled.div`
  width: 248px;
  margin-bottom:32px;
  div {
    display: flex;
  }
  h6 {
    height: 40px;
    line-height: 40px;
    font-size: 24px;
    font-weight: "bold";
  }
  p {
    position: absolute;
    line-height: 36px;
    margin-bottom: 0px;
    color: #ef392a;
    font-weight: bold;
    right: 120px;
    z-index: 10000;
  }
  .ant-slider,
  .ant-slider-disabled {
    height: 32px;
    margin: 0px;
    background-color: #f6f6f6;
    border-radius: 0px 20px 20px 0px;
  }
  .ant-slider-track {
    top: -1px;
    height: 32px;
    margin: 0px;
    background-color: #ffdf00 !important;
    border-radius: 20px 20px 20px 20px;
  }
  .ant-slider-step {
    height: 0px;
  }
  .ant-slider-handle {
    height: 0px;
    width: 0px;
    border: 0px solid white;
  }
`;

export const ProfileImgDiv = styled.div`
  width: 80px;
  height: 100px;
  margin: 0px auto;
`;

export const ProfileLevelMainDiv = styled.div`
  max-width: 640px;
  margin: 0px auto;
`;

export const ProfileDesignHistory = styled.h2`
  height: 56px;
  padding: 8px 0px;
  margin-bottom: 0px;
  line-height: 40px;
  font-weight: bold;
`;

export const ProfileDesignTime = styled.p`
  height: 32px;
  line-height: 32px;
  font-size: 14px;
`;

export const ProfileDesignAttribute = styled.p`
  height: 32px;
  line-height: 32px;
  font-size: 16px;
`;
