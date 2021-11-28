import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { showCaseAllGet } from "../../api/showcaseAPI";
import AnimeButton, { MiddleDiv } from "../../components/Button";
import { AnimeButtonsDiv } from "../../cssJs/AnimePage/AnimeOneCss";
import {
  ShowCaseDiv,
  ShowcasePostDiv,
  ShowcaseSearchInputDiv,
  ShowCaseTitle,
  ShowCaseTitleDiv,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { ShowCaseEnum, ShowCaseType } from "../../types/showCaseType";
import ShowcaseForum from "./ShowcaseForum";

const ShowcaseShow = (): JSX.Element => {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [allShowCases, setAllShowCases] = useState<ShowCaseType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [chooseButton, setChooseButton] = useState<number>(0);
  const [showCaseType, setShowCaseType] = useState<ShowCaseEnum>(
    ShowCaseEnum.Collections
  );

  const pageSize = 4;

  const buttonsColor = [
    {
      text: "Collections",
      color: "#4BA3C3",
      backColor: "white",
    },
    {
      text: "Drawings",
      color: "#4BA3C3",
      backColor: "white",
    },
    {
      text: "Comics",
      color: "#4BA3C3",
      backColor: "white",
    },
  ];

  const history = useHistory();

  useEffect(() => {
    // console.log(showCaseType)
  }, [showCaseType]);

  const changeButton = (index: number) => {
    setChooseButton(index);
    switch (index) {
      case 0:
        setShowCaseType(ShowCaseEnum.Collections);
        break;
      case 1:
        setShowCaseType(ShowCaseEnum.Drawings);
        break;
      case 2:
        setShowCaseType(ShowCaseEnum.Comics);
        break;
    }
  };

  const getButtons = () => {
    const indexNum = chooseButton;
    return buttonsColor.map((button, index) => {
      if (index == indexNum) {
        return (
          <div key={index}>
            <AnimeButton
              para=""
              text={button.text}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="#AAFFC9"
              borderColor="#AAFFC9"
              buttonClick={() => changeButton(index)}
            />
          </div>
        );
      } else {
        return (
          <div key={index}>
            <AnimeButton
              para=""
              text={button.text}
              width="120px"
              height="32px"
              textColor="#4BA3C3"
              backGroundColor="white "
              borderColor="#4BA3C3"
              buttonClick={() => changeButton(index)}
            />
          </div>
        );
      }
    });
  };

  const getHeader = () => {
    switch (showCaseType) {
      case ShowCaseEnum.Collections:
        return (
          <ShowcasePostDiv>
            <p>
              Collections is a place for you to share and appreciate anime
              accessories.
            </p>
            <MiddleDiv>
              <AnimeButton
                para=""
                text={"Post"}
                width="120px"
                height="36px"
                textColor="white"
                backGroundColor="#FFC300"
                borderColor="white"
                buttonClick={() => {
                  history.push({
                    pathname: "/mainPage/showcase/create",
                    state: { type: ShowCaseEnum.Collections },
                  });
                }}
              />
            </MiddleDiv>
          </ShowcasePostDiv>
        );
      case ShowCaseEnum.Drawings:
        return (
          <ShowcasePostDiv>
            <p>
              Drawings is a place for you to post and enjoy anime drawing works.
            </p>
            <MiddleDiv>
              <AnimeButton
                para=""
                text={"Post"}
                width="120px"
                height="36px"
                textColor="white"
                backGroundColor="#FFC300"
                borderColor="white"
                buttonClick={() => {
                  history.push({
                    pathname: "/mainPage/showcase/create",
                    state: { type: ShowCaseEnum.Drawings },
                  });
                }}
              />
            </MiddleDiv>
          </ShowcasePostDiv>
        );
      case ShowCaseEnum.Comics:
        return (
          <ShowcasePostDiv>
            <p>
              Comics is a place for you to publish and appreciate comic works.
            </p>
            <MiddleDiv style={{ width: "200px" }}>
              <AnimeButton
                para=""
                text={"Create a new Series"}
                width="200px"
                height="36px"
                textColor="white"
                backGroundColor="#FFC300"
                borderColor="white"
                buttonClick={() => {
                  history.push({
                    pathname: "/mainPage/showcase/create",
                    state: { type: ShowCaseEnum.Comics },
                  });
                }}
              />
            </MiddleDiv>
          </ShowcasePostDiv>
        );
    }
  };

  useEffect(() => {
    (async function anyNameFunction() {
      await search();
    })();
  }, [page]);

  useEffect(() => {
    console.log(allShowCases);
  }, [allShowCases]);

  const search = async () => {
    setLoading(true);
    const showcaseResult = await showCaseAllGet(page, pageSize);
    if (showcaseResult) {
      setAllShowCases(allShowCases.concat(showcaseResult.result));
      setCount(showcaseResult.count);
    }
    setLoading(false);
  };

  return (
    <>
      <ShowCaseTitleDiv>
        <ShowCaseTitle>Showcase</ShowCaseTitle>
      </ShowCaseTitleDiv>
      <div style={{ display: "flex" }}>
        <ShowCaseDiv className="col-xl-9 col-md-9 col-sm-9 col-9">
          <AnimeButtonsDiv>{getButtons()}</AnimeButtonsDiv>
          {getHeader()}
          <ShowcaseSearchInputDiv>
            <Input />
            <AnimeButton
              para=""
              text="Search"
              width="120px"
              height="40px"
              textColor="white"
              backGroundColor="#FFC300"
              borderColor="#FFC300"
              buttonClick={() => search()}
            />
          </ShowcaseSearchInputDiv>
          <ShowcaseForum showcases={allShowCases} />
        </ShowCaseDiv>

        <div className="col-xl-3 col-md-3 col-sm-3 col-3">side</div>
      </div>
    </>
  );
};

export default ShowcaseShow;
