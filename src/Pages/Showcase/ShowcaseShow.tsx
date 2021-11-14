import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { showCaseAllGet } from "../../api/showcaseAPI";
import AnimeButton from "../../components/Button";
import { AnimeButtonsDiv } from "../../cssJs/AnimePage/AnimeOneCss";
import {
  ShowCaseDiv,
  ShowcaseSearchInputDiv,
  ShowcaseType,
  ShowIframe,
  ShowImg,
  ShowName,
  ShowTime,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { ShowCaseEnum, ShowCaseType } from "../../types/showCaseType";

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
      text: "Originals",
      color: "#4BA3C3",
      backColor: "white",
    },
  ];

  const changeButton = (index: number) => {
    setChooseButton(index);
    setShowCaseType(
      index == 0 ? ShowCaseEnum.Collections : ShowCaseEnum.Originals
    );
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
              backGroundColor="#F6F6F6 "
              borderColor="white"
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
            <AnimeButton
              para=""
              text="Edit"
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="white"
              borderColor="#bdbdbd"
              buttonClick={() => console.log("edit")}
            />
            <AnimeButton
              para=""
              text="Delete"
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="white"
              borderColor="#bdbdbd"
              buttonClick={() => console.log("delete")}
            />
          </div>
          {showcase.imageArr.map((image: string, index: number) => {
            return <img key={index} src={image} />;
          })}
          <div
            style={{ marginTop: "16px" }}
            dangerouslySetInnerHTML={{ __html: showcase.text }}
          ></div>
          <ShowcaseType>{showcase.type}</ShowcaseType>
        </ShowIframe>
      );
    });

  return (
    <ShowCaseDiv>
      <AnimeButtonsDiv>{getButtons()}</AnimeButtonsDiv>
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
      {getExistShowcases()}
    </ShowCaseDiv>
  );
};

export default ShowcaseShow;
