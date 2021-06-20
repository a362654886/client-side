import { SelectValue } from "antd/lib/select";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userUpdate } from "../../api/userApi";
import {
  ButtonDiv,
  ButtonPrimary,
  Loading
} from "../../cssJs/publicCss";
import { UserInfoDiv } from "../../cssJs/userManagementCss";
import { getMonentDate } from "../../helperFns/timeFn";
import { InputBoxType } from "../../types/EnumTypes";
import { IStoreState } from "../../types/IStoreState";
import { Gender, User } from "../../types/User";
import InputBox from "../InputBox";

const UserInfoManagement = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [userEmail, setUserEmail] = useState(loginUser?.userEmail);
  const [firstName, setUserFirstName] = useState(loginUser?.firstName);
  const [lastName, setUserLastName] = useState(loginUser?.lastName);
  const [address, setUserAddress] = useState(loginUser?.address);
  const [gender, setUserGender] = useState(loginUser?.gender);
  const [birthday, setUserBirthday] = useState<moment.Moment>(
    getMonentDate(loginUser?.birthday as Date)
  );
  const [password, setUserPassword] = useState(loginUser?.password);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //
    console.log(getMonentDate(loginUser?.birthday as Date));
  }, []);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "User Email":
        setUserEmail((e.target as HTMLInputElement).value);
        break;
      case "First Name":
        setUserFirstName((e.target as HTMLInputElement).value);
        break;
      case "Last Name":
        setUserLastName((e.target as HTMLInputElement).value);
        break;
      case "Address":
        setUserAddress((e.target as HTMLInputElement).value);
        break;
      case "Password":
        setUserPassword((e.target as HTMLInputElement).value);
        break;
    }
    console.log(e.target);
  };

  const onSelectChange = (e: SelectValue): void => {
    switch (e?.toString()) {
      case "male":
        setUserGender(Gender.male);
        break;
      case "female":
        setUserGender(Gender.female);
        break;
    }
    console.log(e);
  };

  const onTimeChange = (e: any) => {
    const date = new Date(e._d);
    setUserBirthday(getMonentDate(date));
  };

  const save = async () => {
    setLoading(true);
    const updateUser: User = {
      _id: userEmail as string,
      userEmail: userEmail as string,
      firstName: firstName as string,
      lastName: lastName as string,
      address: address as string,
      gender: gender as Gender,
      birthday: new Date(birthday.format()),
      password: password as Gender,
      admin: loginUser?.admin as boolean,
    };
    await userUpdate(updateUser);
    setLoading(false);
  };

  const getUpdateBody = () => {
    if (!loading) {
      return (
        <>
          <InputBox
            Title="First Name"
            onChange={onChange}
            type={InputBoxType.INPUT}
            value={firstName}
          />
          <InputBox
            Title="Last Name"
            onChange={onChange}
            type={InputBoxType.INPUT}
            value={lastName}
          />
          <InputBox
            Title="Address"
            onChange={onChange}
            type={InputBoxType.INPUT}
            value={address}
          />
          <InputBox
            Title="Gender"
            onSelectChange={onSelectChange}
            type={InputBoxType.SELECT}
            options={["male", "female"]}
          />
          <InputBox
            Title="Birthday"
            onChange={onTimeChange}
            type={InputBoxType.DATE_PICKER}
            date={birthday as moment.Moment}
          />
          <InputBox
            Title="Password"
            onChange={onChange}
            type={InputBoxType.INPUT}
            value={password}
          />
          <ButtonDiv>
            <ButtonPrimary onClick={save}>Save</ButtonPrimary>
          </ButtonDiv>
        </>
      );
    } else {
      return <Loading />;
    }
  };

  return <UserInfoDiv>{getUpdateBody()}</UserInfoDiv>;
};

export default UserInfoManagement;
