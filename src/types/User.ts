import { UserLabel } from "./Label";

export type User = {
  _id: string;
  userEmail: string;
  firstName: string;
  lastName: string;
  address: string;
  gender: Gender;
  birthday: Date;
  password: string;
  admin: boolean;
  labels?: UserLabel[];
};

export enum Gender {
  male = "male",
  female = "female",
}
