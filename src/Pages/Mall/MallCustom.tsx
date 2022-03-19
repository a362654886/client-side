import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { emailPost } from "../../api/emailAPI";
import { mallCustomerAPI } from "../../api/mallCustomeAPI";
import { AnimeButton, MiddleDiv } from "../../components/Button";
import CropImgDiv from "../../components/CropImgDiv";
import ImageUpload, { ImageBody } from "../../components/ImageUpload";
import { UploadButton } from "../../cssJs/AnimePage/AnimeOne/AnimeOneProductCss";
import {
  ButtonDiv,
  MallCustomerEmailInput,
  MallCustomerInput,
  MallCustomerInputTitle,
  MallCustomHeader,
  MallCustomHeaderDiv,
  MallCustomImgDiv,
  MallCustomInsideBackImg,
  MallCustomInsideImgDiv,
  MallCustomPillowInsideInnerImg,
  MallCustomScrollInsideInnerImg,
  MallCustomTitle,
} from "../../cssJs/MallPage/MallCustom";
import { MallDisplayText } from "../../cssJs/MallPage/MallPageCss";
import { IStoreState } from "../../types/IStoreState";
import { MallCustomType } from "../../types/mallCustomType";
import { User } from "../../types/User";
import MallPhone from "./MallCustomSelect/MallPhone";
import MallPillow from "./MallCustomSelect/MallPillow";
import MallScroll from "./MallCustomSelect/MallScroll";
import MallTShirt from "./MallCustomSelect/MallTShirt";

const MallCustom = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [mallCustomerLoading, setMallCustomerLoading] = useState(false);
  const [mallCustomer, setMallCustomer] = useState<MallCustomType[]>([]);
  const [chooseIndex, setChooseIndex] = useState<number>(0);
  const [attributes, setAttributes] = useState<string>("");
  const [email, setContactEmail] = useState<string>("");
  const [uploadImg, setLoadImg] = useState<string>("");
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [resizeUploadImg, setResizeUploadImg] = useState<string>("");

  useEffect(() => {
    (async function anyNameFunction() {
      await getMallCustomer();
    })();
  }, []);

  useEffect(() => {
    console.log(mallCustomer);
  }, [mallCustomer, chooseIndex]);

  useEffect(() => {
    console.log(attributes);
  }, [attributes]);

  const getMallCustomer = async () => {
    setMallCustomerLoading(true);
    const mallCustomerResult = await mallCustomerAPI();
    if (mallCustomerResult) {
      setMallCustomer(mallCustomerResult);
    }
    setMallCustomerLoading(false);
  };

  const setUploadImg = (value: ImageBody) => {
    setLoadImg(value.imgBase64);
  };

  const sendEmail = async () => await emailPost(email, attributes);

  const getAttributeEle = () => {
    switch (chooseIndex) {
      case 0:
        return (
          <MallTShirt
            changeAttributes={(value: string) => setAttributes(value)}
          />
        );
      case 1:
        return (
          <MallPillow
            changeAttributes={(value: string) => setAttributes(value)}
          />
        );
      case 2:
        return (
          <MallScroll
            changeAttributes={(value: string) => setAttributes(value)}
          />
        );
      case 3:
        return (
          <MallPhone
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
                backgroundColor: index == chooseIndex ? "#AAFFC9" : "white",
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
            src={
              mallCustomer[chooseIndex] ? mallCustomer[chooseIndex].imgURL : ""
            }
            style={{
              backgroundImage: `url(${resizeUploadImg})`,
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        </MallCustomInsideImgDiv>
      </MallCustomImgDiv>
      <UploadButton>
        <ImageUpload
          width={"120px"}
          height={"32px"}
          textColor={"black"}
          backGroundColor={"white"}
          border={"1px solid #D1D2D3"}
          text={"Upload"}
          setImg={(value: ImageBody) => {
            setUploadImg(value);
            setShowCropper(true);
          }}
          margin={"0px auto"}
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
              text={"Get a Quota"}
              width="120px"
              height="32px"
              textColor="white"
              backGroundColor="#FFC300"
              borderColor="#FFC300"
              buttonClick={() => sendEmail()}
            />
          </MiddleDiv>
        </ButtonDiv>
      </div>
      <CropImgDiv
        uploadImg={uploadImg}
        setLoadImg={(image: string) => {
          setResizeUploadImg(image);
          setShowCropper(false);
        }}
        visible={showCropper}
        setVisibleFalse={() => setShowCropper(false)}
      />
    </>
  );
};

export default MallCustom;
