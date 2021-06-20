export type UserLabel = {
  _id: string;
  userEmail: string;
  labelId: string;
};

export type Label = {
  _id: string;
  labelId: string;
  labelName: string;
  imgName: string;
  imgBase64: string;
  plateId: string;
  ifChoose?: boolean;
};

export type UpdateLabel = {
  userEmail: string;
  labelId: string;
  ifChoose: boolean;
};
