import * as React from "react";
import { useState } from "react";
import {
  MallCustomerInput,
  MallCustomerInputTitle,
} from "../../../cssJs/MallPage/MallCustom";

interface IProps {
  changeAttributes: (e: string) => void;
}

const MallScroll = ({ changeAttributes }: IProps): JSX.Element => {
  const [quantity, setQuantity] = useState<string>("");

  const sendValues = (value: string) => {
    setQuantity(value);
    changeAttributes(`<p>Quantity: ${value}</p>`);
  };

  return (
    <>
      <div>
        <MallCustomerInputTitle>Quantity</MallCustomerInputTitle>
        <p>One Size: 60cm *60cm</p>
        <MallCustomerInput
          value={quantity}
          onChange={(e) => sendValues(e.target.value)}
        />
      </div>
    </>
  );
};

export default MallScroll;
