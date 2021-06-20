import * as React from "react";
import { useState } from "react";
import { labelAdd } from "../../api/laeblAPI";
import { IconDiv, ImageShow, PlateAddDiv } from "../../cssJs/ManagementCss";
import { ButtonDiv, ButtonPrimary } from "../../cssJs/publicCss";
import { ImageBody } from "../../types/BasicType";
import { InputBoxType } from "../../types/EnumTypes";
import ImgUploadDiv from "../conponentDivs/ImgUploadDiv";
import InputBox from "../InputBox";

const LabelAdd = (): JSX.Element => {
  const [image, setIMage] = useState<string>("");
  const [plateName, setPlateName] = useState("");
  const [labelName, setLabelName] = useState("");
  const [imageName, setIMageName] = useState<string>("");

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "Label Name":
        setLabelName((e.target as HTMLInputElement).value);
        break;
      case "Plate":
        setPlateName((e.target as HTMLInputElement).value);
        break;
    }
  };

  const submit = async () => {
    await labelAdd({
      _id: "label" + labelName,
      labelId: labelName,
      labelName: labelName,
      imgName: imageName,
      imgBase64: image,
      plateId: plateName,
    });
  };

  const setImg = (value: ImageBody) => {
    setIMage(value.imgBase64);
    setIMageName(value.imgName);
  };

  return (
    <PlateAddDiv>
      <InputBox
        Title="Label Name"
        onChange={onChange}
        type={InputBoxType.INPUT}
        value={labelName}
      />
      <InputBox
        Title="Plate"
        onChange={onChange}
        type={InputBoxType.INPUT}
        value={plateName}
      />
      <ImgUploadDiv setImg={setImg} />
      <IconDiv>
        <label>Label icon</label>
        <div>
          <ImageShow src={image} />
        </div>
      </IconDiv>
      <ButtonDiv>
        <ButtonPrimary onClick={submit}>Submit</ButtonPrimary>
      </ButtonDiv>
    </PlateAddDiv>
  );
};

export default LabelAdd;
