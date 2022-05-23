import { AwesomeLevelType } from "../types/awesomeLevel";

export const getLevel = (
  allLevels: AwesomeLevelType[] | null,
  awesomeNum: number
): AwesomeLevelType => {
  if (allLevels) {
    let loop = false;
    let returnIndex = 0;
    console.log(allLevels)
    allLevels.forEach((item, index) => {
      if (loop == false && item.awesomeRequire > awesomeNum) {
        loop = true;
        returnIndex = index;
      }
    });
    return allLevels[returnIndex];
  } else {
    return {
      _id: "0",
      image: "",
      awesomeRequire: 0,
    };
  }
};
