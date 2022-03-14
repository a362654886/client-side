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

    sendValues();
  };

  const changeValue = (index: number, value: string) => {
    const newQuantities = cloneDeep(quantities);
    newQuantities[index].value = value;
    setQuantities(newQuantities);

    sendValues();
  };

  const sendValues = () => {
    let value = ``;
    quantities.forEach((item) => {
      value = `${value}
      ${item.name}: ${item.value}
      `;
    });

    changeAttributes(value);
  };

  return (
    <>
      <div>
        <MallCustomerInputTitle>Quantity Sizes</MallCustomerInputTitle>
        {quantities.map((item, index) => {
          return (
            <MallCustomerCheckBoxDiv key={index}>
              <MallCustomerCheckBox
                onChange={(e) => {
                  changeCheckBox(index);
                }}
              >
                {item.name}
              </MallCustomerCheckBox>
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
