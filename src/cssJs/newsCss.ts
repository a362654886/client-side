import styled from "styled-components";

//news
export const NewMainBox = styled.div`
  margin-top: 32px;
  max-width: 1121px;
  margin: auto;
`;

export const NewHeaderTitle = styled.div`
  margin-top: 24px;
  margin-bottom: 32px;
  h1 {
    font-weight: bold;
    font-size: 36px;
    line-height: 44px;
    color: #302d46;
  }
`;

export const NewBody = styled.div`
  cursor: pointer;
  margin-top: 16px;
  h2 {
    font-weight: bold;
    font-size: 24px;
    line-height: 32px;
    color: #302d46;
  }
  p {
    margin-top: 8px;
    font-size: 14px;
    line-height: 22px;
    color: #4a4a4a;
  }
`;

export const NewBodyContext = styled.div`
  height: 30px;
  overflow: hidden;
`;

//new

export const OneNewHeader = styled.h1`
  margin-top: 32px;
  margin-bottom: 32px;
  font-weight: bold;
  font-size: 36px;
  line-height: 44px;
  color: #302d46;
`;

export const OneNewTime = styled.p`
  margin-bottom: 32px;
  font-size: 14px;
  line-height: 22px;
  color: #4a4a4a;
`;

export const OneNewText = styled.div`
  margin-bottom: 32px;
  font-size: 16px;
  line-height: 26px;
  color: #4a4a4a;
`;

export const OneNewSource = styled.div`
  h6 {
    height: 48px;
    font-size: 16px;
    line-height: 48px;
  }
  p {
    height: 32px;
    font-size: 14px;
    line-height: 32px;
    color: blue;
    cursor: pointer;
  }
`;

export const OneNewButtons = styled.div`
  display: flex;
  margin-top: 16px;
  margin-bottom: 31px;
  Button {
    margin-right: 20px;
  }
`;
