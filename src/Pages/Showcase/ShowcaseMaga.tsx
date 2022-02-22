import * as React from "react";
import { useEffect, useState } from "react";
import { showCaseAwesomeUpdate } from "../../api/showcaseAPI";
import {
  AweSomeDiv,
  ShowAvatarDiv,
  ShowcaseImage,
  ShowcaseMangaHeader,
  ShowcaseMangaHeaderP,
  ShowcaseMangaHeaderTitle,
  ShowcaseTag,
  ShowImg,
  ShowMangaIframe,
  ShowMangaIframeSource,
  ShowMangaMiddleButton,
  ShowName,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { ShowCaseType } from "../../types/showCaseType";
import showCaseAwesomeUnClick from "../../files/showCaseAwesomeUnClick.svg";
import showCaseAwesomeClick from "../../files/showCaseAwesomeClick.svg";
import { User } from "../../types/User";
import { IStoreState } from "../../types/IStoreState";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateAwesome, userUpdateShowcases } from "../../api/userApi";
import { LOGIN_USER_ADD } from "../../redux/loginUser";
import AnimeButton from "../../components/Button";
import SettingImg from "../../components/SettingImg";
import ProfileWrapperDiv from "../../components/ProfileWrapperDiv";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";
import {
  SHOWCASE_AWESOME_ADD,
  SHOWCASE_AWESOME_CANCEL,
} from "../../redux/showcaseAwesome";

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
      return (
        <ShowMangaIframe key={index}>
          {showcase.imageArr ? (
            <ShowcaseImage key={index} src={showcase.imageArr[0]} />
          ) : (
            <></>
          )}
          <ShowcaseMangaHeaderTitle>
            {showcase.title ? showcase.title : ""}
          </ShowcaseMangaHeaderTitle>
          <ShowMangaIframeSource>
            {showcase.source ? showcase.source : ""}
          </ShowMangaIframeSource>
          <ShowcaseMangaHeader>
            <ShowcaseMangaHeaderP>shared by </ShowcaseMangaHeaderP>
            <ShowAvatarDiv>
              <ProfileWrapperDiv
                userId={showcase.userId}
                element={
                  <>
                    <ShowImg src={`${showcase.userAvatar}`} />
                    <ShowName>
                      {showcase.userName}
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
              />
            </ShowAvatarDiv>
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
              textColor="white"
              backGroundColor="#892E2F"
              borderColor="#892E2F"
              buttonClick={() => toMangaOne(index)}
            />
          </ShowMangaMiddleButton>
        </ShowMangaIframe>
      );
    });

  return <>{getExistShowcases()}</>;
};

export default ShowcaseManga;
