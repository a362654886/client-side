import * as React from "react";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  forumAdd,
  forumItemAdd,
  forumItemUpdate,
  forumsAllGet,
  forumSecondItemAdd,
  forumSecondUpdate,
  forumUpdate,
} from "../../../api/forumAPI";
import { AnimeButton, MiddleDiv } from "../../../components/Button";
import FullTextEditor from "../../../components/FullTextEditor";
import {
  AnimOneForum,
  ForumEditButton,
  ForumIframe,
  ForumImg,
  ForumItemBox,
  ForumName,
  ForumSecondItemBox,
  ForumTime,
  TextInput,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import { openNotification } from "../../../helperFns/popUpAlert";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { Anime } from "../../../types/Amine";
import { LoadingType } from "../../../types/EnumTypes";
import {
  ForumItem,
  ForumSecondItem,
  ForumType,
} from "../../../types/forumType";
import { IStoreState } from "../../../types/IStoreState";
import { Avatar, User } from "../../../types/User";
import loadingImg from "../../../files/loading.gif";
import { LoadingImgDiv } from "../../../cssJs/homePageCss";

interface IProps {
  anime: Anime | null;
  pageSizeSetting: number;
  ifShowHeader: boolean;
  ifShowAdd: boolean;
  toForum?: (num: number) => void;
}

const AnimeOneForum = ({
  anime,
  pageSizeSetting,
  ifShowHeader,
  ifShowAdd,
  toForum,
}: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [forums, setForums] = useState<ForumType[]>([]);
  const [html, setHtml] = useState<string>("");
  const [newItemHtml, setNewItemHtml] = useState<string[]>([]);
  const [newSecondItemHtml, setNewSecondItemHtml] = useState<string[][]>([[]]);
  const [showPost, setShowPost] = useState<boolean>(false);
  const [pageNum, setPageNum] = useState<number>(1);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const pageSize = pageSizeSetting;

  useEffect(() => {
    (async function anyNameFunction() {
      await getForums();
    })();
    const newArr: string[][] = [[]];
    for (let k = 0; k < forums.length; k++) {
      newArr.push([]);
      const l = forums[k].items;
      if (l) {
        for (let j = 0; j < l.length; j++) {
          newArr[k].push("");
        }
      }
    }
    setNewSecondItemHtml(newArr);
  }, [pageNum]);

  useEffect(() => {
    //console.log(forums);
  }, [forums, update]);

  const getForums = async () => {
    setLoading(true);
    const forumResult = await forumsAllGet(
      anime ? anime._id : "",
      pageNum,
      pageSize
    );
    if (forumResult && forums.length < forumResult.count) {
      setForums(forums.concat(forumResult.result));
      setCount(forumResult.count);
    }
    setLoading(false);
  };
  //post functions
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

  const submitNewForumItem = async (forum: ForumType, index: number) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const forumItem: ForumItem = {
        _id: `${forum._id}${forum.items ? forum.items.length + 1 : 1}`,
        forumItemId: `${forum._id}${forum.items ? forum.items.length + 1 : 1}`,
        text: newItemHtml[index],
        forumId: forum._id,
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: loginUser.name,
        anime: anime?._id as string,
      };
      const r = await forumItemAdd(forumItem);
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

  const submitNewSecondForumItem = async (
    forum: ForumItem,
    index: number,
    secondIndex: number
  ) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const secondForumItem: ForumSecondItem = {
        _id: `${forum._id}${
          forum.secondItems ? forum.secondItems.length + 1 : 1
        }`,
        forumSecondItemId: `${forum._id}${
          forum.secondItems ? forum.secondItems.length + 1 : 1
        }`,
        forumItemId: forum.forumItemId,
        text: newSecondItemHtml[index][secondIndex],
        forumId: forum.forumId,
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: loginUser.name,
        anime: anime?._id as string,
      };
      const r = await forumSecondItemAdd(secondForumItem);
      if (r && r < 300) {
        addForumSecondItemToForum(secondForumItem, index, secondIndex);
      }
    } else {
      openNotification("error", "please login and then reply");
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };
  //add to state
  const addForumItemToForum = (forumItem: ForumItem) => {
    const index = forums.findIndex((forum) => forum._id == forumItem.forumId);
    forums[index].items?.push(forumItem);
    setForums(forums);
  };

  const addForumSecondItemToForum = (
    forumItem: ForumSecondItem,
    index: number,
    secondIndex: number
  ) => {
    const newForums = forums;
    const items = newForums[index].items;
    if (items) {
      items[secondIndex].secondItems?.push(forumItem);
    }
    newForums[index].items = items;
    setForums(newForums);
  };

  const sendNewItem = (e: string, index: number) => {
    const newItemHtmls = newItemHtml;
    newItemHtmls[index] = e;
    setNewItemHtml(newItemHtmls);
  };

  const sendNewSecondItem = (e: string, index: number, secondIndex: number) => {
    const newSecondItemHtmls = newSecondItemHtml;
    newSecondItemHtmls[index][secondIndex] = e;
    setNewSecondItemHtml(newSecondItemHtmls);
  };

  //get html element
  const getAddItemBox = (forum: ForumType, index: number) => (
    <div style={{ marginTop: "16px" }}>
      <TextInput>
        <FullTextEditor
          html={newItemHtml[index]}
          setFullText={(e) => {
            sendNewItem(e, index);
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
          buttonClick={() => submitNewForumItem(forum, index)}
        />
      </TextInput>
    </div>
  );

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

  const getAddSecondItemBox = (
    forum: ForumItem,
    index: number,
    secondIndex: number
  ) => (
    <div style={{ marginTop: "16px" }}>
      <TextInput>
        <FullTextEditor
          html={
            newSecondItemHtml[index]
              ? newSecondItemHtml[index][secondIndex]
                ? newSecondItemHtml[index][secondIndex]
                : ""
              : ""
          }
          setFullText={(e) => {
            sendNewSecondItem(e, index, secondIndex);
          }}
        />
        <br />
        <div>
          <AnimeButton
            para=""
            text={"Post"}
            width="100%"
            height="32px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="#FFC300"
            buttonClick={() =>
              submitNewSecondForumItem(forum, index, secondIndex)
            }
          />
        </div>
      </TextInput>
    </div>
  );
  // reply
  const openReply = (index: number) => {
    forums[index].showReplay = !forums[index].showReplay;
    setForums(forums);
    const newArr: string[] = [];
    for (let k = 0; k < forums.length; k++) {
      newArr.push("");
    }
    setNewItemHtml(newArr);
    setUpdate(update + 1);
  };

  const openSecondReply = (index: number, secondIndex: number) => {
    const forumItem: ForumType = forums[index];
    if (forumItem.items) {
      forumItem.items[secondIndex].showReplay =
        !forumItem.items[secondIndex].showReplay;
    }
    forums[index] = forumItem;
    setForums(forums);
    const newArr: string[][] = [[]];
    for (let k = 0; k < forums.length; k++) {
      newArr.push([]);
      const l = forums[k].items;
      if (l) {
        for (let j = 0; j < l.length; j++) {
          newArr[k].push("");
        }
      }
    }
    setNewSecondItemHtml(newArr);
    setUpdate(update + 1);
  };

  const replyItem = (name: string) => {
    //setNewItemHtml(`<p>reply @${name}</p><p><br></p><p><br></p>`);
  };

  const replySecondItem = (name: string) => {
    //setNewSecondItemHtml(`<p>reply @${name}</p><p><br></p><p><br></p>`);
  };

  //edit forum functions
  const editForum = (index: number) => {
    const newForums = forums;
    newForums[index].edit = !newForums[index].edit;
    setForums(newForums);
    setUpdate(update + 1);
  };

  const editForumText = (index: number, text: string) => {
    const newForums = forums;
    newForums[index].text = text;
    setForums(newForums);
    setUpdate(update + 1);
  };

  const updateForum = async (index: number) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const updateResult = await forumUpdate({
      _id: forums[index]._id,
      forumId: forums[index].forumId,
      text: forums[index].text,
    });
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (updateResult == 200) {
      editForum(index);
    } else {
      console.log("update wrong");
    }
  };

  //edit forumItem functions
  const editForumItem = (index: number, secondIndex: number) => {
    const newForums = forums;
    (newForums[index].items as ForumItem[])[secondIndex].edit = !(
      newForums[index].items as ForumItem[]
    )[secondIndex].edit;
    setForums(newForums);
    setUpdate(update + 1);
  };

  const editForumItemText = (
    index: number,
    secondIndex: number,
    text: string
  ) => {
    const newForums = forums;
    (newForums[index].items as ForumItem[])[secondIndex].text = text;
    setForums(newForums);
    setUpdate(update + 1);
  };

  const updateForumItem = async (index: number, secondIndex: number) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const updateResult = await forumItemUpdate({
      _id: (forums[index].items as ForumItem[])[secondIndex]._id,
      forumId: (forums[index].items as ForumItem[])[secondIndex].forumId,
      text: (forums[index].items as ForumItem[])[secondIndex].text,
    });
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (updateResult == 200) {
      editForumItem(index, secondIndex);
    } else {
      console.log("update wrong");
    }
  };

  //edit forumSecondItem functions
  const editSecondForumItem = (
    index: number,
    secondIndex: number,
    thirdIndex: number
  ) => {
    const newForums = forums;
    (
      (newForums[index].items as ForumItem[])[secondIndex]
        .secondItems as ForumSecondItem[]
    )[thirdIndex].edit = !(
      (newForums[index].items as ForumItem[])[secondIndex]
        .secondItems as ForumSecondItem[]
    )[thirdIndex].edit;
    setForums(newForums);
    setUpdate(update + 1);
  };

  const editForumSecondItemText = (
    index: number,
    secondIndex: number,
    thirdIndex: number,
    text: string
  ) => {
    const newForums = forums;
    (
      (newForums[index].items as ForumItem[])[secondIndex]
        .secondItems as ForumSecondItem[]
    )[thirdIndex].text = text;
    setForums(newForums);
    setUpdate(update + 1);
  };

  const updateForumSecondItem = async (
    index: number,
    secondIndex: number,
    thirdIndex: number
  ) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const item = (
      (forums[index].items as ForumItem[])[secondIndex]
        .secondItems as ForumSecondItem[]
    )[thirdIndex];
    const updateResult = await forumSecondUpdate({
      _id: item._id,
      forumId: item.forumId,
      forumSecondItemId: item.forumSecondItemId,
      text: item.text,
    });
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (updateResult == 200) {
      editSecondForumItem(index, secondIndex, thirdIndex);
    } else {
      console.log("update wrong");
    }
  };

  // html functions

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
            <ForumEditButton>
              <AnimeButton
                para=""
                text={`Edit`}
                width="120px"
                height="32px"
                textColor="black"
                backGroundColor="white"
                borderColor="black"
                buttonClick={() => editForum(index)}
              />
            </ForumEditButton>
          </div>
          {forum.edit ? (
            <>
              <FullTextEditor
                html={forum.text}
                setFullText={(e) => editForumText(index, e)}
              />
              <AnimeButton
                para=""
                text={`Save`}
                width="120px"
                height="32px"
                textColor="black"
                backGroundColor="white"
                borderColor="black"
                buttonClick={() => updateForum(index)}
              />
            </>
          ) : (
            <>
              <div
                style={{ marginTop: "16px", marginLeft: "6px" }}
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
            </>
          )}
          <div
            style={{ display: forum.showReplay == true ? "inline" : "none" }}
          >
            {getAddItemBox(forum, index)}
            {forum.items ? getForumItems(forum.items, date, index) : <></>}
          </div>
        </ForumIframe>
      );
    });

  const getForumItems = (
    forumItems: ForumItem[],
    date: Date,
    index: number
  ) => {
    return forumItems.map((forum, secondIndex) => {
      return (
        <>
          <ForumItemBox key={secondIndex}>
            <div style={{ display: "flex" }}>
              <ForumImg src={`${forum.userAvatar}`} />
              <ForumName>{forum.userName}</ForumName>
              <ForumTime>{`${date.getDate()}-${
                date.getMonth() + 1
              }-${date.getFullYear()}`}</ForumTime>
              <ForumEditButton>
                <AnimeButton
                  para=""
                  text={`Edit`}
                  width="120px"
                  height="32px"
                  textColor="black"
                  backGroundColor="white"
                  borderColor="black"
                  buttonClick={() => editForumItem(index, secondIndex)}
                />
              </ForumEditButton>
            </div>
            {forum.edit ? (
              <>
                <FullTextEditor
                  html={forum.text}
                  setFullText={(e) => editForumItemText(index, secondIndex, e)}
                />
                <AnimeButton
                  para=""
                  text={`Save`}
                  width="120px"
                  height="32px"
                  textColor="black"
                  backGroundColor="white"
                  borderColor="black"
                  buttonClick={() => updateForumItem(index, secondIndex)}
                />
              </>
            ) : (
              <>
                <div
                  style={{ marginTop: "16px" }}
                  dangerouslySetInnerHTML={{ __html: forum.text }}
                ></div>
                <AnimeButton
                  para=""
                  text={`Replies(${
                    forum.secondItems ? forum.secondItems.length : 0
                  })`}
                  width="71px"
                  height="22px"
                  textColor="#4BA3C3"
                  backGroundColor="white"
                  borderColor="white"
                  buttonClick={() => openSecondReply(index, secondIndex)}
                />
              </>
            )}
            <div
              style={{ display: forum.showReplay == true ? "inline" : "none" }}
            >
              {getAddSecondItemBox(forum, index, secondIndex)}
              {forum.showReplay ? (
                <p>
                  {getSecondForumItems(
                    forum.secondItems,
                    date,
                    index,
                    secondIndex
                  )}
                </p>
              ) : (
                <></>
              )}
            </div>
          </ForumItemBox>
        </>
      );
    });
  };

  const getSecondForumItems = (
    forumItems: ForumSecondItem[] | undefined,
    date: Date,
    index: number,
    secondIndex: number
  ) => {
    return forumItems ? (
      forumItems.map((forum, thirdIndex) => {
        return (
          <>
            <ForumSecondItemBox key={thirdIndex}>
              <div style={{ display: "flex" }}>
                <ForumImg src={`${forum.userAvatar}`} />
                <ForumName>{forum.userName}</ForumName>
                <ForumTime>{`${date.getDate()}-${
                  date.getMonth() + 1
                }-${date.getFullYear()}`}</ForumTime>
                <ForumEditButton>
                  <AnimeButton
                    para=""
                    text={`Edit`}
                    width="120px"
                    height="32px"
                    textColor="black"
                    backGroundColor="white"
                    borderColor="black"
                    buttonClick={() =>
                      editSecondForumItem(index, secondIndex, thirdIndex)
                    }
                  />
                </ForumEditButton>
              </div>
              {forum.edit ? (
                <>
                  <FullTextEditor
                    html={forum.text}
                    setFullText={(e) =>
                      editForumSecondItemText(index, secondIndex, thirdIndex, e)
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
                      updateForumSecondItem(index, secondIndex, thirdIndex)
                    }
                  />
                </>
              ) : (
                <>
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
                    buttonClick={() => replySecondItem(forum.userName)}
                  />
                </>
              )}
            </ForumSecondItemBox>
          </>
        );
      })
    ) : (
      <></>
    );
  };

  const getMore = () => {
    const newPage = pageNum + 1;
    setPageNum(newPage);
  };

  const getLoading = () =>
    loading ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      <></>
    );

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
      {getLoading()}
      {ifShowAdd ? (
        <>
          <MiddleDiv>
            <AnimeButton
              para=""
              text={"View More"}
              width="120px"
              height="32px"
              textColor="#F5A623"
              backGroundColor="#FBFCDB"
              borderColor="#F5A623"
              buttonClick={() => (toForum ? toForum(3) : {})}
            />
          </MiddleDiv>
        </>
      ) : (
        <>
          {forums.length < count ? (
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
          ) : (
            <></>
          )}
        </>
      )}
    </AnimOneForum>
  );
};

export default AnimeOneForum;
