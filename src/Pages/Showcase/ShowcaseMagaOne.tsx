import * as React from "react";
import { useEffect, useState } from "react";
import {
  showCaseDescriptionUpdate,
  showCaseMangaDelete,
  showCaseOneMangaGet,
  showCaseReplyAdd,
  showCaseReplyGet,
  showCaseReplyUpdate,
  showCaseSecondReplyAdd,
  showCaseSecondReplyUpdate,
} from "../../api/showcaseAPI";
import {
  AweSomeDiv,
  EditAndDeleteDiv,
  EpisodesAddButton,
  EpisodesComments,
  EpisodesDeleteDiv,
  EpisodesEditDiv,
  EpisodesGeneralButton,
  EpisodesText,
  ReplyAddDiv,
  ReplyBox,
  ReplySecondBox,
  ShowAvatarDiv,
  ShowCaseDiv,
  ShowcaseEditDiv,
  ShowcaseImage,
  ShowcaseMangaDescription,
  ShowcaseMangaHeader,
  ShowcaseMangaHeaderP,
  ShowcaseMangaHeaderTitle,
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
  ShowTime,
} from "../../cssJs/ShowCasePage/showCaseCss";
import {
  ShowCaseReply,
  ShowCaseType,
  ShowSecondCaseReply,
} from "../../types/showCaseType";
import showCaseAwesomeUnClick from "../../files/showCaseAwesomeUnClick.svg";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.svg";
import { Avatar, User } from "../../types/User";
import { IStoreState } from "../../types/IStoreState";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateFollow } from "../../api/userApi";
import { LOGIN_USER_ADD } from "../../redux/loginUser";
import AnimeButton from "../../components/Button";
import add from "../../files/Add.svg";
import { useHistory, useParams } from "react-router-dom";
import { AnimeButtonsDiv } from "../../cssJs/AnimePage/AnimeOneCss";
import { episodeGet } from "../../api/episodeAPI";
import { Button, Modal, Spin } from "antd";
import { TextInput } from "../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import TextArea from "antd/lib/input/TextArea";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import editIcon from "../../files/editIcon.svg";
import deleteIcon from "../../files/deleteIcon.svg";
import switchIcon from "../../files/arrows.svg";
import ShowcaseSide from "./ShowcaseSide";
import EpisodeEditModal from "./EpisodeEditModal";
import episodes from "../../files/Episodes.png";
import SettingImg from "../../components/SettingImg";
import ProfileWrapperDiv from "../../components/ProfileWrapperDiv";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";
import { IfLoginCheck } from "../../helperFns/loginCheck";
import ShareDiv from "../../components/ShareDiv";
import { getWidth } from "../../helperFns/widthFn";
import {
  SHOWCASE_AWESOME_ADD,
  SHOWCASE_AWESOME_CANCEL,
} from "../../redux/showcaseAwesome";
import DeleteWrapperDiv from "../../components/DeleteWrapperDiv";
import { SHOWCASE_MANGA_ADD } from "../../redux/showcaseManga";

interface Para {
  id: string;
}

