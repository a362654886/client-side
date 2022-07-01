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

const defaultIphoneCheckBox: MallCustomInputCheckBoxType[] = [
  {
    name: "iPhone 13 Pro Max",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone 13 Pro",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone 13",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone 13 Mini",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone 12 Pro Max",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone 12 Pro",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone 12",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone 12Mini",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone 11 Pro Max",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone 11Pro",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone 11",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone 11 SE 2022",
    choose: false,
    value: "0",
  },
];

const defaultSamsungCheckBox: MallCustomInputCheckBoxType[] = [
  {
    name: "Galaxy S22 Ultra",
    choose: false,
    value: "0",
  },
  {
    name: "Galaxy S22 Plus",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone S22",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone Z Flip3",
    choose: false,
    value: "0",
  },
  {
    name: "Galaxy S21 Ultra",
    choose: false,
    value: "0",
  },
  {
    name: "Galaxy S21 Plus",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone S21",
    choose: false,
    value: "0",
  },
  {
    name: "iPhone S21 FE",
    choose: false,
    value: "0",
  },
];

const MallPhone = ({ changeAttributes }: IProps): JSX.Element => {
  const [iphoneQuantities, setIphoneQuantities] = useState<
    MallCustomInputCheckBoxType[]
  >(defaultIphoneCheckBox);

  const [samsungQuantities, setSamsungQuantities] = useState<
    MallCustomInputCheckBoxType[]
  >(defaultSamsungCheckBox);

  const [otherType, setOtherType] = useState<string>("");

  const [otherTypeQuantity, setOtherTypeQuantity] = useState<string>("0");

  const changeIphoneValue = (index: number, value: string) => {
    const newQuantities = cloneDeep(iphoneQuantities);
    newQuantities[index].value = value;
    setIphoneQuantities(newQuantities);

    sendValues();
  };

  const changeSamsungValue = (index: number, value: string) => {
    const newQuantities = cloneDeep(samsungQuantities);
    newQuantities[index].value = value;
    setSamsungQuantities(newQuantities);

    sendValues();
  };

  const sendValues = () => {
    let value = ``;
    value += `<p>Quantity by Types</p>`;
    iphoneQuantities.forEach((item) => {
      value += `<p>${item.name}-${item.value}</p>
    `;
    });
    samsungQuantities.forEach((item) => {
      value += `<p>${item.name}-${item.value}</p>
    `;
    });
    value += `<p>${
      otherType == "" ? "other type" : otherType
    }-${otherTypeQuantity}</p>`;

    changeAttributes(value);
  };

  return (
    <>
      <div>
        <MallCustomerInputTitle>Quantity by Types</MallCustomerInputTitle>
        <MallCustomerInputTitle>Iphone</MallCustomerInputTitle>
        {iphoneQuantities.map((item, index) => {
          return (
            <MallCustomerCheckBoxDiv key={index}>
              <p>{item.name}</p>
              <MallCustomerInput
                value={item.value}
                onChange={(e) => changeIphoneValue(index, e.target.value)}
              />
            </MallCustomerCheckBoxDiv>
          );
        })}
        <MallCustomerInputTitle>Samsung</MallCustomerInputTitle>
        {samsungQuantities.map((item, index) => {
          return (
            <MallCustomerCheckBoxDiv key={index}>
              <p>{item.name}</p>
              <MallCustomerInput
                value={item.value}
                onChange={(e) => changeSamsungValue(index, e.target.value)}
              />
            </MallCustomerCheckBoxDiv>
          );
        })}
        <MallCustomerInputTitle>Other</MallCustomerInputTitle>
        <div
          style={{
            display: "flex",
          }}
        >
          <MallCustomerInput
            style={{ marginRight: "20px" }}
            value={otherType}
            placeholder={"Type"}
            onChange={(e) => setOtherType(e.target.value)}
          />
          <MallCustomerInput
            value={otherTypeQuantity}
            onChange={(e) => setOtherTypeQuantity(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default MallPhone;
