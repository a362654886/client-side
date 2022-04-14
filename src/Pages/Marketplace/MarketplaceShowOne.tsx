import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { ImageBody } from "../../components/ImageUpload";
import {
  LoadingBidImg,
  MarketBody,
  MarketBodyDiv,
  MarketDescription,
  MarketEditAndDeleteDiv,
  MarketFollow,
  MarketImgDiv,
  MarketItemImg,
  MarketItemName,
  MarketItemTime,
  MarketLocation,
  MarketPlaceTitle,
  MarketPlaceTitleDiv,
  MarketPriceContextDiv,
  MarketPriceDiv,
  MarketPriceImg,
  MarketPriceMoreDiv,
  MarketPriceNum,
  MarketPricePriceName,
  MarketShowOneTitle,
  MarketText,
  MarketViewMore,
  PriceInput,
  WishBids,
  WishBidsContext,
} from "../../cssJs/MarketPage/MarketPlaceCss";
import AnimeButton from "../../components/Button";
import { MarketPriceType, MarketType } from "../../types/MarketType";
import { User } from "../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "../../types/IStoreState";
import {
  marketGet,
  marketPriceInsert,
  marketPricesGetById,
} from "../../api/marketAPI";
import { useHistory, useParams } from "react-router-dom";
import ProfileWrapperDiv from "../../components/ProfileWrapperDiv";
import Flag from "react-flagkit";
import { flagGet, flagGetName } from "../../helperFns/flag";
import { _getDate } from "../../helperFns/timeFn";
import marketFollow from "../../files/marketFollow.png";
import marketMessage from "../../files/marketMessage.png";
import IconFollowing from "../../files/IconFollowing.svg";
import editIcon from "../../files/editIcon.svg";
import deleteIcon from "../../files/deleteIcon.svg";
import moreRightImg from "../../files/moreRightArrow.png";
import marketPrice from "../../files/marketPrice.png";
import moreBottomArrow from "../../files/moreBottomArrow.png";
import SettingImg from "../../components/SettingImg";
import ShareDiv from "../../components/ShareDiv";
import loading from "../../files/loading.gif";
import { MessageDiv, MessageModal } from "../../cssJs/settingImgCss";
import TextArea from "antd/lib/input/TextArea";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { MessageType } from "../../types/MessageType";
import { messageAdd } from "../../api/messageAPI";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import DeleteWrapperDiv from "../../components/DeleteWrapperDiv";
import { LOGIN_USER_ADD } from "../../redux/loginUser";
import { MARKET_FOLLOW_ARR } from "../../redux/marketFollow";

interface Para {
  id: string;
}

