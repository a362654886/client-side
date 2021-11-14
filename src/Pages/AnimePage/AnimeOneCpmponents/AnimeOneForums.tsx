import * as React from "react";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { forumAdd, forumItemAdd, forumsAllGet } from "../../../api/forumAPI";
import { AnimeButton, MiddleDiv } from "../../../components/Button";
import FullTextEditor from "../../../components/FullTextEditor";
import {
  AnimOneForum,
  ForumIframe,
  ForumImg,
  ForumItemBox,
  ForumName,
  ForumTime,
  TextInput,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import { openNotification } from "../../../helperFns/popUpAlert";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { Anime } from "../../../types/Amine";
import { LoadingType } from "../../../types/EnumTypes";
import { ForumItem, ForumType } from "../../../types/forumType";
import { IStoreState } from "../../../types/IStoreState";
import { Avatar, User } from "../../../types/User";

interface IProps {
  anime: Anime | null;
  pageSizeSetting: number;
  ifShowHeader: boolean;
  ifShowAdd: boolean;
}

const AnimeOneForum = ({
  anime,
  pageSizeSetting,
  ifShowHeader,
  ifShowAdd,
}: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [forums, setForums] = useState<ForumType[]>([]);
  const [html, setHtml] = useState<string>("");
  const [newItemHtml, setNewItemHtml] = useState<string>("");
  const [showPost, setShowPost] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [update, setUpdate] = useState(0);

  const pageSize = pageSizeSetting;

  useEffect(() => {
    (async function anyNameFunction() {
      await getForums();
    })();
  }, [pageNum]);

  useEffect(() => {
    //console.log(forums);
  }, [forums, update]);

  const getForums = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const forumResult = await forumsAllGet(
      anime ? anime._id : "",
      pageNum,
      pageSize
    );
    if (forumResult && forums.length < forumResult.count) {
      setForums(forums.concat(forumResult.result));
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const submitNewForum = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const forum: ForumType = {
        _id: `${loginUser?._id}${new Date().toTimeString()}`,
        forumId: `${loginUser?._id}${new Date().toTimeString()}`,
        text: html,
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: loginUser.name,
        anime: anime?._id as string,
      };
      const r = await forumAdd(forum);
      if (r && r < 300) {
        forums.push(forum);
        setForums(forums);
      }
    } else {
      openNotification("error", "please login and then reply");
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const submitNewForumItem = async (forum: ForumType) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const forumItem: ForumItem = {
        _id: `${forum._id}${forum.items ? forum.items.length + 1 : 1}`,
        forumItemId: `${forum._id}${forum.items ? forum.items.length + 1 : 1}`,
        text: newItemHtml,
        forumId: forum._id,
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: loginUser.name,
        anime: anime?._id as string,
      };
      const r = await forumItemAdd(forumItem);
      console.log(r);
      if (r && r < 300) {
        addForumItemToForum(forumItem);
      }
    } else {
      openNotification("error", "please login and then reply");
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const addForumItemToForum = (forumItem: ForumItem) => {
    const index = forums.findIndex((forum) => forum._id == forumItem.forumId);
    forums[index].items?.push(forumItem);
    setForums(forums);
  };

  const getAddBox = () => (
    <div style={{ marginBottom: "16px" }}>
      <TextInput style={{ display: showPost ? "inline" : "none" }}>
        <FullTextEditor
          html={html}
          setFullText={(e) => {
            setHtml(e);
          }}
        />
        <br />
        <AnimeButton
          para=""
          text={"Post"}
          width="100%"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => submitNewForum()}
        />
      </TextInput>
    </div>
  );

  const getAddItemBox = (forum: ForumType) => (
    <div style={{ marginTop: "16px" }}>
      <TextInput>
        <FullTextEditor
          html={newItemHtml}
          setFullText={(e) => {
            setNewItemHtml(e);
          }}
        />
        <br />
        <AnimeButton
          para=""
          text={"Post"}
          width="100%"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => submitNewForumItem(forum)}
        />
      </TextInput>
    </div>
  );

  const openReply = (index: number) => {
    forums[index].showReplay = !forums[index].showReplay;
    setForums(forums);
    setUpdate(update + 1);
  };

  const replyItem = (name: string) =>
    setNewItemHtml(`<p><strong>@${name}</strong></p><p></p>`);

  const getExistForums = () =>
    forums.map((forum, index) => {
      const date = new Date(forum.uploadTime);
      return (
        <ForumIframe key={index}>
          <div style={{ display: "flex" }}>
            <ForumImg src={`${forum.userAvatar}`} />
            <ForumName>{forum.userName}</ForumName>
            <ForumTime>{`${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`}</ForumTime>
          </div>
          <div
            style={{ marginTop: "16px" }}
            dangerouslySetInnerHTML={{ __html: forum.text }}
          ></div>
          <AnimeButton
            para=""
            text={`Replies(${forum.items ? forum.items.length : 0})`}
            width="71px"
            height="22px"
            textColor="#4BA3C3"
            backGroundColor="white"
            borderColor="white"
            buttonClick={() => openReply(index)}
          />
          <div
            style={{ display: forum.showReplay == true ? "inline" : "none" }}
          >
            {forum.items ? (
              forum.items.map((forum, index) => {
                return (
                  <>
                    <ForumItemBox key={index}>
                      <div style={{ display: "flex" }}>
                        <ForumImg src={`${forum.userAvatar}`} />
                        <ForumName>{forum.userName}</ForumName>
                        <ForumTime>{`${date.getDate()}-${
                          date.getMonth() + 1
                        }-${date.getFullYear()}`}</ForumTime>
                      </div>
                      <div
                        style={{ marginTop: "16px" }}
                        dangerouslySetInnerHTML={{ __html: forum.text }}
                      ></div>
                      <AnimeButton
                        para=""
                        text={`Reply`}
                        width="71px"
                        height="22px"
                        textColor="#4BA3C3"
                        backGroundColor="white"
                        borderColor="white"
                        buttonClick={() => replyItem(forum.userName)}
                      />
                    </ForumItemBox>
                  </>
                );
              })
            ) : (
              <></>
            )}
            {getAddItemBox(forum)}
          </div>
        </ForumIframe>
      );
    });

  const getMore = () => {
    const newPage = pageNum + 1;
    setPageNum(newPage);
  };

  return (
    <AnimOneForum>
      <div
        style={{
          marginBottom: "16px",
          display: ifShowHeader ? "inline" : "none",
        }}
      >
        <div>
          <AnimeButton
            para=""
            text={showPost ? "Hide" : "Add"}
            width="120px"
            height="32px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="#FFC300"
            buttonClick={() => setShowPost(!showPost)}
          />
        </div>
      </div>
      <div
        style={{
          textAlign: "left",
          marginBottom: "16px",
          display: ifShowAdd ? "inline" : "none",
        }}
      >
        <AnimeButton
          para=""
          text={showPost ? "Hide" : "Add"}
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => setShowPost(!showPost)}
        />
      </div>
      {getAddBox()}
      {getExistForums()}
      <MiddleDiv>
        <AnimeButton
          para=""
          text={"View More"}
          width="120px"
          height="32px"
          textColor="#F5A623"
          backGroundColor="#FBFCDB"
          borderColor="#F5A623"
          buttonClick={() => getMore()}
        />
      </MiddleDiv>
    </AnimOneForum>
  );
};

export default AnimeOneForum;
