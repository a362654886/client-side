import { Button, Input } from "antd";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productAdd } from "../../../api/productAPI";
import AnimeButton from "../../../components/Button";
import CropImgDiv from "../../../components/CropImgDiv";
import ImageUpload from "../../../components/ImageUpload";
import {
  ProductImg,
  ProductInput,
  UploadButton,
  SubtitleDiv,
  ProductCancelButton,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneProductCss";
import { AnimOneVideo } from "../../../cssJs/AnimePage/AnimeOne/AnimeOneVideoCss";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
  popUpAPIResult,
} from "../../../helperFns/popUpAlert";
import { urlCheck } from "../../../helperFns/urlCheckFn";
import { getWidth } from "../../../helperFns/widthFn";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { Anime } from "../../../types/Amine";
import { ImageBody } from "../../../types/BasicType";
import { LoadingType } from "../../../types/EnumTypes";
import { IStoreState } from "../../../types/IStoreState";
import { Product } from "../../../types/ProductType";
import { Avatar, User } from "../../../types/User";

interface IProps {
  toProduct: (num: number) => void;
}

const AnimeOneProductAdd = ({ toProduct }: IProps): JSX.Element => {
  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const dispatch = useDispatch();

  const [uploadImg, setLoadImg] = useState<string>("");
  const [resizeUploadImg, setResizeUploadImg] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [showCropper, setShowCropper] = useState<boolean>(false);

  useEffect(() => {
    //
  }, [uploadImg, resizeUploadImg]);

  const setUploadImg = (value: ImageBody) => {
    setLoadImg(value.imgBase64);
  };

  const onChange = (e: React.ChangeEvent<Element>): void =>
    setLink((e.target as HTMLInputElement).value);

  const post = async () => {
    if (loginUser?.block == true) {
      openNotification(
        "your account has been blocked,please connect Administrator",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
      return;
    }
    if (resizeUploadImg == "") {
      openNotification(
        "Please input image",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
      return;
    }
    if (!urlCheck(link)) {
      openNotification(
        "Please enter a valid link starting with http or https",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
      return;
    }
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const product: Product = {
        _id: `${loginUser?._id}${new Date().valueOf()}`,
        userId: loginUser?._id as string,
        anime: chooseAnime?._id as string,
        link: link,
        productImg: resizeUploadImg,
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        hide: false,
      };
      await popUpAPIResult<Promise<number | null>>(
        productAdd(product),
        "add new product fail",
        () => toProduct(2)
      );
    } else {
      openNotification(
        "please login and then reply",
        NotificationColor.Error,
        NotificationTitle.Error
      );
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  return (
    <AnimOneVideo style={{ width: getWidth() > 600 ? "840px" : "100%" }}>
      <SubtitleDiv style={{ height: getWidth() > 450 ? "48px" : "96px" }}>
        <p>Post product shopping links here to tell those fans who want it</p>
      </SubtitleDiv>
      <ProductImg>
        <h6>Product Picture</h6>
      </ProductImg>
      <div style={{ margin: "0px auto", width: "240px" }}>
        {resizeUploadImg == "" ? (
          <>
            <ImageUpload
              width={"240px"}
              height={"240px"}
              textColor={"black"}
              backGroundColor={"#F6F6F6"}
              border={"1px solid #F6F6F6"}
              text={""}
              setImg={(value: ImageBody) => {
                setLoadImg(value.imgBase64);
                setShowCropper(true);
              }}
              imageAdd={false}
              margin={"20px auto"}
            />
          </>
        ) : (
          <img src={`${resizeUploadImg}`} />
        )}
      </div>
      {resizeUploadImg == "" ? (
        <></>
      ) : (
        <ImageUpload
          width={"240px"}
          height={"32px"}
          textColor={"black"}
          backGroundColor={"#F6F6F6"}
          border={"1px solid #F6F6F6"}
          text={"Input Product Image"}
          setImg={(value: ImageBody) => {
            setLoadImg(value.imgBase64);
            setShowCropper(true);
          }}
          margin={"20px auto"}
        />
      )}
      <ProductInput>
        <h6>Shopping Link</h6>
        <Input placeholder={"link"} onChange={onChange}></Input>
      </ProductInput>
      <AnimeButton
        para=""
        text="Post"
        width="100%"
        height="32px"
        textColor="white"
        backGroundColor="#FFC300"
        borderColor="white"
        buttonClick={() => post()}
      />
      <ProductCancelButton>
        <AnimeButton
          para=""
          text={"Cancel"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="white"
          borderColor="#302D46"
          buttonClick={() => window.location.reload()}
        />
      </ProductCancelButton>
      <CropImgDiv
        uploadImg={uploadImg}
        setLoadImg={(image: string) => {
          setResizeUploadImg(image);
          setShowCropper(false);
        }}
        visible={showCropper}
        setVisibleFalse={() => setShowCropper(false)}
        cube={true}
      />
    </AnimOneVideo>
  );
};

export default AnimeOneProductAdd;
