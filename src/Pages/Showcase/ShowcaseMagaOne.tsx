import * as React from "react";
import { useEffect, useState } from "react";
import {
  showCaseAwesomeUpdate,
  showCaseReplyAdd,
  showCaseReplyUpdate,
  showCaseSecondReplyAdd,
  showCaseSecondReplyUpdate,
} from "../../api/showcaseAPI";
import {
  AweSomeDiv,
  EditAndDeleteDiv,
  EpisodesAddButton,
  EpisodesComments,
  EpisodesEditAndDelete,
  EpisodesGeneralButton,
  EpisodesText,
  ReplyAddDiv,
  ReplyBox,
  ReplySecondBox,
  ShowCaseDiv,
  ShowcaseEditDiv,
  ShowCaseIcons,
  ShowcaseImage,
  ShowcaseMangaHeader,
  ShowcaseReply,
  ShowcaseTag,
  ShowCaseTitle,
  ShowCaseTitleDiv,
  ShowImg,
  ShowMangaButtons,
  ShowMangaIframeEpisodesButtons,
  ShowMangaIframeOne,
  ShowMangaIframeSource,
  ShowName,
} from "../../cssJs/ShowCasePage/showCaseCss";
import {
  ShowCaseReply,
  ShowCaseType,
  ShowSecondCaseReply,
} from "../../types/showCaseType";
import showCaseAwesomeUnClick from "../../files/showCaseAwesomeUnClick.png";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.png";
import { Avatar, User } from "../../types/User";
import { IStoreState } from "../../types/IStoreState";
import { openNotification } from "../../helperFns/popUpAlert";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateFollow, userUpdateShowcases } from "../../api/userApi";
import { LOGIN_USER_ADD } from "../../redux/loginUser";
import AnimeButton from "../../components/Button";
import facebook from "../../files/facebook.png";
import insImage from "../../files/insImage.png";
import twitter from "../../files/twitterP.png";
import copy from "../../files/copy.png";
import add from "../../files/Add.png";
import { useHistory } from "react-router-dom";
import { AnimeButtonsDiv } from "../../cssJs/AnimePage/AnimeOneCss";
import { episodeGet } from "../../api/episodeAPI";
import { Spin } from "antd";
import {
  ForumImg,
  ForumName,
  ForumTime,
  TextInput,
} from "../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import TextArea from "antd/lib/input/TextArea";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import editIcon from "../../files/editIcon.png";
import deleteIcon from "../../files/deleteIcon.png";
import switchIcon from "../../files/arrows.png";
import ShowcaseSide from "./ShowcaseSide";

