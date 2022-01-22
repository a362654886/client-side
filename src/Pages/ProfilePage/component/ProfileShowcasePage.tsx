import * as React from "react";
import { useState } from "react";
import AnimeButton from "../../../components/Button";
import {
  ButtonsDiv,
  ProfileCollectionDiv,
  ProfileSubDiv,
} from "../../../cssJs/ProfilePage/ProfileCss";
import ProfileShowcaseCollections from "../profileShowcases/ProfileShowcaseCollections";
import ProfileShowcaseFollow from "../profileShowcases/ProfileShowcaseFollow";
import ProfileShowcaseIllustration from "../profileShowcases/ProfileShowcaseIllustration";
import ProfileShowcaseManga from "../profileShowcases/ProfileShowcaseManga";
import stateAvailable from "../../../files/stateAvailable.png";
import stateSoldOut from "../../../files/stateSoldOut.png";

const ProfileShowcasePage = (): JSX.Element => {
  const buttonsColor = [
    {
      text: "Collections",
      color: "#4BA3C3",
      backColor: "white",
    },
    {
      text: "Illustrations",
      color: "#4BA3C3",
      backColor: "white",
    },
    {
      text: "Manga",
      color: "#4BA3C3",
      backColor: "white",
    },
    {
      text: "Following",
      color: "#4BA3C3",
      backColor: "white",
    },
  ];

  const [chooseButton, setChooseButton] = useState<number>(0);

  const changeButton = (index: number) => setChooseButton(index);

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
            <ProfileSubDiv onClick={() => changeButton(index)}>
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

  const getShowcaseDiv = () => {
    switch (chooseButton) {
      case 0:
        return <ProfileShowcaseCollections />;
        break;
      case 1:
        return <ProfileShowcaseIllustration />;
        break;
      case 2:
        return <ProfileShowcaseManga />;
        break;
      case 3:
        return <ProfileShowcaseFollow />;
        break;
      default:
        return <></>;
    }
  };

  return (
    <>
      <ButtonsDiv>{getButtons()}</ButtonsDiv>
      <ProfileCollectionDiv>{getShowcaseDiv()}</ProfileCollectionDiv>
    </>
  );
};

export default ProfileShowcasePage;
