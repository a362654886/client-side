import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { mallCustomerAPI } from "../../api/mallCustomeAPI";
import { AnimeButton, MiddleDiv } from "../../components/Button";
import CropImgDiv from "../../components/CropImgDiv";
import ImageUpload, { ImageBody } from "../../components/ImageUpload";
import { UploadButton } from "../../cssJs/AnimePage/AnimeOne/AnimeOneProductCss";
import { AnimeButtonsDiv } from "../../cssJs/AnimePage/AnimeOneCss";
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
  MallCustomInsideInnerImg,
  MallCustomTitle,
} from "../../cssJs/MallPage/MallCustom";
import {
  MallShowDiv,
  MallTitle,
  MallTitleDiv,
} from "../../cssJs/MallPage/MallPageCss";
import { IStoreState } from "../../types/IStoreState";
import { MallCustomType } from "../../types/mallCustomType";
import { User } from "../../types/User";

const MallCustom = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [mallCustomerLoading, setMallCustomerLoading] = useState(false);
  const [mallCustomer, setMallCustomer] = useState<MallCustomType[]>([]);
  const [chooseIndex, setChooseIndex] = useState<number>(0);
  const [colorBase, setColorBase] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
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
          />
          <MallCustomInsideInnerImg src={resizeUploadImg} />
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
        <div>
          <MallCustomerInputTitle>Color Base</MallCustomerInputTitle>
          <MallCustomerInput
            value={colorBase}
            onChange={(e) => setColorBase(e.target.value)}
          />
        </div>
        <div>
          <MallCustomerInputTitle>Quantity</MallCustomerInputTitle>
          <MallCustomerInput
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
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
              buttonClick={() => console.log("send")}
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