const MarketplaceShowOne = (): JSX.Element => {
  const para: Para = useParams();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [imgArr, setImgArr] = useState<(string | ImageBody)[]>([]);
  const [state, setState] = useState<string>("");
  const [marketState, setMarketState] = useState<MarketType | null>(null);
  const [bidPrice, setBidPrice] = useState<number>(0);
  const [marketPrices, setMarketPrices] = useState<MarketPriceType[]>([]);
  const [marketPricesCount, setMarketPricesCount] = useState<number>(0);
  const [update, setUpdate] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [bidLoading, setBidLoading] = useState<boolean>(false);
  const [bidIniLoading, setBidIniLoading] = useState<boolean>(false);
  const [messageVisible, setMessageVisible] = useState(false);
  const [messageValue, setMessageValue] = useState("");

  useEffect(() => {
    (async function anyNameFunction() {
      const market = await marketGet(para.id);
      if (market && market.imageArr) {
        setImgArr(market.imageArr);
        setTitle(market.title);
        setPrice(market.price);
        setDescription(market.description);
        setState(market.state);
        setMarketState(market);
      }
    })();
  }, []);

  useEffect(() => {
    //
    console.log(loginUser);
  }, [
    title,
    price,
    description,
    marketPrices,
    update,
    bidLoading,
    bidIniLoading,
    loginUser,
  ]);

  useEffect(() => {
    addImg();
  }, [imgArr]);

  useEffect(() => {
    (async function anyNameFunction() {
      if (page == 1) {
        await getIniMarketPrices();
      } else {
        await getMarketPrices();
      }
    })();
  }, [marketState, page]);

  const getMarketPrices = async () => {
    setBidLoading(true);
    const marketResult = await marketPricesGetById(
      marketState ? marketState._id : "",
      page,
      3
    );
    if (marketResult) {
      setMarketPrices(marketPrices.concat(marketResult.marketPrices));
      setMarketPricesCount(marketResult.count);
      setUpdate(update + 1);
    }
    setBidLoading(false);
  };

  const getIniMarketPrices = async () => {
    setBidIniLoading(true);
    const marketResult = await marketPricesGetById(
      marketState ? marketState._id : "",
      1,
      3
    );
    if (marketResult) {
      setMarketPrices(marketResult.marketPrices);
      setMarketPricesCount(marketResult.count);
      setUpdate(update + 1);
    }
    setBidIniLoading(false);
  };

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

  const insertMarketPrice = async () => {
    if (marketState && loginUser) {
      const marketPrice: MarketPriceType = {
        _id: marketState._id + new Date().valueOf(),
        marketId: marketState._id,
        userId: loginUser._id,
        price: bidPrice,
        uploadTime: new Date(),
      };
      await marketPriceInsert(marketPrice);
      setPage(1);

      getIniMarketPrices();
    }
  };

  const getMarketPricesDiv = () => {
    return marketPrices ? (
      marketPrices.map((item, index) => {
        return (
          <MarketPriceContextDiv key={index}>
            <MarketPriceImg src={marketPrice} />
            <ProfileWrapperDiv
              userId={item.userId}
              element={
                <>
                  <MarketItemImg src={`${item.userAvatar}`} />
                  <MarketPricePriceName>
                    {item.userName}
                    <Flag
                      style={{ marginLeft: "5px", marginRight: "10px" }}
                      country={flagGet(
                        item.userCountry ? item.userCountry : ""
                      )}
                    />
                  </MarketPricePriceName>
                </>
              }
            ></ProfileWrapperDiv>
            <SettingImg
              userId={item.userId}
              userName={item.userName ? item.userName : ""}
              userImg={item.userAvatar ? item.userAvatar : ""}
              marginTop="8px"
            />
            <MarketItemTime style={{ marginTop: "4px" }}>
              {_getDate(new Date(item.uploadTime))}
            </MarketItemTime>
            <MarketPriceNum>{`$${item.price} (NZD)`}</MarketPriceNum>
          </MarketPriceContextDiv>
        );
      })
    ) : (
      <></>
    );
  };

  const sendMessage = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const messageBody: MessageType = {
        _id: `${loginUser._id}${
          marketState ? marketState.userId : ""
        }${new Date().valueOf()}`,
        userId: loginUser._id,
        receiveId: marketState ? marketState.userId : "",
        uploadTime: new Date(),
        message: messageValue,
      };
      const r = await messageAdd(messageBody);
      if (r && r < 300) {
        setMessageVisible(false);
        setMessageValue("");
      }
    } else {
      openNotification(
        "please login and then send message",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const getMoreElement = () => {
    if (page * 3 < marketPricesCount) {
      return (
        <MarketPriceMoreDiv onClick={() => setPage(page + 1)}>
          <img src={moreBottomArrow} />
          <p>More</p>
        </MarketPriceMoreDiv>
      );
    } else {
      return <></>;
    }
  };

  const updateFollowMarket = (id: string, add: boolean) => {
    let marketArr: string[] = [];
    if (loginUser?.followMarket) {
      marketArr = loginUser?.followMarket;
    }
    // set arr
    if (add) {
      marketArr.push(id);
    } else {
      const index = marketArr.indexOf(id);
      if (index > -1) {
        marketArr.splice(index, 1);
      }
    }
    console.log(marketArr);
    //update user
    const readyUpdateUser: User = loginUser as User;
    readyUpdateUser.followMarket = marketArr;

    dispatch({
      payload: readyUpdateUser,
      type: LOGIN_USER_ADD,
    });
    setUpdate(update + 1);
    //update
    dispatch({
      payload: marketArr,
      type: MARKET_FOLLOW_ARR,
    });
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
            buttonClick={() => history.push(`/mainPage/marketplace/create`)}
          />
        </MarketPlaceTitleDiv>
        <MarketBodyDiv>
          <MarketShowOneTitle>{title}</MarketShowOneTitle>
          <MarketImgDiv>
            {imgArr.map((image, index) => {
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
              <ProfileWrapperDiv
                userId={marketState ? marketState.userId : ""}
                element={
                  <>
                    <MarketItemImg
                      src={`${marketState ? marketState.userAvatar : ""}`}
                    />
                    <MarketItemName>
                      {marketState ? marketState.userName : ""}
                      <Flag
                        style={{ marginLeft: "5px", marginRight: "10px" }}
                        country={flagGet(
                          marketState
                            ? marketState.userCountry
                              ? marketState.userCountry
                              : ""
                            : ""
                        )}
                      />
                    </MarketItemName>
                  </>
                }
              ></ProfileWrapperDiv>
              <SettingImg
                userId={marketState ? marketState.userId : ""}
                userName={
                  marketState
                    ? marketState.userName
                      ? marketState.userName
                      : ""
                    : ""
                }
                userImg={
                  marketState
                    ? marketState.userAvatar
                      ? marketState.userAvatar
                      : ""
                    : ""
                }
                marginTop="8px"
              />
              <MarketItemTime>{_getDate(new Date())}</MarketItemTime>
            </div>
          </MarketBody>
          <MarketDescription>{description}</MarketDescription>
          <MarketLocation>
            <p>{`Location: ${marketState ? marketState.location : ""}, ${
              marketState ? flagGetName(marketState.country) : ""
            }`}</p>
          </MarketLocation>
          {loginUser ? (
            <MarketFollow>
              {loginUser.followMarket.indexOf(marketState?._id as string) ==
              -1 ? (
                <div
                  onClick={() =>
                    updateFollowMarket(marketState?._id as string, true)
                  }
                >
                  <img src={marketFollow} />
                  <p>Follow the Item</p>
                </div>
              ) : (
                <div
                  onClick={() =>
                    updateFollowMarket(marketState?._id as string, false)
                  }
                >
                  <img src={IconFollowing} />
                  <p>Following</p>
                </div>
              )}
              <div onClick={() => setMessageVisible(true)}>
                <img src={marketMessage} />
                <p>Send a Message</p>
              </div>
            </MarketFollow>
          ) : (
            <></>
          )}
          <ShareDiv marginTop={"0px"} />
          {marketState && marketState.userId == loginUser?._id ? (
            <MarketEditAndDeleteDiv>
              <div
                onClick={() => {
                  history.push({
                    pathname: `/mainPage/marketplace/edit/${para.id}`,
                  });
                }}
              >
                <img src={`${editIcon}`} />
                <p>Edit</p>
              </div>
              <DeleteWrapperDiv
                element={
                  <>
                    <img style={{ width: "20px" }} src={`${deleteIcon}`} />
                    <p>Delete</p>
                  </>
                }
                deleteFn={() => console.log("delete")}
              />
            </MarketEditAndDeleteDiv>
          ) : (
            <div style={{ marginTop: "16px" }}></div>
          )}
          <MarketViewMore
            onClick={() => {
              history.push(
                `/mainPage/profilePage/${marketState ? marketState.userId : ""}`
              );
            }}
          >
            <img src={moreRightImg} />
            <p>View Other Items</p>
          </MarketViewMore>
          <WishBids>Wish Bids</WishBids>
          <WishBidsContext>
            {`Your bid is for the seller's reference only. The final decision is
            up to the seller.`}
          </WishBidsContext>
          <PriceInput>
            <p>$</p>
            <Input
              onChange={(e) => {
                const price = e.target.value;
                setBidPrice(Number(price));
              }}
            />
            <p>(NZD)</p>
            <button
              style={{
                width: "156px",
                height: "32px",
                color: "white",
                backgroundColor: "#FFC300",
                borderRadius: "4px",
                border: "#FFC300",
                fontWeight: "bold",
                fontSize: " 16px",
                textAlign: "center",
                marginLeft: "36px",
              }}
              onClick={() => insertMarketPrice()}
            >
              <img
                style={{
                  height: "24px",
                  width: "24px",
                  marginRight: "5px",
                  marginTop: "0px",
                }}
                src={marketPrice}
              />
              {"Show Your Bid"}
            </button>
          </PriceInput>
          {bidIniLoading ? (
            <LoadingBidImg>
              <img src={loading} />
            </LoadingBidImg>
          ) : (
            <>
              <MarketPriceDiv>{getMarketPricesDiv()}</MarketPriceDiv>
              {bidLoading ? (
                <LoadingBidImg>
                  <img src={loading} />
                </LoadingBidImg>
              ) : (
                getMoreElement()
              )}
            </>
          )}
        </MarketBodyDiv>
        <MessageModal
          footer={[]}
          onCancel={() => setMessageVisible(false)}
          visible={messageVisible}
        >
          <MessageDiv>
            <div>
              <p>To:</p>
              <img
                src={
                  marketState
                    ? marketState.userAvatar
                      ? marketState.userAvatar
                      : ""
                    : ""
                }
              />
              <h6>
                {marketState
                  ? marketState.userName
                    ? marketState.userName
                    : ""
                  : ""}
              </h6>
            </div>
            <TextArea
              value={messageValue}
              onChange={(e) => setMessageValue(e.target.value)}
            />
            <div style={{ marginTop: "20px", float: "right" }}>
              <AnimeButton
                para=""
                text={"Send"}
                width="120px"
                height="32px"
                textColor="white"
                backGroundColor="#FFC300"
                borderColor="#FFC300"
                buttonClick={() => sendMessage()}
              />
            </div>
          </MessageDiv>
        </MessageModal>
      </div>
    </>
  );
};

export default MarketplaceShowOne;
