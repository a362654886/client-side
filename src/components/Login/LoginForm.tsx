import * as React from "react";
import { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { userAuth } from "../../api/userApi";
import { AUTH_FAIL, AUTH_SUCCESS, AUTH_LOADING } from "../../redux/auth";
import { LoginType } from "../../types/EnumTypes";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { LOGIN_USER_ADD } from "../../redux/loginUser";

/*
  Css in js 
  */

const LoginInput = styled(InputGroup)`
  margin: 0 auto;
  width: 250px;
  .inputTitle {
    height: 30px;
    width: 100px;
    margin-bottom: 1rem;
    background-color: #ee6fa9;
    color: white;
    border-radius: 15px;
  }
  .inputContext {
    height: 30px;
    width: 100px;
    margin-bottom: 1rem;
  }
`;

const LoginButton = styled(Button)`
  height: 30px;
  width: 70px;
  padding: 0 5px 0 5px;
  margin: 0 auto;
  border-radius: 15px;
`;

/*
  Css in js end
  */

const LoginForm = (): JSX.Element => {
  const [userEmail, setEmail] = useState("");
  const [passWord, setPassword] = useState("");

  const history = useHistory();
  const dispatch = useDispatch();

  const submit = async () => {
    dispatch(async () => {
      await userLogin(userEmail, passWord);
    });
  };

  const onChange = (e: React.ChangeEvent<Element>) => {
    if ((e.target as HTMLInputElement).placeholder == "email") {
      setEmail((e.target as HTMLInputElement).value);
    }
    if ((e.target as HTMLInputElement).placeholder == "password") {
      setPassword((e.target as HTMLInputElement).value);
    }
  };

  const userLogin = async (userEmail: string, password: string) => {
    dispatch({
      payload: LoginType.LOADING,
      type: AUTH_LOADING,
    });
    const result = await userAuth(userEmail, password);
    if (result == null) {
      dispatch({
        payload: LoginType.FAIL,
        type: AUTH_FAIL,
      });
    } else {
      dispatch({
        payload: LoginType.SUCCESS,
        type: AUTH_SUCCESS,
      });
      dispatch({
        payload: result,
        type: LOGIN_USER_ADD,
      });
    }
  };

  const toSignUp = () => {
    history.push("/signUpPage");
  };

  return (
    <>
      <LoginInput>
        <InputGroup.Prepend>
          <InputGroup.Text className="inputTitle">UserEmail:</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          className="inputContext"
          aria-describedby="basic-addon3"
          placeholder="email"
          onChange={onChange}
          value={userEmail}
        />
      </LoginInput>
      <LoginInput>
        <InputGroup.Prepend>
          <InputGroup.Text className="inputTitle">Password</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl
          className="inputContext"
          aria-describedby="basic-addon3"
          placeholder="password"
          onChange={onChange}
          value={passWord}
        />
      </LoginInput>
      <LoginInput>
        <LoginButton variant="primary" onClick={submit}>
          Log In
        </LoginButton>
        <LoginButton variant="secondary" onClick={toSignUp}>
          Sign up
        </LoginButton>
      </LoginInput>
    </>
  );
};

export default LoginForm;
