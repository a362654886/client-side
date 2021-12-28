import * as React from "react";
import { useEffect, useState } from "react";
import {
  ShowcaseImage,
  ShowMangaIframe,
  ShowMangaMiddleButton,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { ShowCaseType } from "../../types/showCaseType";
import AnimeButton from "../../components/Button";

interface IProps {
  showcases: ShowCaseType[];
  toMangaOne: (index: number) => void;
}

const ShowcaseFollowing = ({ showcases, toMangaOne }: IProps): JSX.Element => {
  /*const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );*/

  const [allShowCases, setAllShowCases] = useState<ShowCaseType[]>(showcases);

  useEffect(() => {
    setAllShowCases(showcases);
  }, [showcases]);

  /*const isLogin = (likeFn: () => Promise<void>) => {
    if (loginUser) {
      likeFn();
    } else {
      openNotification(
        "please login and then reply",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
    }
  };*/

  const getExistShowcases = () =>
    allShowCases.map((showcase, index) => {
      return (
        <ShowMangaIframe key={index}>
          {showcase.imageArr ? (
            <ShowcaseImage key={index} src={showcase.imageArr[0]} />
          ) : (
            <></>
          )}
          <h2>{showcase.title ? showcase.title : ""}</h2>
          <p>Updated to Episode 33</p>
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

export default ShowcaseFollowing;
