import * as React from "react";
import { useEffect, useState } from "react";
import {
  showCaseAwesomeUpdate,
  showCaseReplyAdd,
  showCaseReplyGet,
  showCaseReplyUpdate,
  showCaseSecondReplyAdd,
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
  ShowcaseEditAndDeleteDiv,
  ShowcaseEditDiv,
  ShowCaseIcons,
  ShowcaseImage,
  ShowcaseMoreButtonDiv,
  ShowcaseReply,
  ShowcaseSettingImg,
  ShowcaseSource,
  ShowcaseTaDiv,
  ShowcaseTag,
  ShowIframe,
  ShowImg,
  ShowName,
  ShowTime,
} from "../../cssJs/ShowCasePage/showCaseCss";
import {
  ShowCaseReply,
  ShowCaseType,
  ShowSecondCaseReply,
} from "../../types/showCaseType";
import showCaseAwesomeUnClick from "../../files/showCaseAwesomeUnClick.svg";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.svg";
import facebook from "../../files/facebook.svg";
import insImage from "../../files/insImage.svg";
import twitter from "../../files/twitterP.svg";
import copy from "../../files/copy.svg";
import editIcon from "../../files/editIcon.svg";
import deleteIcon from "../../files/deleteIcon.svg";
import FullTextEditor from "../../components/FullTextEditor";
import {
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
import { userUpdateAwesome, userUpdateShowcases } from "../../api/userApi";
import { LOGIN_USER_ADD } from "../../redux/loginUser";
import TextArea from "antd/lib/input/TextArea";
import { Spin } from "antd";
import avatarSetting from "../../files/avatarSetting.png";
import arrows from "../../files/arrows.svg";
import forumMore from "../../files/forumMore.png";

interface IProps {
  showcases: ShowCaseType[];
}

const ShowcaseForum = ({ showcases }: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [allShowCases, setAllShowCases] = useState<ShowCaseType[]>(showcases);
  const [newReplyHtml, setNewReplyHtml] = useState<string[]>([]);
  const [newSecondReplyHtml, setNewSecondReplyHtml] = useState<string[][]>([
    [],
  ]);
  const [update, setUpdate] = useState(0);
  const [awesomeArrState, setAwesomeArrState] = useState<string[]>(
    loginUser?.likeShowcase ? loginUser?.likeShowcase : []
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [itemLoading, setItemLoading] = useState<boolean>(false);
  const [secondItemLoading, setSecondItemLoading] = useState<boolean>(false);

  const pageSize = 1;

  useEffect(() => {
    setAllShowCases(showcases);
    setAwesomeArrState(loginUser?.likeShowcase ? loginUser?.likeShowcase : []);
  }, [showcases]);

  useEffect(() => {
    //console.log(forums);
  }, [update]);

  useEffect(() => {
    console.log(loginUser);
    setAwesomeArrState(loginUser?.likeShowcase ? loginUser?.likeShowcase : []);
  }, []);

  const sendNewReply = (e: string, index: number) => {
    const newReplyHtmls = newReplyHtml;
    newReplyHtmls[index] = e;
    setNewReplyHtml(newReplyHtmls);
    setUpdate(update + 1);
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
      const newShowcases = allShowCases;
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
        setUpdate(update + 1);
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
      const newShowcases = allShowCases;
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
        setUpdate(update + 1);
      }
      setSecondItemLoading(false);
    }
  };

  const sendNewSecondReply = (
    e: string,
    index: number,
    secondIndex: number
  ) => {
    const newSecondReplyHtmls = newSecondReplyHtml;
    newSecondReplyHtmls[index][secondIndex] = e;
    setNewSecondReplyHtml(newSecondReplyHtmls);
    setUpdate(update + 1);
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
    if (loginUser) {
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
    if (loginUser) {
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
      };
      const r = await showCaseSecondReplyAdd(secondShowcase);
      if (r && r < 300) {
        addSecondShowcaseToState(secondShowcase, index, secondIndex);
        setNewSecondReplyHtml([[]]);
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
    const index = allShowCases.findIndex(
      (showcase) => showcase._id == showcaseReply.showCaseId
    );
    allShowCases[index].replies?.push(showcaseReply);
    setAllShowCases(allShowCases);
  };

  const addSecondShowcaseToState = (
    showcaseReply: ShowSecondCaseReply,
    index: number,
    secondIndex: number
  ) => {
    const showcases = allShowCases;
    const replies = showcases[index].replies;
    if (replies) {
      replies[secondIndex].secondReplies?.push(showcaseReply);
    }
    showcases[index].replies = replies;
    setAllShowCases(showcases);
  };

  //get html element
  const getAddReplyBox = (showcase: ShowCaseType, index: number) => (
    <div style={{ marginTop: "16px" }}>
      <TextInput>
        <TextArea
          value={newReplyHtml[index]}
          onChange={(e) => sendNewReply(e.target.value, index)}
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
  ) => (
    <div style={{ marginTop: "16px" }}>
      <TextInput>
        <TextArea
          value={
            newSecondReplyHtml[index]
              ? newSecondReplyHtml[index][secondIndex]
                ? newSecondReplyHtml[index][secondIndex]
                : ""
              : ""
          }
          onChange={(e) =>
            sendNewSecondReply(e.target.value, index, secondIndex)
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
            buttonClick={() =>
              submitNewSecondReplyItem(showcaseReply, index, secondIndex)
            }
          />
        </ReplyAddDiv>
      </TextInput>
    </div>
  );

  // reply
  const openReply = (index: number) => {
    allShowCases[index].showReplay = !allShowCases[index].showReplay;
    setAllShowCases(allShowCases);
    const newArr: string[] = [];
    for (let k = 0; k < allShowCases.length; k++) {
      newArr.push("");
    }
    setNewReplyHtml(newArr);
    setUpdate(update + 1);
  };

  const openSecondReply = (index: number, secondIndex: number) => {
    const showcase: ShowCaseType = allShowCases[index];
    if (showcase.replies) {
      showcase.replies[secondIndex].showReplay =
        !showcase.replies[secondIndex].showReplay;
    }
    allShowCases[index] = showcase;
    setAllShowCases(allShowCases);
    const newArr: string[][] = [[]];
    for (let k = 0; k < allShowCases.length; k++) {
      newArr.push([]);
      const l = allShowCases[k].replies;
      if (l) {
        for (let j = 0; j < l.length; j++) {
          newArr[k].push("");
        }
      }
    }
    setNewSecondReplyHtml(newArr);
    setUpdate(update + 1);
  };

  //edit
  const editShowcase = (index: number) => {
    const newShowcases = allShowCases;
    newShowcases[index].edit = !newShowcases[index].edit;
    setAllShowCases(newShowcases);
    setUpdate(update + 1);
  };

  const editShowcaseReply = (index: number, secondIndex: number) => {
    const newShowcases = allShowCases;
    (newShowcases[index].replies as ShowCaseReply[])[secondIndex].edit = !(
      newShowcases[index].replies as ShowCaseReply[]
    )[secondIndex].edit;
    setAllShowCases(newShowcases);
    setUpdate(update + 1);
  };

  const editShowcaseSecondReply = (
    index: number,
    secondIndex: number,
    thirdIndex: number
  ) => {
    const newShowcases = allShowCases;
    (
      (newShowcases[index].replies as ShowCaseReply[])[secondIndex]
        .secondReplies as ShowSecondCaseReply[]
    )[thirdIndex].edit = !(
      (newShowcases[index].replies as ShowCaseReply[])[secondIndex]
        .secondReplies as ShowSecondCaseReply[]
    )[thirdIndex].edit;
    setAllShowCases(newShowcases);
    setUpdate(update + 1);
  };

  //edit text
  const editShowcaseText = (index: number, text: string) => {
    const newShowcases = allShowCases;
    newShowcases[index].text = text;
    setAllShowCases(newShowcases);
    setUpdate(update + 1);
  };

  const editShowcaseReplyText = (
    index: number,
    secondIndex: number,
    text: string
  ) => {
    const newShowcases = allShowCases;
    (newShowcases[index].replies as ShowCaseReply[])[secondIndex].text = text;
    setAllShowCases(newShowcases);
    setUpdate(update + 1);
  };

  const editShowcaseSecondReplyText = (
    index: number,
    secondIndex: number,
    thirdIndex: number,
    text: string
  ) => {
    const newShowcases = allShowCases;
    (
      (newShowcases[index].replies as ShowCaseReply[])[secondIndex]
        .secondReplies as ShowSecondCaseReply[]
    )[thirdIndex].text = text;
    setAllShowCases(newShowcases);
    setUpdate(update + 1);
  };

  //update

  const updateShowcase = async (index: number) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const updateResult = await showCaseUpdate({
      _id: allShowCases[index]._id,
      text: allShowCases[index].text,
    });
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (updateResult == 200) {
      editShowcase(index);
    } else {
      console.log("update wrong");
    }
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
    if (loading == false) {
      let awesomeArr: string[] = [];
      if (loginUser?.likeShowcase) {
        awesomeArr = loginUser?.likeShowcase;
      }
      awesomeArr.push(showCaseIdAndTitle);

      //update state
      updateAllShowcaseAwesome(index, 1, awesomeArr);
      //post like num
      setLoading(true);
      const animeLikeResult = await showCaseAwesomeUpdate(
        allShowCases[index]._id,
        allShowCases[index].aweSome
      );
      console.log(animeLikeResult);
      const userLikeResult = await userUpdateShowcases(
        loginUser?._id as string,
        awesomeArr
      );
      console.log(userLikeResult);
      await userUpdateAwesome(loginUser?._id as string, true);
      setLoading(false);
    } else {
      console.log("please wait some seconds");
    }
  };

  const cancelAwesomeFn = async (showCaseIdAndTitle: string, index: number) => {
    if (loading == false) {
      const awesomeArr = awesomeArrState;
      const r = awesomeArr.indexOf(showCaseIdAndTitle);
      if (r != -1) {
        awesomeArr.splice(r, 1);
        console.log(awesomeArr);
        //update state
        updateAllShowcaseAwesome(index, -1, awesomeArr);
        //post like num
        setLoading(true);
        const animeLikeResult = await showCaseAwesomeUpdate(
          allShowCases[index]._id,
          allShowCases[index].aweSome
        );
        const userLikeResult = await userUpdateShowcases(
          loginUser?._id as string,
          awesomeArr
        );
        console.log(userLikeResult);
        await userUpdateAwesome(loginUser?._id as string, false);
        setLoading(false);
      }
    } else {
      console.log("please wait some seconds");
    }
  };

  const updateAllShowcaseAwesome = (
    index: number,
    value: number,
    awesomeArr: string[]
  ) => {
    //update showcase
    const newAllShowCases = allShowCases;
    newAllShowCases[index].aweSome = newAllShowCases[index].aweSome + value;
    setAllShowCases(newAllShowCases);

    //update user
    const readyUpdateUser: User = loginUser as User;
    readyUpdateUser.likeShowcase = awesomeArr;
    setAwesomeArrState(awesomeArr);
    setUpdate(update + 1);

    dispatch({
      payload: readyUpdateUser,
      type: LOGIN_USER_ADD,
    });
  };

  const getExistShowcases = () =>
    allShowCases.map((showcase, index) => {
      const date = new Date(parseInt(showcase._id));
      return (
        <ShowIframe key={index}>
          <ShowAvatarDiv>
            <ShowImg src={`${showcase.userAvatar}`} />
            <ShowName>{showcase.userName}</ShowName>
            <ShowcaseSettingImg src={`${avatarSetting}`} />
            <ShowTime>{`${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`}</ShowTime>
          </ShowAvatarDiv>
          {showcase.imageArr.map((image: string, index: number) => {
            return <ShowcaseImage key={index} src={image} />;
          })}
          {showcase.edit ? (
            <ShowcaseEditDiv>
              <FullTextEditor
                html={showcase.text}
                setFullText={(e) => editShowcaseText(index, e)}
              />
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
            </ShowcaseEditDiv>
          ) : (
            <>
              <ReactQuillCss
                style={{
                  marginTop: "16px",
                  width: "100%",
                }}
                dangerouslySetInnerHTML={{ __html: showcase.text }}
              ></ReactQuillCss>
              <ShowcaseSource>
                <p>{`Source: Original from ${showcase.source}`}</p>
              </ShowcaseSource>
              <ShowcaseTaDiv>
                {showcase.tags.map((tag, index) => {
                  return (
                    <ShowcaseTag key={index}>
                      <p>{tag.text}</p>
                    </ShowcaseTag>
                  );
                })}
              </ShowcaseTaDiv>
              <AweSomeDiv>
                {getAwesomeButton(`${showcase._id}${showcase.title}`, index)}
                <p>Awesome!</p>
                <h6>{showcase.aweSome}</h6>
              </AweSomeDiv>
              <ShowCaseIcons>
                <img
                  onClick={() => {
                    console.log("facebook");
                  }}
                  src={`${facebook}`}
                />
                <img
                  onClick={() => {
                    console.log("insImage");
                  }}
                  src={`${insImage}`}
                />
                <img
                  onClick={() => {
                    console.log("twitter");
                  }}
                  src={`${twitter}`}
                />
                <img
                  onClick={() => {
                    console.log("copy");
                  }}
                  src={`${copy}`}
                />
              </ShowCaseIcons>
            </>
          )}
          {loginUser?._id == showcase.userId ? (
            <ShowcaseEditAndDeleteDiv>
              {!showcase.edit ? (
                <div>
                  <img
                    src={`${editIcon}`}
                    onClick={() => editShowcase(index)}
                  />
                  <p onClick={() => editShowcase(index)}>Edit</p>
                  <img
                    onClick={() => {
                      console.log("deleteIcon");
                    }}
                    src={`${deleteIcon}`}
                  />
                  <p
                    onClick={() => {
                      console.log("deleteIcon");
                    }}
                  >
                    Delete
                  </p>
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
                showcase.replies ? showcase.replies.length : 0
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
        </ShowIframe>
      );
    });

  const getShowcaseReplies = (
    replies: ShowCaseReply[],
    date: Date,
    index: number
  ) => {
    return replies.map((reply, secondIndex) => {
      return (
        <>
          <ReplyBox key={secondIndex}>
            <div style={{ display: "flex" }}>
              <ForumImg src={`${reply.userAvatar}`} />
              <ForumName>{reply.userName}</ForumName>
              <ForumTime>{`${date.getDate()}-${
                date.getMonth() + 1
              }-${date.getFullYear()}`}</ForumTime>
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
              {!reply.edit ? (
                <ShowcaseEditAndDeleteDiv>
                  <div onClick={() => editShowcaseReply(index, secondIndex)}>
                    <img src={`${editIcon}`} />
                    <p>Edit</p>
                    <img
                      style={{ width: "20px" }}
                      onClick={() => {
                        console.log("deleteIcon");
                      }}
                      src={`${deleteIcon}`}
                    />
                    <p>Delete</p>
                  </div>
                </ShowcaseEditAndDeleteDiv>
              ) : (
                <></>
              )}
              <ReplyDiv>
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
                  buttonClick={() => {
                    openSecondReply(index, secondIndex);
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
        return (
          <>
            <ReplySecondBox key={thirdIndex}>
              <div style={{ display: "flex" }}>
                <ForumImg src={`${showcaseSecondReply.userAvatar}`} />
                <ForumName>{showcaseSecondReply.userName}</ForumName>
                <ForumTime>{`${date.getDate()}-${
                  date.getMonth() + 1
                }-${date.getFullYear()}`}</ForumTime>
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
                  </ShowcaseEditDiv>
                ) : (
                  <>
                    <ShowcaseReply>{showcaseSecondReply.text}</ShowcaseReply>
                  </>
                )}
                <ShowcaseEditAndDeleteDiv>
                  <div
                    onClick={() =>
                      editShowcaseSecondReply(index, secondIndex, thirdIndex)
                    }
                  >
                    <img src={`${editIcon}`} />
                    <p>Edit</p>
                    <img
                      style={{ width: "20px" }}
                      onClick={() => {
                        console.log("deleteIcon");
                      }}
                      src={`${deleteIcon}`}
                    />
                    <p>Delete</p>
                  </div>
                </ShowcaseEditAndDeleteDiv>
                <ReplyAddDiv>
                  <AnimeButton
                    para=""
                    text={`Reply`}
                    width="45px"
                    height="22px"
                    textColor="#4BA3C3"
                    backGroundColor="white"
                    borderColor="white"
                    buttonClick={() => console.log("reply")}
                  />
                </ReplyAddDiv>
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