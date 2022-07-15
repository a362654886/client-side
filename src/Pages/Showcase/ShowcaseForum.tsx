import * as React from "react";
import { useEffect, useState } from "react";
import {
  showCaseDelete,
  showCaseReplyAdd,
  showCaseReplyDelete,
  showCaseReplyGet,
  showCaseReplyUpdate,
  showCaseSecondReplyAdd,
  showCaseSecondReplyDelete,
  showCaseSecondReplyGet,
  showCaseSecondReplyUpdate,
  showCaseUpdate,
} from "../../api/showcaseAPI";
import AnimeButton from "../../components/Button";
import {
  AweSomeDiv,
  ReplyAddDiv,
  ReplyBox,
  ReplyDiv,
  ReplySecondBox,
  ShowAvatarDiv,
  ShowCaseCreateImage,
  ShowcaseEditAndDeleteDiv,
  ShowcaseEditDiv,
  ShowcaseImage,
  ShowcaseMoreButtonDiv,
  ShowcaseRadioDiv,
  ShowcaseReply,
  ShowcaseSignalPageP,
  ShowcaseSource,
  ShowcaseTaDiv,
  ShowcaseTag,
  ShowIframe,
  ShowImg,
  ShowName,
  ShowTime,
  TagRadioInput,
  TagSelect,
} from "../../cssJs/ShowCasePage/showCaseCss";
import {
  ShowCaseReply,
  ShowCaseType,
  ShowSecondCaseReply,
} from "../../types/showCaseType";
import showCaseAwesomeUnClick from "../../files/showCaseAwesomeUnClick.svg";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.svg";
import editIcon from "../../files/editIcon.svg";
import deleteIcon from "../../files/deleteIcon.svg";
import {
  AnimeEditAndDeleteDiv,
  ForumImg,
  ForumName,
  ForumTime,
  TextInput,
} from "../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { Avatar, User } from "../../types/User";
import { IStoreState } from "../../types/IStoreState";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import { useDispatch, useSelector } from "react-redux";
import { ReactQuillCss } from "../../cssJs/fullTextEditor";
import { LOGIN_USER_ADD } from "../../redux/loginUser";
import { Button, Input, Radio, Space, Spin } from "antd";
import arrows from "../../files/arrows.svg";
import forumMore from "../../files/forumMore.svg";
import ShareDiv from "../../components/ShareDiv";
import SettingImg from "../../components/SettingImg";
import ProfileWrapperDiv from "../../components/ProfileWrapperDiv";
import { _getDate } from "../../helperFns/timeFn";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";
import DeleteWrapperDiv from "../../components/DeleteWrapperDiv";
import { IfLoginCheck } from "../../helperFns/loginCheck";
import {
  SHOWCASE_AWESOME_ADD,
  SHOWCASE_AWESOME_CANCEL,
} from "../../redux/showcaseAwesome";
import { cloneDeep } from "lodash";
import { getWidth } from "../../helperFns/widthFn";
import { useHistory } from "react-router-dom";
import ImageUpload, { ImageBody } from "../../components/ImageUpload";
import { formatName } from "../../helperFns/nameFn";
import { openNewWindow } from "../../helperFns/windowsFn";
import { ReportContextType } from "../../types/blockType";
import TextArea from "antd/lib/input/TextArea";
import { windowLink } from "../../globalValues";

interface IProps {
  showcases: ShowCaseType[];
  editLink: boolean;
  showLink?: boolean;
}

