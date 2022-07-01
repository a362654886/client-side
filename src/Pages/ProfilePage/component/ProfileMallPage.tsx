import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { designHistoryGetById } from "../../../api/designHistoryAPI";
import {
  ButtonsDiv,
  ProfileAddButtonDiv,
  ProfileDesignAttribute,
  ProfileDesignHistory,
  ProfileDesignHistoryImg,
  ProfileMiddleDiv,
  ProfileSubDiv,
} from "../../../cssJs/ProfilePage/ProfileCss";
import { DesignHistory } from "../../../types/designHistoryType";
import { IStoreState } from "../../../types/IStoreState";
import { User } from "../../../types/User";
import stateAvailable from "../../../files/stateAvailable.svg";
import stateSoldOut from "../../../files/stateSoldOut.svg";
import getMoreImg from "../../../files/getMore.svg";
import { getWidth } from "../../../helperFns/widthFn";
import AnimeButton from "../../../components/Button";
import { mallCustomerAPI } from "../../../api/mallCustomeAPI";
import { MallCustomType } from "../../../types/mallCustomType";
import loadingImg from "../../../files/loading.gif";
import { _getDate } from "../../../helperFns/timeFn";

const buttonsColor = [
  {
    text: "Design History",
    color: "#4BA3C3",
    backColor: "white",
  },
  /*{
    text: "Redeem",
    color: "#4BA3C3",
    backColor: "white",
  },*/
];

const ProfileMallPage = (): JSX.Element => {
  const history = useHistory();

  const profileUser: User | null = useSelector(
    (state: IStoreState) => state.profileUserState
  );

  const [allDesignHistories, setAllDesignHistories] = useState<
    DesignHistory[] | null
  >(null);
  const [chooseButton, setChooseButton] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [mallCustomer, setMallCustomer] = useState<MallCustomType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [pageNum, setPageNum] = useState<number>(1);
  const pageSize = 6;

  const changeButton = (index: number) => setChooseButton(index);

  useEffect(() => {
    (async function anyNameFunction() {
      const mallCustomerResult = await mallCustomerAPI();
      if (mallCustomerResult) {
        setMallCustomer(mallCustomerResult);
      }
    })();
  }, []);

  useEffect(() => {
    //console.log(allDesignHistories);
  }, [allDesignHistories]);

  useEffect(() => {
    (async function anyNameFunction() {
      await getDesignHistory();
    })();
  }, [chooseButton]);

  useEffect(() => {
    (async function anyNameFunction() {
      await searchPage();
    })();
  }, [pageNum]);

  const getMore = () => {
    const newPage = pageNum + 1;
    setPageNum(newPage);
  };

  const getDesignHistory = async () => {
    if (profileUser) {
      setLoading(true);
      const result = await designHistoryGetById(profileUser?._id, 1, pageSize);
      if (result) {
        result.designHistories
          ? setAllDesignHistories(result.designHistories)
          : "";
        setCount(result ? result.count : 0);
      }
      setLoading(false);
    }
  };

  const searchPage = async () => {
    if (profileUser) {
      setLoading(true);
      const result = await designHistoryGetById(
        profileUser?._id,
        pageNum,
        pageSize
      );
      if (result && allDesignHistories) {
        setAllDesignHistories(
          allDesignHistories.concat(result.designHistories)
        );
        //setAllShowCases(showcaseResult.result);
        //setCount(showcaseResult.count);
      }
      setLoading(false);
    }
  };

  const getButtons = () => {
    return buttonsColor.map(
      (
        button: {
          text: string;
          color: string;
          backColor: string;
        },
        index: number
      ) => {
        if (index == chooseButton) {
          return (
            <ProfileSubDiv
              style={{ width: "150px" }}
              onClick={() => changeButton(index)}
            >
              <img src={stateAvailable} />
              <h6>{button.text}</h6>
            </ProfileSubDiv>
          );
        } else {
          return (
            <ProfileSubDiv onClick={() => changeButton(index)}>
              <img src={stateSoldOut} />
              <h6>{button.text}</h6>
            </ProfileSubDiv>
          );
        }
      }
    );
  };

  const getMallHistory = () => {
    switch (chooseButton) {
      case 0:
        return (
          <>
            <ProfileAddButtonDiv>
              <AnimeButton
                para=""
                text={"Create a sample"}
                width="200px"
                height="36px"
                textColor="white"
                backGroundColor="#FFC300"
                borderColor="white"
                buttonClick={() => {
                  history.push({
                    pathname: "/mall/custom",
                  });
                }}
              />
            </ProfileAddButtonDiv>
            <ProfileDesignHistory>Completion history</ProfileDesignHistory>
            <div>
              {allDesignHistories?.map((item) => {
                if (item.type == 3) {
                  return (
                    <div style={{ position: "relative" }}>
                      <p>{_getDate(new Date(item.uploadTime))}</p>
                      <ProfileDesignHistoryImg
                        src={
                          mallCustomer[item.type]
                            ? mallCustomer[item.type].imgURL
                            : ""
                        }
                      />
                      <img
                        style={{
                          height: "525px",
                          position: "absolute",
                          left: "90px",
                          top: "85px",
                          width: "345px",
                        }}
                        src={item.imageString}
                      />
                      <ProfileDesignAttribute>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.value }}
                        ></div>
                      </ProfileDesignAttribute>
                    </div>
                  );
                } else if (item.type == 1) {
                  return (
                    <div style={{ position: "relative" }}>
                      <p>{_getDate(new Date(item.uploadTime))}</p>
                      <ProfileDesignHistoryImg
                        src={
                          mallCustomer[item.type]
                            ? mallCustomer[item.type].imgURL
                            : ""
                        }
                      />
                      <img
                        style={{
                          height: "325px",
                          position: "absolute",
                          left: "183px",
                          top: "215px",
                          width: "245px",
                        }}
                        src={item.imageString}
                      />
                      <ProfileDesignAttribute>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.value }}
                        ></div>
                      </ProfileDesignAttribute>
                    </div>
                  );
                } else {
                  return (
                    <>
                      <p>{_getDate(new Date(item.uploadTime))}</p>
                      <ProfileDesignHistoryImg
                        src={
                          mallCustomer[item.type]
                            ? mallCustomer[item.type].imgURL
                            : ""
                        }
                        style={{
                          backgroundImage: `url(${item.imageString})`,
                          backgroundSize: "contain",
                          backgroundRepeat: "no-repeat",
                        }}
                      />
                      <ProfileDesignAttribute>
                        <div
                          dangerouslySetInnerHTML={{ __html: item.value }}
                        ></div>
                      </ProfileDesignAttribute>
                    </>
                  );
                }
              })}
            </div>
            {allDesignHistories ? (
              allDesignHistories?.length < count ? (
                <ProfileMiddleDiv onClick={() => getMore()}>
                  <div>
                    <img src={`${getMoreImg}`} />
                    <p>Load More</p>
                  </div>
                </ProfileMiddleDiv>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </>
        );
      case 1:
        return <></>;
      default:
        return <></>;
    }
  };

  return (
    <>
      {getWidth() > 700 ? (
        <ButtonsDiv>{getButtons()}</ButtonsDiv>
      ) : (
        <div>{getButtons()}</div>
      )}
      {loading ? (
        <div>
          <img src={loadingImg} />
        </div>
      ) : (
        <>{getMallHistory()}</>
      )}
    </>
  );
};

export default ProfileMallPage;
