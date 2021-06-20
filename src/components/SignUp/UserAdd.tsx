import * as React from "react";
import { InputBoxType, NewUserType } from "../../types/EnumTypes";
import InputBox from "../../components/InputBox";
import { User, Gender } from "../../types/User";
import { SelectValue } from "antd/lib/select";
import { ButtonDiv, ButtonPrimary, Title } from "../../cssJs/publicCss";
import { useState } from "react";
import { userAdd } from "../../api/userApi";
import { useDispatch } from "react-redux";
import {
  NEW_USER_FAIL,
  NEW_USER_NONE,
  NEW_USER_SUCCESS,
} from "../../redux/newUser";
import { AlertBody } from "../../types/BasicType";
import { getAlert } from "../conponentDivs/AlertBody";

interface IProps {
  alert: AlertBody;
}

const UserAdd = ({ alert }: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const [userEmail, setUserEmail] = useState("");
  const [firstName, setUserFirstName] = useState("");
  const [lastName, setUserLastName] = useState("");
  const [address, setUserAddress] = useState("");
  const [gender, setUserGender] = useState(Gender.male);
  const [birthday, setUserBirthday] = useState(new Date("1900-01-01"));
  const [password, setUserPassword] = useState("");

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
  };

  const onTimeChange = (e: any) => setUserBirthday(new Date(e._d));

  const onSelectChange = (e: SelectValue): void => {
    switch (e?.toString()) {
      case "male":
        setUserGender(Gender.male);
        break;
      case "female":
        setUserGender(Gender.female);
        break;
    }
  };

  const submit = async () => {
    dispatch(async () => {
      await signUp();
    });
  };

  const signUp = async () => {
    const user: User = {
      _id: userEmail,
      userEmail: userEmail,
      firstName: firstName,
      lastName: lastName,
      address: address,
      gender: gender,
      birthday: birthday,
      password: password,
      admin: false,
    };
    dispatch({
      payload: {
        state: NewUserType.LOADING,
        user: null,
      },
      type: NEW_USER_NONE,
    });
    const result = await userAdd(user);
    if (result == null) {
      dispatch({
        payload: {
          state: NewUserType.FAIL,
          user: null,
        },
        type: NEW_USER_FAIL,
      });
    } else {
      dispatch({
        payload: {
          state: NewUserType.SUCCESS,
          user: result,
        },
        type: NEW_USER_SUCCESS,
      });
    }
  };

  return (
    <>
      <Title>Register:</Title>
      <p>{getAlert(alert)}</p>
      <InputBox
        Title="User Email"
        onChange={onChange}
        type={InputBoxType.INPUT}
        value={userEmail}
      />
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
      />
      <InputBox
        Title="Password"
        onChange={onChange}
        type={InputBoxType.INPUT}
        value={password}
      />
      <ButtonDiv>
        <ButtonPrimary onClick={submit}>Log In</ButtonPrimary>
      </ButtonDiv>
    </>
  );
};

export default UserAdd;
