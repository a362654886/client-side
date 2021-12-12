import * as React from "react";
import { useEffect, useState } from "react";
import { showCaseAwesomeUpdate } from "../../api/showcaseAPI";
import {
  AweSomeDiv,
  ShowcaseImage,
  ShowcaseMangaHeader,
  ShowcaseTag,
  ShowImg,
  ShowMangaIframe,
  ShowMangaIframeSource,
  ShowMangaMiddleButton,
  ShowName,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { ShowCaseType } from "../../types/showCaseType";
import showCaseAwesomeUnClick from "../../files/showCaseAwesomeUnClick.png";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.png";
import { User } from "../../types/User";
import { IStoreState } from "../../types/IStoreState";
import { openNotification } from "../../helperFns/popUpAlert";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateAwesome, userUpdateShowcases } from "../../api/userApi";
import { LOGIN_USER_ADD } from "../../redux/loginUser";
import AnimeButton from "../../components/Button";

interface IProps {
  showcases: ShowCaseType[];
  toMangaOne: (index: number) => void;
}

const ShowcaseManga = ({ showcases, toMangaOne }: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [allShowCases, setAllShowCases] = useState<ShowCaseType[]>(showcases);
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
        <ShowMangaIframe key={index}>
          {showcase.imageArr ? (
            <ShowcaseImage key={index} src={showcase.imageArr[0]} />
          ) : (
            <></>
          )}
          <h2>{showcase.title ? showcase.title : ""}</h2>
          <ShowMangaIframeSource>
            {showcase.source ? showcase.source : ""}
          </ShowMangaIframeSource>
          <ShowcaseMangaHeader>
            <p>shared by </p>
            <ShowImg src={`${showcase.userAvatar}`} />
            <ShowName>{showcase.userName}</ShowName>
          </ShowcaseMangaHeader>
          <p>Updated to Episode 33</p>
          <p>{showcase.description ? showcase.description : ""}</p>
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
          <ShowMangaMiddleButton>
            <AnimeButton
              para=""
              text={"Read"}
              width="240px"
              height="32px"
              textColor="#892E2F"
              backGroundColor="#FAE7D5"
              borderColor="#FAE7D5"
              buttonClick={() => toMangaOne(index)}
            />
          </ShowMangaMiddleButton>
        </ShowMangaIframe>
      );
    });

  return <>{getExistShowcases()}</>;
};

export default ShowcaseManga;
