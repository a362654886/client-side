import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAdd } from "../../../api/productAPI";
import AnimeButton from "../../../components/Button";
import ImgUploadDiv from "../../../components/conponentDivs/ImgUploadDiv";
import {
  ProductImg,
  ProductInput,
  UploadButton,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneProductCss";
import {
  AnimOneVideo,
  Subtitle,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneVideoCss";
import { openNotification } from "../../../helperFns/popUpAlert";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { Anime } from "../../../types/Amine";
import { ImageBody } from "../../../types/BasicType";
import { LoadingType } from "../../../types/EnumTypes";
import { IStoreState } from "../../../types/IStoreState";
import { Product } from "../../../types/ProductType";
import { Avatar, User } from "../../../types/User";

const AnimeOneProductAdd = (): JSX.Element => {
  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const dispatch = useDispatch();

  const [uploadImg, setLoadImg] = useState<string>("");
  const [link, setLink] = useState<string>("");

  useEffect(() => {
    //
  }, [uploadImg]);

  const setImg = (value: ImageBody) => setLoadImg(value.imgBase64);

  const onChange = (e: React.ChangeEvent<Element>): void =>
    setLink((e.target as HTMLInputElement).value);

  const post = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const product: Product = {
        _id: `${loginUser?._id}${link}`,
        userId: loginUser?._id as string,
        anime: chooseAnime?._id as string,
        link: link,
        productImg: uploadImg,
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: loginUser.name,
      };
      await productAdd(product);
    } else {
      openNotification("error", "please login and then reply");
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  return (
    <AnimOneVideo>
      <Subtitle>
        Post product shopping links here to tell those fans who want it
      </Subtitle>
      <ProductImg>
        <h6>Product Picture</h6>
        <img src={`${uploadImg}`} />
      </ProductImg>
      <UploadButton>
        <ImgUploadDiv setImg={setImg} />
      </UploadButton>
      <ProductInput>
        <h6>Shopping Link</h6>
        <Input placeholder={"link"} onChange={onChange}></Input>
      </ProductInput>
      <AnimeButton
        para=""
        text="Post"
        width="840px"
        height="32px"
        textColor="white"
        backGroundColor="#FFC300"
        borderColor="white"
        buttonClick={() => post()}
      />
      <div style={{ minHeight: "32px" }}></div>
    </AnimOneVideo>
  );
};

export default AnimeOneProductAdd;
