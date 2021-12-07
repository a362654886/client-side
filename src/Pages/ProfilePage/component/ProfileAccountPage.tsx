import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { avatarsGet } from "../../../api/avatarAPI";
import { userUpdate } from "../../../api/userApi";
import AnimeButton from "../../../components/Button";
import LoadingDiv from "../../../components/LoadingDiv";
import {
  AvatarBox1,
  AvatarBox2,
  AvatarBox3,
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
import { LOGIN_USER_ADD } from "../../../redux/loginUser";
import { IStoreState } from "../../../types/IStoreState";
import { Avatar, Gender, User } from "../../../types/User";

const ProfileAccountPage = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const dispatch = useDispatch();

  const [password, setUserPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
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
    setName(loginUser ? loginUser.name : "");
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
      case name:
        setName((e.target as HTMLInputElement).value);
        break;
    }
  };

  const getAvatarArr = () => {
    const arr1: Avatar[] = [];
    const arr2: Avatar[] = [];
    const arr3: Avatar[] = [];
    avatars?.forEach((avatar, index) => {
      if ((index - 3) % 3 == 0 || index == 0) {
        arr1.push(avatar);
      }
      if ((index - 3) % 3 == 1 || index == 1) {
        arr2.push(avatar);
      }
      if ((index - 3) % 3 == 2 || index == 2) {
        arr3.push(avatar);
      }
    });
    setAvatarArr([arr1, arr2, arr3]);
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
          <p>Avatar:</p>
          <LoadingDiv height="150px" width="150px" />
        </>
      );
    } else {
      return (
        <>
          <p>Avatar:</p>
          <AvatarBox1>
            {getAvatarDiv(avatarArr ? avatarArr[0] : null)}
          </AvatarBox1>
          <AvatarBox2>
            {getAvatarDiv(avatarArr ? avatarArr[1] : null)}
          </AvatarBox2>
          <AvatarBox3>
            {getAvatarDiv(avatarArr ? avatarArr[2] : null)}
          </AvatarBox3>
        </>
      );
    }
  };

  const updateUser = async () => {
    const avatar = avatars?.find((avatar) => avatar.imageName == chooseAvatar);
    const newArr = new Array(avatar as Avatar);
    const readyUpdateUser: User = {
      _id: loginUser ? loginUser._id : "",
      userEmail: loginUser ? loginUser.userEmail : "",
      password: password,
      name: name,
      gender: loginUser ? loginUser.gender : Gender.male,
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
            <p>Password:</p>
            <Input placeholder={password} onChange={onChange}></Input>
          </PasswordInput>
          <ConfirmPasswordInput>
            <p></p>
            <Input placeholder={"confirm password"} onChange={onChange}></Input>
          </ConfirmPasswordInput>
          <PasswordInput>
            <p>Name:</p>
            <Input placeholder={name} onChange={onChange}></Input>
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
