import { Spin } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { avatarAdd, avatarDelete, avatarsGet } from "../../../api/avatarAPI";
import AnimeButton from "../../../components/Button";
import ImageUpload, { ImageBody } from "../../../components/ImageUpload";
import { AvatarDeleteDiv } from "../../../cssJs/AdminPage/adminNewsCss";
import { AdminSysAvatarDiv } from "../../../cssJs/AdminPage/adminSysSettingCss";
import { Avatar } from "../../../types/User";

const AvatarSetting = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);
  const [avatars, setAvatars] = useState<Avatar[] | null>(null);

  useEffect(() => {
    (async function anyNameFunction() {
      await getAvatars();
    })();
  }, []);

  useEffect(() => {
    console.log(avatars);
  }, [avatars]);

  const getAvatars = async () => {
    //get all plate
    setLoading(true);
    const avatars: Avatar[] | null = await avatarsGet();
    setAvatars(avatars);
    setLoading(false);
  };

  const deleteAvatar = async (id: string) => {
    await avatarDelete(id);
    await getAvatars();
  };

  const setImg = async (value: ImageBody) => {
    setLoading(true);
    await avatarAdd({
      _id: new Date().valueOf().toString(),
      imageName: value.imgName,
      imageUrl: value.imgBase64,
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
        <ImageUpload
          width={"120px"}
          height={"32px"}
          textColor={"black"}
          backGroundColor={"white"}
          border={"1px solid #D1D2D3"}
          text={"Upload"}
          setImg={(value: ImageBody) => setImg(value)}
          margin={"0px"}
        />
      </>
    ) : (
      <></>
    );
  };

  return (
    <AdminSysAvatarDiv>{loading ? <Spin /> : getBody()}</AdminSysAvatarDiv>
  );
};

export default AvatarSetting;
