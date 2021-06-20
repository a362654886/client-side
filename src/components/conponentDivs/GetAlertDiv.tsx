import * as React from "react";
import { Alert } from "antd";
import { AlertBody } from "../../types/BasicType";
import { BooleanType } from "../../types/EnumTypes";
import { useState } from "react";

interface IProps {
  alert: AlertBody;
  show: string;
}

export const GetAlertDiv = ({ alert,show }: IProps): JSX.Element => {

  const getType = () => {
    switch (alert.type) {
      case BooleanType.SUCCESS:
        return "success";
      case BooleanType.FAIL:
        return "error";
      default:
        return "error";
    }
  };

  return (
    <>
      <Alert
        message={alert.context}
        type={getType()}
        style={{ display: show ,width:"95%",margin:"0 auto"}}
      />
    </>
  );
};
