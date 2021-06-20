import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { IStoreState } from "../../types/IStoreState";
import {
  Merchandise,
  MerchandiseReturnBody,
} from "../../types/MerchandiseType";
import {
  BottomImg,
  MerchandiseButton,
  MerchandiseButtons,
  MerchandiseMessage,
  MerchandisePageDiv,
  MerchandiseShowDiv,
  MerchandiseShowDivBottom,
  MerchandiseShowDivLeft,
  MerchandiseShowDivRight,
  MerchandiseShowDivTop,
  MerchandiseText,
  MerchandiseTitle,
} from "../../cssJs/MerchandiseCss";
import {
  getAuctionTimeDifference,
  getDateString,
  getTimeDifference,
} from "../../helperFns/timeFn";
import AuctionModel from "./AuctionModel";
import { merchandiseUpdate } from "../../api/merchandiseApi";
import { User } from "../../types/User";
import { showAlert } from "../../helperFns/showFn";
import { GetAlertDiv } from "../conponentDivs/GetAlertDiv";
import { BooleanType, LikeUpdateType } from "../../types/EnumTypes";
import { MERCHANDISES_UPDATE } from "../../redux/merchandises";
import CommentDiv from "../conponentDivs/CommentDiv";
import { Message, MessageReturnBody } from "../../types/MessageType";
import { MESSAGES_ADD, MESSAGES_UPDATE } from "../../redux/messages";
import {
  PostMessageBody,
  PostMessageDiv,
  SubTitle,
} from "../../cssJs/forumCss";
import { FlexDiv, IconText, Loading } from "../../cssJs/publicCss";
import { LikeOutlined } from "@ant-design/icons";
import { ReplyButton } from "../Forum/ForumPost";
import { PaginationDiv } from "../conponentDivs/Pagination";
import { LIKE_BODY_SEND_MESSAGE } from "../../redux/likeBodyState";
import { getMessagesWithUseLike } from "../../helperFns/likeFn";

interface Para {
  index: string;
}

const pageSize = 5;

