import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { ImageBody } from "../../components/ImageUpload";
import {
  MarketBody,
  MarketBodyDiv,
  MarketDescription,
  MarketImgDiv,
  MarketItemImg,
  MarketItemName,
  MarketItemTime,
  MarketPlaceTitle,
  MarketPlaceTitleDiv,
  MarketSaveButton,
  MarketShowOneTitle,
  MarketText,
  PriceInput,
  WishBids,
  WishBidsContext,
} from "../../cssJs/MarketPage/MarketPlaceCss";
import AnimeButton from "../../components/Button";
import { MarketType } from "../../types/MarketType";
import { User } from "../../types/User";
import { useSelector } from "react-redux";
import { IStoreState } from "../../types/IStoreState";
import { marketGet } from "../../api/marketAPI";
import { useHistory } from "react-router-dom";

const MarketplaceShowOne = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const history = useHistory();

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [imgArr, setImgArr] = useState<(string | ImageBody)[]>([]);
  const [state, setState] = useState<boolean>(false);
  const [marketState, setMarketState] = useState<MarketType | null>(null);

  useEffect(() => {
    const id: string = history.location.state as string;
    (async function anyNameFunction() {
      const market = await marketGet(id);
      if (market && market.imageArr) {
        setImgArr(market.imageArr);
        setTitle(market.title);
        setPrice(market.price);
        setDescription(market.description);
        setState(market.state);
        setMarketState(market);
        console.log(market);
      }
    })();
  }, []);

  useEffect(() => {
    //
  }, [title, price, description]);

  useEffect(() => {
    addImg();
  }, [imgArr]);

  const addImg = () => {
    const newImgArr = imgArr;
    let length = newImgArr.length;
    do {
      length += 1;
      newImgArr.push(
        `https://animeimagebucket.s3.amazonaws.com/marketCreateImg.png`
      );
    } while (length < 4);
    setImgArr(newImgArr);
  };

  return (
    <>
      <div className="col-xl-9 col-md-9 col-sm-9 col-9">
        <MarketPlaceTitleDiv>
          <MarketPlaceTitle>Marketplace</MarketPlaceTitle>
          <AnimeButton
            para=""
            text={"List an Item"}
            width="200px"
            height="32px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="#FFC300"
            buttonClick={() => history.replace(`/mainPage/marketplace/create`)}
          />
        </MarketPlaceTitleDiv>
        <MarketBodyDiv>
          <MarketShowOneTitle>{title}</MarketShowOneTitle>
          <MarketImgDiv>
            {imgArr.map((image, index) => {
              console.log(image);
              return (
                <div
                  key={index}
                  style={{
                    position: "absolute",
                    left: (index + 1) % 2 == 0 ? "300px" : "0px",
                    top: index <= 1 ? "0px" : "320px",
                    width: "250px",
                    height: "250px",
                    backgroundColor: "#F6F6F6",
                    marginLeft: "40px",
                    display: "flex",
                    borderRadius: "20px",
                  }}
                >
                  <img
                    style={{
                      width: "250px",
                      height: "250px",
                      borderRadius: "20px",
                    }}
                    src={`${image}`}
                  />
                </div>
              );
            })}
          </MarketImgDiv>
          <MarketText>
            <span
              style={{
                fontSize: "36px",
                marginRight: "20px",
                fontWeight: "bold",
              }}
            >{`$ ${price}`}</span>
            <span style={{ fontSize: "36px", color: "#892E2F" }}>{` ${
              state ? "Available" : "Sold Out"
            }`}</span>
          </MarketText>
          <MarketBody>
            <div style={{ display: "flex" }}>
              <MarketItemImg
                src={`${marketState ? marketState.userAvatar : ""}`}
              />
              <MarketItemName>
                {marketState ? marketState.userName : ""}
              </MarketItemName>
              <MarketItemTime>{`${new Date().getDate()}-${
                new Date().getMonth() + 1
              }-${new Date().getFullYear()}`}</MarketItemTime>
            </div>
          </MarketBody>
          <MarketDescription>{description}</MarketDescription>
          <MarketSaveButton>
            <AnimeButton
              para=""
              text={"Save"}
              width="120px"
              height="32px"
              textColor="white"
              backGroundColor="#FFC300"
              borderColor="#FFC300"
              buttonClick={() => {
                console.log("save");
              }}
            />
          </MarketSaveButton>
          <WishBids>Wish Bids</WishBids>
          <WishBidsContext>
            {`Your bid is for the seller's reference only. The final decision is
            up to the seller.`}
          </WishBidsContext>
          <PriceInput>
            <p>+ $ (NZD)</p>
            <Input />
            <AnimeButton
              para=""
              text={"Give a bid"}
              width="120px"
              height="32px"
              textColor="white"
              backGroundColor="#FFC300"
              borderColor="#FFC300"
              buttonClick={() => {
                console.log("save");
              }}
            />
          </PriceInput>
        </MarketBodyDiv>
      </div>
    </>
  );
};

export default MarketplaceShowOne;
