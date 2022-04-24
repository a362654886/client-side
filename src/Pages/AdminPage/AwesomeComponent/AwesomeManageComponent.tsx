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
import {
  awesomeLevelAdd,
  awesomeLevelUpdate,
} from "../../../api/awesomeLevelAPI";
import { AwesomeLevelType } from "../../../types/awesomeLevel";
import { cloneDeep } from "lodash";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../../helperFns/popUpAlert";

interface IProps {
  awesomeLevels: AwesomeLevelType[];
  update: (levels: AwesomeLevelType[]) => void;
}

const AwesomeManageComponent = ({
  awesomeLevels,
  update,
}: IProps): JSX.Element => {
  const [levels, setLevels] = useState<AwesomeLevelType[]>([]);

  useEffect(() => {
    setLevels(awesomeLevels);
  }, [awesomeLevels]);

  useEffect(() => {
    //
  }, [levels]);

  const updateImg = (imgString: string, index: number) => {
    const newLevels = cloneDeep(levels);
    newLevels[index].image = imgString;
    setLevels(newLevels);
  };

  const updateRequirements = (requirements: number, index: number) => {
    const newLevels = cloneDeep(levels);
    newLevels[index].awesomeRequire = requirements;
    setLevels(newLevels);
  };

  const updateLevel = async (index: number) => {
    const r = await awesomeLevelUpdate(levels[index]);
    if (r && r < 300) {
      openNotification(
        "update success",
        NotificationColor.Success,
        NotificationTitle.Success
      );
      update(levels);
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
      {levels.map((item, index) => {
        return (
          <div key={index}>
            <AwesomeCreatHeader>{`${item._id}`}</AwesomeCreatHeader>
            <AwesomeCreatImgBody>
              <div>
                <img src={item.image} />
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
                    setImg={(value: ImageBody) =>
                      updateImg(value.imgBase64, index)
                    }
                    margin={"0px"}
                  />
                </AvatarUpload>
              </div>
            </AwesomeCreatImgBody>
            <AwesomeCreatAwesomeRequiredBody>
              <h6>Awesome required</h6>
              <div>
                <InputNumber
                  value={item.awesomeRequire}
                  onChange={(e) => updateRequirements(e, index)}
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
              buttonClick={() => updateLevel(index)}
            />
          </div>
        );
      })}
    </AwesomeCreatDiv>
  );
};

export default AwesomeManageComponent;
