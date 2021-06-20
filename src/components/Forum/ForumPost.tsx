import { Button } from "antd";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  AllPlates,
  PostAttribute,
  PostBody,
  PostContext,
  PostFooter,
  PostMessage,
  PostMessageBody,
  PostMessageDiv,
  SubTitle,
} from "../../cssJs/forumCss";
import { getTimeDifference } from "../../helperFns/timeFn";
import { IStoreState } from "../../types/IStoreState";
import { Post } from "../../types/PostType";
import CommentDiv from "../conponentDivs/CommentDiv";
import {
  MessageOutlined,
  ShareAltOutlined,
  SaveOutlined,
  LikeOutlined,
} from "@ant-design/icons";
import { FlexDiv, IconText, Loading } from "../../cssJs/publicCss";
import { Message, MessageReturnBody } from "../../types/MessageType";
import { PaginationDiv } from "../conponentDivs/Pagination";
import { User } from "../../types/User";
import { GetAlertDiv } from "../conponentDivs/GetAlertDiv";
import { BooleanType, LikeUpdateType } from "../../types/EnumTypes";
import { showAlert } from "../../helperFns/showFn";
import { POSTS_UPDATE } from "../../redux/posts";
import { MESSAGES_ADD, MESSAGES_UPDATE } from "../../redux/messages";
import { LIKE_BODY_SEND_MESSAGE } from "../../redux/likeBodyState";
import { getMessagesWithUseLike } from "../../helperFns/likeFn";

export const CommentButton = styled(Button)`
  border-radius: 20px;
  position: absolute;
  right: 5px;
`;

export const ReplyButton = styled(Button)`
  position: absolute;
  right: 5px;
  border-radius: 15px;
  padding: 2px 10px 2px 10px;
  margin: 0;
`;

interface Para {
  index: string;
  name: string;
}

const pageSize = 5;

const ForumPost = (): JSX.Element => {
  const para: Para = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const postsState: Post[] = useSelector(
    (state: IStoreState) => state.postsState
  );
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );
  const messageState: MessageReturnBody = useSelector(
    (state: IStoreState) => state.messagesState
  );

  //useState
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);

  const [show, setShow] = useState("none");

  const index: number = +para.index;

  useEffect(() => {
    if (postsState[index]) {
      (async function anyNameFunction() {
        await getMessages(postsState[index].postId, 1, pageSize);
      })();
      return () => {
        (async function anyNameFunction() {
          await updateUserLike();
        })();
        history.replace({
          pathname: `/mainPage/forumMain/forum/${para.name}`,
        });
      };
    }
  }, [para, loginUser]);

  const getPost = (): Post => postsState[index];

  /*
    get all messages according page and pagesize
  */
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
      LikeUpdateType.POST,
      dispatch
    );
    setPageNum(page);
    setLoading(false);
  };

  const childrenRef: React.MutableRefObject<{
    popUp: (upperMessage: string) => void;
  }> = useRef() as React.MutableRefObject<{
    popUp: (upperMessage: string) => void;
  }>;

  const sendComment = (upperMessage: string) => {
    if (!loginUser?.userEmail) {
      showAlert(setShow);
    } else {
      childrenRef.current.popUp(upperMessage);
    }
  };

  /*
    add new message to last 
  */
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

  /*
    like button function
  */

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

  const likePostFn = async () => {
    if (!loginUser?.userEmail) {
      showAlert(setShow);
    } else {
      dispatch({
        payload: index,
        type: POSTS_UPDATE,
      });
      setUpdate(update + 1);
    }
  };

  const newPage = async (page: number) => {
    await updateUserLike();
    await getMessages(postsState[index].postId, page, pageSize);
  };

  /*
    send json data to back-end to update message like num and user's like array 
  */

  const updateUserLike = () => {
    dispatch({
      payload: index,
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

  const getPostBody = () => {
    if (getPost()) {
      return (
        <>
          <PostBody>
            <h5>{getPost().postTitle}</h5>
            <PostAttribute>
              <SubTitle>
                {`posted by `}
                <a>{getPost().userEmail}</a>
                {`, ${getTimeDifference(getPost().time)} ago`}
              </SubTitle>
            </PostAttribute>
            <PostContext
              dangerouslySetInnerHTML={{ __html: getPost().context }}
            ></PostContext>
            <PostFooter>
              <IconText>
                <div>
                  <MessageOutlined />
                </div>
                <p>{`${messageState.count} messages`}</p>
              </IconText>
              <IconText>
                <div>
                  <ShareAltOutlined />
                </div>
                <p>Share</p>
              </IconText>
              <IconText
                color={getPost().like ? "red" : "black"}
                onClick={() => {
                  likePostFn();
                }}
              >
                <div>
                  <SaveOutlined />
                </div>
                <p>Save</p>
              </IconText>
              <CommentButton onClick={() => sendComment("")}>
                Comment
              </CommentButton>
            </PostFooter>
          </PostBody>
          <CommentDiv
            childRef={childrenRef}
            postObj={getPost()}
            sendBack={addMessage}
            type="Post"
          />
          <GetAlertDiv
            alert={{
              type: BooleanType.FAIL,
              context: "you can't comment without login",
            }}
            show={show}
          />
          <PostMessage>
            <h5>comments</h5>
            {getComment()}
            <PaginationDiv
              pageSize={pageSize}
              propFn={newPage}
              count={messageState.count}
            />
          </PostMessage>
        </>
      );
    } else {
      return <Loading />;
    }
  };

  return <AllPlates>{getPostBody()}</AllPlates>;
};

export default ForumPost;