const ShowcaseForum = ({
  showcases,
  editLink,
  showLink,
}: IProps): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [allShowCases, setAllShowCases] = useState<ShowCaseType[]>(showcases);
  const [newReplyHtml, setNewReplyHtml] = useState<string[]>([]);
  const [newSecondReplyHtml, setNewSecondReplyHtml] = useState<string[][]>([
    [],
  ]);
  const [awesomeArrState, setAwesomeArrState] = useState<string[]>(
    loginUser?.likeShowcase ? loginUser?.likeShowcase : []
  );

  const [itemLoading, setItemLoading] = useState<boolean>(false);
  const [secondItemLoading, setSecondItemLoading] = useState<boolean>(false);

  const pageSize = 6;

  useEffect(() => {
    setAwesomeArrState(loginUser?.likeShowcase ? loginUser?.likeShowcase : []);
    const newArr: string[][] = [[]];
    for (let k = 0; k < showcases.length; k++) {
      newArr.push([]);
      const l = showcases[k].replies;
      if (l) {
        for (let j = 0; j < l.length; j++) {
          newArr[k].push("");
        }
      }
    }
    setNewSecondReplyHtml(newArr);
  }, [showcases]);

  useEffect(() => {
    console.log(allShowCases);
  }, [allShowCases]);

  useEffect(() => {
    setAwesomeArrState(loginUser?.likeShowcase ? loginUser?.likeShowcase : []);
  }, []);

  const toPage = (url: string) => history.push(url);

  const sendNewReply = (e: string, index: number) => {
    const newReplyHtmls = cloneDeep(newReplyHtml);
    newReplyHtmls[index] = e;
    setNewReplyHtml(newReplyHtmls);
  };

  const getMoreItem = async (showCaseId: string, page: number | undefined) => {
    if (page) {
      setItemLoading(true);
      const showcaseResult = await showCaseReplyGet(
        showCaseId,
        page + 1,
        pageSize
      );

      //set
      const newShowcases = cloneDeep(allShowCases);
      const index = newShowcases.findIndex((item) => item._id == showCaseId);
      if (newShowcases[index].replies && showcaseResult) {
        newShowcases[index].replies = (
          newShowcases[index].replies as ShowCaseReply[]
        ).concat(showcaseResult.result);
        newShowcases[index].page = page + 1;
        newShowcases[index].fullItems =
          showcaseResult.count <=
          (newShowcases[index].replies as ShowCaseReply[]).length
            ? true
            : false;
        setAllShowCases(newShowcases);
      }
      setItemLoading(false);
    }
  };

  const getMoreSecondItem = async (
    showcaseId: string,
    replyId: string,
    page: number | undefined
  ) => {
    if (page && showcaseId) {
      setSecondItemLoading(true);
      const showcaseResult = await showCaseSecondReplyGet(
        replyId,
        page + 1,
        pageSize
      );

      //set
      const newShowcases = cloneDeep(allShowCases);
      const index = newShowcases.findIndex((item) => item._id == showcaseId);
      const secondIndex = (
        newShowcases[index].replies as ShowCaseReply[]
      ).findIndex((item) => item._id == replyId);
      if (
        newShowcases[index].replies &&
        (newShowcases[index].replies as ShowCaseReply[])[secondIndex]
          .secondReplies &&
        showcaseResult
      ) {
        (newShowcases[index].replies as ShowCaseReply[])[
          secondIndex
        ].secondReplies = (
          (newShowcases[index].replies as ShowCaseReply[])[secondIndex]
            .secondReplies as ShowSecondCaseReply[]
        ).concat(showcaseResult.result);
        (newShowcases[index].replies as ShowCaseReply[])[secondIndex].page =
          page + 1;
        (newShowcases[index].replies as ShowCaseReply[])[
          secondIndex
        ].fullItems =
          showcaseResult.count <=
          (
            (newShowcases[index].replies as ShowCaseReply[])[secondIndex]
              .secondReplies as ShowSecondCaseReply[]
          ).length
            ? true
            : false;
        setAllShowCases(newShowcases);
      }
      setSecondItemLoading(false);
    }
  };

  const sendNewSecondReply = (
    e: string,
    index: number,
    secondIndex: number
  ) => {
    const newSecondReplyHtmls = cloneDeep(newSecondReplyHtml);
    newSecondReplyHtmls[index][secondIndex] = e;
    setNewSecondReplyHtml(newSecondReplyHtmls);
  };
  //
  const submitNewShowcaseReply = async (
    showcase: ShowCaseType,
    index: number
  ) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (newReplyHtml[index].trim() == "") {
      openNotification(
        "please input comment",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    } else if (loginUser) {
      const showcaseReply: ShowCaseReply = {
        _id: `${showcase._id}${
          showcase.replies
            ? showcase.replies.length + new Date().valueOf()
            : new Date().valueOf()
        }`,
        replyId: `${showcase._id}${
          showcase.replies
            ? showcase.replies.length + new Date().valueOf()
            : new Date().valueOf()
        }`,
        showCaseId: showcase._id,
        text: newReplyHtml[index],
        uploadTime: new Date(),
        userId: loginUser._id,
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        userCountry: loginUser.country,
        fullItems: true,
        hide: false,
      };
      const r = await showCaseReplyAdd(showcaseReply);
      if (r && r < 300) {
        addShowcaseToState(showcaseReply);
        setNewReplyHtml([]);
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

  const submitNewSecondReplyItem = async (
    showcase: ShowCaseReply,
    index: number,
    secondIndex: number
  ) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (newSecondReplyHtml[index][secondIndex].trim() == "") {
      openNotification(
        "please input comment",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    } else if (loginUser) {
      const secondShowcase: ShowSecondCaseReply = {
        _id: `${showcase._id}${
          showcase.secondReplies
            ? showcase.secondReplies.length + new Date().valueOf()
            : new Date().valueOf()
        }`,
        replyId: showcase.replyId,
        showCaseId: showcase.showCaseId,
        text: newSecondReplyHtml[index][secondIndex],
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userId: loginUser._id,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        userCountry: loginUser.country,
        hide: false,
      };
      const r = await showCaseSecondReplyAdd(secondShowcase);
      if (r && r < 300) {
        addSecondShowcaseToState(secondShowcase, index, secondIndex);
        const _newSecondReplyHtml = cloneDeep(newSecondReplyHtml);
        _newSecondReplyHtml[index][secondIndex] = "";
        setNewSecondReplyHtml(_newSecondReplyHtml);
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

  //add to state
  const addShowcaseToState = (showcaseReply: ShowCaseReply) => {
    const _allShowCases = cloneDeep(allShowCases);
    const index = _allShowCases.findIndex(
      (showcase) => showcase._id == showcaseReply.showCaseId
    );
    _allShowCases[index].replies?.unshift(showcaseReply);
    setAllShowCases(_allShowCases);
  };

  const addSecondShowcaseToState = (
    showcaseReply: ShowSecondCaseReply,
    index: number,
    secondIndex: number
  ) => {
    const _allShowCases = cloneDeep(allShowCases);
    const showcases = _allShowCases;
    const replies = showcases[index].replies;
    if (replies) {
      if (replies[secondIndex].secondReplies) {
        replies[secondIndex].secondReplies?.unshift(showcaseReply);
      } else {
        replies[secondIndex].secondReplies = [];
        replies[secondIndex].secondReplies?.unshift(showcaseReply);
      }
    }
    showcases[index].replies = replies;
    setAllShowCases(showcases);
  };

  //get html element
  const getAddReplyBox = (showcase: ShowCaseType, index: number) => (
    <div key={index} style={{ marginTop: "16px" }}>
      <TextInput>
        <TextArea
          value={newReplyHtml[index]}
          onChange={(e) => {
            IfLoginCheck(loginUser) ? sendNewReply(e.target.value, index) : "";
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
            buttonClick={() => submitNewShowcaseReply(showcase, index)}
          />
        </ReplyAddDiv>
      </TextInput>
    </div>
  );

  const getAddSecondReplyBox = (
    showcaseReply: ShowCaseReply,
    index: number,
    secondIndex: number
  ) => {
    let ifShowReply = true;
    showcaseReply.secondReplies?.forEach((item) => {
      if (item.reply) {
        ifShowReply = false;
      }
    });
    return ifShowReply ? (
      <div key={index} style={{ marginTop: "16px" }}>
        <TextInput>
          <TextArea
            value={
              newSecondReplyHtml[index]
                ? newSecondReplyHtml[index][secondIndex]
                  ? newSecondReplyHtml[index][secondIndex]
                  : ""
                : ""
            }
            onChange={(e) => {
              IfLoginCheck(loginUser)
                ? sendNewSecondReply(e.target.value, index, secondIndex)
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
                submitNewSecondReplyItem(showcaseReply, index, secondIndex)
              }
            />
          </ReplyAddDiv>
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
        buttonClick={() => openAddSecondReply(showcaseReply, index)}
      />
    );
  };

  const openAddSecondReply = (showcaseReply: ShowCaseReply, index: number) => {
    const newShowCaseReply = cloneDeep(showcaseReply);
    newShowCaseReply.secondReplies?.forEach((item) => {
      item.reply = false;
    });
    const newAllShowCases = cloneDeep(allShowCases);
    if (newAllShowCases[index].replies) {
      const _index = (
        newAllShowCases[index].replies as ShowCaseReply[]
      ).findIndex((item) => item._id == showcaseReply._id);
      (newAllShowCases[index].replies as ShowCaseReply[])[_index] =
        newShowCaseReply;
      setAllShowCases(newAllShowCases);
      const _newSecondReplyHtml = cloneDeep(newSecondReplyHtml);
      const newArr: string[] = [];
      _newSecondReplyHtml[index].forEach((item) => newArr.push(""));
      _newSecondReplyHtml[index] = newArr;
      setNewSecondReplyHtml(_newSecondReplyHtml);
    }
  };

  // reply
  const openReply = (index: number) => {
    const newAllShowCases = cloneDeep(allShowCases);
    newAllShowCases[index].showReplay = !newAllShowCases[index].showReplay;
    setAllShowCases(newAllShowCases);
    const newArr: string[] = [];
    for (let k = 0; k < newAllShowCases.length; k++) {
      newArr.push("");
    }
    setNewReplyHtml(newArr);
  };

  const openSecondReply = (index: number, secondIndex: number) => {
    const newAllShowCases = cloneDeep(allShowCases);
    const showcase: ShowCaseType = newAllShowCases[index];
    if (showcase.replies) {
      showcase.replies[secondIndex].showReplay =
        !showcase.replies[secondIndex].showReplay;
    }
    newAllShowCases[index] = showcase;
    setAllShowCases(newAllShowCases);
    const newArr: string[][] = [[]];
    for (let k = 0; k < newAllShowCases.length; k++) {
      newArr.push([]);
      const l = newAllShowCases[k].replies;
      if (l) {
        for (let j = 0; j < l.length; j++) {
          newArr[k].push("");
        }
      }
    }
    setNewSecondReplyHtml(newArr);
  };

  const replySecondReply = (
    name: string,
    index: number,
    secondIndex: number,
    thirdIndex: number
  ) => {
    newSecondReplyHtml[index][secondIndex] = `@${name} `;
    setNewSecondReplyHtml(newSecondReplyHtml);

    const newShowCase = cloneDeep(allShowCases);
    (newShowCase[index].replies as ShowCaseReply[])[
      secondIndex
    ].secondReplies?.forEach((item, index) => {
      if (index == thirdIndex) {
        item.reply = !item.reply;
      } else {
        item.reply = false;
      }
    });

    setAllShowCases(newShowCase);
  };

  //edit
  const editShowcase = (index: number) => {
    const newShowcases = cloneDeep(allShowCases);
    newShowcases[index].edit = !newShowcases[index].edit;
    console.log(newShowcases[index]);
    setAllShowCases(newShowcases);
  };

  const editShowcaseReply = (index: number, secondIndex: number) => {
    const newShowcases = allShowCases;
    (newShowcases[index].replies as ShowCaseReply[])[secondIndex].edit = !(
      newShowcases[index].replies as ShowCaseReply[]
    )[secondIndex].edit;
    setAllShowCases(newShowcases);
  };

  const editShowcaseSecondReply = (
    index: number,
    secondIndex: number,
    thirdIndex: number
  ) => {
    const newShowcases = cloneDeep(allShowCases);
    (
      (newShowcases[index].replies as ShowCaseReply[])[secondIndex]
        .secondReplies as ShowSecondCaseReply[]
    )[thirdIndex].edit = !(
      (newShowcases[index].replies as ShowCaseReply[])[secondIndex]
        .secondReplies as ShowSecondCaseReply[]
    )[thirdIndex].edit;
    setAllShowCases(newShowcases);
  };

  //edit source
  const editShowcaseSource = (index: number, text: string) => {
    const newShowcases = cloneDeep(allShowCases);
    newShowcases[index].source = text;
    setAllShowCases(newShowcases);
  };

  //edit tag
  const editShowcaseTag = (index: number, tags: string[]) => {
    let newTagArr: string[] = [];
    tags.forEach((item) => {
      const arr = item.split("#");
      newTagArr = newTagArr.concat(arr);
    });
    const returnTagArr: string[] = [];
    newTagArr.forEach((item) => {
      if (item != "") {
        returnTagArr.push(`#${item}`);
      }
    });

    const id = new Date().valueOf().toString();
    const newShowcases = cloneDeep(allShowCases);
    newShowcases[index].tags = returnTagArr.map((tag, index) => {
      return {
        _id: id + index,
        text: tag,
        num: -1,
      };
    });
    setAllShowCases(newShowcases);
  };
  //edit images
  const deleteImg = (index: number, imageIndex: number) => {
    const newShowcases = cloneDeep(allShowCases);
    const imgArr = newShowcases[index].imageArr;
    imgArr.splice(imageIndex, 1);
    newShowcases[index].imageArr = imgArr;
    setAllShowCases(newShowcases);
  };

  const setNewImage = (imageBody: ImageBody, index: number) => {
    const newShowcases = cloneDeep(allShowCases);
    const imgArr = newShowcases[index].imageArr;

    imgArr.push(imageBody.imgBase64);
    newShowcases[index].imageArr = imgArr;
    setAllShowCases(newShowcases);
  };

  //edit text
  const editShowcaseText = (index: number, text: string) => {
    const newShowcases = cloneDeep(allShowCases);
    newShowcases[index].text = text;
    setAllShowCases(newShowcases);
  };

  const editShowcaseReplyText = (
    index: number,
    secondIndex: number,
    text: string
  ) => {
    const newShowcases = cloneDeep(allShowCases);
    (newShowcases[index].replies as ShowCaseReply[])[secondIndex].text = text;
    setAllShowCases(newShowcases);
  };

  const editShowcaseSecondReplyText = (
    index: number,
    secondIndex: number,
    thirdIndex: number,
    text: string
  ) => {
    const newShowcases = cloneDeep(allShowCases);
    (
      (newShowcases[index].replies as ShowCaseReply[])[secondIndex]
        .secondReplies as ShowSecondCaseReply[]
    )[thirdIndex].text = text;
    setAllShowCases(newShowcases);
  };

  //update

  const updateShowcase = async (index: number) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (allShowCases[index].source == `source`) {
      openNotification(
        "Authors and/or Publishers can't be empty ",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    } else if (allShowCases[index].imageArr.length == 0) {
      openNotification(
        "please input at least one image",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    } else {
      const updateResult = await showCaseUpdate({
        _id: allShowCases[index]._id,
        text: allShowCases[index].text,
        source: allShowCases[index].source,
        tags: allShowCases[index].tags,
        imageArr: allShowCases[index].imageArr,
      });
      if (updateResult == 200) {
        editShowcase(index);
      } else {
        console.log("update wrong");
      }
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const updateShowcaseReply = async (index: number, secondIndex: number) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const updateResult = await showCaseReplyUpdate({
      _id: (allShowCases[index].replies as ShowCaseReply[])[secondIndex]._id,
      text: (allShowCases[index].replies as ShowCaseReply[])[secondIndex].text,
    });
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (updateResult == 200) {
      editShowcaseReply(index, secondIndex);
    } else {
      console.log("update wrong");
    }
  };

  const updateShowcaseSecondItem = async (
    index: number,
    secondIndex: number,
    thirdIndex: number
  ) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const updateResult = await showCaseSecondReplyUpdate({
      _id: (
        (allShowCases[index].replies as ShowCaseReply[])[secondIndex]
          .secondReplies as ShowSecondCaseReply[]
      )[thirdIndex]._id,
      text: (
        (allShowCases[index].replies as ShowCaseReply[])[secondIndex]
          .secondReplies as ShowSecondCaseReply[]
      )[thirdIndex].text,
    });
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (updateResult == 200) {
      editShowcaseSecondReply(index, secondIndex, thirdIndex);
    } else {
      console.log("update wrong");
    }
  };

  // awesome

  const getAwesomeButton = (showCaseIdAndTitle: string, index: number) => {
    const r = awesomeArrState.find(
      (showcase) => showcase == showCaseIdAndTitle
    );
    if (r) {
      return (
        <img
          src={showCaseAwesomeClick}
          onClick={() =>
            isLogin(() => cancelAwesomeFn(showCaseIdAndTitle, index))
          }
        />
      );
    } else {
      return (
        <img
          src={showCaseAwesomeUnClick}
          onClick={() => isLogin(() => awesomeFn(showCaseIdAndTitle, index))}
        />
      );
    }
  };

  const isLogin = (likeFn: () => Promise<void>) => {
    if (loginUser) {
      likeFn();
    } else {
      openNotification(
        "please login and then reply",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    }
  };

  const awesomeFn = async (showCaseIdAndTitle: string, index: number) => {
    let awesomeArr: string[] = [];
    if (loginUser?.likeShowcase) {
      awesomeArr = loginUser?.likeShowcase;
    }
    awesomeArr.push(showCaseIdAndTitle);
    updateAllShowcaseAwesome(index, 1, awesomeArr);
    dispatch({
      payload: allShowCases[index],
      type: SHOWCASE_AWESOME_ADD,
    });
  };

  const cancelAwesomeFn = async (showCaseIdAndTitle: string, index: number) => {
    const awesomeArr = awesomeArrState;
    const r = awesomeArr.indexOf(showCaseIdAndTitle);
    if (r != -1) {
      awesomeArr.splice(r, 1);
      //update state
      updateAllShowcaseAwesome(index, -1, awesomeArr);
      //post like num
      dispatch({
        payload: allShowCases[index],
        type: SHOWCASE_AWESOME_CANCEL,
      });
    }
  };

  const updateAllShowcaseAwesome = (
    index: number,
    value: number,
    awesomeArr: string[]
  ) => {
    //update showcase
    const newAllShowCases = cloneDeep(allShowCases);
    newAllShowCases[index].aweSome = newAllShowCases[index].aweSome + value;
    setAllShowCases(newAllShowCases);

    //update user
    const readyUpdateUser: User = loginUser as User;
    readyUpdateUser.likeShowcase = awesomeArr;
    setAwesomeArrState(awesomeArr);

    dispatch({
      payload: readyUpdateUser,
      type: LOGIN_USER_ADD,
    });
  };

  const deleteShowcase = async (id: string, index: number) => {
    const newAllShowcase = cloneDeep(allShowCases);
    newAllShowcase.splice(index, 1);
    setAllShowCases(newAllShowcase);
    await showCaseDelete(id);
  };

  const deleteShowcaseReply = async (id: string, index: number) => {
    const newAllShowcase = cloneDeep(allShowCases);
    const deleteIndex = (newAllShowcase[index].replies as ShowCaseReply[])
      .map((x) => x.replyId)
      .indexOf(id);
    (newAllShowcase[index].replies as ShowCaseReply[]).splice(deleteIndex, 1);
    setAllShowCases(newAllShowcase);
    await showCaseReplyDelete(id);
  };

  const deleteShowcaseSecondReply = async (
    id: string,
    index: number,
    secondIndex: number
  ) => {
    const newAllShowcase = cloneDeep(allShowCases);
    const deleteIndex = (
      (newAllShowcase[index].replies as ShowCaseReply[])[secondIndex]
        .secondReplies as ShowSecondCaseReply[]
    )
      .map((x) => x.replyId)
      .indexOf(id);
    (
      (newAllShowcase[index].replies as ShowCaseReply[])[secondIndex]
        .secondReplies as ShowSecondCaseReply[]
    ).splice(deleteIndex, 1);
    setAllShowCases(newAllShowcase);
    await showCaseSecondReplyDelete(id);
  };

  const getExistShowcases = () =>
    allShowCases.map((showcase, index) => {
      const date = new Date(parseInt(showcase._id));
      return showcase.hide ? (
        <></>
      ) : (
        <ShowIframe key={index}>
          <ShowAvatarDiv>
            <ProfileWrapperDiv
              userId={showcase.userId}
              element={
                <>
                  <ShowImg src={`${showcase.userAvatar}`} />
                  <ShowName>
                    {formatName(showcase.userName)}
                    <Flag
                      style={{ marginLeft: "5px" }}
                      country={flagGet(
                        showcase.userCountry ? showcase.userCountry : ""
                      )}
                    />
                  </ShowName>
                </>
              }
            ></ProfileWrapperDiv>
            <SettingImg
              userId={showcase.userId}
              userName={showcase.userName}
              userImg={showcase.userAvatar}
              marginTop="8px"
              type={ReportContextType.SHOWCASE}
              contextId={showcase._id}
              resourceLink={`${windowLink}/showcase/showcaseSignalPage/${showcase._id}`}
            />
            <ShowTime>{_getDate(date)}</ShowTime>
          </ShowAvatarDiv>
          {showcase.edit ? (
            <ShowcaseEditDiv>
              {showcase.imageArr.map((image, imageIndex) => {
                return (
                  <ShowCaseCreateImage key={imageIndex}>
                    <div>
                      <ShowcaseImage src={image} />
                    </div>
                    <div>
                      <Button onClick={() => deleteImg(index, imageIndex)}>
                        Delete
                      </Button>
                    </div>
                  </ShowCaseCreateImage>
                );
              })}
              <div style={{ margin: "0px auto", width: "240px" }}>
                <ImageUpload
                  width={"240px"}
                  height={"240px"}
                  textColor={"black"}
                  backGroundColor={"#F6F6F6"}
                  border={"1px solid #F6F6F6"}
                  text={""}
                  setImg={(value: ImageBody) => setNewImage(value, index)}
                  imageAdd={false}
                  margin={"20px auto"}
                />
              </div>
              <TextArea
                style={{ height: "200px" }}
                value={showcase.text}
                onChange={(e) => editShowcaseText(index, e.target.value)}
              />
              {/**
               * 
               * <ShowcaseEditDiv>
                <p>Source: Original from</p>
                <Input
                  value={showcase.source}
                  onChange={(e) => editShowcaseSource(index, e.target.value)}
                />
              </ShowcaseEditDiv>
               */}
              <ShowcaseRadioDiv>
                <Radio.Group
                  onChange={(e) => editShowcaseSource(index, e.target.value)}
                  value={
                    showcase.source.indexOf("origin") == -1
                      ? "source"
                      : "origin"
                  }
                >
                  <Space direction="vertical">
                    <Radio value="origin">I am the Author.</Radio>
                    <TagRadioInput value="source">
                      <p>I am Not the Author. This is from</p>
                      <Input
                        placeholder={"Authors and/or Publishers"}
                        style={{ zIndex: 0 }}
                        defaultValue={
                          showcase.source.indexOf("origin") == -1
                            ? showcase.source.replace("source", "")
                            : ""
                        }
                        onChange={(e) => {
                          const value = showcase.source;
                          const newValue = (value + e.target.value).replace(
                            value,
                            ""
                          );
                          editShowcaseSource(index, `source ${newValue}`);
                        }}
                      ></Input>
                    </TagRadioInput>
                  </Space>
                </Radio.Group>
              </ShowcaseRadioDiv>
              <ShowcaseEditDiv>
                <p>Tag:</p>
                <TagSelect
                  mode="tags"
                  value={
                    showcase.tags.length > 0
                      ? showcase.tags.map((item) => item.text)
                      : []
                  }
                  onChange={(e) => editShowcaseTag(index, e as string[])}
                  dropdownStyle={{ display: "none" }}
                ></TagSelect>
              </ShowcaseEditDiv>
              <AnimeButton
                para=""
                text={`Save`}
                width="120px"
                height="32px"
                textColor="black"
                backGroundColor="white"
                borderColor="black"
                buttonClick={() => updateShowcase(index)}
              />
              <AnimeButton
                para=""
                text={`Cancel`}
                width="120px"
                height="32px"
                textColor="black"
                backGroundColor="white"
                borderColor="black"
                buttonClick={() => editShowcase(index)}
              />
              <p
                style={{
                  textAlign: "center",
                  marginBottom: "0px",
                  marginTop: "16px",
                }}
              >
                Please indicate the source and author of the work if you share
                the content created by others and are authorized
              </p>
            </ShowcaseEditDiv>
          ) : (
            <>
              {showcase.imageArr.map((image: string, index: number) => {
                return (
                  <div
                    key={index}
                    style={{
                      width: "100%",
                      paddingLeft: getWidth() > 600 ? "" : "8px",
                    }}
                  >
                    <ShowcaseImage src={image} />
                  </div>
                );
              })}
              <ReactQuillCss
                style={{
                  marginTop: "16px",
                  width: "100%",
                }}
                dangerouslySetInnerHTML={{ __html: showcase.text }}
              ></ReactQuillCss>
              <ShowcaseSource>
                <p>
                  {showcase.source
                    ? showcase.source == "origin"
                      ? "Original"
                      : `Source: ${showcase.source.replace("source", "")}`
                    : ""}
                </p>
              </ShowcaseSource>
              {showcase.tags.length > 0 ? (
                <ShowcaseTaDiv>
                  {showcase.tags.map((tag, index) => {
                    return (
                      <ShowcaseTag key={index}>
                        <span
                          onClick={() => {
                            toPage(
                              `/showcase/showTag?tag=${tag.text.replace(
                                "#",
                                ""
                              )}`
                            );
                          }}
                        >
                          {tag.text}
                        </span>
                      </ShowcaseTag>
                    );
                  })}
                </ShowcaseTaDiv>
              ) : (
                <></>
              )}
              <AweSomeDiv>
                {getAwesomeButton(`${showcase._id}`, index)}
                <p>Awesome!</p>
                <h6>{showcase.aweSome}</h6>
              </AweSomeDiv>
              <ShareDiv marginTop={"16px"} marginBottom={16} />
            </>
          )}
          {loginUser?._id == showcase.userId ? (
            <ShowcaseEditAndDeleteDiv>
              {!showcase.edit ? (
                <div>
                  <img
                    src={`${editIcon}`}
                    onClick={() => {
                      editLink
                        ? openNewWindow(`showcaseCollectionOne/${showcase._id}`)
                        : editShowcase(index);
                    }}
                  />
                  <p
                    onClick={() => {
                      editLink
                        ? openNewWindow(`showcaseCollectionOne/${showcase._id}`)
                        : editShowcase(index);
                    }}
                  >
                    Edit
                  </p>
                  <DeleteWrapperDiv
                    element={
                      <AnimeEditAndDeleteDiv>
                        <img src={`${deleteIcon}`} />
                        <p>Delete</p>
                      </AnimeEditAndDeleteDiv>
                    }
                    deleteFn={() => deleteShowcase(showcase._id, index)}
                  />
                </div>
              ) : (
                <></>
              )}
            </ShowcaseEditAndDeleteDiv>
          ) : (
            <></>
          )}

          <ReplyDiv onClick={() => openReply(index)}>
            <AnimeButton
              para=""
              text={`Replies(${
                showcase.replies
                  ? showcase.replies.filter((item) => !item.hide).length
                  : 0
              })`}
              width="81px"
              height="22px"
              textColor="#4BA3C3"
              backGroundColor="white"
              borderColor="white"
              buttonClick={() => console.log("")}
            />
            <img src={`${arrows}`} />
          </ReplyDiv>
          <div
            style={{ display: showcase.showReplay == true ? "inline" : "none" }}
          >
            {getAddReplyBox(showcase, index)}
            {showcase.replies ? (
              getShowcaseReplies(showcase.replies, date, index)
            ) : (
              <></>
            )}
            {showcase.fullItems != true ? (
              itemLoading ? (
                <Spin />
              ) : (
                <ShowcaseMoreButtonDiv
                  onClick={() => getMoreItem(showcase._id, showcase.page)}
                >
                  <img src={forumMore} />
                  <p>More</p>
                </ShowcaseMoreButtonDiv>
              )
            ) : (
              <></>
            )}
          </div>
          {showLink ? (
            <ShowcaseSignalPageP
              onClick={() =>
                openNewWindow(
                  `${windowLink}/showcase/showcaseSignalPage/${showcase._id}`
                )
              }
            >
              LINK
            </ShowcaseSignalPageP>
          ) : (
            <></>
          )}
        </ShowIframe>
      );
    });

  const getShowcaseReplies = (
    replies: ShowCaseReply[],
    date: Date,
    index: number
  ) => {
    return replies.map((reply, secondIndex) => {
      return reply.hide ? (
        <></>
      ) : (
        <>
          <ReplyBox key={secondIndex}>
            <div style={{ display: "flex" }}>
              <ProfileWrapperDiv
                userId={reply.userId}
                element={
                  <>
                    <ForumImg src={`${reply.userAvatar}`} />
                    <ForumName>
                      {reply.userName}
                      <Flag
                        style={{ marginLeft: "5px" }}
                        country={flagGet(
                          reply.userCountry ? reply.userCountry : ""
                        )}
                      />
                    </ForumName>
                  </>
                }
              ></ProfileWrapperDiv>
              <SettingImg
                userId={reply.userId}
                userName={reply.userName}
                userImg={reply.userAvatar}
                marginTop="24px"
                type={ReportContextType.SHOWCASE_REPLY}
                contextId={reply._id}
                resourceLink={`${windowLink}/showcase/showcaseSignalPage/${reply.showCaseId}`}
              />
              <ForumTime>{_getDate(date)}</ForumTime>
            </div>
            <div style={{ marginLeft: "40px" }}>
              {reply.edit ? (
                <ShowcaseEditDiv>
                  <TextArea
                    value={reply.text}
                    onChange={(e) =>
                      editShowcaseReplyText(index, secondIndex, e.target.value)
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
                    buttonClick={() => updateShowcaseReply(index, secondIndex)}
                  />
                  <AnimeButton
                    para=""
                    text={`Cancel`}
                    width="120px"
                    height="32px"
                    textColor="black"
                    backGroundColor="white"
                    borderColor="black"
                    buttonClick={() => editShowcaseReply(index, secondIndex)}
                  />
                </ShowcaseEditDiv>
              ) : (
                <>
                  <ShowcaseReply>{reply.text}</ShowcaseReply>
                </>
              )}
              {loginUser?._id == reply.userId ? (
                <>
                  {!reply.edit ? (
                    <ShowcaseEditAndDeleteDiv>
                      <div
                        onClick={() => editShowcaseReply(index, secondIndex)}
                      >
                        <img src={`${editIcon}`} />
                        <p>Edit</p>
                      </div>
                      <DeleteWrapperDiv
                        element={
                          <AnimeEditAndDeleteDiv>
                            <img
                              style={{ width: "20px" }}
                              onClick={() => {
                                console.log("deleteIcon");
                              }}
                              src={`${deleteIcon}`}
                            />
                            <p>Delete</p>
                          </AnimeEditAndDeleteDiv>
                        }
                        deleteFn={() => deleteShowcaseReply(reply._id, index)}
                      />
                    </ShowcaseEditAndDeleteDiv>
                  ) : (
                    <></>
                  )}
                </>
              ) : (
                <></>
              )}
              <ReplyDiv onClick={() => openSecondReply(index, secondIndex)}>
                <AnimeButton
                  para=""
                  text={`Replies(${
                    reply.secondReplies
                      ? reply.secondReplies.filter((item) => !item.hide).length
                      : 0
                  })`}
                  width="81px"
                  height="22px"
                  textColor="#4BA3C3"
                  backGroundColor="white"
                  borderColor="white"
                  buttonClick={() => {
                    console.log();
                  }}
                />
                <img src={`${arrows}`} />
              </ReplyDiv>
              <div
                style={{
                  display: reply.showReplay == true ? "inline" : "none",
                }}
              >
                {getAddSecondReplyBox(reply, index, secondIndex)}
                {reply.showReplay ? (
                  <>
                    {getSecondReplyItems(
                      reply.secondReplies,
                      date,
                      index,
                      secondIndex
                    )}
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

  const getSecondReplyItems = (
    showcaseReplies: ShowSecondCaseReply[] | undefined,
    date: Date,
    index: number,
    secondIndex: number
  ) => {
    return showcaseReplies ? (
      showcaseReplies.map((showcaseSecondReply, thirdIndex) => {
        return showcaseSecondReply.hide ? (
          <></>
        ) : (
          <>
            <ReplySecondBox key={thirdIndex}>
              <div style={{ display: "flex" }}>
                <ProfileWrapperDiv
                  userId={showcaseSecondReply.userId}
                  element={
                    <>
                      <ForumImg src={`${showcaseSecondReply.userAvatar}`} />
                      <ForumName>
                        {showcaseSecondReply.userName}
                        <Flag
                          style={{ marginLeft: "5px" }}
                          country={flagGet(
                            showcaseSecondReply.userCountry
                              ? showcaseSecondReply.userCountry
                              : ""
                          )}
                        />
                      </ForumName>
                    </>
                  }
                ></ProfileWrapperDiv>
                <SettingImg
                  userId={showcaseSecondReply.userId}
                  userName={showcaseSecondReply.userName}
                  userImg={showcaseSecondReply.userAvatar}
                  marginTop="24px"
                  type={ReportContextType.SHOWCASE_SECOND_REPLY}
                  contextId={showcaseSecondReply._id}
                  resourceLink={`${windowLink}/showcase/showcaseSignalPage/${showcaseSecondReply.showCaseId}`}
                />
                <ForumTime>{_getDate(date)}</ForumTime>
              </div>
              <div style={{ marginLeft: "40px" }}>
                {showcaseSecondReply.edit ? (
                  <ShowcaseEditDiv>
                    <TextArea
                      value={showcaseSecondReply.text}
                      onChange={(e) =>
                        editShowcaseSecondReplyText(
                          index,
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
                        updateShowcaseSecondItem(index, secondIndex, thirdIndex)
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
                        editShowcaseSecondReply(index, secondIndex, thirdIndex)
                      }
                    />
                  </ShowcaseEditDiv>
                ) : (
                  <>
                    <ShowcaseReply>{showcaseSecondReply.text}</ShowcaseReply>
                  </>
                )}
                {loginUser?._id == showcaseSecondReply.userId ? (
                  <>
                    {
                      <ShowcaseEditAndDeleteDiv>
                        <div
                          onClick={() =>
                            editShowcaseSecondReply(
                              index,
                              secondIndex,
                              thirdIndex
                            )
                          }
                        >
                          <img src={`${editIcon}`} />
                          <p>Edit</p>
                        </div>
                        <DeleteWrapperDiv
                          element={
                            <AnimeEditAndDeleteDiv>
                              <img
                                style={{ width: "20px" }}
                                onClick={() => {
                                  console.log("deleteIcon");
                                }}
                                src={`${deleteIcon}`}
                              />
                              <p>Delete</p>
                            </AnimeEditAndDeleteDiv>
                          }
                          deleteFn={() =>
                            deleteShowcaseSecondReply(
                              showcaseSecondReply._id,
                              index,
                              secondIndex
                            )
                          }
                        />
                      </ShowcaseEditAndDeleteDiv>
                    }
                  </>
                ) : (
                  <></>
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
                        index,
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
                        newSecondReplyHtml[index]
                          ? newSecondReplyHtml[index][secondIndex]
                            ? newSecondReplyHtml[index][secondIndex]
                            : ""
                          : ""
                      }
                      onChange={(e) => {
                        IfLoginCheck(loginUser)
                          ? sendNewSecondReply(
                              e.target.value,
                              index,
                              secondIndex
                            )
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
                            index,
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

  return <>{getExistShowcases()}</>;
};

export default ShowcaseForum;
