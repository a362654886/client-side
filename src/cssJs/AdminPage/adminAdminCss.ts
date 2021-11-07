import { Button, Input } from "antd";
import styled from "styled-components";

export const AdminAnimeDiv = styled.div`
  width: 1170px;
  height: calc(100vh);
  margin: 0 auto;
`;

export const ButtonsDiv = styled.div`
  margin-left: 56px;
  margin-top: 66px;
  height: 32px;
  display: flex;
  button {
    margin-right: 23px;
  }
`;

export const AdminAnimeInput = styled.div`
  display: flex;
  margin-top: 24px;
  p {
    width: 89px;
    height: 24px;
    font-size: 16px;
    font-weight: bold;
    color: #302d46;
    line-height: 36px;
  }
  Input {
    margin-left: 13px;
    width: 516px;
    height: 36px;
  }
`;

export const UploadImageDiv = styled.div`
  display: flex;
  margin-top: 17px;
  p {
    width: 89px;
    height: 16px;
    font-size: 14px;
    font-weight: bold;
    color: #302d46;
    line-height: 16px;
  }
  img {
    width: 280px;
    height: 280px;
    margin-left: 38px;
  }
`;

export const UploadImageButton = styled.div`
  margin-left: 220px;
  margin-top: 38px;
`;

export const WhereWatchDiv = styled.div`
  width: 335px;
  margin-top: 30px;
  p {
    width: 126px;
    height: 16px;
    font-size: 14px;
    font-weight: bold;
    color: #302d46;
    line-height: 16px;
  }
  label {
    width: 128px;
    height: 40px;
    margin-right: 38px;
  }
`;

export const WhereWatchImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const AnimeCreateSubmitButton = styled.div`
  margin-top: 38px;
  margin-left: 271px;
  padding-bottom: 38px;
`;
