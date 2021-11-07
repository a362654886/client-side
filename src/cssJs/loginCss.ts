import styled from "styled-components";

export const LoginBox = styled.div`
  height: 810px;
  width: 289px;
  margin: auto;
  margin-top: 23px;
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

export const SignUpButton = styled.div`
  button {
    margin-left: 18px;
    margin-top: 45px;
    position: absolute;
  }
`;

export const LoginButton = styled.div`
  button {
    margin-left: 166px;
    margin-top: 45px;
    position: absolute;
  }
`;

export const EmailInput = styled.div`
  margin-top: 127px;
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

export const PasswordInput = styled.div`
  margin-top: 177px;
  position: absolute;
  display: flex;
  p {
    width: 71px;
    height: 22px;
    font-size: 14px;
    font-weight: bold;
    color: #302d46;
    margin-top: 5px;
  }
  Input {
    margin-left: 21px;
    width: 197px;
    height: 32px;
  }
`;

export const LoginClickButton = styled.div`
  margin-left: 92px;
  margin-top: 270px;
  position: absolute;
`;

// signup

export const SignUpBox = styled.div`
  height: 810px;
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

export const NameInput = styled.div`
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

export const AvatarInput = styled.div`
  margin-top: 355px;
  position: absolute;
  display: flex;
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
  margin-top: 613px;
  position: absolute;
`;

export const AvatarBox1 = styled.div`
  display: inline;
  margin-left: 85px;
  position: absolute;
`;
export const AvatarBox2 = styled.div`
  display: inline;
  margin-left: 166px;
  position: absolute;
`;
export const AvatarBox3 = styled.div`
  display: inline;
  margin-left: 238px;
  position: absolute;
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
    width: 281px;
    height: 36px;
    padding: 7px 20px;
    background-color: ${(props) => props.color};
  }
`;
