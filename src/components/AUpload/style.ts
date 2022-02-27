import { Button } from "antd";
import styled from "styled-components";

export const UploadButtons = styled.div`
  display: flex;
  margin: 20px auto;
  border-radius: 20px;
  span {
    width: 100%;
  }
`;

export const LogoImg = styled.img`
  width: 230px;
  height: 230px;
  border: 1px solid black;
`;

export const AvatarUploadImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const UploadInput = styled(Button)`
  width: 150px;
  height: 40px;
  border-radius: 200px;
  color: var(--main);
  border: 1px solid var(--main);
`;

export const ImageDeleteDiv = styled(Button)`
  float: right;
  background-color: white;
  border: 1px solid white;
  color: var(--main);
  svg {
    height: 22px;
    width: 20px;
  }
`;

export const BrandingSettingHeader = styled.p`
  margin-top: 20px;
  margin-bottom: 14px;
  font-size: 14px;
  color: #555f61;
  text-transform: uppercase;
  display: block;
`;

export const ImageAddButtonDiv = styled.div`
  display: flex;
  margin: 0px auto;
  margin-top: 100px;
  img {
    height: 32px;
    weight: 32px;
    margin-right: 8px;
  }
  p {
    margin-top: 4px;
  }
`;
