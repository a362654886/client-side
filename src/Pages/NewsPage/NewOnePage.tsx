import * as React from "react";
import { useSelector } from "react-redux";
import {
  NewHeaderTitle,
  NewMainBox,
  OneNewHeader,
  OneNewText,
  OneNewTime,
} from "../../cssJs/newsCss";
import { IStoreState } from "../../types/IStoreState";
import { NewType } from "../../types/NewsType";

const NewOnePage = (): JSX.Element => {
  const chooseNew: NewType | null = useSelector(
    (state: IStoreState) => state.newState
  );

  return (
    <NewMainBox>
      <NewHeaderTitle>
        <h1>News</h1>
      </NewHeaderTitle>
      <OneNewHeader>{chooseNew?.header}</OneNewHeader>
      <OneNewTime>{chooseNew?.time}</OneNewTime>
      <OneNewText
        style={{ marginTop: "16px" }}
        dangerouslySetInnerHTML={{ __html: chooseNew ? chooseNew.html : "" }}
      ></OneNewText>
    </NewMainBox>
  );
};

export default NewOnePage;
