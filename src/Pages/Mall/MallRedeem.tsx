import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AnimeButton } from "../../components/Button";
import { AnimeButtonsDiv } from "../../cssJs/AnimePage/AnimeOneCss";
import {
  MallShowDiv,
  MallTitle,
  MallTitleDiv,
} from "../../cssJs/MallPage/MallPageCss";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";

const MallRedeem = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [chooseButton, setChooseButton] = useState<number>(0);

  const pageSize = 3;

  const buttonsColor = [
    {
      text: "Redeem",
      color: "#4BA3C3",
      backColor: "white",
    },
    {
      text: "Custom",
      color: "#4BA3C3",
      backColor: "white",
    },
  ];

  const changeButton = (index: number) => {
    setChooseButton(index);
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

  return (
    <>
      <div>MallRedeem</div>
    </>
  );
};

export default MallRedeem;
