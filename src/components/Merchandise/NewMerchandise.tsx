import { SelectValue } from "antd/lib/select";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllLabels } from "../../api/laeblAPI";
import { merchandiseAdd } from "../../api/merchandiseApi";
import {
  NewImage,
  NewMerchandiseDiv,
  NewMerchandiseImg,
  NewMerchandiseLabel,
} from "../../cssJs/MerchandiseCss";
import { ButtonDiv, ButtonPrimary } from "../../cssJs/publicCss";
import { ImageBody } from "../../types/BasicType";
import { InputBoxType } from "../../types/EnumTypes";
import { IStoreState } from "../../types/IStoreState";
import { Label } from "../../types/Label";
import { actionState } from "../../types/MerchandiseType";
import { User } from "../../types/User";
import ImgUploadDiv from "../conponentDivs/ImgUploadDiv";
import InputBox from "../InputBox";

const NewMerchandise = (): JSX.Element => {
  const history = useHistory();
  //const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [title, setTitle] = useState("");
  const [openingPrice, setOpeningPrice] = useState("");
  const [deadlineDay, setDeadlineDay] = useState(new Date("1900-01-01"));
  const [imageArr, setImageArr] = useState<ImageBody[]>([]);
  const [allLabels, setAllLabels] = useState<string[]>([]);
  const [label, setLabel] = useState<string[]>([]);
  const [uploadImg, setUploadImg] = useState<ImageBody>({
    width: 0,
    height: 0,
    imgBase64: "",
    imgName: "",
  });
  const [num, setUpdatePage] = useState(0);

  useEffect(() => {
    (async function anyNameFunction() {
      const labels: Label[] | null = await getAllLabels("", "");
      const labelChooses: string[] = [];
      labels?.forEach((label) => {
        labelChooses.push(label.labelName);
      });
      if (labels) {
        setAllLabels(labelChooses);
      }
    })();
    return () => {
      history.replace({
        pathname: `/mainPage/merchandise/filterMerchandise`,
      });
    };
  }, []);

  useEffect(() => {
    console.log(num);
  }, [num]);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "Title":
        setTitle((e.target as HTMLInputElement).value);
        break;
      case "Opening Bid":
        setOpeningPrice((e.target as HTMLInputElement).value);
        break;
    }
  };

  const onTimeChange = (e: any) => setDeadlineDay(new Date(e._d));

  const addImg = (value: ImageBody) => {
    imageArr.push(value);
    setImageArr(imageArr);
    setUploadImg(value);
    setUpdatePage(num + 1);
  };

  const onSelectChange = (e: SelectValue): void => setLabel(e as string[]);

  const submit = async () => {
    const time = new Date();
    const newMerchandise = {
      _id: (loginUser as User)._id + time.valueOf(),
      name: title,
      price: openingPrice,
      uploadTime: time,
      auctionLeftTime: deadlineDay,
      userEmail: (loginUser as User)._id,
      state: actionState.auctioning,
      likeNum: 0,
      top: false,
      imageBodies: imageArr,
      label: label,
      auctionEmail: (loginUser as User)._id,
      urlLinks:[]
    };
    await merchandiseAdd(newMerchandise);
  };

  return (
    <NewMerchandiseDiv>
      <InputBox
        Title="Title"
        onChange={onChange}
        type={InputBoxType.INPUT}
        value={title}
      />
      <InputBox
        Title="Opening Bid"
        onChange={onChange}
        type={InputBoxType.INPUT}
        value={openingPrice}
      />
      <InputBox
        Title="Deadline Day"
        onChange={onTimeChange}
        type={InputBoxType.DATE_PICKER}
      />
      <InputBox
        Title="Label"
        onMultipleSelectChange={onSelectChange}
        type={InputBoxType.MULTIPLE_SELECT}
        options={allLabels}
      />
      <ImgUploadDiv setImg={addImg} />
      <NewImage>
        <label>Image</label>
        <div>
          <NewMerchandiseImg
            src={(uploadImg as ImageBody).imgBase64}
            style={{
              width: "300px",
              height: "300px",
            }}
          />
        </div>
      </NewImage>
      <NewImage>
        <NewMerchandiseLabel>Images</NewMerchandiseLabel>
        {imageArr.map((img, index) => {
          return (
            <NewMerchandiseImg
              src={img.imgBase64}
              key={index}
              style={{ width: "100px", height: "100px" }}
            />
          );
        })}
      </NewImage>
      <ButtonDiv>
        <ButtonPrimary onClick={submit}>Submit</ButtonPrimary>
      </ButtonDiv>
    </NewMerchandiseDiv>
  );
};

export default NewMerchandise;
