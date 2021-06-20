import { BooleanType } from "./EnumTypes";

export type AlertBody = {
  type: BooleanType;
  context: string;
};

export type ImageBody = {
  width: number;
  height: number;
  imgBase64: string;
  imgName: string;
};
