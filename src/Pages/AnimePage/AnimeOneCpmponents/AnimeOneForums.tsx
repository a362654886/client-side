import * as React from "react";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  forumAdd,
  forumDelete,
  forumItemAdd,
  forumItemDelete,
  forumItemUpdate,
  forumsAllGet,
  forumSecondDelete,
  forumSecondItemAdd,
  forumSecondUpdate,
  forumUpdate,
} from "../../../api/forumAPI";
import { AnimeButton, MiddleDiv } from "../../../components/Button";
import FullTextEditor from "../../../components/FullTextEditor";
import {
  AnimeEditAndDeleteDiv,
  AnimOneForum,
  ForumIframe,
  ForumImg,
  ForumItemBox,
  ForumName,
  ForumSecondItemBox,
  ForumTime,
  ReplyButton,
  TextInput,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../../helperFns/popUpAlert";
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
import { ReactQuillCss } from "../../../cssJs/fullTextEditor";
import editIcon from "../../../files/editIcon.svg";
import deleteIcon from "../../../files/deleteIcon.svg";

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
    console.log("sdsds");
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const forum: ForumType = {
        _id: `${loginUser?._id}${new Date().valueOf()}`,
        forumId: `${loginUser?._id}${new Date().valueOf()}`,
        text: html,
        uploadTime: new Date(),
        userId: loginUser?._id,
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        anime: anime?._id as string,
      };
      console.log(forum);
      const r = await forumAdd(forum);
      if (r && r < 300) {
        forums.unshift(forum);
        setForums(forums);
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

  const submitNewForumItem = async (index: number) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      console.log(forums[index]);
      const length = forums[index].items ? forums[index].items?.length : 0;
      const forumItem: ForumItem = {
        _id: `${
          length && length > 0
            ? (forums[index].items as ForumItem[])[0]._id + new Date().valueOf()
            : forums[index]._id + new Date().valueOf()
        }`,
        forumItemId: `${
          length && length > 0
            ? (forums[index].items as ForumItem[])[0]._id + new Date().valueOf()
            : forums[index]._id + new Date().valueOf()
        }`,
        text: newItemHtml[index],
        forumId: forums[index]._id,
        uploadTime: new Date(),
        userId: loginUser?._id,
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        anime: anime?._id as string,
      };
      const r = await forumItemAdd(forumItem);
      if (r && r < 300) {
        addForumItemToForum(forumItem);
        setNewItemHtml([]);
      }
    } else {
      openNotification(
        "please login and then reply",
        NotificationColor.Error,
        NotificationTitle.Error
      );
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const submitNewSecondForumItem = async (
    index: number,
    secondIndex: number
  ) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser) {
      const secondItems = (forums[index].items as ForumItem[])[secondIndex]
        .secondItems;
      const iniId = (forums[index].items as ForumItem[])[secondIndex]
        .forumItemId;
      const secondForumItem: ForumSecondItem = {
        _id: `${
          forums[index].items
            ? secondItems
              ? secondItems.length > 0
                ? secondItems[0]._id + new Date().valueOf()
                : iniId + new Date().valueOf()
              : iniId + new Date().valueOf()
            : iniId + new Date().valueOf()
        }`,
        forumSecondItemId: `${
          forums[index].items
            ? secondItems
              ? secondItems.length > 0
                ? secondItems[0]._id + new Date().valueOf()
                : iniId + new Date().valueOf()
              : iniId + new Date().valueOf()
            : iniId + new Date().valueOf()
        }`,
        forumItemId: (forums[index].items as ForumItem[])[secondIndex]._id,
        text: newSecondItemHtml[index][secondIndex],
        forumId: forums[index]._id,
        uploadTime: new Date(),
        userId: loginUser?._id,
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        anime: anime?._id as string,
      };
      const r = await forumSecondItemAdd(secondForumItem);
      if (r && r < 300) {
        addForumSecondItemToForum(secondForumItem, index, secondIndex);
        setNewSecondItemHtml([]);
      }
    } else {
      openNotification(
        "please login and then reply",
        NotificationColor.Error,
        NotificationTitle.Error
      );
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };
  //add to state
  const addForumItemToForum = (forumItem: ForumItem) => {
    const index = forums.findIndex((forum) => forum._id == forumItem.forumId);
    if (forums[index].items != undefined) {
      (forums[index].items as ForumItem[]).unshift(forumItem);
    } else {
      forums[index].items = [];
      (forums[index].items as ForumItem[]).unshift(forumItem);
    }
    setForums(forums);
    setUpdate(update + 1);
  };

  const addForumSecondItemToForum = (
    forumItem: ForumSecondItem,
    index: number,
    secondIndex: number
  ) => {
    const newForums = forums;
    const items = newForums[index].items;
    if (items) {
      if (items[secondIndex].secondItems != undefined) {
        items[secondIndex].secondItems?.unshift(forumItem);
      } else {
        items[secondIndex].secondItems = [];
        items[secondIndex].secondItems?.unshift(forumItem);
      }
    }
    newForums[index].items = items;
    setForums(newForums);
    setUpdate(update + 1);
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
  const getAddItemBox = (index: number) => (
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
          buttonClick={() => submitNewForumItem(index)}
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

  const getAddSecondItemBox = (index: number, secondIndex: number) => (
    <div style={{ marginTop: "16px", width: "" }}>
      <TextInput style={{ marginLeft: "16px", marginRight: "16px" }}>
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
            buttonClick={() => submitNewSecondForumItem(index, secondIndex)}
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

  /*const replyItem = (name: string) => {
    console.log(name)
    //setNewItemHtml(`<p>reply @${name}</p><p><br></p><p><br></p>`);
  };*/

  const replySecondItem = (
    name: string,
    index: number,
    secondIndex: number
  ) => {
    newSecondItemHtml[index][secondIndex] = `@${name} `;
    setNewSecondItemHtml(newSecondItemHtml);
    setUpdate(update + 1);
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

  //delete functions

  const deleteForum = async (index: number) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const newForums = forums;
    const id = forums[index]._id;
    const r = await forumDelete(id);
    console.log(r);
    const deleteIndex = newForums.findIndex((x) => x.forumId == id);
    newForums.splice(deleteIndex, 1);
    setForums(newForums);
    setUpdate(update + 1);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const deleteForumItem = async (index: number, secondIndex: number) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const newForums = forums;
    const id = (forums[index].items as ForumItem[])[secondIndex]._id;
    const r = await forumItemDelete(id);
    console.log(r);
    const deleteIndex = (newForums[index].items as ForumItem[])
      .map((x) => x.forumItemId)
      .indexOf(id);
    (newForums[index].items as ForumItem[]).splice(deleteIndex, 1);
    setForums(newForums);
    setUpdate(update + 1);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const deleteSecondItem = async (
    index: number,
    secondIndex: number,
    thirdIndex: number
  ) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const newForums = forums;
    const id = (
      (newForums[index].items as ForumItem[])[secondIndex]
        .secondItems as ForumSecondItem[]
    )[thirdIndex]._id;
    const r = await forumSecondDelete(id);
    console.log(r);
    const deleteIndex = (
      (newForums[index].items as ForumItem[])[secondIndex]
        .secondItems as ForumSecondItem[]
    )
      .map((x) => x.forumSecondItemId)
      .indexOf(id);
    (
      (newForums[index].items as ForumItem[])[secondIndex]
        .secondItems as ForumSecondItem[]
    ).splice(deleteIndex, 1);
    setForums(newForums);
    setUpdate(update + 1);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
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
              <ReactQuillCss
                style={{ marginTop: "16px", marginLeft: "6px", width: "100%" }}
                dangerouslySetInnerHTML={{ __html: forum.text }}
              ></ReactQuillCss>
            </>
          )}
          <AnimeEditAndDeleteDiv>
            <div onClick={() => editForum(index)}>
              <img src={`${editIcon}`} />
              <p>Edit</p>
            </div>
            <div
              onClick={() => {
                deleteForum(index);
              }}
            >
              <img style={{ width: "20px" }} src={`${deleteIcon}`} />
              <p>Delete</p>
            </div>
          </AnimeEditAndDeleteDiv>
          <ReplyButton>
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
          </ReplyButton>
          <div
            style={{ display: forum.showReplay == true ? "inline" : "none" }}
          >
            {getAddItemBox(index)}
            {forum.items ? getForumItems(forum.items, index) : <></>}
          </div>
        </ForumIframe>
      );
    });

  const getForumItems = (forumItems: ForumItem[], index: number) => {
    return forumItems.map((forum, secondIndex) => {
      const date = new Date(forum.uploadTime);
      return (
        <>
          <ForumItemBox key={secondIndex}>
            <div style={{ display: "flex" }}>
              <ForumImg src={`${forum.userAvatar}`} />
              <ForumName>{forum.userName}</ForumName>
              <ForumTime>{`${date.getDate()}-${
                date.getMonth() + 1
              }-${date.getFullYear()}`}</ForumTime>
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
                <ReactQuillCss
                  style={{
                    marginTop: "16px",
                    marginLeft: "6px",
                    width: "100%",
                  }}
                  dangerouslySetInnerHTML={{ __html: forum.text }}
                ></ReactQuillCss>
              </>
            )}
            <AnimeEditAndDeleteDiv>
              <div onClick={() => editForumItem(index, secondIndex)}>
                <img src={`${editIcon}`} />
                <p>Edit</p>
              </div>
              <div onClick={() => deleteForumItem(index, secondIndex)}>
                <img style={{ width: "20px" }} src={`${deleteIcon}`} />
                <p>Delete</p>
              </div>
            </AnimeEditAndDeleteDiv>
            <ReplyButton>
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
            </ReplyButton>
            <div
              style={{ display: forum.showReplay == true ? "inline" : "none" }}
            >
              {getAddSecondItemBox(index, secondIndex)}
              {forum.showReplay ? (
                <p>
                  {getSecondForumItems(forum.secondItems, index, secondIndex)}
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
    index: number,
    secondIndex: number
  ) => {
    return forumItems ? (
      forumItems.map((forum, thirdIndex) => {
        const date = new Date(forum.uploadTime);
        return (
          <>
            <ForumSecondItemBox key={thirdIndex}>
              <div style={{ display: "flex" }}>
                <ForumImg src={`${forum.userAvatar}`} />
                <ForumName>{forum.userName}</ForumName>
                <ForumTime>{`${date.getDate()}-${
                  date.getMonth() + 1
                }-${date.getFullYear()}`}</ForumTime>
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
                  <ReactQuillCss
                    style={{
                      marginTop: "16px",
                      marginLeft: "6px",
                      width: "100%",
                    }}
                    dangerouslySetInnerHTML={{ __html: forum.text }}
                  ></ReactQuillCss>
                  <AnimeButton
                    para=""
                    text={`Reply`}
                    width="71px"
                    height="22px"
                    textColor="#4BA3C3"
                    backGroundColor="white"
                    borderColor="white"
                    buttonClick={() =>
                      replySecondItem(forum.userName, index, secondIndex)
                    }
                  />
                </>
              )}
              <AnimeEditAndDeleteDiv>
                <div
                  onClick={() =>
                    editSecondForumItem(index, secondIndex, thirdIndex)
                  }
                >
                  <img src={`${editIcon}`} />
                  <p>Edit</p>
                </div>
                <div
                  onClick={() => {
                    deleteSecondItem(index, secondIndex, thirdIndex);
                  }}
                >
                  <img style={{ width: "20px" }} src={`${deleteIcon}`} />
                  <p>Delete</p>
                </div>
              </AnimeEditAndDeleteDiv>
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
        count > 0 ? (
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
          <></>
        )
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
