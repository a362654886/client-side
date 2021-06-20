import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { messageDelete, messagesGet } from "../../api/messageApPI";
import { FlexDiv, IconText, Loading } from "../../cssJs/publicCss";
import {
  IconButtonDelete,
  PostMessage,
  PostMessageBody,
  PostMessageManagement,
  PostMessageSubTitle,
} from "../../cssJs/userManagementCss";
import { getTimeDifference } from "../../helperFns/timeFn";
import { IStoreState } from "../../types/IStoreState";
import { Message } from "../../types/MessageType";
import { User } from "../../types/User";
import { LikeOutlined } from "@ant-design/icons";
import { DeleteOutlined } from "@ant-design/icons";
import { PaginationDiv } from "../conponentDivs/Pagination";

const pageSize = 8;

const UserMerchandiseMessageManagement = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [count, setCount] = useState(0);
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [num, serRefresh] = useState(0);

  useEffect(() => {
    (async function anyNameFunction() {
      await getMessages();
    })();
  }, [num]);

  const getMessages = async () => {
    setLoading(true);
    const postResult = await messagesGet(
      "",
      1,
      10,
      loginUser?.userEmail as string,
      "merchandise"
    );
    setAllMessages(postResult?.messages as Message[]);
    setCount(postResult?.count as number);
    setLoading(false);
  };

  const deleteMessage = async (messageId: string) => {
    setLoading(true);
    await messageDelete(messageId);
    refresh();
    setLoading(false);
  };

  const refresh = () => {
    const n = num + 1;
    serRefresh(n);
  };

  const getBody = () => {
    if (!loading) {
      return (
        <>
          {allMessages.map((message, index) => {
            return (
              <PostMessage key={index}>
                <FlexDiv>
                  <PostMessageSubTitle>
                    {`posted by `}
                    <a>{message.userEmail}</a>
                    {`, ${getTimeDifference(message.time)} ago`}
                  </PostMessageSubTitle>
                  <br />
                  <IconText color={message.like ? "red" : "black"}>
                    <div>
                      <LikeOutlined />
                    </div>
                    <p>{message.likeNum}</p>
                  </IconText>
                </FlexDiv>
                <PostMessageBody
                  dangerouslySetInnerHTML={{ __html: message.context }}
                ></PostMessageBody>
                <IconButtonDelete
                  type="primary"
                  shape="circle"
                  icon={<DeleteOutlined />}
                  onClick={() => deleteMessage(message._id)}
                />
              </PostMessage>
            );
          })}
        </>
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <PostMessageManagement>
      {getBody()}
      <PaginationDiv pageSize={pageSize} propFn={getMessages} count={count} />
    </PostMessageManagement>
  );
};

export default UserMerchandiseMessageManagement;
