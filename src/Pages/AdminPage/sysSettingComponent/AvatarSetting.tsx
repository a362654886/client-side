import { Spin } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { avatarAdd, avatarDelete, avatarsGet } from "../../../api/avatarAPI";
import AnimeButton from "../../../components/Button";
import { ImageBody } from "../../../components/ImageUpload";
import { AvatarDeleteDiv } from "../../../cssJs/AdminPage/adminNewsCss";
import {
  AdminSysAvatarDiv,
  AvatarButtonsDiv,
  AvatarUpload,
  ButtonsDiv,
} from "../../../cssJs/AdminPage/adminSysSettingCss";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { LoadingType } from "../../../types/EnumTypes";
import { Avatar } from "../../../types/User";
import ImageUpload from "../ImageUpload";

const AvatarSetting = (): JSX.Element => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState<boolean>(false);
  const [avatars, setAvatars] = useState<Avatar[] | null>(null);

  useEffect(() => {
    (async function anyNameFunction() {
      await getAvatars();
    })();
  }, []);

  useEffect(() => {
    //console.log(avatars);
  }, [avatars]);

  const getAvatars = async () => {
    //get all plate
    setLoading(true);
    const avatars: Avatar[] | null = await avatarsGet(false);
    setAvatars(avatars);
    setLoading(false);
  };

  const deleteAvatar = async (id: string) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    await avatarDelete(id);
    await getAvatars();
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const setImg = async (value: ImageBody) => {
    setLoading(true);
    await avatarAdd({
      _id: new Date().valueOf().toString(),
      imageName: value.imgName,
      imageUrl: value.imgBase64,
      privateAvatar: false,
    });
    await getAvatars();
    setLoading(false);
  };

  const getBody = () => {
    return avatars ? (
      <>
        {avatars.map((avatar, index) => {
          return (
            <AvatarDeleteDiv key={index}>
              <img src={avatar.imageUrl} />
              <AnimeButton
                para=""
                text={"Delete"}
                width="120px"
                height="32px"
                textColor="black"
                backGroundColor="white"
                borderColor="#b9b9b9"
                buttonClick={() => deleteAvatar(avatar._id)}
              />
            </AvatarDeleteDiv>
          );
        })}
        <AvatarUpload>
          <ImageUpload
            width={"120px"}
            height={"32px"}
            textColor={"black"}
            backGroundColor={"white"}
            border={"1px solid #D1D2D3"}
            text={"Add an Avatar (80 x 80 px)"}
            setImg={(value: ImageBody) => setImg(value)}
            margin={"0px"}
          />
        </AvatarUpload>
      </>
    ) : (
      <></>
    );
  };

  return (
    <AdminSysAvatarDiv>
      <AvatarButtonsDiv>
        <AnimeButton
          para=""
          text={"Avatars"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="#AAFFC9"
          borderColor="#AAFFC9"
          buttonClick={() => {
            //
          }}
        />
      </AvatarButtonsDiv>
      {loading ? <Spin /> : getBody()}
    </AdminSysAvatarDiv>
  );
};

export default AvatarSetting;
