import { InputNumber } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  AwesomeCreatAwesomeRequiredBody,
  AwesomeCreatDiv,
  AwesomeCreatHeader,
  AwesomeCreatImgBody,
} from "../../../cssJs/AdminPage/animeAwesomeCss";
import { AvatarUpload } from "../../../cssJs/AdminPage/adminSysSettingCss";
import ImageUpload, { ImageBody } from "../ImageUpload";
import AnimeButton from "../../../components/Button";
import { awesomeLevelAdd } from "../../../api/awesomeLevelAPI";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../../helperFns/popUpAlert";

interface IProps {
  num: number;
  update: () => void;
}

const AwesomeCreatComponent = ({ num, update }: IProps): JSX.Element => {
  const [img, setImg] = useState<ImageBody>({
    width: 0,
    height: 0,
    imgBase64: "",
    imgName: "",
  });
  const [aweSomeRequited, setAwesomeRequired] = useState<number>(0);
  const [titleIndex, setTitleIndex] = useState<number>(0);

  useEffect(() => {
    setTitleIndex(num + 1);
  }, [num]);

  const insertNewAwesomeLevel = async () => {
    const status = await awesomeLevelAdd({
      _id: titleIndex.toString(),
      image: img.imgBase64,
      awesomeRequire: aweSomeRequited,
    });
    if (status == 200) {
      setImg({
        width: 0,
        height: 0,
        imgBase64: "",
        imgName: "",
      });
      setAwesomeRequired(0);
      update();
      openNotification(
        "creat success",
        NotificationColor.Success,
        NotificationTitle.Success
      );
    } else {
      openNotification(
        "update fail",
        NotificationColor.Error,
        NotificationTitle.Error
      );
    }
  };

  return (
    <AwesomeCreatDiv>
      <AwesomeCreatHeader>{`Level ${titleIndex}`}</AwesomeCreatHeader>
      <AwesomeCreatImgBody>
        <div>
          <img src={img.imgBase64} />
        </div>
        <div>
          <AvatarUpload>
            <ImageUpload
              width={"120px"}
              height={"32px"}
              textColor={"black"}
              backGroundColor={"white"}
              border={"1px solid #D1D2D3"}
              text={"Badge Icon"}
              setImg={(value: ImageBody) => setImg(value)}
              margin={"0px"}
            />
          </AvatarUpload>
        </div>
      </AwesomeCreatImgBody>
      <AwesomeCreatAwesomeRequiredBody>
        <h6>Awesome required</h6>
        <div>
          <InputNumber
            value={aweSomeRequited}
            onChange={(e) => setAwesomeRequired(e)}
          />
        </div>
      </AwesomeCreatAwesomeRequiredBody>
      <AnimeButton
        para=""
        text={"Set"}
        width="120px"
        height="32px"
        textColor="white"
        backGroundColor="#FFC300"
        borderColor="#FFC300"
        buttonClick={() => insertNewAwesomeLevel()}
      />
    </AwesomeCreatDiv>
  );
};

export default AwesomeCreatComponent;
