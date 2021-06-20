import * as React from "react";
import { Redirect, Route } from "react-router-dom";

interface IProps {
  component: any;
  path: string;
}

// nested route

const PrivateRoute = ({ component, path }: IProps): JSX.Element => {
  const isLogin = (): boolean => {
    return true;
  };

  return isLogin() ? (
    <Route path={path} component={component} />
  ) : (
    <Redirect to="/login" />
  );
};

export default PrivateRoute;
