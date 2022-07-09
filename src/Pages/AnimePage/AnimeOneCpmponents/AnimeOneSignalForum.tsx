import * as React from "react";
import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import {
  forumAdd,
  forumDelete,
  forumItemAdd,
  forumItemDelete,
  forumItemGetMore,
  forumItemUpdate,
  forumsAllGet,
  forumSecondDelete,
  forumSecondGetOneMore,
  forumSecondItemAdd,
  forumSecondUpdate,
  forumUpdate,
} from "../../../api/forumAPI";
import {
  AnimeButton,
  MiddleBiggerDiv,
  MoreButtonDiv,
} from "../../../components/Button";
import FullTextEditor from "../../../components/FullTextEditor";
import {
  AnimAddDiv,
  AnimeEditAndDeleteDiv,
  AnimOneForum,
  ForumAddNew,
  ForumIframe,
  ForumImg,
  ForumItemBox,
  ForumMoreButtonDiv,
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
import arrows from "../../../files/arrows.svg";
import forumMore from "../../../files/forumMore.svg";
import { Spin } from "antd";
import SettingImg from "../../../components/SettingImg";
import ProfileWrapperDiv from "../../../components/ProfileWrapperDiv";
import { _getDate } from "../../../helperFns/timeFn";
import Flag from "react-flagkit";
import { flagGet } from "../../../helperFns/flag";
import DeleteWrapperDiv from "../../../components/DeleteWrapperDiv";
import { IfLoginCheck } from "../../../helperFns/loginCheck";
import { getWidth } from "../../../helperFns/widthFn";
import { ReportContextType } from "../../../types/blockType";
import { cloneDeep } from "lodash";
import { forumTextCompress } from "../../../helperFns/imageCompress";
import { DiscoveryHead } from "../../../cssJs/AnimePage/AnimeOneCss";
import { ShowcaseSignalPageP } from "../../../cssJs/ShowCasePage/showCaseCss";
import { openNewWindow } from "../../../helperFns/windowsFn";
import { windowLink } from "../../../globalValues";
import { useParams } from "react-router-dom";
import { animeOneGet } from "../../../api/animeAPI";
import { ANIME_ADD } from "../../../redux/anime";

interface Para {
  id: string;
}

interface IProps {
  anime: Anime | null;
  pageSizeSetting: number;
  ifShowHeader: boolean;
  ifShowAdd: boolean;
  toForum?: (num: number) => void;
  discovery?: boolean;
  showLink?: boolean;
}

const getForumId = (propId: string) => {
  const paraArr = propId.split("&");
  return paraArr[1].replace("forumId=", "");
};

const getAnimeId = (propId: string) => {
  const paraArr = propId.split("&");
  return paraArr[0].replace("animeId=", "");
};

const AnimeOneSignalForum = ({
  anime,
  pageSizeSetting,
  ifShowHeader,
  ifShowAdd,
  toForum,
  discovery,
  showLink,
}: IProps): JSX.Element => {
  const para: Para = useParams();

  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const chooseAnime: Anime | null = useSelector(
    (state: IStoreState) => state.animeState
  );

  const [forums, setForums] = useState<ForumType[]>([]);
  const [html, setHtml] = useState<string>("");
  const [newItemHtml, setNewItemHtml] = useState<string[]>([]);
  const [newSecondItemHtml, setNewSecondItemHtml] = useState<string[][]>([[]]);
  const [showPost, setShowPost] = useState<boolean>(false);
  const [update, setUpdate] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);
  const [itemLoading, setItemLoading] = useState<boolean>(false);
  const [secondItemLoading, setSecondItemLoading] = useState<boolean>(false);

  const pageSize = pageSizeSetting;

  useEffect(() => {
    (async function anyNameFunction() {
      console.log(getAnimeId(para.id));
      const anime = await animeOneGet(getAnimeId(para.id));
      console.log(anime);
      dispatch({
        payload: anime,
        type: ANIME_ADD,
      });
    })();
  }, []);

  useEffect(() => {
    if (chooseAnime != null || discovery) {
      (async function anyNameFunction() {
        await getIniForums();
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
    }
  }, [chooseAnime, discovery]);

  useEffect(() => {
    //console.log(forums);
  }, [forums, update]);

  const getIniForums = async () => {
    setLoading(true);
    const forumResult = await forumsAllGet(
      discovery ? "" : chooseAnime ? chooseAnime._id : "",
      1,
      1,
      getForumId(para.id)
    );
    if (forumResult) {
      setForums(forumResult.result);
      setCount(forumResult.count);
    }
    setLoading(false);
  };

  const getMoreItem = async (forumId: string, page: number | undefined) => {
    if (page) {
      setItemLoading(true);
      const forumResult = await forumItemGetMore(forumId, page + 1, pageSize);

      //set
      const newForums = forums;
      const index = newForums.findIndex((item) => item._id == forumId);
      if (newForums[index].items && forumResult) {
        newForums[index].items = (newForums[index].items as ForumItem[]).concat(
          forumResult.result
        );
        newForums[index].page = page + 1;
        newForums[index].fullItems =
          forumResult.count <= (newForums[index].items as ForumItem[]).length
            ? true
            : false;
        setForums(newForums);
        setUpdate(update + 1);
      }
      setItemLoading(false);
    }
  };

  const getMoreSecondItem = async (
    forumId: string,
    forumItemId: string,
    page: number | undefined
  ) => {
    if (page && forumItemId) {
      setSecondItemLoading(true);
      const forumResult = await forumSecondGetOneMore(
        forumItemId,
        page + 1,
        pageSize
      );

      //set
      const newForums = forums;
      const index = newForums.findIndex((item) => item._id == forumId);
      const secondIndex = (
        newForums[index].items as ForumSecondItem[]
      ).findIndex((item) => item._id == forumItemId);
      if (
        newForums[index].items &&
        (newForums[index].items as ForumItem[])[secondIndex].secondItems &&
        forumResult
      ) {
        (newForums[index].items as ForumItem[])[secondIndex].secondItems = (
          (newForums[index].items as ForumItem[])[secondIndex]
            .secondItems as ForumSecondItem[]
        ).concat(forumResult.result);
        (newForums[index].items as ForumItem[])[secondIndex].page = page + 1;
        (newForums[index].items as ForumItem[])[secondIndex].fullItems =
          forumResult.count <=
          (
            (newForums[index].items as ForumItem[])[secondIndex]
              .secondItems as ForumSecondItem[]
          ).length
            ? true
            : false;
        setForums(newForums);
        setUpdate(update + 1);
      }
      setSecondItemLoading(false);
    }
  };

  //post functions
  const submitNewForum = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const textString = await forumTextCompress(html);
    if (loginUser) {
      const forum: ForumType = {
        _id: `${loginUser?._id}${new Date().valueOf()}`,
        forumId: `${loginUser?._id}${new Date().valueOf()}`,
        text: textString,
        uploadTime: new Date(),
        userId: loginUser?._id,
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        userCountry: `${loginUser.country}`,
        anime: chooseAnime?._id as string,
      };
      const r = await forumAdd(forum);
      if (r && r < 300) {
        forums.unshift(forum);
        setForums(forums);
        setHtml("");
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
      const length = forums[index].items ? forums[index].items?.length : 0;
      const id = `${
        length && length > 0
          ? (forums[index].items as ForumItem[])[0]._id + new Date().valueOf()
          : forums[index]._id + new Date().valueOf()
      }`;
      const textString = await forumTextCompress(newItemHtml[index]);
      const forumItem: ForumItem = {
        _id: id,
        forumItemId: id,
        text: textString,
        forumId: forums[index]._id,
        uploadTime: new Date(),
        userId: loginUser?._id,
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        userCountry: `${loginUser.country}`,
        anime: chooseAnime?._id as string,
        fullItems: true,
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
      const id = `${
        forums[index].items
          ? secondItems
            ? secondItems.length > 0
              ? secondItems[0]._id + new Date().valueOf()
              : iniId + new Date().valueOf()
            : iniId + new Date().valueOf()
          : iniId + new Date().valueOf()
      }`;
      const textString = await forumTextCompress(
        newSecondItemHtml[index][secondIndex]
      );
      const secondForumItem: ForumSecondItem = {
        _id: id,
        forumSecondItemId: id,
        forumItemId: (forums[index].items as ForumItem[])[secondIndex]._id,
        text: textString,
        forumId: forums[index]._id,
        uploadTime: new Date(),
        userId: loginUser?._id,
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        userCountry: `${loginUser.country}`,
        anime: chooseAnime?._id as string,
      };
      const r = await forumSecondItemAdd(secondForumItem);
      if (r && r < 300) {
        addForumSecondItemToForum(secondForumItem, index, secondIndex);
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
    try {
      newSecondItemHtmls[index][secondIndex] = e;
      setNewSecondItemHtml(newSecondItemHtmls);
    } catch (e) {
      console.log(e);
    }
  };

  //get html element
  const getAddItemBox = (index: number) => (
    <div style={{ marginTop: "16px" }}>
      <TextInput>
        <FullTextEditor
          html={newItemHtml[index]}
          setFullText={(e) => {
            IfLoginCheck(loginUser) ? sendNewItem(e, index) : "";
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
    <ForumAddNew>
      <TextInput style={{ display: showPost ? "inline" : "none" }}>
        <FullTextEditor
          html={html}
          setFullText={(e) => {
            IfLoginCheck(loginUser) ? setHtml(e) : "";
          }}
        />
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
    </ForumAddNew>
  );

  const getAddSecondItemBox = (index: number, secondIndex: number) => {
    let ifShowReply = true;
    (forums[index].items as ForumItem[])[secondIndex].secondItems?.forEach(
      (item) => {
        if (item.reply) {
          ifShowReply = false;
        }
      }
    );
    return ifShowReply ? (
      <div style={{ marginTop: "16px", width: "" }}>
        <TextInput style={{}}>
          <FullTextEditor
            html={""}
            setFullText={(e) => {
              IfLoginCheck(loginUser)
                ? sendNewSecondItem(e, index, secondIndex)
                : "";
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
    ) : (
      <AnimeButton
        para=""
        text={"Post New Reply"}
        width="100%"
        height="32px"
        textColor="white"
        backGroundColor="#FFC300"
        borderColor="#FFC300"
        buttonClick={() => openAddSecondReply(index, secondIndex)}
      />
    );
  };

  const openAddSecondReply = (index: number, secondIndex: number) => {
    const newForums = cloneDeep(forums);
    (newForums[index].items as ForumItem[])[secondIndex].secondItems?.forEach(
      (item) => {
        item.reply = false;
      }
    );
    setForums(newForums);
  };

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
    secondIndex: number,
    thirdIndex: number
  ) => {
    newSecondItemHtml[index][secondIndex] = `@${name} `;
    setNewSecondItemHtml(newSecondItemHtml);

    const newForums = cloneDeep(forums);
    (newForums[index].items as ForumItem[])[secondIndex].secondItems?.forEach(
      (item, index) => {
        if (index == thirdIndex) {
          item.reply = !item.reply;
        } else {
          item.reply = false;
        }
      }
    );
    setForums(newForums);
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
    const textString = await forumTextCompress(forums[index].text);
    const updateResult = await forumUpdate({
      _id: forums[index]._id,
      forumId: forums[index].forumId,
      text: textString,
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
    const textString = await forumTextCompress(
      (forums[index].items as ForumItem[])[secondIndex].text
    );
    const updateResult = await forumItemUpdate({
      _id: (forums[index].items as ForumItem[])[secondIndex]._id,
      forumId: (forums[index].items as ForumItem[])[secondIndex].forumId,
      text: textString,
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
    const textString = await forumTextCompress(item.text);
    const updateResult = await forumSecondUpdate({
      _id: item._id,
      forumId: item.forumId,
      forumSecondItemId: item.forumSecondItemId,
      text: textString,
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
          {discovery ? <DiscoveryHead>{forum.anime}</DiscoveryHead> : <></>}
          <div style={{ display: "flex", height: "72px" }}>
            <ProfileWrapperDiv
              userId={forum.userId}
              element={
                <>
                  <ForumImg src={`${forum.userAvatar}`} />
                  <ForumName>
                    {forum.userName}
                    <Flag
                      style={{ marginLeft: "5px", marginRight: "10px" }}
                      country={flagGet(
                        forum.userCountry ? forum.userCountry : ""
                      )}
                    />
                  </ForumName>
                </>
              }
            ></ProfileWrapperDiv>
            <SettingImg
              userId={forum.userId}
              userName={forum.userName}
              userImg={forum.userAvatar}
              marginTop="24px"
              type={ReportContextType.FORUM}
              contextId={forum._id}
            />
            <ForumTime>{_getDate(date)}</ForumTime>
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
              <AnimeButton
                para=""
                text={`Cancel`}
                width="120px"
                height="32px"
                textColor="black"
                backGroundColor="white"
                borderColor="black"
                buttonClick={() => editForum(index)}
              />
            </>
          ) : (
            <>
              <ReactQuillCss
                style={{ width: "100%" }}
                dangerouslySetInnerHTML={{ __html: forum.text }}
              ></ReactQuillCss>
            </>
          )}
          {forums[index].userId == loginUser?._id ? (
            <AnimeEditAndDeleteDiv>
              <div onClick={() => editForum(index)}>
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
                deleteFn={async () => await deleteForum(index)}
              />
            </AnimeEditAndDeleteDiv>
          ) : (
            <></>
          )}
          <ReplyButton onClick={() => openReply(index)}>
            <AnimeButton
              para=""
              text={`Replies(${forum.items ? forum.items.length : 0})`}
              width="81px"
              height="32px"
              textColor="#4BA3C3"
              backGroundColor="white"
              borderColor="white"
              buttonClick={() => console.log()}
            />
            <img src={`${arrows}`} />
          </ReplyButton>
          <div
            style={{ display: forum.showReplay == true ? "inline" : "none" }}
          >
            {getAddItemBox(index)}
            {forum.items ? getForumItems(forum.items, index) : <></>}
            {forum.fullItems != true ? (
              itemLoading ? (
                <Spin />
              ) : (
                <ForumMoreButtonDiv
                  onClick={() => getMoreItem(forum._id, forum.page)}
                >
                  <img src={forumMore} />
                  <p>More</p>
                </ForumMoreButtonDiv>
              )
            ) : (
              <></>
            )}
          </div>
          {showLink ? (
            <ShowcaseSignalPageP
              onClick={() => openNewWindow(`${windowLink}/animeOneForum`)}
            >
              LINK
            </ShowcaseSignalPageP>
          ) : (
            <></>
          )}
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
              <ProfileWrapperDiv
                userId={forum.userId}
                element={
                  <>
                    <ForumImg src={`${forum.userAvatar}`} />
                    <ForumName>
                      {forum.userName}
                      <Flag
                        style={{ marginLeft: "5px", marginRight: "10px" }}
                        country={flagGet(
                          forum.userCountry ? forum.userCountry : ""
                        )}
                      />
                    </ForumName>
                  </>
                }
              ></ProfileWrapperDiv>
              <SettingImg
                userId={forum.userId}
                userName={forum.userName}
                userImg={forum.userAvatar}
                marginTop="24px"
                type={ReportContextType.FORUM_ITEM}
                contextId={forum._id}
              />
              <ForumTime>{_getDate(date)}</ForumTime>
            </div>
            <div style={{ marginLeft: "40px" }}>
              {forum.edit ? (
                <>
                  <FullTextEditor
                    html={forum.text}
                    setFullText={(e) =>
                      editForumItemText(index, secondIndex, e)
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
                    buttonClick={() => updateForumItem(index, secondIndex)}
                  />
                  <AnimeButton
                    para=""
                    text={`Cancel`}
                    width="120px"
                    height="32px"
                    textColor="black"
                    backGroundColor="white"
                    borderColor="black"
                    buttonClick={() => editForumItem(index, secondIndex)}
                  />
                </>
              ) : (
                <>
                  <ReactQuillCss
                    style={{
                      width: "100%",
                    }}
                    dangerouslySetInnerHTML={{ __html: forum.text }}
                  ></ReactQuillCss>
                </>
              )}
              {(forums[index].items as ForumItem[])[secondIndex].userId ==
              loginUser?._id ? (
                <AnimeEditAndDeleteDiv>
                  <div onClick={() => editForumItem(index, secondIndex)}>
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
                    deleteFn={async () =>
                      await deleteForumItem(index, secondIndex)
                    }
                  />
                </AnimeEditAndDeleteDiv>
              ) : (
                <></>
              )}
              <ReplyButton onClick={() => openSecondReply(index, secondIndex)}>
                <AnimeButton
                  para=""
                  text={`Replies(${
                    forum.secondItems ? forum.secondItems.length : 0
                  })`}
                  width="81px"
                  height="32px"
                  textColor="#4BA3C3"
                  backGroundColor="white"
                  borderColor="white"
                  buttonClick={() => console.log()}
                />
                <img src={`${arrows}`} />
              </ReplyButton>
              <div
                style={{
                  display: forum.showReplay == true ? "inline" : "none",
                }}
              >
                {getAddSecondItemBox(index, secondIndex)}
                {forum.showReplay ? (
                  <p>
                    {getSecondForumItems(forum.secondItems, index, secondIndex)}
                  </p>
                ) : (
                  <></>
                )}
                {forum.fullItems != true ? (
                  secondItemLoading ? (
                    <Spin />
                  ) : (
                    <ForumMoreButtonDiv
                      onClick={() =>
                        getMoreSecondItem(
                          forum.forumId,
                          forum.forumItemId,
                          forum.page
                        )
                      }
                    >
                      <img src={forumMore} />
                      <p>More</p>
                    </ForumMoreButtonDiv>
                  )
                ) : (
                  <></>
                )}
              </div>
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
                <ProfileWrapperDiv
                  userId={forum.userId}
                  element={
                    <>
                      <ForumImg src={`${forum.userAvatar}`} />
                      <ForumName>
                        {forum.userName}
                        <Flag
                          style={{ marginLeft: "5px", marginRight: "10px" }}
                          country={flagGet(
                            forum.userCountry ? forum.userCountry : ""
                          )}
                        />
                      </ForumName>
                    </>
                  }
                ></ProfileWrapperDiv>
                <SettingImg
                  userId={forum.userId}
                  userName={forum.userName}
                  userImg={forum.userAvatar}
                  marginTop="24px"
                  type={ReportContextType.FORUM_SECOND_ITEM}
                  contextId={forum._id}
                />
                <ForumTime>{_getDate(date)}</ForumTime>
              </div>
              <div style={{ marginLeft: "40px" }}>
                {forum.edit ? (
                  <>
                    <FullTextEditor
                      html={forum.text}
                      setFullText={(e) =>
                        editForumSecondItemText(
                          index,
                          secondIndex,
                          thirdIndex,
                          e
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
                        updateForumSecondItem(index, secondIndex, thirdIndex)
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
                        editSecondForumItem(index, secondIndex, thirdIndex)
                      }
                    />
                  </>
                ) : (
                  <>
                    <ReactQuillCss
                      style={{
                        width: "100%",
                      }}
                      dangerouslySetInnerHTML={{ __html: forum.text }}
                    ></ReactQuillCss>
                    {(
                      (forums[index].items as ForumItem[])[secondIndex]
                        .secondItems as ForumSecondItem[]
                    )[thirdIndex].userId == loginUser?._id ? (
                      <AnimeEditAndDeleteDiv>
                        <div
                          onClick={() =>
                            editSecondForumItem(index, secondIndex, thirdIndex)
                          }
                        >
                          <img src={`${editIcon}`} />
                          <p>Edit</p>
                        </div>
                        <DeleteWrapperDiv
                          element={
                            <>
                              <img
                                style={{ width: "24px" }}
                                src={`${deleteIcon}`}
                              />
                              <p>Delete</p>
                            </>
                          }
                          deleteFn={async () =>
                            await deleteSecondItem(
                              index,
                              secondIndex,
                              thirdIndex
                            )
                          }
                        />
                      </AnimeEditAndDeleteDiv>
                    ) : (
                      <></>
                    )}
                  </>
                )}
                <ReplyButton>
                  <AnimeButton
                    para=""
                    text={`Reply`}
                    width="50px"
                    height="32px"
                    textColor="#4BA3C3"
                    backGroundColor="white"
                    borderColor="white"
                    buttonClick={() =>
                      replySecondItem(
                        forum.userName,
                        index,
                        secondIndex,
                        thirdIndex
                      )
                    }
                  />
                </ReplyButton>
                {forum.reply ? (
                  <>
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
                          submitNewSecondForumItem(index, secondIndex)
                        }
                      />
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </ForumSecondItemBox>
          </>
        );
      })
    ) : (
      <></>
    );
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
    <AnimOneForum style={{ width: getWidth() > 600 ? "876px" : "100%" }}>
      <AnimAddDiv
        style={{
          display: ifShowHeader || ifShowAdd ? "inline" : "none",
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
      </AnimAddDiv>
      {getAddBox()}
      {getExistForums()}
      {getLoading()}
    </AnimOneForum>
  );
};

export default AnimeOneSignalForum;
