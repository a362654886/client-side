import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { designHistoryPost } from "../../api/designHistoryAPI";
import { emailPost } from "../../api/emailAPI";
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
import { getWidth } from "../../helperFns/widthFn";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";

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
    console.log(attributes);
  }, [attributes]);

  const setUploadImg = (value: ImageBody) => {
    setLoadImg(value.imgBase64);
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const sendEmail = async () => {
    const checkEmail = validateEmail(email);
    if (!checkEmail) {
      openNotification(
        "please complete your Email address",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    } else {
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
        "customerService",
        true
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
    }
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

  const checkValues = () => {
    switch (chooseIndex) {
      case 0:
        if (attributes == "") {
          openNotification(
            "please input Quantity by Types",
            NotificationColor.Warning,
            NotificationTitle.Warning
          );
          return false;
        } else {
          return true;
        }
        break;
      case 1:
        if (attributes.replace(/[^0-9]/gi, "") == "") {
          openNotification(
            "please input Quantity by Types",
            NotificationColor.Warning,
            NotificationTitle.Warning
          );
          return false;
        } else {
          return true;
        }
        break;
      case 2:
        if (
          attributes
            .replace(/[^0-9]/gi, "")
            .replace("4545", "")
            .replace("50150", "") == ""
        ) {
          openNotification(
            "please input Quantity by Types",
            NotificationColor.Warning,
            NotificationTitle.Warning
          );
          return false;
        } else {
          return true;
        }
        break;
      case 3:
        if (attributes.replace(/[^0-9]/gi, "").replace("6060", "") == "") {
          openNotification(
            "please input Quantity by Types",
            NotificationColor.Warning,
            NotificationTitle.Warning
          );
          return false;
        } else {
          return true;
        }
        break;
      default:
        return true;
    }
  };

  const GetAQuote = () => {
    if (resizeUploadImg.trim() == "") {
      openNotification(
        "please insert image",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    } else {
      if (checkValues()) {
        sendEmail();
        sendDesignHistory();
      }
    }
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

  const getHeaderComponent = () => {
    if (getWidth() > 600) {
      return mallCustomer.map((item, index) => {
        return (
          <MallCustomHeaderDiv
            key={index}
            style={{
              borderBottom:
                index == chooseIndex ? "2px solid #892E2F" : "2px solid white",
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
      });
    } else {
      const topCustomers = mallCustomer.slice(0, 2);
      const bottomCustomers = mallCustomer.slice(2, 4);
      return (
        <div style={{ display: "inline" }}>
          <div style={{ display: "flex" }}>
            {topCustomers.map((item, index) => {
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
          </div>
          <div style={{ display: "flex" }}>
            {bottomCustomers.map((item, index) => {
              return (
                <MallCustomHeaderDiv
                  key={index}
                  style={{
                    borderBottom:
                      index == chooseIndex + 2
                        ? "2px solid #892E2F"
                        : "2px solid white",
                  }}
                >
                  <img
                    src={item.imgURL}
                    onClick={() => {
                      setChooseIndex(index + 2);
                    }}
                  />
                </MallCustomHeaderDiv>
              );
            })}
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <MallCustomTitle>
        Order a product with your favorite image!
      </MallCustomTitle>
      <MallCustomHeader
        style={{ height: getWidth() > 600 ? "144px" : "288px" }}
      >
        {getHeaderComponent()}
      </MallCustomHeader>
      <MallCustomImgDiv>
        <MallCustomInsideImgDiv
          style={{ width: getWidth() > 600 ? "600px" : "100%" }}
        >
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
            ContactEmail for receiving a quote
          </MallCustomerInputTitle>
          <MallCustomerEmailInput
            value={email}
            onChange={(e) => setContactEmail(e.target.value)}
          />
        </div>
        <ButtonDiv>
          <AnimeButton
            para=""
            text={"Get a Quote"}
            width="120px"
            height="32px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="#FFC300"
            buttonClick={() => GetAQuote()}
          />
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
    </div>
  );
};

export default MallCustom;
