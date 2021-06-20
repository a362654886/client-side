import * as React from "react";
import { Alert } from "antd";
import { AlertBody } from "../../types/BasicType";
import { BooleanType } from "../../types/EnumTypes";

export const getAlert = (alert: AlertBody): JSX.Element => {
  switch (alert.type) {
    case BooleanType.SUCCESS:
      return <Alert message="Success Text" type="success" />;
    case BooleanType.FAIL:
      return <Alert message={alert.context} type="error" />;
      break;
    default:
      return <> </>;
  }
};
