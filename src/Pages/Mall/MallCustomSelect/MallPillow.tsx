import { cloneDeep } from "lodash";
import * as React from "react";
import { useState } from "react";
import {
  MallCustomerCheckBox,
  MallCustomerCheckBoxDiv,
  MallCustomerInput,
  MallCustomerInputTitle,
} from "../../../cssJs/MallPage/MallCustom";
import { MallCustomInputCheckBoxType } from "../../../types/mallCustomType";

interface IProps {
  changeAttributes: (e: string) => void;
}

const defaultCheckBox: MallCustomInputCheckBoxType[] = [
  {
    name: "45 cm * 45 cm",
    choose: false,
    value: "0",
  },
  {
    name: "50 cm * 150 cm",
    choose: false,
    value: "0",
  },
];

const MallPillow = ({ changeAttributes }: IProps): JSX.Element => {
  const [quantities, setQuantities] =
    useState<MallCustomInputCheckBoxType[]>(defaultCheckBox);

  const changeCheckBox = (index: number) => {
    const newQuantities = cloneDeep(quantities);
    newQuantities[index].choose = !newQuantities[index].choose;
    setQuantities(newQuantities);

    sendValues(newQuantities);
  };

  const changeValue = (index: number, value: string) => {
    const newQuantities = cloneDeep(quantities);
    newQuantities[index].value = value;
    setQuantities(newQuantities);

    sendValues(newQuantities);
  };

  const sendValues = (quantities: MallCustomInputCheckBoxType[]) => {
    let value = ``;
    value += `<p>Quantity by Sizes</p>`;
    quantities.forEach((item) => {
      if (parseInt(item.value) > 0) {
        value += `<p>${item.name} - ${item.value}</p>`;
      }
    });

    changeAttributes(value);
  };

  return (
    <>
      <div>
        <MallCustomerInputTitle>Quantity by Sizes</MallCustomerInputTitle>
        {quantities.map((item, index) => {
          return (
            <MallCustomerCheckBoxDiv key={index}>
              <p>{item.name}</p>
              <MallCustomerInput
                value={item.value}
                onChange={(e) => changeValue(index, e.target.value)}
              />
            </MallCustomerCheckBoxDiv>
          );
        })}
      </div>
    </>
  );
};

export default MallPillow;