const MerchandisePage = (): JSX.Element => {
  const para: Para = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const merchandisesState: MerchandiseReturnBody = useSelector(
    (state: IStoreState) => state.merchandisesState
  );
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );
  const messageState: MessageReturnBody = useSelector(
    (state: IStoreState) => state.messagesState
  );

  const childrenRef: React.MutableRefObject<{
    popUp: () => void;
    popClose: () => void;
  }> = useRef() as React.MutableRefObject<{
    popUp: () => void;
    popClose: () => void;
  }>;

  const commentRef: React.MutableRefObject<{
    popUp: (upperMessage: string) => void;
  }> = useRef() as React.MutableRefObject<{
    popUp: (upperMessage: string) => void;
  }>;

  const [merchandise, setMerchandise] = useState<Merchandise | null>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [show, setShow] = useState("none");
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  useEffect(() => {
    //ser merchandise
    const index = para.index;
    setMerchandise(merchandisesState.merchandises[+index]);
    //set image
    const imageBody = merchandisesState.merchandises[+index].imageBodies;
    if (imageBody) {
      setMainImage(imageBody[0].imgBase64);
    }
    //set messages
    (async function anyNameFunction() {
      await getMessages(
        merchandisesState.merchandises[+index]._id,
        1,
        pageSize
      );
    })();
    // exit
    window.addEventListener("popstate", async function () {
      await updateUserLike();
      history.replace({
        pathname: `/mainPage/merchandise/filterMerchandise`,
      });
    });
  }, [update]);

  const auction = () => {
    if (!loginUser?.userEmail) {
      showAlert(setShow);
    } else {
      childrenRef.current.popUp();
    }
  };

  const getMerchandise = (): Merchandise =>
    merchandisesState.merchandises[+para.index];

  const getMessages = async (
    labelId: string,
    page: number,
    pageSize: number
  ) => {
    setLoading(true);
    const userEmail = loginUser ? loginUser.userEmail : "";
    await getMessagesWithUseLike(
      labelId,
      page,
      pageSize,
      userEmail,
      LikeUpdateType.MERCHANDISE,
      dispatch
    );
    setPageNum(page);
    setLoading(false);
  };

  const updateAuction = async (value: string) => {
    const newMerchandise: Merchandise = merchandise as Merchandise;
    newMerchandise.price = value;
    newMerchandise.auctionEmail = loginUser?._id as string;
    const result = await merchandiseUpdate(newMerchandise);
    if (result) {
      childrenRef.current.popClose();
      //set merchandises redux
      const merchandises = merchandisesState;
      merchandises.merchandises[+para.index] = newMerchandise;
      dispatch({
        payload: merchandises,
        type: MERCHANDISES_UPDATE,
      });

      setUpdate(update + 1);
    }
  };

  const addMessage = (message: Message) => {
    // if last page
    if (pageNum * pageSize >= messageState.count && messageState.messages) {
      dispatch({
        payload: message,
        type: MESSAGES_ADD,
      });
      setUpdate(update + 1);
    }
  };

  const sendComment = (upperMessage: string) => {
    if (!loginUser?.userEmail) {
      showAlert(setShow);
    } else {
      commentRef.current.popUp(upperMessage);
    }
  };

  const likeMessageFn = (index: number) => {
    if (!loginUser?.userEmail) {
      showAlert(setShow);
    } else {
      dispatch({
        payload: index,
        type: MESSAGES_UPDATE,
      });
    }
  };

  const newPage = async (page: number) => {
    await updateUserLike();
    await getMessages(
      merchandisesState.merchandises[+para.index]._id,
      page,
      pageSize
    );
  };

  const updateUserLike = () => {
    dispatch({
      payload: para.index,
      type: LIKE_BODY_SEND_MESSAGE,
    });
  };

  const getComment = () => {
    if (!loading) {
      return (messageState.messages as Message[]).map((message, index) => {
        return (
          <PostMessageDiv key={message._id}>
            <FlexDiv>
              <SubTitle>
                {`#${(pageNum - 1) * pageSize + index + 1} `}
                {`posted by `}
                <a>{message.userEmail}</a>
                {`, ${getTimeDifference(message.time)} ago`}
              </SubTitle>
              <br />
              <IconText
                onClick={() => likeMessageFn(index)}
                color={message.like ? "red" : "black"}
              >
                <div>
                  <LikeOutlined />
                </div>
                <p>{message.likeNum}</p>
              </IconText>
              <ReplyButton onClick={() => sendComment(message.context)}>
                reply
              </ReplyButton>
            </FlexDiv>
            <PostMessageBody
              dangerouslySetInnerHTML={{ __html: message.context }}
            ></PostMessageBody>
          </PostMessageDiv>
        );
      });
    } else {
      return <Loading />;
    }
  };

  return (
    <>
      <MerchandisePageDiv>
        <GetAlertDiv
          alert={{
            type: BooleanType.FAIL,
            context: "you can't add without login",
          }}
          show={show}
        />
        <MerchandiseShowDiv>
          <MerchandiseShowDivTop>
            <MerchandiseShowDivLeft>
              <div>
                <MerchandiseTitle>merchandise title:</MerchandiseTitle>
                <MerchandiseText>{merchandise?.name}</MerchandiseText>
              </div>
              <div>
                <MerchandiseTitle>merchandise price:</MerchandiseTitle>
                <MerchandiseText>{merchandise?.price}</MerchandiseText>
              </div>
              <div>
                <MerchandiseTitle>left time:</MerchandiseTitle>
                <MerchandiseText>
                  {getAuctionTimeDifference(
                    merchandise?.auctionLeftTime as Date
                  )}
                </MerchandiseText>
              </div>
              <div>
                <MerchandiseTitle>upload time:</MerchandiseTitle>
                <MerchandiseText>
                  {getDateString(merchandise?.uploadTime as Date)}
                </MerchandiseText>
              </div>
            </MerchandiseShowDivLeft>
            <MerchandiseShowDivRight>
              <img
                src={mainImage}
                style={{ width: "300px", height: "300px" }}
              ></img>
            </MerchandiseShowDivRight>
          </MerchandiseShowDivTop>
          <MerchandiseShowDivBottom>
            {merchandise?.imageBodies?.map((imageBody, index) => {
              return (
                <BottomImg
                  onClick={() => setMainImage(imageBody.imgBase64)}
                  src={imageBody.imgBase64}
                  key={index}
                />
              );
            })}
          </MerchandiseShowDivBottom>
        </MerchandiseShowDiv>
        <MerchandiseButtons>
          <MerchandiseButton
            style={{ right: "5px" }}
            onClick={() => sendComment("")}
          >
            New Comment
          </MerchandiseButton>
          <MerchandiseButton style={{ right: "155px" }} onClick={auction}>
            Auction
          </MerchandiseButton>
        </MerchandiseButtons>
        <MerchandiseMessage>
          <h5>messages</h5>
          {getComment()}
          <PaginationDiv
            pageSize={pageSize}
            propFn={newPage}
            count={messageState.count}
          />
        </MerchandiseMessage>
      </MerchandisePageDiv>
      <AuctionModel
        childRef={childrenRef}
        value={merchandise?.price as string}
        saveAuction={updateAuction}
      />
      <CommentDiv
        childRef={commentRef}
        merchandiseObj={getMerchandise()}
        sendBack={addMessage}
        type="Merchandise"
      />
    </>
  );
};

export default MerchandisePage;
