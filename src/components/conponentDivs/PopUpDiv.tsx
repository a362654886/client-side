import * as React from "react";
import { LabelPopUp, PlatePopUp } from "../../cssJs/forumCss";

export type popUpBlock = {
  name: string;
  url: string;
};

const getAllBlocks = (
  popUpValues: popUpBlock[],
  rowNumber: number,
  foFunction: (name: string) => void
) => {
  const column: number = Math.ceil(popUpValues.length / rowNumber);
  const popArray: JSX.Element[][] = [];
  for (let i = 1; i <= column; i++) {
    popArray.push([]);
  }
  if (popUpValues.length != 0) {
    for (let i = 0; i <= popUpValues.length - 1; i++) {
      const columnNum = Math.ceil((i + 1) / rowNumber) - 1;
      popArray[columnNum].push(
        <LabelPopUp key={i}>
          <img src={`${popUpValues[i].url}`} />
          <a onClick={() => foFunction(popUpValues[i].name)}>
            {popUpValues[i].name}
          </a>
        </LabelPopUp>
      );
    }
  }
  return popArray;
};

const getBorder = (index: number, end: number) => {
  if (index == 0 && end == 0) {
    return {
      display: "flex",
      borderBottom: "1px solid black",
      borderRight: "1px solid black",
      borderTop: "1px solid black",
    };
  }
  switch (index) {
    case 0:
      return { display: "flex", borderTop: "1px solid black" };
    case end:
      return {
        display: "flex",
        borderBottom: "1px solid black",
        borderLeft: "1px solid black",
      };
    default:
      return { display: "flex", borderLeft: "1px solid black" };
  }
};

const getReturnLabels = (
  popUpLabels: JSX.Element[][],
  width: string,
  height: string,
  leaveDiv: () => void
) => {
  return (
    <PlatePopUp
      style={{ width: width, height: height }}
      onMouseLeave={() => {
        leaveDiv();
      }}
    >
      {popUpLabels.map((labels, index) => {
        return (
          <div
            style={getBorder(index, popUpLabels.length - 1)}
            key={labels.toString()}
          >
            {labels}
          </div>
        );
      })}
    </PlatePopUp>
  );
};

export const getPoPup = (
  popupBlocks: popUpBlock[],
  row: number,
  propFn: (name: string) => void,
  leaveDiv: () => void
): JSX.Element | null => {
  const popUpLabels = getAllBlocks(popupBlocks, row, propFn);
  const width: string = row * 110 + "px";
  const height: string =
    popupBlocks.length == 1 ? "115px" : (popupBlocks.length - 1) * 115 + "px";
  if (popupBlocks.length == 0) {
    return null;
  } else {
    return getReturnLabels(popUpLabels, width, height, leaveDiv);
  }
};
