import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { designHistoryPost } from "../../api/designHistoryAPI";
import { emailPost } from "../../api/emailAPI";
import { mallCustomerAPI } from "../../api/mallCustomeAPI";
import { AnimeButton, MiddleDiv } from "../../components/Button";
import CropImgDiv from "../../components/CropImgDiv";
import ImageUpload, { ImageBody } from "../../components/ImageUpload";
import { UploadButton } from "../../cssJs/AnimePage/AnimeOne/AnimeOneProductCss";
import {
  ButtonDiv,
  MallCustomerEmailInput,
  MallCustomerInputTitle,
  MallCustomerScrollImg,
  MallCustomerTshirtImg,
  MallCustomHeader,
  MallCustomHeaderDiv,
  MallCustomImgDiv,
  MallCustomInsideBackImg,
  MallCustomInsideImgDiv,
  MallCustomTitle,
} from "../../cssJs/MallPage/MallCustom";
import { MallDisplayText } from "../../cssJs/MallPage/MallPageCss";
import { IStoreState } from "../../types/IStoreState";
import { MallCustomType } from "../../types/mallCustomType";
import { DesignHistory } from "../../types/designHistoryType";
import { User } from "../../types/User";
import MallPhone from "./MallCustomSelect/MallPhone";
import MallPillow from "./MallCustomSelect/MallPillow";
import MallScroll from "./MallCustomSelect/MallScroll";
import MallTShirt from "./MallCustomSelect/MallTShirt";
import mallPhoneBack from "../../files/mallPhoneBack.svg";
import mallPillowBack from "../../files/mallPillowBack.svg";
import mallTshirtBack from "../../files/mallTshirtBack.svg";
import mallWallBack from "../../files/mallWallBack.svg";
import { imageAdd } from "../../api/imageAPI";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";

const customerTypes: MallCustomType[] = [
  {
    name: "phone",
    imgURL: mallPhoneBack,
    height: "400px",
    width: "200px",
    radio: 2 / 4,
  },
  {
    name: "tshirt",
    imgURL: mallTshirtBack,
    height: "480px",
    width: "360px",
    radio: 36 / 48,
  },
  {
    name: "pillow",
    imgURL: mallPillowBack,
    height: "400px",
    width: "300px",
    radio: 3 / 4,
  },
  {
    name: "wall",
    imgURL: mallWallBack,
    height: "400px",
    width: "350px",
    radio: 23 / 36,
  },
];

