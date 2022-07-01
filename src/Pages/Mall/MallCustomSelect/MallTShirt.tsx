import { Checkbox, Radio, Space } from "antd";
import { cloneDeep } from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  MallCustomerCheckBox,
  MallCustomerCheckBoxDiv,
  MallCustomerInput,
  MallCustomerInputTitle,
} from "../../../cssJs/MallPage/MallCustom";
import { MallRadio } from "../../../cssJs/MallPage/MallPageCss";
import { MallCustomInputCheckBoxType } from "../../../types/mallCustomType";

interface IProps {
  changeAttributes: (e: string) => void;
}

const defaultCheckBox: MallCustomInputCheckBoxType[] = [
  {
    name: "XXXL",
    choose: false,
    value: "0",
  },
  {
    name: "XXL",
    choose: false,
    value: "0",
  },
  {
    name: "XL",
    choose: false,
    value: "0",
  },
  {
    name: "L",
    choose: false,
    value: "0",
  },
  {
    name: "M",
    choose: false,
    value: "0",
  },
  {
    name: "S",
    choose: false,
    value: "0",
  },
];

const MallTShirt = ({ changeAttributes }: IProps): JSX.Element => {
  const [colorBase, setColorBase] = useState<string>("Black");
  const [quantities, setQuantities] =
    useState<MallCustomInputCheckBoxType[]>(defaultCheckBox);
  const [style, setStyle] = useState<string>("T-SHirt");

  useEffect(() => {
    sendValues();
  }, [colorBase]);

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
    value += `<p>Color: ${colorBase}</p>`;
    value += `<p>Quantity by Sizes</p>`;
    quantities.forEach((item) => {
      value += `<p>${item.name}: ${item.value}</p>`;
    });
    value += `<p>Style: ${style}</p>`;

    changeAttributes(value);
  };

  return (
    <>
      <div>
        <MallCustomerInputTitle>Color Base</MallCustomerInputTitle>
        <Radio.Group
          onChange={(e) => {
            setColorBase(e.target.value.toString());
          }}
          value={colorBase}
        >
          <Space direction="vertical">
            <MallRadio value={"Black"}>Black</MallRadio>
            <MallRadio value={"White"}>White</MallRadio>
          </Space>
        </Radio.Group>
      </div>
      <div>
        <MallCustomerInputTitle>Quantity by Sizes</MallCustomerInputTitle>
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
      <div>
        <MallCustomerInputTitle>Style</MallCustomerInputTitle>
        <Radio.Group
          onChange={(e) => {
            setStyle(e.target.value.toString());
          }}
          value={style}
        >
          <Space direction="vertical">
            <Radio value={"T-SHirt"}>T-SHirt</Radio>
            <Radio value={"Hoodies"}>Hoodies</Radio>
          </Space>
        </Radio.Group>
      </div>
    </>
  );
};

export default MallTShirt;
