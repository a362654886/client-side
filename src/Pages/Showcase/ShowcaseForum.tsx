import * as React from "react";
import { useEffect, useState } from "react";
import {
  showCaseAllGet,
  showCaseAwesomeUpdate,
  showCaseReplyAdd,
  showCaseReplyUpdate,
  showCaseSecondReplyAdd,
  showCaseSecondReplyUpdate,
  showCaseUpdate,
} from "../../api/showcaseAPI";
import AnimeButton from "../../components/Button";
import {
  AweSomeDiv,
  EditAndDeleteDiv,
  ReplyAddDiv,
  ReplyBox,
  ReplyDiv,
  ReplySecondBox,
  ShowcaseEditDiv,
  ShowCaseIcons,
  ShowcaseImage,
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
import showCaseAwesomeUnClick from "../../files/showCaseAwesomeUnClick.png";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.png";
import facebook from "../../files/facebook.png";
import insImage from "../../files/insImage.png";
import twitter from "../../files/twitterP.png";
import copy from "../../files/copy.png";
import editIcon from "../../files/editIcon.png";
import deleteIcon from "../../files/deleteIcon.png";
import FullTextEditor from "../../components/FullTextEditor";
import {
  ForumEditButton,
  ForumImg,
  ForumName,
  ForumTime,
  TextInput,
} from "../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { Avatar, User } from "../../types/User";
import { IStoreState } from "../../types/IStoreState";
import { openNotification } from "../../helperFns/popUpAlert";
import { useDispatch, useSelector } from "react-redux";
import { ReactQuillCss } from "../../cssJs/fullTextEditor";
import { userUpdateShowcases } from "../../api/userApi";
import { LOGIN_USER_ADD } from "../../redux/loginUser";

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
  };

  const sendNewSecondReply = (
    e: string,
    index: number,
    secondIndex: number
  ) => {
    const newSecondReplyHtmls = newSecondReplyHtml;
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
    if (loginUser) {
      const showcaseReply: ShowCaseReply = {
        _id: `${showcase._id}${
          showcase.replies ? showcase.replies.length + 1 : 1
        }`,
        replyId: `${showcase._id}${
          showcase.replies ? showcase.replies.length + 1 : 1
        }`,
        showCaseId: showcase._id,
        text: newReplyHtml[index],
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: loginUser.name,
      };
      const r = await showCaseReplyAdd(showcaseReply);
      if (r && r < 300) {
        addShowcaseToState(showcaseReply);
      }
    } else {
      openNotification("error", "please login and then reply");
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
          showcase.secondReplies ? showcase.secondReplies.length + 1 : 1
        }`,
        replyId: showcase.replyId,
        showCaseId: showcase.showCaseId,
        text: newSecondReplyHtml[index][secondIndex],
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: loginUser.name,
      };
      const r = await showCaseSecondReplyAdd(secondShowcase);
      if (r && r < 300) {
        addSecondShowcaseToState(secondShowcase, index, secondIndex);
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
        <FullTextEditor
          html={newReplyHtml[index]}
          setFullText={(e) => {
            sendNewReply(e, index);
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
  ) => (
    <div style={{ marginTop: "16px" }}>
      <TextInput>
        <FullTextEditor
          html={
            newSecondReplyHtml[index]
              ? newSecondReplyHtml[index][secondIndex]
                ? newSecondReplyHtml[index][secondIndex]
                : ""
              : ""
          }
          setFullText={(e) => {
            sendNewSecondReply(e, index, secondIndex);
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
      openNotification("error", "please login and then reply");
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
      const userLikeResult = await userUpdateShowcases(
        loginUser?._id as string,
        awesomeArr
      );
      setLoading(false);
    } else {
      console.log("please wait some seconds");
    }
  };

  const cancelAwesomeFn = async (showCaseIdAndTitle: string, index: number) => {
    if (loading == false) {
      console.log("-----");
      const awesomeArr = awesomeArrState;
      console.log(awesomeArr);
      const r = awesomeArr.indexOf(showCaseIdAndTitle);
      console.log(r);
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
          <div style={{ display: "flex" }}>
            <ShowImg src={`${showcase.userAvatar}`} />
            <ShowName>{showcase.userName}</ShowName>
            <ShowTime>{`${date.getDate()}-${
              date.getMonth() + 1
            }-${date.getFullYear()}`}</ShowTime>
          </div>
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
            </ShowcaseEditDiv>
          ) : (
            <>
              <ReactQuillCss
                style={{
                  marginTop: "16px",
                  marginLeft: "6px",
                  width: "100%",
                }}
                dangerouslySetInnerHTML={{ __html: showcase.text }}
              ></ReactQuillCss>
              <div style={{ display: "flex" }}>
                {showcase.tags.map((tag, index) => {
                  return (
                    <ShowcaseTag key={index}>
                      <p>{tag.text}</p>
                    </ShowcaseTag>
                  );
                })}
              </div>
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
          <EditAndDeleteDiv>
            <img onClick={() => editShowcase(index)} src={`${editIcon}`} />
            <p>Edit</p>
            <img
              style={{ width: "20px" }}
              onClick={() => {
                console.log("deleteIcon");
              }}
              src={`${deleteIcon}`}
            />
            <p>Delete</p>
          </EditAndDeleteDiv>
          <ReplyDiv>
            <AnimeButton
              para=""
              text={`Replies(${
                showcase.replies ? showcase.replies.length : 0
              })`}
              width="71px"
              height="22px"
              textColor="#4BA3C3"
              backGroundColor="white"
              borderColor="white"
              buttonClick={() => openReply(index)}
            />
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
            {reply.edit ? (
              <ShowcaseEditDiv>
                <FullTextEditor
                  html={reply.text}
                  setFullText={(e) =>
                    editShowcaseReplyText(index, secondIndex, e)
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
              </ShowcaseEditDiv>
            ) : (
              <>
                <ReactQuillCss
                  style={{
                    marginTop: "16px",
                    marginLeft: "6px",
                    width: "100%",
                  }}
                  dangerouslySetInnerHTML={{ __html: reply.text }}
                ></ReactQuillCss>
              </>
            )}
            <EditAndDeleteDiv>
              <img
                onClick={() => editShowcaseReply(index, secondIndex)}
                src={`${editIcon}`}
              />
              <p>Edit</p>
              <img
                style={{ width: "20px" }}
                onClick={() => {
                  console.log("deleteIcon");
                }}
                src={`${deleteIcon}`}
              />
              <p>Delete</p>
            </EditAndDeleteDiv>
            <ReplyAddDiv>
              <AnimeButton
                para=""
                text={`Replies(${
                  reply.secondReplies ? reply.secondReplies.length : 0
                })`}
                width="71px"
                height="22px"
                textColor="#4BA3C3"
                backGroundColor="white"
                borderColor="white"
                buttonClick={() => {
                  openSecondReply(index, secondIndex);
                }}
              />
            </ReplyAddDiv>
            <div
              style={{ display: reply.showReplay == true ? "inline" : "none" }}
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
              {showcaseSecondReply.edit ? (
                <ShowcaseEditDiv>
                  <FullTextEditor
                    html={showcaseSecondReply.text}
                    setFullText={(e) =>
                      editShowcaseSecondReplyText(
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
                      updateShowcaseSecondItem(index, secondIndex, thirdIndex)
                    }
                  />
                </ShowcaseEditDiv>
              ) : (
                <>
                  <ReactQuillCss
                    style={{
                      marginTop: "16px",
                      marginLeft: "6px",
                      width: "100%",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: showcaseSecondReply.text,
                    }}
                  ></ReactQuillCss>
                </>
              )}
              <EditAndDeleteDiv>
                <img
                  onClick={() =>
                    editShowcaseSecondReply(index, secondIndex, thirdIndex)
                  }
                  src={`${editIcon}`}
                />
                <p>Edit</p>
                <img
                  style={{ width: "20px" }}
                  onClick={() => {
                    console.log("deleteIcon");
                  }}
                  src={`${deleteIcon}`}
                />
                <p>Delete</p>
              </EditAndDeleteDiv>
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