const MallCustom = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [mallCustomerLoading, setMallCustomerLoading] = useState(false);
  const [chooseIndex, setChooseIndex] = useState<number>(0);
  const [attributes, setAttributes] = useState<string>("");
  const [email, setContactEmail] = useState<string>("");
  const [uploadImg, setLoadImg] = useState<string>("");
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [resizeUploadImg, setResizeUploadImg] = useState<string>("");
  const [mallCustomer, setMallCustomer] =
    useState<MallCustomType[]>(customerTypes);

  useEffect(() => {
    //
  }, [chooseIndex]);

  useEffect(() => {
    //console.log(attributes);
  }, [attributes]);

  const setUploadImg = (value: ImageBody) => {
    setLoadImg(value.imgBase64);
  };

  const sendEmail = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const imgUrl = await imageAdd({
      _id: "",
      imageValue: resizeUploadImg,
      forumId: "forumImage",
    });
    //send to customer service
    await emailPost(
      window.btoa(email),
      `
        <p>imageLink:https://animeimagebucket.s3.amazonaws.com/${imgUrl}</p>
        <div>${attributes}</div>
        <div>Contact Email: ${email}</div>
      `,
      "mall",
      "customerService"
    );
    //send to customer
    await emailPost(
      window.btoa(email),
      "",
      "Thanks for your inquiry",
      "autoReply"
    );
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const sendDesignHistory = async () => {
    const today = new Date();
    const body: DesignHistory = {
      _id: `${loginUser ? loginUser._id : ""}${today.valueOf()}`,
      uploadTime: today.valueOf(),
      type: chooseIndex,
      imageString: resizeUploadImg,
      value: `${attributes} Contact Email ${email}`,
      userId: `${loginUser ? loginUser._id : ""}`,
    };
    await designHistoryPost(body);
  };

  const getUploadImage = () => {
    if (chooseIndex == 1) {
      return <MallCustomerTshirtImg src={resizeUploadImg} />;
    }
    if (chooseIndex == 3) {
      return <MallCustomerScrollImg src={resizeUploadImg} />;
    }
  };

  const getAttributeEle = () => {
    switch (chooseIndex) {
      case 0:
        return (
          <MallPhone
            changeAttributes={(value: string) => setAttributes(value)}
          />
        );
      case 1:
        return (
          <MallTShirt
            changeAttributes={(value: string) => setAttributes(value)}
          />
        );
      case 2:
        return (
          <MallPillow
            changeAttributes={(value: string) => setAttributes(value)}
          />
        );
      case 3:
        return (
          <MallScroll
            changeAttributes={(value: string) => setAttributes(value)}
          />
        );
    }
  };

  return (
    <>
      <MallCustomTitle>
        Order a product with your favorite image!
      </MallCustomTitle>
      <MallCustomHeader>
        {mallCustomer.map((item, index) => {
          return (
            <MallCustomHeaderDiv
              key={index}
              style={{
                borderBottom:
                  index == chooseIndex
                    ? "2px solid #892E2F"
                    : "2px solid white",
              }}
            >
              <img
                src={item.imgURL}
                onClick={() => {
                  setChooseIndex(index);
                }}
              />
            </MallCustomHeaderDiv>
          );
        })}
      </MallCustomHeader>
      <MallCustomImgDiv>
        <MallCustomInsideImgDiv>
          <MallCustomInsideBackImg
            src={mallCustomer[chooseIndex].imgURL}
            style={{
              backgroundImage: `url(${resizeUploadImg})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              height: mallCustomer[chooseIndex].height,
              width: mallCustomer[chooseIndex].width,
            }}
          />
        </MallCustomInsideImgDiv>
        {getUploadImage()}
      </MallCustomImgDiv>
      <UploadButton>
        <ImageUpload
          width={"120px"}
          height={"32px"}
          textColor={"black"}
          backGroundColor={"white"}
          border={"1px solid #D1D2D3"}
          text={"Upload Image"}
          setImg={(value: ImageBody) => {
            setUploadImg(value);
            setShowCropper(true);
          }}
          margin={"0px 0px"}
        />
      </UploadButton>

      <div>
        <MallDisplayText>
          {`The final product may vary from that displayed on your device's
          screen.`}
        </MallDisplayText>
        {getAttributeEle()}
        <div>
          <MallCustomerInputTitle>
            ContactEmail/Tel for receiving a quote
          </MallCustomerInputTitle>
          <MallCustomerEmailInput
            value={email}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <ButtonDiv>
          <MiddleDiv>
            <AnimeButton
              para=""
              text={"Get a Quote"}
              width="120px"
              height="32px"
              textColor="white"
              backGroundColor="#FFC300"
              borderColor="#FFC300"
              buttonClick={() => {
                sendEmail();
                sendDesignHistory();
              }}
            />
          </MiddleDiv>
        </ButtonDiv>
      </div>
      {mallCustomer[chooseIndex].radio == 2 / 4 && (
        <CropImgDiv
          uploadImg={uploadImg}
          setLoadImg={(image: string) => {
            setResizeUploadImg(image);
            setShowCropper(false);
          }}
          visible={showCropper}
          setVisibleFalse={() => setShowCropper(false)}
          mall={false}
          radio={mallCustomer[chooseIndex].radio}
        />
      )}
      {mallCustomer[chooseIndex].radio == 36 / 48 && (
        <CropImgDiv
          uploadImg={uploadImg}
          setLoadImg={(image: string) => {
            setResizeUploadImg(image);
            setShowCropper(false);
          }}
          visible={showCropper}
          setVisibleFalse={() => setShowCropper(false)}
          mall={false}
          radio={mallCustomer[chooseIndex].radio}
        />
      )}
      {mallCustomer[chooseIndex].radio == 3 / 4 && (
        <CropImgDiv
          uploadImg={uploadImg}
          setLoadImg={(image: string) => {
            setResizeUploadImg(image);
            setShowCropper(false);
          }}
          visible={showCropper}
          setVisibleFalse={() => setShowCropper(false)}
          mall={false}
          radio={mallCustomer[chooseIndex].radio}
        />
      )}
      {mallCustomer[chooseIndex].radio == 23 / 36 && (
        <CropImgDiv
          uploadImg={uploadImg}
          setLoadImg={(image: string) => {
            setResizeUploadImg(image);
            setShowCropper(false);
          }}
          visible={showCropper}
          setVisibleFalse={() => setShowCropper(false)}
          mall={false}
          radio={mallCustomer[chooseIndex].radio}
        />
      )}
    </>
  );
};

export default MallCustom;
