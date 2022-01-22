import { Input, Select } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import Flag from "react-flagkit";
import { useDispatch, useSelector } from "react-redux";
import { avatarsGet } from "../../../api/avatarAPI";
import { userUpdate } from "../../../api/userApi";
import AnimeButton from "../../../components/Button";
import LoadingDiv from "../../../components/LoadingDiv";
import {
  AvatarBox1,
  AvatarBox2,
  AvatarBox3,
  AvatarBox4,
  AvatarChooseImg,
  AvatarImg,
} from "../../../cssJs/loginCss";
import {
  AvatarBox,
  ConfirmPasswordInput,
  PasswordInput,
  ProfileAccountDiv,
  ProfileAccountHeaderDiv,
  SubmitButtonDiv,
} from "../../../cssJs/ProfilePage/ProfileAccountCss";
import { flagArr, flagGet, flagGetName } from "../../../helperFns/flag";
import { LOGIN_USER_ADD } from "../../../redux/loginUser";
import { IStoreState } from "../../../types/IStoreState";
import { Avatar, User } from "../../../types/User";

const { Option } = Select;

const ProfileAccountPage = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const dispatch = useDispatch();

  const [password, setUserPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [chooseAvatar, setChooseAvatarName] = useState<string>("");
  const [ifLoading, setLoading] = useState<boolean>(false);
  const [ifAvatarLoading, setAvatarLoading] = useState<boolean>(false);
  const [avatarArr, setAvatarArr] = useState<Avatar[][] | null>(null);
  const [avatars, setAvatars] = useState<Avatar[] | null>(null);

  useEffect(() => {
    (async function anyNameFunction() {
      setAvatarLoading(true);
      await getAvatars();
      setAvatarLoading(false);
    })();
    setUserPassword(loginUser ? loginUser.password : "");
    setConfirmPassword("");
    setFirstName(loginUser ? loginUser.firstName : "");
    setLastName(loginUser ? loginUser.lastName : "");
    setCountry(loginUser ? loginUser.country : "");
    setChooseAvatarName(loginUser ? loginUser.avatar : "");
  }, [loginUser]);

  useEffect(() => {
    getAvatarArr();
  }, [avatars]);

  const getAvatars = async () => {
    //get all plate
    const avatars: Avatar[] | null = await avatarsGet();
    setAvatars(avatars);
  };

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case password:
        setUserPassword((e.target as HTMLInputElement).value);
        break;
      case "confirm password":
        setConfirmPassword((e.target as HTMLInputElement).value);
        break;
      case firstName:
        setFirstName((e.target as HTMLInputElement).value);
        break;
      case lastName:
        setLastName((e.target as HTMLInputElement).value);
        break;
      case country:
        setCountry((e.target as HTMLInputElement).value);
        break;
    }
  };

  const getAvatarArr = () => {
    const arr1: Avatar[] = [];
    const arr2: Avatar[] = [];
    const arr3: Avatar[] = [];
    const arr4: Avatar[] = [];
    avatars?.forEach((avatar, index) => {
      if ((index - 4) % 4 == 0 || index == 0) {
        arr1.push(avatar);
      }
      if ((index - 4) % 4 == 1 || index == 1) {
        arr2.push(avatar);
      }
      if ((index - 4) % 4 == 2 || index == 2) {
        arr3.push(avatar);
      }
      if ((index - 4) % 4 == 3 || index == 3) {
        arr4.push(avatar);
      }
    });
    setAvatarArr([arr1, arr2, arr3, arr4]);
  };

  const setChooseAvatar = (avatar: Avatar) =>
    setChooseAvatarName(avatar.imageName);

  const getAvatarDiv = (avatarArr: Avatar[] | null) => {
    if (avatarArr) {
      return avatarArr.map((avatar: Avatar, index: number) => {
        if (avatar.imageName == chooseAvatar) {
          return (
            <div
              key={index}
              onClick={() => {
                setChooseAvatar(avatar);
              }}
            >
              <AvatarChooseImg src={`${avatar.imageUrl}`} />
            </div>
          );
        } else {
          return (
            <div
              key={index}
              onClick={() => {
                setChooseAvatar(avatar);
              }}
            >
              <AvatarImg src={`${avatar.imageUrl}`} />
            </div>
          );
        }
      });
    } else {
      return <></>;
    }
  };

  const getAvatarBox = () => {
    if (ifAvatarLoading) {
      return (
        <>
          <h6>Avatar:</h6>
          <LoadingDiv height="150px" width="150px" />
        </>
      );
    } else {
      return (
        <>
          <h6>Avatar:</h6>
          <AvatarBox1>
            {getAvatarDiv(avatarArr ? avatarArr[0] : null)}
          </AvatarBox1>
          <AvatarBox2>
            {getAvatarDiv(avatarArr ? avatarArr[1] : null)}
          </AvatarBox2>
          <AvatarBox3>
            {getAvatarDiv(avatarArr ? avatarArr[2] : null)}
          </AvatarBox3>
          <AvatarBox4>
            {getAvatarDiv(avatarArr ? avatarArr[3] : null)}
          </AvatarBox4>
        </>
      );
    }
  };

  const updateUser = async () => {
    console.log(`${confirmPassword} need to be checked`);
    const avatar = avatars?.find((avatar) => avatar.imageName == chooseAvatar);
    const newArr = new Array(avatar as Avatar);
    const readyUpdateUser: User = {
      _id: loginUser ? loginUser._id : "",
      userEmail: loginUser ? loginUser.userEmail : "",
      password: password,
      firstName: firstName,
      lastName: lastName,
      country: country,
      birthday: loginUser ? loginUser.birthday : new Date(),
      location: loginUser ? loginUser.location : "",
      facebook: loginUser ? loginUser.facebook : "",
      ins: loginUser ? loginUser.ins : "",
      tel: loginUser ? loginUser.tel : "",
      rate: loginUser ? loginUser.rate : [],
      likeAnime: loginUser?.likeAnime ? loginUser?.likeAnime : [],
      avatar: chooseAvatar,
      avatarImage: newArr,
      likeShowcase: loginUser?.likeShowcase ? loginUser?.likeShowcase : [],
      followManga: loginUser?.followManga ? loginUser?.followManga : [],
      followUsers: loginUser?.followUsers ? loginUser?.followUsers : [],
      awesomeNum: loginUser?.awesomeNum ? loginUser?.awesomeNum : 0,
    };
    setLoading(true);
    const r = await userUpdate(readyUpdateUser);
    if (r == "success") {
      dispatch({
        payload: readyUpdateUser,
        type: LOGIN_USER_ADD,
      });
    }
    setLoading(false);
  };

  const getResult = () => {
    if (ifLoading) {
      return (
        <>
          <LoadingDiv height="150px" width="150px" />
        </>
      );
    } else {
      return (
        <>
          <ProfileAccountHeaderDiv>
            <h6>Account Email</h6>
            <p>{loginUser?.userEmail}</p>
          </ProfileAccountHeaderDiv>
          <PasswordInput>
            <h6>Password</h6>
            <Input placeholder={password} onChange={onChange}></Input>
          </PasswordInput>
          <PasswordInput>
            <h6>Please Confirm the Password </h6>
            <Input placeholder={"confirm password"} onChange={onChange}></Input>
          </PasswordInput>
          <PasswordInput>
            <h6>Name</h6>
            <Input placeholder={firstName} onChange={onChange}></Input>
            <Input placeholder={lastName} onChange={onChange}></Input>
          </PasswordInput>
          <PasswordInput>
            <h6>Country</h6>
            <Select
              value={country}
              style={{ width: "100%" }}
              onSelect={(e: string) => setCountry(e as string)}
            >
              {flagArr.map((value, index) => {
                return (
                  <Option key={index} value={value}>
                    <div style={{ display: "flex" }}>
                      <Flag country={flagGet(value)} />
                      <p style={{ marginLeft: "10px" }}>{flagGetName(value)}</p>
                    </div>
                  </Option>
                );
              })}
            </Select>
          </PasswordInput>
          <AvatarBox>{getAvatarBox()}</AvatarBox>
          <SubmitButtonDiv>
            <AnimeButton
              para=""
              text="Submit"
              width="120px"
              height="36px"
              textColor="white"
              backGroundColor="#F5A623"
              borderColor="#F5A623"
              buttonClick={() => updateUser()}
            />
          </SubmitButtonDiv>
        </>
      );
    }
  };

  return <ProfileAccountDiv>{getResult()}</ProfileAccountDiv>;
};

export default ProfileAccountPage;
