import * as React from "react";
import { useState } from "react";
import { plateAdd } from "../../api/postAPI";
import { IconDiv, ImageShow, PlateAddDiv } from "../../cssJs/ManagementCss";
import { ButtonDiv, ButtonPrimary } from "../../cssJs/publicCss";
import { ImageBody } from "../../types/BasicType";
import { InputBoxType } from "../../types/EnumTypes";
import ImgUploadDiv from "../conponentDivs/ImgUploadDiv";
import InputBox from "../InputBox";

const PlateAdd = (): JSX.Element => {
  const [image, setIMage] = useState<string>("");
  const [imageName, setIMageName] = useState<string>("");
  const [plateName, setPlateName] = useState("");

  const onChange = (e: React.ChangeEvent<Element>): void =>
    setPlateName((e.target as HTMLInputElement).value);

  const submit = async () => {
    await plateAdd({
      _id: plateName,
      plateId: plateName,
      plateName: plateName,
      imgName: imageName,
      imgBase64: image,
    });
  };

  const setImg = (value: ImageBody) => {
    setIMage(value.imgBase64);
    setIMageName(value.imgName);
  }

  return (
    <PlateAddDiv>
      <InputBox
        Title="Plate Name"
        onChange={onChange}
        type={InputBoxType.INPUT}
        value={plateName}
      />
      <ImgUploadDiv setImg={setImg} />
      <IconDiv>
        <label>Plate icon</label>
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

export default PlateAdd;
