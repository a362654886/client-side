import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { avatarsGet } from "../../api/avatarAPI";
import AnimeButton from "../../components/Button";
import {
  AvatarBox1,
  AvatarBox2,
  AvatarBox3,
  AvatarChooseImg,
  AvatarImg,
  AvatarInput,
  ConfirmInput,
  EmailInput,
  LoginBox,
  LoginButton,
  LoginClickButton,
  LoginTitle,
  NameInput,
  PasswordInput,
  SignUpBox,
  SignUpButton,
  SubmitClickButton,
} from "../../cssJs/loginCss";
import { Avatar, Gender, User } from "../../types/User";
import { userAdd } from "../../api/userApi";
import { Loading } from "../../cssJs/loadingCss";

const SignUpPage = (): JSX.Element => {
  const history = useHistory();

  const [email, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [avatars, setAvatars] = useState<Avatar[] | null>(null);
  const [avatarArr, setAvatarArr] = useState<Avatar[][] | null>(null);
  const [num, serRefresh] = useState(0);
  const [chooseAvatar, setChooseAvatarIndex] = useState<Avatar | null>(null);
  const [ifLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function anyNameFunction() {
      setLoading(true);
      await getAvatars();
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    setChooseAvatarIndex(avatarArr ? avatarArr[0][0] : null);
    getAvatarArr();
  }, [avatars]);

  const getAvatars = async () => {
    //get all plate
    const avatars: Avatar[] | null = await avatarsGet();
    setAvatars(avatars);
  };

  const toPage = (url: string) => history.replace(url);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "email":
        setUserEmail((e.target as HTMLInputElement).value);
        break;
      case "password":
        setPassword((e.target as HTMLInputElement).value);
        break;
      case "confirm":
        setConfirmPassword((e.target as HTMLInputElement).value);
        break;
      case "name":
        setName((e.target as HTMLInputElement).value);
        break;
    }
  };

  const submit = async () => {
    const user: User = {
      _id: email,
      userEmail: email,
      password: password,
      name: name,
      gender: Gender.male,
      birthday: new Date(),
      location: "",
      facebook: "",
      ins: "",
      avatar: chooseAvatar ? chooseAvatar.imageName : "",
    };
    const r = await userAdd(user);
    if (r) {
      toPage("/mainPage/login");
    }
    console.log(r);
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
    console.log(avatarArr);
  };

  const setChooseAvatar = (avatar: Avatar) => setChooseAvatarIndex(avatar);

  const getAvatarDiv = (avatarArr: Avatar[] | null) => {
    if (avatarArr) {
      return avatarArr.map((avatar: Avatar, index: number) => {
        if (avatar == chooseAvatar) {
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
      return <>sdfd</>;
    }
  };

  const getAvatarBox = () => {
    console.log(ifLoading);
    if (ifLoading) {
      return (
        <>
          <Loading />
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

  return (
    <SignUpBox>
      <LoginTitle>Welcome to ANIMEPARK</LoginTitle>
      <SignUpButton>
        <AnimeButton
          para=""
          text="Sign Up"
          width="120px"
          height="36px"
          textColor="#4BA3C3"
          backGroundColor="white"
          borderColor="#4BA3C3"
          buttonClick={() => toPage("/mainPage/signUpPage")}
        />
      </SignUpButton>
      <LoginButton>
        <AnimeButton
          para=""
          text="Log in"
          width="120px"
          height="36px"
          textColor="black"
          backGroundColor="#F6F6F6"
          borderColor="white"
          buttonClick={() => toPage("/mainPage/login")}
        />
      </LoginButton>
      <EmailInput>
        <p>Email:</p>
        <Input placeholder={"email"} onChange={onChange}></Input>
      </EmailInput>
      <PasswordInput>
        <p>Password:</p>
        <Input placeholder={"password"} onChange={onChange}></Input>
      </PasswordInput>
      <ConfirmInput>
        <p>Confirm:</p>
        <Input placeholder={"confirm"} onChange={onChange}></Input>
      </ConfirmInput>
      <NameInput>
        <p>Name:</p>
        <Input placeholder={"name"} onChange={onChange}></Input>
      </NameInput>
      <AvatarInput>{getAvatarBox()}</AvatarInput>
      <SubmitClickButton>
        <AnimeButton
          para=""
          text="Submit"
          width="120px"
          height="36px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => submit()}
        />
      </SubmitClickButton>
    </SignUpBox>
  );
};

export default SignUpPage;
