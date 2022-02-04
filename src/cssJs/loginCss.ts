import styled from "styled-components";

export const LoginBox = styled.div`
  height: 810px;
  max-width: 289px;
  margin: auto;
  margin-top: 8px;
  position: relative;
`;

export const LoginTitle = styled.p`
  font-family: Arial;
  font-size: 24px;
  color: #f5a623;
  line-height: 32px;
  font-weight: bold;
  margin-bottom: 0;
`;

export const SignUpButtons = styled.div`
  display: flex;
  height: 64px;
  button {
    margin-left: 18px;
    margin-top: 16px;
  }
`;

export const LoginButton = styled.div`
  button {
    margin-left: 166px;
    margin-top: 16px;
    position: absolute;
  }
`;

export const EmailInput = styled.div`
  height: 112px;
  h3 {
    height: 45px;
    font-size: 16px;
    font-weight: bold;
    color: #302d46;
    margin-top: 16px;
    margin-bottom: 0px;
  }
  Input {
    margin-top: 0px;
    width: 100%;
    height: 38px;
  }
  Select {
    width: 100%;
  }
`;

export const PasswordInput = styled.div`
  height: 112px;
  h3 {
    height: 45px;
    font-size: 16px;
    font-weight: bold;
    color: #302d46;
    margin-top: 16px;
    margin-bottom: 0px;
  }
  Input {
    margin-top: 0px;
    width: 100%;
    height: 28px;
  }
`;

export const NameInput = styled.div`
  height: 158px;
  h3 {
    height: 45px;
    font-size: 16px;
    font-weight: bold;
    color: #302d46;
    margin-top: 16px;
    margin-bottom: 0px;
  }
  Input {
    margin-top: 8px;
    width: 100%;
    height: 38px;
  }
`;

export const LoginClickButton = styled.div`
  margin-left: 92px;
  margin-top: 16px;
  position: absolute;
`;

// signup

export const SignUpBox = styled.div`
  height: 1354px;
  width: 289px;
  margin: auto;
  margin-top: 23px;
  position: relative;
`;

export const ConfirmInput = styled.div`
  margin-top: 231px;
  position: absolute;
  display: flex;
  p {
    width: 63px;
    height: 22px;
    font-size: 14px;
    font-weight: bold;
    color: #302d46;
    margin-top: 5px;
  }
  Input {
    margin-left: 30px;
    width: 197px;
    height: 32px;
  }
`;

export const FirstNameInput = styled.div`
  margin-top: 297px;
  position: absolute;
  display: flex;
  p {
    width: 43px;
    height: 22px;
    font-size: 14px;
    font-weight: bold;
    color: #302d46;
    margin-top: 5px;
  }
  Input {
    margin-left: 49px;
    width: 197px;
    height: 32px;
  }
`;

export const LastNameInput = styled.div`
  margin-top: 355px;
  position: absolute;
  display: flex;
  p {
    width: 43px;
    height: 22px;
    font-size: 14px;
    font-weight: bold;
    color: #302d46;
    margin-top: 5px;
  }
  Input {
    margin-left: 49px;
    width: 197px;
    height: 32px;
  }
`;

export const CountryInput = styled.div`
  margin-top: 413px;
  display: flex;
  p {
    width: 43px;
    height: 22px;
    font-size: 14px;
    font-weight: bold;
    color: #302d46;
    margin-top: 5px;
  }
  Input {
    margin-left: 49px;
    width: 197px;
    height: 32px;
  }
`;

export const AvatarInput = styled.div`
  margin-top: 8px;
  p {
    width: 48px;
    height: 22px;
    font-size: 14px;
    font-weight: bold;
    color: #302d46;
    margin-top: 5px;
  }
`;

export const SubmitClickButton = styled.div`
  margin-left: 92px;
  margin-top: 48px;
`;

export const AvatarBox1 = styled.div`
  display: inline;
  margin-left: 32px;
  position: absolute;
  height: 180px;
`;
export const AvatarBox2 = styled.div`
  display: inline;
  margin-left: 96px;
  position: absolute;
  height: auto;
`;
export const AvatarBox3 = styled.div`
  display: inline;
  margin-left: 160px;
  position: absolute;
  height: auto;
`;
export const AvatarBox4 = styled.div`
  display: inline;
  margin-left: 224px;
  position: absolute;
  height: auto;
`;

export const AvatarImg = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px;
`;

export const AvatarChooseImg = styled.img`
  width: 40px;
  height: 40px;
  margin: 10px;
  background-color: #ffc300;
`;

// alert
export const AlertDiv = styled.p`
  p {
    color: #4a4a4a;
    font-size: 14px;
    line-height: 22px;
    width: 100%;
    height: auto;
    padding: 7px 20px;
    background-color: ${(props) => props.color};
  }
`;
