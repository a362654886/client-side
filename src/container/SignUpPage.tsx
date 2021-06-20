import * as React from "react";
import { FlexBody, Header } from "../cssJs/publicCss";
import { Row } from "antd";
import styled from "styled-components";
import UserAdd from "../components/SignUp/UserAdd";
import { NewUserBody } from "../redux/newUser";
import { IStoreState } from "../types/IStoreState";
import { useSelector } from "react-redux";
import { BooleanType, ColorType, NewUserType } from "../types/EnumTypes";
import UserLabelAdd from "../components/SignUp/UserLabelAdd";
import { Spinner } from "react-bootstrap";
import { getTriangleDiv } from "../components/conponentDivs/trangleDiv";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const PageBody = styled.div`
  margin: auto 10%;
`;

const SignUpPage = (): JSX.Element => {

  const history = useHistory();

  const newUserState: NewUserBody = useSelector(
    (state: IStoreState) => state.newUserState
  );

  useEffect(() => {
    if (newUserState.state == NewUserType.SUCCESS) {
      setStripeOne(ColorType.LIGHTPINK);
      setStripeTwo(ColorType.PINK);
    }
    if (newUserState.state == NewUserType.BACK) {
      history.push("mainPage");
    }
  });

  const [stripeOne, setStripeOne] = useState(ColorType.PINK);
  const [stripeTwo, setStripeTwo] = useState(ColorType.LIGHTPINK);

  const getBody = () => {
    switch (newUserState.state) {
      case NewUserType.SUCCESS:
        return <UserLabelAdd />;
      case NewUserType.LOADING:
        return <Spinner animation="border" variant="info" />;
      case NewUserType.FAIL:
        return (
          <UserAdd
            alert={{
              type: BooleanType.FAIL,
              context: "login fail",
            }}
          />
        );
      default:
        return (
          <UserAdd
            alert={{
              type: BooleanType.INI,
              context: "",
            }}
          />
        );
    }
  };

  return (
    <>
      <Header>
        <Row></Row>
      </Header>
      <PageBody>
        <FlexBody>
          {getTriangleDiv(
            stripeOne,
            false,
            "Please input your basic information",
            "1rem 0 1rem 1rem"
          )}
          {getTriangleDiv(
            stripeTwo,
            true,
            "Which manga do you like?",
            "1rem 1rem 1rem 0 "
          )}
        </FlexBody>
        {getBody()}
      </PageBody>
    </>
  );
};

export default SignUpPage;