const ShowcaseMangaOne = (): JSX.Element => {
  const para: Para = useParams();

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
  const [editShowCaseManga, setEditShowCaseManga] = useState<boolean>(false);
  const [editEpisode, setEditEpisodesManga] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(
    showCase ? (showCase.description ? showCase.description : "") : ""
  );
  const [episodePage, setEpisodePage] = useState<number>(0);

  useEffect(() => {
    (async function anyNameFunction() {
      await getManga(para.id);
    })();
  }, []);

  useEffect(() => {
    (async function anyNameFunction() {
      await getEpisode();
    })();
  }, [showCase]);

  useEffect(() => {
    setShowCase(manga);
  }, [manga]);

  useEffect(() => {
    //setShowCase(manga);
  }, [episodeNum, loading]);

  const getManga = async (id: string) => {
    const manga = await showCaseOneMangaGet(id);
    dispatch({
      payload: manga,
      type: SHOWCASE_MANGA_ADD,
    });
  };

  const getEpisode = async () => {
    setAddLoading(true);
    const episodeResult = await episodeGet(manga ? manga._id : "");
    setAddLoading(false);
    episodeResult?.count
      ? setEpisodeNum(episodeResult?.count)
      : setEpisodeNum(0);
  };

  const saveDescription = async () => {
    await showCaseDescriptionUpdate({
      _id: showCase ? (showCase._id ? showCase._id : "") : "",
      description: showCase
        ? showCase.description
          ? showCase.description
          : ""
        : "",
    });
    setEditShowCaseManga(false);
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
          buttonClick={() => (IfLoginCheck(loginUser) ? cancelFollowFn() : "")}
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
          buttonClick={() => (IfLoginCheck(loginUser) ? followFn() : "")}
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

  //awesome functions
  const awesomeFn = async (showCaseIdAndTitle: string) => {
    let awesomeArr: string[] = [];
    if (loginUser?.likeShowcase) {
      awesomeArr = loginUser?.likeShowcase;
    }
    awesomeArr.push(showCaseIdAndTitle);
    updateAllShowcaseAwesome(1, awesomeArr);
    dispatch({
      payload: showCase,
      type: SHOWCASE_AWESOME_ADD,
    });
  };

  const cancelAwesomeFn = async (showCaseIdAndTitle: string) => {
    const awesomeArr = awesomeArrState;
    const r = awesomeArr.indexOf(showCaseIdAndTitle);
    if (r != -1) {
      awesomeArr.splice(r, 1);
      //update state
      updateAllShowcaseAwesome(-1, awesomeArr);
      //post like num
      dispatch({
        payload: showCase,
        type: SHOWCASE_AWESOME_CANCEL,
      });
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

  const deleteMange = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    await showCaseMangaDelete(manga ? manga._id : "");
    history.push("/mainPage/showcase/showManga?page=1");
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
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
        <ShowcaseMangaHeaderTitle>
          {showCase ? showCase.title : ""}
        </ShowcaseMangaHeaderTitle>
        <ShowMangaIframeSource>
          {showCase?.source ? showCase.source : ""}
        </ShowMangaIframeSource>
        <ShowcaseMangaHeader>
          <ShowcaseMangaHeaderP>shared by </ShowcaseMangaHeaderP>
          <ShowAvatarDiv>
            <ProfileWrapperDiv
              userId={showCase ? showCase.userId : ""}
              element={
                <>
                  <ShowImg src={`${showCase ? showCase.userAvatar : ""}`} />
                  <ShowName>{showCase ? showCase.userName : showCase}</ShowName>
                </>
              }
            ></ProfileWrapperDiv>
            <SettingImg
              userId={showCase ? showCase.userId : ""}
              userName={showCase ? showCase.userName : ""}
              userImg={showCase ? showCase.userAvatar : ""}
              marginTop="8px"
            />
          </ShowAvatarDiv>
        </ShowcaseMangaHeader>
        <p>Updated to Episode 33</p>
        <ShowcaseMangaDescription>
          {showCase ? showCase.description : ""}
        </ShowcaseMangaDescription>
        {editShowCaseManga ? (
          <>
            <TextArea
              style={{ height: "250px" }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Button onClick={() => saveDescription()}>save</Button>
            <Button onClick={() => setEditShowCaseManga(!editShowCaseManga)}>
              Cancel
            </Button>
          </>
        ) : (
          <p>{description}</p>
        )}
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

  const getEpisodesPage = (page: number) => {
    return Array.from({ length: 2 }, (v, k) => k).map((n, index) => {
      const pageNum = page * 2 + index + 1;
      if (pageNum <= episodeNum) {
        return (
          <>
            <EpisodesGeneralButton
              key={index}
              onClick={() => {
                history.push({
                  pathname: "/episodeShow",
                  state: `${manga?._id}Episode${index + 1}`,
                });
              }}
            >
              <p>{`${pageNum}`}</p>
            </EpisodesGeneralButton>
            {`${pageNum}` == episodeNum.toString() ? (
              <>
                {loginUser ? (
                  <EpisodesAddButton
                    onClick={() => {
                      history.push("/mainPage/showcase/episodeAdd");
                    }}
                  >
                    <img src={`${add}`} />
                    <p>Add</p>
                  </EpisodesAddButton>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        );
      }
    });
  };

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
        userId: loginUser._id,
        userAvatar: (loginUser.avatarImage as Avatar[])[0].imageUrl,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
      };
      const r = await showCaseSecondReplyAdd(secondShowcase);
      if (r && r < 300) {
        addSecondShowcaseToState(secondShowcase, secondIndex);
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
          onChange={(e) => {
            IfLoginCheck(loginUser)
              ? sendNewSecondReply(e.target.value, secondIndex)
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
            <ShowAvatarDiv>
              <ProfileWrapperDiv
                userId={reply.userId}
                element={
                  <>
                    <ShowImg src={`${reply.userAvatar}`} />
                    <ShowName>
                      {reply.userName}
                      <Flag
                        style={{ marginLeft: "5px" }}
                        country={flagGet(
                          reply.userCountry ? reply.userCountry : ""
                        )}
                      />
                    </ShowName>
                  </>
                }
              ></ProfileWrapperDiv>
              <SettingImg
                userId={reply.userId}
                userName={reply.userName}
                userImg={reply.userAvatar}
                marginTop="8px"
              />
              <ShowTime>{`${date.getDate()}-${
                date.getMonth() + 1
              }-${date.getFullYear()}`}</ShowTime>
            </ShowAvatarDiv>
            <div style={{ marginLeft: "40px" }}>
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
                  <AnimeButton
                    para=""
                    text={`Cancel`}
                    width="120px"
                    height="32px"
                    textColor="black"
                    backGroundColor="white"
                    borderColor="black"
                    buttonClick={() => editShowcaseReply(secondIndex)}
                  />
                </ShowcaseEditDiv>
              ) : (
                <>
                  <ShowcaseReply>{reply.text}</ShowcaseReply>
                </>
              )}
              {reply.edit ? (
                <></>
              ) : (
                <EditAndDeleteDiv>
                  <img
                    onClick={() => editShowcaseReply(secondIndex)}
                    src={`${editIcon}`}
                  />
                  <p
                    style={{ cursor: "pointer" }}
                    onClick={() => editShowcaseReply(secondIndex)}
                  >
                    Edit
                  </p>
                  <img
                    style={{ width: "20px" }}
                    onClick={() => {
                      console.log("deleteIcon");
                    }}
                    src={`${deleteIcon}`}
                  />
                  <p>Delete</p>
                </EditAndDeleteDiv>
              )}
              <EpisodesComments
                onClick={() => {
                  openSecondReply(secondIndex);
                }}
              >
                <h6>{`Replies(${
                  reply.secondReplies ? reply.secondReplies.length : 0
                })`}</h6>
                <img
                  style={{ height: "20px", width: "20px" }}
                  src={`${switchIcon}`}
                />
              </EpisodesComments>
              <div
                style={{
                  display: reply.showReplay == true ? "inline" : "none",
                }}
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
        userId: loginUser._id,
        userName: `${loginUser.firstName}.${loginUser.lastName
          .substring(0, 1)
          .toUpperCase()}`,
        userCountry: loginUser.country,
      };
      const r = await showCaseReplyAdd(showcaseReply);
      if (r && r < 300) {
        addShowcaseToState(showcaseReply);
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
          onChange={(e) =>
            IfLoginCheck(loginUser) ? setNewReplyHtml(e.target.value) : ""
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
              <ShowAvatarDiv>
                <ProfileWrapperDiv
                  userId={showcaseSecondReply.userId}
                  element={
                    <>
                      <ShowImg src={`${showcaseSecondReply.userAvatar}`} />
                      <ShowName>
                        {showcaseSecondReply.userName}
                        <Flag
                          style={{ marginLeft: "5px" }}
                          country={flagGet(
                            showcaseSecondReply.userCountry
                              ? showcaseSecondReply.userCountry
                              : ""
                          )}
                        />
                      </ShowName>
                    </>
                  }
                ></ProfileWrapperDiv>
                <SettingImg
                  userId={showcaseSecondReply.userId}
                  userName={showcaseSecondReply.userName}
                  userImg={showcaseSecondReply.userAvatar}
                  marginTop="8px"
                />
                <ShowTime>{`${date.getDate()}-${
                  date.getMonth() + 1
                }-${date.getFullYear()}`}</ShowTime>
              </ShowAvatarDiv>
              <div style={{ marginLeft: "40px" }}>
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
                    <AnimeButton
                      para=""
                      text={`Cancel`}
                      width="120px"
                      height="32px"
                      textColor="black"
                      backGroundColor="white"
                      borderColor="black"
                      buttonClick={() =>
                        editShowcaseSecondReply(secondIndex, thirdIndex)
                      }
                    />
                  </ShowcaseEditDiv>
                ) : (
                  <>
                    <ShowcaseReply>{showcaseSecondReply.text}</ShowcaseReply>
                  </>
                )}
                {showcaseSecondReply.edit ? (
                  <></>
                ) : (
                  <EditAndDeleteDiv>
                    <img
                      onClick={() =>
                        editShowcaseSecondReply(secondIndex, thirdIndex)
                      }
                      src={`${editIcon}`}
                      style={{
                        cursor: "pointer",
                      }}
                    />
                    <p
                      onClick={() =>
                        editShowcaseSecondReply(secondIndex, thirdIndex)
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </p>
                    <img
                      style={{ width: "20px", cursor: "pointer" }}
                      onClick={() => {
                        console.log("deleteIcon");
                      }}
                      src={`${deleteIcon}`}
                    />
                    <p
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        console.log("deleteIcon");
                      }}
                    >
                      Delete
                    </p>
                  </EditAndDeleteDiv>
                )}
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
        <ShowCaseDiv
          style={{
            width:
              getWidth() > 1200 ? "100%" : getWidth() > 600 ? "896px" : "100%",
            minHeight: getWidth() > 1200 ? "1300px" : "100%",
            paddingLeft: getWidth() > 600 ? "" : "8px",
          }}
        >
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
                  pathname: "/mainPage/showcase/showCollection?page=1",
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
                  pathname: "/mainPage/showcase/showIllustrations?page=1",
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
          <ShareDiv marginTop={"24px"} />
          <EpisodesText>
            <img src={episodes} />
            Episodes
          </EpisodesText>
          <ShowMangaIframeEpisodesButtons>
            {Array.from(
              { length: Math.floor((episodeNum + 1) / 2) },
              (v, k) => k
            ).map((n, index) => {
              const start = 2 * (n + 1) - 1;
              const end = 2 * (n + 1);
              return (
                <div key={index} style={{ marginRight: "8px" }}>
                  <AnimeButton
                    para=""
                    text={`${start}-${end}`}
                    width="120px"
                    height="32px"
                    textColor="white"
                    backGroundColor="#892E2F"
                    borderColor="#892E2F"
                    buttonClick={() => {
                      setEpisodePage(index);
                    }}
                  />
                </div>
              );
            })}
          </ShowMangaIframeEpisodesButtons>
          <ShowMangaButtons className="row">
            {addLoading ? <Spin /> : <></>}
            {getEpisodesPage(episodePage)}
          </ShowMangaButtons>
          {loginUser && loginUser?._id == manga?.userId ? (
            <EpisodesEditDiv>
              <img
                onClick={() => {
                  console.log("edit");
                }}
                src={`${editIcon}`}
              />
              <p>Edit</p>
              <h6
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setEditShowCaseManga(!editShowCaseManga);
                }}
              >
                Cover Info
              </h6>
              <h6>|</h6>
              <h6
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setEditEpisodesManga(!editEpisode);
                }}
              >
                Episodes
              </h6>
            </EpisodesEditDiv>
          ) : (
            <></>
          )}
          <DeleteWrapperDiv
            element={
              <EpisodesDeleteDiv>
                <img src={`${editIcon}`} />
                <p>Delete the whole series</p>
              </EpisodesDeleteDiv>
            }
            deleteFn={() => deleteMange()}
          />
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
        <Modal
          title={""}
          visible={editEpisode}
          onOk={() => {
            console.log("S");
          }}
          onCancel={() => setEditEpisodesManga(false)}
          footer={[]}
        >
          <EpisodeEditModal
            episodeNum={episodeNum}
            deleteEpidose={() => {
              setEpisodeNum(episodeNum - 1);
            }}
          />
        </Modal>
        <div
          style={{
            width: "276px",
            marginLeft: "10px",
            display:
              document.documentElement.clientWidth > 1181 ? "inline" : "none",
          }}
        >
          <ShowcaseSide />
        </div>
      </div>
    </>
  );
};

export default ShowcaseMangaOne;
