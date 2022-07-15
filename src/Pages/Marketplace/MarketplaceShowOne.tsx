import { Input, Popover, Spin } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { ImageBody } from "../../components/ImageUpload";
import {
  LoadingBidImg,
  MarketBody,
  MarketBodyDiv,
  MarketDescription,
  MarketEditAndDeleteDiv,
  MarketFilterCloseImg,
  MarketFollow,
  MarketImgDiv,
  MarketItemImg,
  MarketItemName,
  MarketItemTime,
  MarketLocation,
  MarketOneHotDiv,
  MarketPlaceTitle,
  MarketPlaceTitleDiv,
  MarketPriceContextDiv,
  MarketPriceDiv,
  MarketPriceImg,
  MarketPriceMoreDiv,
  MarketPriceNum,
  MarketPricePriceName,
  MarketShowOneTitle,
  MarketTag,
  MarketTagDiv,
  MarketText,
  MarketViewMore,
  PriceInput,
  WishBids,
  WishBidsContext,
} from "../../cssJs/MarketPage/MarketPlaceCss";
import AnimeButton from "../../components/Button";
import { MarketPriceType, MarketType } from "../../types/MarketType";
import { Avatar, User } from "../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "../../types/IStoreState";
import {
  marketDelete,
  marketGet,
  marketPriceInsert,
  marketPricesGetById,
} from "../../api/marketAPI";
import { useHistory, useParams } from "react-router-dom";
import ProfileWrapperDiv from "../../components/ProfileWrapperDiv";
import Flag from "react-flagkit";
import { flagGet, flagGetName } from "../../helperFns/flag";
import { _getDate } from "../../helperFns/timeFn";
import marketFollow from "../../files/Icon-Follow.svg";
import marketMessage from "../../files/marketMessage.svg";
import hotIcon from "../../files/MarketHotTags.svg";
import IconFollowing from "../../files/IconFollowing.svg";
import editIcon from "../../files/editIcon.svg";
import deleteIcon from "../../files/deleteIcon.svg";
import moreRightImg from "../../files/moreRightArrow.svg";
import marketPrice from "../../files/marketPrice.svg";
import moreBottomArrow from "../../files/moreBottomArrow.svg";
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
import { getWidth } from "../../helperFns/widthFn";
import { ReportContextType } from "../../types/blockType";
import { TagType } from "../../types/tagType";
import iconClose from "../../files/Icon-Close.svg";
import { marketTagAllGet } from "../../api/tagAPI";
import {
  showCaseReplyAdd,
  showCaseReplyDelete,
  showCaseReplyGet,
  showCaseReplyUpdate,
  showCaseSecondReplyAdd,
  showCaseSecondReplyDelete,
  showCaseSecondReplyGet,
  showCaseSecondReplyUpdate,
} from "../../api/showcaseAPI";
import { ShowCaseReply, ShowSecondCaseReply } from "../../types/showCaseType";
import { cloneDeep } from "lodash";
import {
  EditAndDeleteDiv,
  EpisodesComments,
  ReplyAddDiv,
  ReplyBox,
  ReplyDiv,
  ReplySecondBox,
  ShowAvatarDiv,
  ShowcaseEditDiv,
  ShowcaseMoreButtonDiv,
  ShowcaseReply,
  ShowImg,
  ShowName,
  ShowTime,
} from "../../cssJs/ShowCasePage/showCaseCss";
import switchIcon from "../../files/arrows.svg";
import {
  AnimeEditAndDeleteDiv,
  TextInput,
} from "../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import { IfLoginCheck } from "../../helperFns/loginCheck";
import forumMore from "../../files/forumMore.svg";
import { windowLink } from "../../globalValues";

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
  const [marketTags, setMarketTags] = useState<TagType[]>([]);
  const [hotTagVisible, setHotTagVisible] = useState<boolean>(false);

  const [itemLoading, setItemLoading] = useState<boolean>(false);
  const [secondItemLoading, setSecondItemLoading] = useState<boolean>(false);
  const [replies, setReplies] = useState<ShowCaseReply[]>([]);
  const [replyPage, setReplyPage] = useState<number>(1);
  const [commentShow, setCommentShow] = useState<boolean>(false);
  const [newReplyHtml, setNewReplyHtml] = useState<string>("");
  const [newSecondReplyHtml, setNewSecondReplyHtml] = useState<string[]>([]);
  const [showcasePage, setShowcasePage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    (async function anyNameFunction() {
      await getAllTags();
      const market = await marketGet(para.id);
      await getMoreItems(para.id, replyPage);
      if (market && market.imageArr) {
        setImgArr(market.imageArr);
        addImg(market.imageArr);
        setTitle(market.title);
        setPrice(market.price);
        setDescription(market.description);
        setState(market.state);
        setMarketState(market);
      }
    })();
  }, []);

  useEffect(() => {
    //console.log(loginUser);
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
    (async function anyNameFunction() {
      if (page == 1) {
        await getIniMarketPrices();
      } else {
        await getMarketPrices();
      }
    })();
  }, [marketState, page]);

  useEffect(() => {
    console.log(imgArr);
  }, [imgArr]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // comments
  const getMoreItems = async (marketId: string, page: number | undefined) => {
    if (page) {
      setItemLoading(true);
      const showcaseResult = await showCaseReplyGet(marketId, page, 6);

      //set
      const newReplies = cloneDeep(replies);
      if (showcaseResult) {
        setReplies(newReplies.concat(showcaseResult.result));
        setCount(showcaseResult.count);
      }
    }
  };

  const getAllTags = async () => {
    const marketResult = await marketTagAllGet();
    setMarketTags(marketResult);
  };

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

  const addImg = (imgArr: string[]) => {
    const newImgArr = imgArr;
    let length = newImgArr.length;
    do {
      length += 1;
      newImgArr.push(
        `https://animeimagebucket.s3.amazonaws.com/marketCreateImg.png`
      );
    } while (length < 4);
    setImgArr(newImgArr.length > 4 ? newImgArr.slice(0, 4) : newImgArr);
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

  const hotTagDiv = () => {
    return (
      <MarketOneHotDiv>
        <MarketFilterCloseImg
          src={iconClose}
          onClick={() => setHotTagVisible(false)}
        />
        <MarketTagDiv>
          {marketTags.map((tag, index) => {
            return (
              <p
                onClick={() => {
                  history.push({
                    pathname: `/marketplace/show/${tag.text}`,
                  });
                }}
                key={index}
              >
                {tag.text}
              </p>
            );
          })}
        </MarketTagDiv>
      </MarketOneHotDiv>
    );
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
              type={ReportContextType.MARKET}
              contextId={item._id}
              resourceLink={`${windowLink}/marketplace/showOne//${marketState?._id}`}
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

  const submitNewShowcaseReply = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (newReplyHtml == "") {
      openNotification(
        "please input comment",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    } else if (loginUser) {
      const Id = `${para.id}${new Date().valueOf()}`;
      const showcaseReply: ShowCaseReply = {
        _id: Id,
        replyId: Id,
        showCaseId: para.id,
        text: newReplyHtml,
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userId: loginUser._id,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        userCountry: loginUser.country,
        fullItems: true,
        hide: false,
      };
      const r = await showCaseReplyAdd(showcaseReply);
      if (r && r < 300) {
        const newReply = cloneDeep(replies);
        newReply.push(showcaseReply);
        setReplies(newReply);
        setNewReplyHtml("");
      }
    } else {
      openNotification(
        "please login and then reply",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const deleteMarket = async () => {
    if (marketState) {
      const r = await marketDelete(marketState._id);
      console.log(r);
      history.push(`/marketplace/show/null`);
    }
  };

  const getAddReplyBox = () => (
    <div style={{ marginTop: "16px" }}>
      <TextInput>
        <TextArea
          value={newReplyHtml}
          onChange={(e) =>
            IfLoginCheck(loginUser) ? setNewReplyHtml(e.target.value) : ""
          }
        />
        <br />
        <ReplyAddDiv>
          <AnimeButton
            para=""
            text={"Post"}
            width="100%"
            height="32px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="#FFC300"
            buttonClick={() => submitNewShowcaseReply()}
          />
        </ReplyAddDiv>
      </TextInput>
    </div>
  );

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

  const editShowcaseReplyText = (secondIndex: number, text: string) => {
    const newReplies = cloneDeep(replies);
    newReplies[secondIndex].text = text;
    setReplies(newReplies);
  };

  const updateShowcaseReply = async (secondIndex: number) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const updateResult = await showCaseReplyUpdate({
      _id: replies[secondIndex]._id,
      text: replies[secondIndex].text,
    });
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (updateResult == 200) {
      editShowcaseReply(secondIndex);
    } else {
      console.log("update wrong");
    }
  };

  const editShowcaseReply = (secondIndex: number) => {
    const newReplies = cloneDeep(replies);
    newReplies[secondIndex].edit = !newReplies[secondIndex].edit;
    setReplies(newReplies);
  };

  //delete
  const deleteShowcaseReply = async (id: string, index: number) => {
    const newReplies = cloneDeep(replies);
    const deleteIndex = newReplies.map((x) => x.replyId).indexOf(id);
    newReplies.splice(deleteIndex, 1);
    setReplies(newReplies);
    await showCaseReplyDelete(id);
  };

  const openSecondReply = (secondIndex: number) => {
    const newReplies = cloneDeep(replies);
    newReplies[secondIndex].showReplay = !newReplies[secondIndex].showReplay;
    setReplies(newReplies);
    const newArr: string[] = [];
    const secondReplies = newReplies
      ? newReplies[secondIndex].secondReplies
      : undefined;
    if (secondReplies) {
      for (let i = 0; i < secondReplies.length; i++) {
        newArr.push(secondReplies[i].text);
      }
    } else {
      newArr.push("");
    }
    //setNewSecondReplyHtml(newArr);
    setUpdate(update + 1);
  };

  const sendNewSecondReply = (e: string, secondIndex: number) => {
    const newSecondReplyHtmls = cloneDeep(newSecondReplyHtml);
    newSecondReplyHtmls[secondIndex] = e;
    setNewSecondReplyHtml(newSecondReplyHtmls);
  };

  const addSecondShowcaseToState = (
    showcaseReply: ShowSecondCaseReply,
    secondIndex: number
  ) => {
    const newReplies = cloneDeep(replies);
    if (newReplies[secondIndex].secondReplies) {
      newReplies[secondIndex].secondReplies?.unshift(showcaseReply);
    } else {
      newReplies[secondIndex].secondReplies = [];
      newReplies[secondIndex].secondReplies?.unshift(showcaseReply);
    }
    setReplies(newReplies);
  };

  const submitNewSecondReplyItem = async (
    showcase: ShowCaseReply,
    secondIndex: number
  ) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (newSecondReplyHtml[secondIndex] == "") {
      openNotification(
        "please input comment",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    } else if (loginUser) {
      const secondShowcase: ShowSecondCaseReply = {
        _id: `${showcase._id}${
          replies
            ? replies.length + +new Date().valueOf()
            : +new Date().valueOf()
        }`,
        replyId: showcase.replyId,
        showCaseId: showcase.showCaseId,
        text: newSecondReplyHtml[secondIndex],
        uploadTime: new Date(),
        userId: loginUser._id,
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        hide: false,
      };
      const r = await showCaseSecondReplyAdd(secondShowcase);
      if (r && r < 300) {
        addSecondShowcaseToState(secondShowcase, secondIndex);
        const newSecondItems = cloneDeep(newSecondReplyHtml);
        newSecondItems[secondIndex] = "";
        setNewSecondReplyHtml(newSecondItems);
      }
    } else {
      openNotification(
        "please login and then reply",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const getAddSecondReplyBox = (
    showcaseReply: ShowCaseReply,
    secondIndex: number
  ) => {
    let show = true;
    showcaseReply.secondReplies?.forEach((item) => {
      if (item.reply) {
        show = false;
      }
    });
    return show ? (
      <div style={{ marginTop: "16px" }}>
        <TextInput>
          <TextArea
            value={newSecondReplyHtml[secondIndex]}
            onChange={(e) => {
              IfLoginCheck(loginUser)
                ? sendNewSecondReply(e.target.value, secondIndex)
                : "";
            }}
          />
          <br />
          <ReplyAddDiv>
            <AnimeButton
              para=""
              text={"Post"}
              width="100%"
              height="32px"
              textColor="white"
              backGroundColor="#FFC300"
              borderColor="#FFC300"
              buttonClick={() =>
                submitNewSecondReplyItem(showcaseReply, secondIndex)
              }
            />
          </ReplyAddDiv>
        </TextInput>
      </div>
    ) : (
      <ReplyAddDiv>
        <AnimeButton
          para=""
          text={"Post New Item"}
          width="100%"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => openNewSecondItem(secondIndex)}
        />
      </ReplyAddDiv>
    );
  };

  const openNewSecondItem = (secondIndex: number) => {
    const _replies = cloneDeep(replies);

    const secondReplies = _replies[secondIndex]
      .secondReplies as ShowSecondCaseReply[];

    const _secondReplies = secondReplies.map((item) => {
      item.reply = false;
      return item;
    });

    _replies[secondIndex].secondReplies = _secondReplies;

    setReplies(_replies);

    const _newSecondReplyHtml = cloneDeep(newSecondReplyHtml);
    _newSecondReplyHtml[secondIndex] = ` `;
    setNewSecondReplyHtml(_newSecondReplyHtml);
  };

  const editShowcaseSecondReplyText = (
    secondIndex: number,
    thirdIndex: number,
    text: string
  ) => {
    const newReplies = cloneDeep(replies);
    (newReplies[secondIndex].secondReplies as ShowSecondCaseReply[])[
      thirdIndex
    ].text = text;
    setReplies(newReplies);
  };

  const updateShowcaseSecondItem = async (
    secondIndex: number,
    thirdIndex: number
  ) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const updateResult = await showCaseSecondReplyUpdate({
      _id: (replies[secondIndex].secondReplies as ShowSecondCaseReply[])[
        thirdIndex
      ]._id,
      text: (replies[secondIndex].secondReplies as ShowSecondCaseReply[])[
        thirdIndex
      ].text,
    });
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (updateResult == 200) {
      editShowcaseSecondReply(secondIndex, thirdIndex);
    } else {
      console.log("update wrong");
    }
  };

  const editShowcaseSecondReply = (secondIndex: number, thirdIndex: number) => {
    const newReplies = cloneDeep(replies);
    (newReplies[secondIndex].secondReplies as ShowSecondCaseReply[])[
      thirdIndex
    ].edit = !(newReplies[secondIndex].secondReplies as ShowSecondCaseReply[])[
      thirdIndex
    ].edit;
    setReplies(newReplies);
  };

  const deleteShowcaseSecondReply = async (id: string, index: number) => {
    const newReplies = cloneDeep(replies);
    const deleteIndex = (
      newReplies[index].secondReplies as ShowSecondCaseReply[]
    )
      .map((x) => x.replyId)
      .indexOf(id);
    (newReplies[index].secondReplies as ShowSecondCaseReply[]).splice(
      deleteIndex,
      1
    );
    setReplies(newReplies);
    await showCaseSecondReplyDelete(id);
  };

  const replySecondReply = (
    name: string,
    secondIndex: number,
    thirdIndex: number
  ) => {
    const _newSecondReplyHtml = cloneDeep(newSecondReplyHtml);
    _newSecondReplyHtml[secondIndex] = `@${name} `;

    const newReplies = cloneDeep(replies);

    const secondReplies = replies[secondIndex]
      .secondReplies as ShowSecondCaseReply[];

    const _secondReplies = secondReplies.map((item) => {
      item.reply = false;
      return item;
    });

    _secondReplies[thirdIndex].reply = !_secondReplies[thirdIndex].reply;
    newReplies[secondIndex].secondReplies = _secondReplies;

    setReplies(newReplies);
    setNewSecondReplyHtml(_newSecondReplyHtml);
  };

  const getMoreSecondItem = async (
    marketId: string,
    replyId: string,
    page: number | undefined
  ) => {
    if (page && marketId) {
      setSecondItemLoading(true);
      const showcaseResult = await showCaseSecondReplyGet(replyId, page + 1, 3);

      //set
      let newReplies = cloneDeep(replies);
      if (showcaseResult) {
        newReplies = newReplies.concat(showcaseResult.result);
        const secondIndex = newReplies.findIndex((item) => item._id == replyId);
        newReplies[secondIndex].secondReplies = newReplies[
          secondIndex
        ].secondReplies?.concat(showcaseResult.result);
        const secondPage = newReplies[secondIndex].page;
        newReplies[secondIndex].page = secondPage ? secondPage + 1 : 1;
        newReplies[secondIndex].fullItems =
          showcaseResult.count <=
          (newReplies[secondIndex].secondReplies as ShowSecondCaseReply[])
            .length
            ? true
            : false;

        setReplies(newReplies);
      }
      setSecondItemLoading(false);
    }
  };

  const getMoreItem = async (showCaseId: string, page: number | undefined) => {
    if (page) {
      setItemLoading(true);
      const showcaseResult = await showCaseReplyGet(showCaseId, page + 1, 6);

      //set
      let newReplies = cloneDeep(replies);
      if (showcaseResult) {
        newReplies = newReplies.concat(showcaseResult.result);
      }

      setReplies(newReplies);
      setShowcasePage(page + 1);
    }
  };

  const getSecondReplyItems = (
    showcaseReplies: ShowSecondCaseReply[] | undefined,
    date: Date,
    secondIndex: number
  ) => {
    return showcaseReplies ? (
      showcaseReplies.map((showcaseSecondReply, thirdIndex) => {
        return (
          <>
            <ReplySecondBox key={thirdIndex}>
              <ShowAvatarDiv>
                <ProfileWrapperDiv
                  userId={showcaseSecondReply.userId}
                  element={
                    <>
                      <ShowImg src={`${showcaseSecondReply.userAvatar}`} />
                      <ShowName>
                        {showcaseSecondReply.userName}
                        <Flag
                          style={{ marginLeft: "5px" }}
                          country={flagGet(
                            showcaseSecondReply.userCountry
                              ? showcaseSecondReply.userCountry
                              : ""
                          )}
                        />
                      </ShowName>
                    </>
                  }
                ></ProfileWrapperDiv>
                <SettingImg
                  userId={showcaseSecondReply.userId}
                  userName={showcaseSecondReply.userName}
                  userImg={showcaseSecondReply.userAvatar}
                  marginTop="8px"
                  type={ReportContextType.SHOWCASE_SECOND_REPLY}
                  contextId={showcaseSecondReply._id}
                  resourceLink={`${windowLink}/marketplace/showOne//${marketState?._id}`}
                />
                <ShowTime>{`${date.getDate()}-${
                  date.getMonth() + 1
                }-${date.getFullYear()}`}</ShowTime>
              </ShowAvatarDiv>
              <div style={{ marginLeft: "40px" }}>
                {showcaseSecondReply.edit ? (
                  <ShowcaseEditDiv>
                    <TextArea
                      value={showcaseSecondReply.text}
                      onChange={(e) =>
                        editShowcaseSecondReplyText(
                          secondIndex,
                          thirdIndex,
                          e.target.value
                        )
                      }
                    />
                    <AnimeButton
                      para=""
                      text={`Save`}
                      width="120px"
                      height="32px"
                      textColor="black"
                      backGroundColor="white"
                      borderColor="black"
                      buttonClick={() =>
                        updateShowcaseSecondItem(secondIndex, thirdIndex)
                      }
                    />
                    <AnimeButton
                      para=""
                      text={`Cancel`}
                      width="120px"
                      height="32px"
                      textColor="black"
                      backGroundColor="white"
                      borderColor="black"
                      buttonClick={() =>
                        editShowcaseSecondReply(secondIndex, thirdIndex)
                      }
                    />
                  </ShowcaseEditDiv>
                ) : (
                  <>
                    <ShowcaseReply>{showcaseSecondReply.text}</ShowcaseReply>
                  </>
                )}
                {showcaseSecondReply.edit ? (
                  <></>
                ) : (
                  <EditAndDeleteDiv>
                    <AnimeEditAndDeleteDiv style={{ height: "32px" }}>
                      <img
                        onClick={() =>
                          editShowcaseSecondReply(secondIndex, thirdIndex)
                        }
                        src={`${editIcon}`}
                        style={{
                          cursor: "pointer",
                        }}
                      />
                      <p
                        onClick={() =>
                          editShowcaseSecondReply(secondIndex, thirdIndex)
                        }
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </p>
                    </AnimeEditAndDeleteDiv>
                    <DeleteWrapperDiv
                      element={
                        <AnimeEditAndDeleteDiv style={{ height: "32px" }}>
                          <img
                            style={{ width: "24px" }}
                            src={`${deleteIcon}`}
                          />
                          <p style={{ cursor: "pointer", height: "32px" }}>
                            Delete
                          </p>
                        </AnimeEditAndDeleteDiv>
                      }
                      deleteFn={() =>
                        deleteShowcaseSecondReply(
                          showcaseSecondReply._id,
                          secondIndex
                        )
                      }
                    />
                  </EditAndDeleteDiv>
                )}
                <ReplyAddDiv>
                  <AnimeButton
                    para=""
                    text={`Reply`}
                    width="45px"
                    height="32px"
                    textColor="#4BA3C3"
                    backGroundColor="white"
                    borderColor="white"
                    buttonClick={() =>
                      replySecondReply(
                        showcaseSecondReply.userName,
                        secondIndex,
                        thirdIndex
                      )
                    }
                  />
                </ReplyAddDiv>
                {showcaseSecondReply.reply ? (
                  <>
                    <TextArea
                      value={
                        newSecondReplyHtml[secondIndex]
                          ? newSecondReplyHtml[secondIndex]
                          : ""
                      }
                      onChange={(e) => {
                        IfLoginCheck(loginUser)
                          ? sendNewSecondReply(e.target.value, secondIndex)
                          : "";
                      }}
                    />
                    <br />
                    <ReplyAddDiv>
                      <AnimeButton
                        para=""
                        text={"Post"}
                        width="100%"
                        height="32px"
                        textColor="white"
                        backGroundColor="#FFC300"
                        borderColor="#FFC300"
                        buttonClick={() =>
                          submitNewSecondReplyItem(
                            showcaseSecondReply,
                            secondIndex
                          )
                        }
                      />
                    </ReplyAddDiv>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </ReplySecondBox>
          </>
        );
      })
    ) : (
      <></>
    );
  };

  const getShowcaseReplies = (replies: ShowCaseReply[], date: Date) => {
    return replies.map((reply, secondIndex) => {
      return (
        <>
          <ReplyBox key={secondIndex}>
            <ShowAvatarDiv>
              <ProfileWrapperDiv
                userId={reply.userId}
                element={
                  <>
                    <ShowImg src={`${reply.userAvatar}`} />
                    <ShowName>
                      {reply.userName}
                      <Flag
                        style={{ marginLeft: "5px" }}
                        country={flagGet(
                          reply.userCountry ? reply.userCountry : ""
                        )}
                      />
                    </ShowName>
                  </>
                }
              ></ProfileWrapperDiv>
              <SettingImg
                userId={reply.userId}
                userName={reply.userName}
                userImg={reply.userAvatar}
                marginTop="8px"
                type={ReportContextType.SHOWCASE_REPLY}
                contextId={reply ? reply._id : ""}
                resourceLink={`${windowLink}/marketplace/showOne//${marketState?._id}`}
              />
              <ShowTime>{`${date.getDate()}-${
                date.getMonth() + 1
              }-${date.getFullYear()}`}</ShowTime>
            </ShowAvatarDiv>
            <div style={{ marginLeft: "40px" }}>
              {reply.edit ? (
                <ShowcaseEditDiv>
                  <TextArea
                    value={reply.text}
                    onChange={(e) =>
                      editShowcaseReplyText(secondIndex, e.target.value)
                    }
                  />
                  <AnimeButton
                    para=""
                    text={`Save`}
                    width="120px"
                    height="32px"
                    textColor="black"
                    backGroundColor="white"
                    borderColor="black"
                    buttonClick={() => updateShowcaseReply(secondIndex)}
                  />
                  <AnimeButton
                    para=""
                    text={`Cancel`}
                    width="120px"
                    height="32px"
                    textColor="black"
                    backGroundColor="white"
                    borderColor="black"
                    buttonClick={() => editShowcaseReply(secondIndex)}
                  />
                </ShowcaseEditDiv>
              ) : (
                <>
                  <ShowcaseReply>{reply.text}</ShowcaseReply>
                </>
              )}
              {reply.edit ? (
                <></>
              ) : (
                <EditAndDeleteDiv>
                  <AnimeEditAndDeleteDiv style={{ height: "32px" }}>
                    <img
                      style={{ width: "24px" }}
                      onClick={() => editShowcaseReply(secondIndex)}
                      src={`${editIcon}`}
                    />
                    <p
                      style={{ cursor: "pointer", height: "32px" }}
                      onClick={() => editShowcaseReply(secondIndex)}
                    >
                      Edit
                    </p>
                  </AnimeEditAndDeleteDiv>
                  <DeleteWrapperDiv
                    element={
                      <AnimeEditAndDeleteDiv style={{ height: "32px" }}>
                        <img style={{ width: "24px" }} src={`${deleteIcon}`} />
                        <p style={{ cursor: "pointer", height: "32px" }}>
                          Delete
                        </p>
                      </AnimeEditAndDeleteDiv>
                    }
                    deleteFn={() => deleteShowcaseReply(reply._id, secondIndex)}
                  />
                </EditAndDeleteDiv>
              )}
              <ReplyDiv
                onClick={() => {
                  openSecondReply(secondIndex);
                }}
              >
                <AnimeButton
                  para=""
                  text={`Replies(${
                    reply.secondReplies ? reply.secondReplies.length : 0
                  })`}
                  width="81px"
                  height="22px"
                  textColor="#4BA3C3"
                  backGroundColor="white"
                  borderColor="white"
                  buttonClick={() => console.log("")}
                />
                <img src={`${switchIcon}`} />
              </ReplyDiv>
              <div
                style={{
                  display: reply.showReplay == true ? "inline" : "none",
                }}
              >
                {getAddSecondReplyBox(reply, secondIndex)}
                {reply.showReplay ? (
                  <>
                    <>
                      {getSecondReplyItems(
                        reply.secondReplies,
                        date,
                        secondIndex
                      )}
                    </>
                  </>
                ) : (
                  <></>
                )}
                {reply.fullItems != true ? (
                  secondItemLoading ? (
                    <Spin />
                  ) : (
                    <ShowcaseMoreButtonDiv
                      onClick={() =>
                        getMoreSecondItem(
                          reply.showCaseId,
                          reply.replyId,
                          reply.page
                        )
                      }
                    >
                      <img src={forumMore} />
                      <p>More</p>
                    </ShowcaseMoreButtonDiv>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
          </ReplyBox>
        </>
      );
    });
  };

  return (
    <>
      <div
        className={getWidth() > 600 ? "col-xl-9 col-md-9 col-sm-9 col-9" : ""}
        style={{
          marginLeft: getWidth() > 600 ? "" : "8px",
          marginRight: getWidth() > 600 ? "" : "8px",
        }}
      >
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
            buttonClick={() => history.push(`/marketplace/create`)}
          />
        </MarketPlaceTitleDiv>
        <MarketBodyDiv>
          <MarketShowOneTitle>{title}</MarketShowOneTitle>
          <MarketImgDiv
            style={{
              width: getWidth() > 600 ? "610px" : "300px",
              height: getWidth() > 600 ? "650px" : "1050px",
            }}
          >
            {imgArr.map((image, index) => {
              return (
                <div
                  key={index}
                  style={
                    getWidth() > 600
                      ? {
                          position: "absolute",
                          left: (index + 1) % 2 == 0 ? "300px" : "0px",
                          top: index <= 1 ? "0px" : "320px",
                          width: "250px",
                          height: "250px",
                          backgroundColor: "#F6F6F6",
                          marginLeft: "40px",
                          display: "flex",
                          borderRadius: "20px",
                        }
                      : { marginTop: "10px" }
                  }
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
              state == "soldOut" ? "Sold Out" : "Available"
            }`}</span>
          </MarketText>
          {marketState && marketState.tags && marketState.tags.length > 0 ? (
            <>
              <div>
                {marketState.tags.map((tag, index) => {
                  return (
                    <MarketTag key={index}>
                      <span
                        onClick={() => {
                          history.push({
                            pathname: `/marketplace/show/${tag.text}`,
                          });
                        }}
                      >
                        {tag.text}
                      </span>
                    </MarketTag>
                  );
                })}
                <Popover
                  style={{ height: "24px", width: "50px" }}
                  placement="right"
                  content={hotTagDiv()}
                  trigger="click"
                  visible={hotTagVisible}
                >
                  <img
                    style={{ height: "32px", width: "50px" }}
                    src={hotIcon}
                    onClick={() => setHotTagVisible(true)}
                  />
                </Popover>
              </div>
            </>
          ) : (
            <></>
          )}
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
                type={ReportContextType.MARKET}
                contextId={
                  marketState ? (marketState._id ? marketState._id : "") : ""
                }
                resourceLink={`${windowLink}/marketplace/showOne//${marketState?._id}`}
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
            <MarketFollow
              style={{ display: getWidth() > 600 ? "flex" : "inline" }}
            >
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
          <ShareDiv marginTop={"16px"} />
          {marketState && marketState.userId == loginUser?._id ? (
            <MarketEditAndDeleteDiv>
              <div
                onClick={() => {
                  history.push({
                    pathname: `/marketplace/edit/${para.id}`,
                  });
                }}
              >
                <img src={`${editIcon}`} />
                <p>Edit</p>
              </div>
              <DeleteWrapperDiv
                element={
                  <>
                    <img style={{ width: "24px" }} src={`${deleteIcon}`} />
                    <p>Delete</p>
                  </>
                }
                deleteFn={() => deleteMarket()}
              />
            </MarketEditAndDeleteDiv>
          ) : (
            <div style={{ marginTop: "16px" }}></div>
          )}
          <MarketViewMore
            onClick={() => {
              history.push(
                `/profilePage/${
                  marketState ? marketState.userId : ""
                }?market=true`
              );
            }}
          >
            <img src={moreRightImg} />
            <p>View Other Items</p>
          </MarketViewMore>
          <WishBids>Wish Bids</WishBids>
          <WishBidsContext>
            <p>{`Your bid is for the seller's reference only. The final decision is
            up to the seller.`}</p>
          </WishBidsContext>
          <PriceInput
            style={{
              display: getWidth() > 600 ? "flex" : "inline",
              height: getWidth() > 600 ? "48px" : "226px",
            }}
          >
            <div style={{ display: "flex", marginLeft: "16px" }}>
              <p>$</p>
              <Input
                value={bidPrice}
                onChange={(e) => {
                  const price = e.target.value;
                  if (isNaN(Number(price))) {
                    setBidPrice(0);
                  } else {
                    setBidPrice(Number(price));
                  }
                }}
              />
              <p>(NZD)</p>
            </div>
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
                marginBottom: "24px",
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
              {marketPrices.length > 0 ? (
                <MarketPriceDiv>{getMarketPricesDiv()}</MarketPriceDiv>
              ) : (
                <></>
              )}
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
        <EpisodesComments
          style={{ marginTop: "0px" }}
          onClick={() => {
            setCommentShow(!commentShow);
          }}
        >
          <h6>{`Comments (${replies.length}) `}</h6>
          <img
            style={{ height: "20px", width: "20px" }}
            src={`${switchIcon}`}
          />
        </EpisodesComments>
        {commentShow ? (
          <div style={{ marginBottom: "16px" }}>
            {getAddReplyBox()}
            {getShowcaseReplies(replies, new Date(parseInt(para.id)))}
            {replies.length < count ? (
              <ShowcaseMoreButtonDiv
                onClick={() => getMoreItem(para.id, showcasePage)}
              >
                <img src={forumMore} />
                <p>More</p>
              </ShowcaseMoreButtonDiv>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}
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
