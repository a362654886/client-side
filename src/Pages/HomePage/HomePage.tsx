import * as React from "react";
import { useEffect, useState } from "react";
import { avatarAdd, avatarsGet } from "../../api/avatarAPI";
import ImgUploadDiv from "../../components/conponentDivs/ImgUploadDiv";
import { PlateImg } from "../../cssJs/forumCss";
import { ImageBody } from "../../types/BasicType";
import { Avatar } from "../../types/User";

const HomePage = (): JSX.Element => {
  const [image, setIMage] = useState<string>("");
  const [imageName, setIMageName] = useState<string>("");
  const [avatars, setAvatars] = useState<Avatar[] | null>(null);

  useEffect(() => {
    (async function anyNameFunction() {
      await getAvatars();
    })();
  }, []);

  const getAvatars = async () => {
    //get all plate
    const avatars: Avatar[] | null = await avatarsGet();

    setAvatars(avatars);
  };

  const setImg = (value: ImageBody) => {
    setIMage(value.imgBase64);
    setIMageName(value.imgName);
  };

  const submit = async () => {
    await avatarAdd({
      _id: "avatar" + imageName,
      imageName: imageName,
      imageUrl: image,
    });
  };

  return (
    <>
      <ImgUploadDiv setImg={setImg} />
      <PlateImg src={`${avatars ? avatars[0].imageUrl : ""}`} />
      <a>{avatars ? avatars[0].imageName : ""}</a>
      <button onClick={submit}>Submit</button>
    </>
  );
};

export default HomePage;