const ShowcaseMangaOne = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const manga: ShowCaseType | null = useSelector(
    (state: IStoreState) => state.mangaState
  );

  const [showCase, setShowCase] = useState<ShowCaseType | null>(manga);
  const [update, setUpdate] = useState(0);
  const [awesomeArrState, setAwesomeArrState] = useState<string[]>(
    loginUser?.likeShowcase ? loginUser?.likeShowcase : []
  );
  const [followArr, setFollowArr] = useState<string[]>(
    loginUser?.followManga ? loginUser?.followManga : []
  );

  const [loading, setLoading] = useState<boolean>(false);
  const [addLoading, setAddLoading] = useState<boolean>(false);
  const [addFollowLoading, setAddFollowLoading] = useState<boolean>(false);
  const [commentShow, setCommentShow] = useState<boolean>(false);
  const [episodeNum, setEpisodeNum] = useState(0);
  const [newSecondReplyHtml, setNewSecondReplyHtml] = useState<string[]>([]);
  const [newReplyHtml, setNewReplyHtml] = useState<string>("");

  useEffect(() => {
    (async function anyNameFunction() {
      await getEpisode();
    })();
    console.log(showCase);
  }, []);

  useEffect(() => {
    setShowCase(manga);
  }, [manga]);

  useEffect(() => {
    //setShowCase(manga);
    console.log(episodeNum);
    console.log(new Array(2));
  }, [episodeNum, loading]);

  const getEpisode = async () => {
    setAddLoading(true);
    const episodeResult = await episodeGet(manga ? manga._id : "");
    setAddLoading(false);
    episodeResult?.count
      ? setEpisodeNum(episodeResult?.count)
      : setEpisodeNum(0);
  };

  // awesome
  const getAwesomeButton = (showCaseIdAndTitle: string) => {
    const r = awesomeArrState.find(
      (showcase) => showcase == showCaseIdAndTitle
    );
    if (r) {
      return (
        <img
          src={showCaseAwesomeClick}
          onClick={() => isLogin(() => cancelAwesomeFn(showCaseIdAndTitle))}
        />
      );
    } else {
      return (
        <img
          src={showCaseAwesomeUnClick}
          onClick={() => isLogin(() => awesomeFn(showCaseIdAndTitle))}
        />
      );
    }
  };

  //follow
  const getFollowButton = () => {
    const r = followArr.find((showcase) => showcase == manga?._id);
    if (r) {
      return (
        <AnimeButton
          para=""
          text={"Following"}
          width="120px"
          height="36px"
          textColor="black"
          backGroundColor="white"
          borderColor="
          #302D46"
          buttonClick={() => cancelFollowFn()}
        />
      );
    } else {
      return (
        <AnimeButton
          para=""
          text={"Follow"}
          width="120px"
          height="36px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => followFn()}
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

  //awesome functions
  const awesomeFn = async (showCaseIdAndTitle: string) => {
    if (loading == false) {
      let awesomeArr: string[] = [];
      if (loginUser?.likeShowcase) {
        awesomeArr = loginUser?.likeShowcase;
      }
      awesomeArr.push(showCaseIdAndTitle);

      //update state
      updateAllShowcaseAwesome(1, awesomeArr);
      //post like num
      setLoading(true);
      const animeLikeResult = await showCaseAwesomeUpdate(
        showCase ? showCase._id : "",
        showCase ? showCase.aweSome : 0
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

  const cancelAwesomeFn = async (showCaseIdAndTitle: string) => {
    if (loading == false) {
      const awesomeArr = awesomeArrState;
      const r = awesomeArr.indexOf(showCaseIdAndTitle);
      if (r != -1) {
        awesomeArr.splice(r, 1);
        console.log(awesomeArr);
        //update state
        updateAllShowcaseAwesome(-1, awesomeArr);
        //post like num
        setLoading(true);
        const animeLikeResult = await showCaseAwesomeUpdate(
          showCase ? showCase._id : "",
          showCase ? showCase.aweSome : 0
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

  //follow functions
  const followFn = async () => {
    if (addFollowLoading == false && manga) {
      let followArr: string[] = [];
      if (loginUser?.followManga) {
        followArr = loginUser?.followManga;
      }
      followArr.push(manga._id);

      //update user
      const readyUpdateUser: User = loginUser as User;
      readyUpdateUser.followManga = followArr;
      setFollowArr(followArr);
      setUpdate(update + 1);

      dispatch({
        payload: readyUpdateUser,
        type: LOGIN_USER_ADD,
      });
      //send to backend
      setAddFollowLoading(true);
      await userUpdateFollow(loginUser?._id as string, followArr);
      setAddFollowLoading(false);
    } else {
      console.log("please wait some seconds");
    }
  };

  const cancelFollowFn = async () => {
    if (addFollowLoading == false && manga && loginUser) {
      const followArr = loginUser.followManga;
      const index = followArr.indexOf(manga._id);
      if (index != -1) {
        followArr.splice(index, 1);

        //update user
        const readyUpdateUser: User = loginUser as User;
        readyUpdateUser.followManga = followArr;
        setFollowArr(followArr);
        setUpdate(update + 1);

        dispatch({
          payload: readyUpdateUser,
          type: LOGIN_USER_ADD,
        });
        //send to backend
        setAddFollowLoading(true);
        await userUpdateFollow(loginUser?._id as string, followArr);
        setAddFollowLoading(false);
      }
    } else {
      console.log("please wait some seconds");
    }
  };

  const updateAllShowcaseAwesome = (value: number, awesomeArr: string[]) => {
    //update showcase
    if (showCase) {
      const newAShowCases = showCase;
      newAShowCases.aweSome = newAShowCases.aweSome + value;
      setShowCase(newAShowCases);
    }

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

  const getOneShowcase = () => {
    return (
      <ShowMangaIframeOne>
        {showCase?.imageArr ? (
          <ShowcaseImage src={showCase.imageArr[0]} />
        ) : (
          <></>
        )}
        <h2>{showCase?.title ? showCase.title : ""}</h2>
        <ShowMangaIframeSource>
          {showCase?.source ? showCase.source : ""}
        </ShowMangaIframeSource>
        <ShowcaseMangaHeader>
          <p>shared by </p>
          <ShowImg src={`${showCase?.userAvatar}`} />
          <ShowName>{showCase?.userName}</ShowName>
        </ShowcaseMangaHeader>
        <p>Updated to Episode 33</p>
        <p>{showCase?.description ? showCase.description : ""}</p>
        <div style={{ display: "flex" }}>
          {showCase?.tags.map((tag, index) => {
            return (
              <ShowcaseTag key={index}>
                <p>{tag.text}</p>
              </ShowcaseTag>
            );
          })}
        </div>
        <AweSomeDiv>
          {getAwesomeButton(`${showCase?._id}${showCase?.title}`)}
          <p>Awesome!</p>
          <h6>{showCase?.aweSome}</h6>
        </AweSomeDiv>
      </ShowMangaIframeOne>
    );
  };

  const getEpisodesPage = () =>
    Array.from({ length: episodeNum + 1 }, (v, k) => k).map((n, index) => {
      if (index == episodeNum) {
        return (
          <>
            {loginUser ? (
              <EpisodesAddButton
                onClick={() => {
                  history.replace("/mainPage/showcase/episodeAdd");
                }}
              >
                <img src={`${add}`} />
                <p>Add</p>
              </EpisodesAddButton>
            ) : (
              <></>
            )}
          </>
        );
      }
      return (
        <EpisodesGeneralButton
          key={index}
          onClick={() => {
            history.push({
              pathname: "/episodeShow",
              state: `${manga?._id}Episode${index + 1}`,
            });
          }}
        >
          <p>{index + 1}</p>
        </EpisodesGeneralButton>
      );
    });

  //forums

  const editShowcaseReplyText = (secondIndex: number, text: string) => {
    const newShowcase = showCase;
    if (newShowcase) {
      (newShowcase.replies as ShowCaseReply[])[secondIndex].text = text;
      setShowCase(newShowcase);
      setUpdate(update + 1);
    }
  };

  const updateShowcaseReply = async (secondIndex: number) => {
    if (showCase) {
      dispatch({
        payload: LoadingType.OPEN,
        type: LOADING_OPEN,
      });
      const updateResult = await showCaseReplyUpdate({
        _id: (showCase.replies as ShowCaseReply[])[secondIndex]._id,
        text: (showCase.replies as ShowCaseReply[])[secondIndex].text,
      });
      dispatch({
        payload: LoadingType.CLOSE,
        type: LOADING_CLOSE,
      });
      if (updateResult == 200) {
        editShowcaseReply(secondIndex);
      } else {
        console.log("update wrong");
      }
    }
  };

  const editShowcaseReply = (secondIndex: number) => {
    const newShowcase = showCase;
    if (newShowcase) {
      (newShowcase.replies as ShowCaseReply[])[secondIndex].edit = !(
        newShowcase.replies as ShowCaseReply[]
      )[secondIndex].edit;
      setShowCase(newShowcase);
      setUpdate(update + 1);
    }
  };

  const openSecondReply = (secondIndex: number) => {
    const showcase = showCase;
    if (showcase && showcase.replies) {
      showcase.replies[secondIndex].showReplay =
        !showcase.replies[secondIndex].showReplay;
    }
    setShowCase(showcase);
    const newArr: string[] = [];
    const secondReplies = showcase
      ? showcase.replies
        ? showcase.replies[secondIndex].secondReplies
        : undefined
      : undefined;
    if (secondReplies) {
      for (let i = 0; i < secondReplies.length; i++) {
        newArr.push(secondReplies[i].text);
      }
    } else {
      newArr.push("");
    }
    setNewSecondReplyHtml(newArr);
    setUpdate(update + 1);
  };

  const sendNewSecondReply = (e: string, secondIndex: number) => {
    const newSecondReplyHtmls = newSecondReplyHtml;
    console.log(newSecondReplyHtmls);
    newSecondReplyHtmls[secondIndex] = e;
    setNewSecondReplyHtml(newSecondReplyHtmls);
  };

  const submitNewSecondReplyItem = async (
    showcase: ShowCaseReply,
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
        text: newSecondReplyHtml[secondIndex],
        uploadTime: new Date(),
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: loginUser.name,
      };
      const r = await showCaseSecondReplyAdd(secondShowcase);
      if (r && r < 300) {
        addSecondShowcaseToState(secondShowcase, secondIndex);
      }
    } else {
      openNotification("error", "please login and then reply");
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const addSecondShowcaseToState = (
    showcaseReply: ShowSecondCaseReply,
    secondIndex: number
  ) => {
    if (showCase && showCase.replies) {
      const replies = showCase.replies;
      replies[secondIndex].secondReplies?.push(showcaseReply);
      showCase.replies = replies;
      setShowCase(showCase);
    }
  };

  const getAddSecondReplyBox = (
    showcaseReply: ShowCaseReply,
    secondIndex: number
  ) => (
    <div style={{ marginTop: "16px" }}>
      <TextInput>
        <TextArea
          onChange={(e) => sendNewSecondReply(e.target.value, secondIndex)}
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
              submitNewSecondReplyItem(showcaseReply, secondIndex)
            }
          />
        </ReplyAddDiv>
      </TextInput>
    </div>
  );

  const getShowcaseReplies = (replies: ShowCaseReply[], date: Date) => {
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
                <TextArea
                  value={reply.text}
                  onChange={(e) =>
                    editShowcaseReplyText(secondIndex, e.target.value)
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
                  buttonClick={() => updateShowcaseReply(secondIndex)}
                />
              </ShowcaseEditDiv>
            ) : (
              <>
                <ShowcaseReply>{reply.text}</ShowcaseReply>
              </>
            )}
            <EditAndDeleteDiv>
              <img
                onClick={() => editShowcaseReply(secondIndex)}
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
                  openSecondReply(secondIndex);
                }}
              />
            </ReplyAddDiv>
            <div
              style={{ display: reply.showReplay == true ? "inline" : "none" }}
            >
              {getAddSecondReplyBox(reply, secondIndex)}
              {reply.showReplay ? (
                <>
                  <>
                    {getSecondReplyItems(
                      reply.secondReplies,
                      date,
                      secondIndex
                    )}
                  </>
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

  const submitNewShowcaseReply = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (loginUser && showCase) {
      const showcaseReply: ShowCaseReply = {
        _id: `${showCase._id}${
          showCase.replies ? showCase.replies.length + 1 : 1
        }`,
        replyId: `${showCase._id}${
          showCase.replies ? showCase.replies.length + 1 : 1
        }`,
        showCaseId: showCase._id,
        text: newReplyHtml,
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

  const addShowcaseToState = (showcaseReply: ShowCaseReply) => {
    const newShowCase = showCase;
    if (newShowCase) {
      newShowCase.replies?.push(showcaseReply);
      setShowCase(newShowCase);
    }
  };

  const getAddReplyBox = () => (
    <div style={{ marginTop: "16px" }}>
      <TextInput>
        <TextArea
          value={newReplyHtml}
          onChange={(e) => setNewReplyHtml(e.target.value)}
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
            buttonClick={() => submitNewShowcaseReply()}
          />
        </ReplyAddDiv>
      </TextInput>
    </div>
  );

  const getSecondReplyItems = (
    showcaseReplies: ShowSecondCaseReply[] | undefined,
    date: Date,
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
                  <TextArea
                    value={showcaseSecondReply.text}
                    onChange={(e) =>
                      editShowcaseSecondReplyText(
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
                      updateShowcaseSecondItem(secondIndex, thirdIndex)
                    }
                  />
                </ShowcaseEditDiv>
              ) : (
                <>
                  <ShowcaseReply>{showcaseSecondReply.text}</ShowcaseReply>
                </>
              )}
              <EditAndDeleteDiv>
                <img
                  onClick={() =>
                    editShowcaseSecondReply(secondIndex, thirdIndex)
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

  const editShowcaseSecondReplyText = (
    secondIndex: number,
    thirdIndex: number,
    text: string
  ) => {
    const newShowcases = showCase;
    if (newShowcases) {
      (
        (newShowcases.replies as ShowCaseReply[])[secondIndex]
          .secondReplies as ShowSecondCaseReply[]
      )[thirdIndex].text = text;
      setShowCase(newShowcases);
      setUpdate(update + 1);
    }
  };

  const updateShowcaseSecondItem = async (
    secondIndex: number,
    thirdIndex: number
  ) => {
    if (showCase) {
      dispatch({
        payload: LoadingType.OPEN,
        type: LOADING_OPEN,
      });
      const updateResult = await showCaseSecondReplyUpdate({
        _id: (
          (showCase.replies as ShowCaseReply[])[secondIndex]
            .secondReplies as ShowSecondCaseReply[]
        )[thirdIndex]._id,
        text: (
          (showCase.replies as ShowCaseReply[])[secondIndex]
            .secondReplies as ShowSecondCaseReply[]
        )[thirdIndex].text,
      });
      dispatch({
        payload: LoadingType.CLOSE,
        type: LOADING_CLOSE,
      });
      if (updateResult == 200) {
        editShowcaseSecondReply(secondIndex, thirdIndex);
      } else {
        console.log("update wrong");
      }
    }
  };

  const editShowcaseSecondReply = (secondIndex: number, thirdIndex: number) => {
    if (showCase) {
      const newShowcases = showCase;
      (
        (newShowcases.replies as ShowCaseReply[])[secondIndex]
          .secondReplies as ShowSecondCaseReply[]
      )[thirdIndex].edit = !(
        (newShowcases.replies as ShowCaseReply[])[secondIndex]
          .secondReplies as ShowSecondCaseReply[]
      )[thirdIndex].edit;
      setShowCase(newShowcases);
      setUpdate(update + 1);
    }
  };

  return (
    <>
      <ShowCaseTitleDiv>
        <ShowCaseTitle>Showcase</ShowCaseTitle>
      </ShowCaseTitleDiv>
      <div style={{ display: "flex" }}>
        <ShowCaseDiv className="col-xl-9 col-md-9 col-sm-9 col-9">
          <AnimeButtonsDiv>
            <AnimeButton
              para=""
              text="Collections"
              width="120px"
              height="32px"
              textColor="#4BA3C3"
              backGroundColor="white"
              borderColor="#4BA3C3"
              buttonClick={() => {
                history.push({
                  pathname: "/mainPage/showcase/show",
                  state: `Collections`,
                });
              }}
            />
            <AnimeButton
              para=""
              text="Illustrations"
              width="120px"
              height="32px"
              textColor="#4BA3C3"
              backGroundColor="white"
              borderColor="#4BA3C3"
              buttonClick={() => {
                history.push({
                  pathname: "/mainPage/showcase/show",
                  state: `Illustrations`,
                });
              }}
            />
            <AnimeButton
              para=""
              text="Manga"
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="#AAFFC9"
              borderColor="#AAFFC9"
              buttonClick={() => {
                console.log("Manga");
              }}
            />
          </AnimeButtonsDiv>
          {getOneShowcase()}
          {getFollowButton()}
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
          <EpisodesText>Episodes</EpisodesText>
          <ShowMangaIframeEpisodesButtons>
            <AnimeButton
              para=""
              text={`1-50`}
              width="120px"
              height="32px"
              textColor="#892E2F"
              backGroundColor="#FAE7D5"
              borderColor="#FAE7D5"
              buttonClick={() => {
                console.log("1-50");
              }}
            />
          </ShowMangaIframeEpisodesButtons>
          <ShowMangaButtons className="row">
            {addLoading ? <Spin /> : <></>}
            {getEpisodesPage()}
          </ShowMangaButtons>
          <EpisodesEditAndDelete>
            <div>
              <img
                onClick={() => {
                  console.log("edit");
                }}
                src={`${editIcon}`}
              />
              <p>Edit</p>
              <h6>Cover Info</h6>
              <h6>|</h6>
              <h6>Episodes</h6>
            </div>
            <div>
              <img
                onClick={() => {
                  console.log("edit");
                }}
                src={`${editIcon}`}
              />
              <p>Delete the whole series</p>
            </div>
          </EpisodesEditAndDelete>
          <EpisodesComments
            onClick={() => {
              setCommentShow(!commentShow);
            }}
          >
            <h6>{`Comments (${showCase?.replies?.length}) `}</h6>
            <img
              style={{ height: "20px", width: "20px" }}
              src={`${switchIcon}`}
            />
          </EpisodesComments>
          {commentShow ? (
            <>
              {getAddReplyBox()}
              {showCase ? (
                getShowcaseReplies(
                  showCase.replies ? showCase.replies : [],
                  showCase ? new Date(parseInt(showCase._id)) : new Date()
                )
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </ShowCaseDiv>
        <div className="col-xl-3 col-md-3 col-sm-3 col-3">
          <ShowcaseSide />
        </div>
      </div>
    </>
  );
};

export default ShowcaseMangaOne;
