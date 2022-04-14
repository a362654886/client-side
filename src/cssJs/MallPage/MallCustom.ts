import { Checkbox, Input } from "antd";
import styled from "styled-components";

export const MallCustomTitle = styled.h2`
  height: 52px;
  padding: 8px auto;
  font-size: 24px;
  line-height: 32px;
  font-weight: bold;
  margin-bottom: 0px;
`;

export const MallCustomHeaderDiv = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  margin-right: 30px;
  height: 80px;
`;

export const MallCustomHeader = styled.div`
  height: 144px;
  display: flex;
  img {
    height: 80px;
    width: 80px;
    cursor: pointer;
  }
`;

export const MallCustomImgDiv = styled.div`
  width: 100%;
  position: relative;
`;

export const MallCustomInsideImgDiv = styled.div`
  width: 600px;
  margin: 0px;
  position: relative;
`;

export const MallCustomInsideBackImg = styled.img`
  margin: 0px auto;
  text-align: center;
`;

export const MallCustomScrollInsideInnerImg = styled.img`
  position: absolute;
  top: 53px;
  left: 125px;
  width: 345px;
  height: 525px;
`;

export const MallCustomPillowInsideInnerImg = styled.img`
  position: absolute;
  top: 20px;
  left: 125px;
  width: 345px;
  height: 525px;
`;

export const MallCustomerInputTitle = styled.h3`
  height: 32px;
  padding: 8px 0px;
  font-size: 16px;
  font-weight: bold;
  line-height: 32px;
  color: #302d46;
`;

export const MallCustomerInput = styled(Input)`
  height: 32px;
  padding: 8px 4px;
  margin-bottom: 0px;
  width: 102px;
`;

export const MallCustomerCheckBoxDiv = styled.div`
  display: flex;
  margin-bottom: 12px;
  p {
    width: 150px;
  }
`;

export const MallCustomerCheckBox = styled(Checkbox)`
  height: 48px;
  padding: 0px;
  line-height: 32px;
  margin-bottom: 0px;
  width: 150px;
`;

export const MallCustomerEmailInput = styled(Input)`
  height: 40px;
  padding: 8px 4px;
  width: 315px;
  margin-bottom: 40px;
`;

export const ButtonDiv = styled.div`
  margin-bottom: 40px;
`;

export const MallCustomerTshirtImg = styled.img`
  position: absolute;
  top: 150px;
  left: 120px;
  height: 180px;
  width: 120px;
`;
export const MallCustomerScrollImg = styled.img`
  position: absolute;
  top: 30px;
  left: 60px;
  height: 360px;
  width: 230px;
`;
