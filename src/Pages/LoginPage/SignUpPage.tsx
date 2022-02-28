import { Input, Select } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { avatarAdd, avatarsGet } from "../../api/avatarAPI";
import AnimeButton from "../../components/Button";
import {
  AvatarBox1,
  AvatarBox2,
  AvatarBox3,
  AvatarChooseImg,
  AvatarChooseUploadImg,
  AvatarImg,
  AvatarInput,
  EmailInput,
  NameInput,
  PasswordInput,
  SignUpBox,
  SignUpButtons,
  SubmitClickButton,
} from "../../cssJs/loginCss";
import { Avatar, User } from "../../types/User";
import { userAdd } from "../../api/userApi";
import AlertBox, { ColorType } from "../../components/AlertBox";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { useDispatch } from "react-redux";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import { flagArr, flagGet, flagGetName } from "../../helperFns/flag";
import Flag from "react-flagkit";
import CropImgDiv from "../../components/CropImgDiv";
import { ImageBody } from "../../components/ImageUpload";
import AUpload from "../../components/AUpload";
import avatarUpload from "../../files/avatarUpload.png";
import addAvatar from "../../files/addAvatar.png";

const { Option } = Select;

const SignUpPage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setUserEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [avatars, setAvatars] = useState<Avatar[] | null>(null);
  const [avatarArr, setAvatarArr] = useState<Avatar[][] | null>(null);
  const [chooseAvatar, setChooseAvatarIndex] = useState<Avatar | null>(null);
  const [ifLoadingAlert, setLoadingAlert] = useState<boolean>(false);

  const [uploadImg, setLoadImg] = useState<string>("");
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [imgName, setImgName] = useState<string>("");

  useEffect(() => {
    (async function anyNameFunction() {
      dispatch({
        payload: LoadingType.OPEN,
        type: LOADING_OPEN,
      });
      await getAvatars();
      dispatch({
        payload: LoadingType.CLOSE,
        type: LOADING_CLOSE,
      });
    })();
  }, []);

  useEffect(() => {
    setChooseAvatarIndex(avatarArr ? avatarArr[0][0] : null);
    getAvatarArr();
  }, [avatars]);

  useEffect(() => {
    //
  }, [uploadImg]);

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
      case "first name":
        setFirstName((e.target as HTMLInputElement).value);
        break;
      case "last name":
        setLastName((e.target as HTMLInputElement).value);
        break;
      case "country":
        setCountry((e.target as HTMLInputElement).value);
        break;
    }
  };

  const submit = async () => {
    setLoadingAlert(false);
    if (
      password !== confirmPassword ||
      password.trim() == "" ||
      confirmPassword.trim() == ""
    ) {
      openNotification(
        "confirm password isn't equal password, please check",
        NotificationColor.Error,
        NotificationTitle.Error
      );
      setLoadingAlert(true);
      return;
    }
    if (email.trim() == "") {
      openNotification(
        "please input email",
        NotificationColor.Error,
        NotificationTitle.Error
      );
      setLoadingAlert(true);
      return;
    }
    if (firstName.trim() == "") {
      openNotification(
        "please input first name",
        NotificationColor.Error,
        NotificationTitle.Error
      );
      setLoadingAlert(true);
      return;
    }
    if (lastName.trim() == "") {
      openNotification(
        "please input first name",
        NotificationColor.Error,
        NotificationTitle.Error
      );
      setLoadingAlert(true);
      return;
    }
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const user: User = {
      _id: email,
      userEmail: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      country: country,
      birthday: new Date(),
      location: "",
      facebook: "",
      ins: "",
      tel: "",
      rate: [],
      likeAnime: [],
      avatar: chooseAvatar ? chooseAvatar.imageName : "",
      likeShowcase: [],
      followManga: [],
      followUsers: [],
      awesomeNum: 0,
    };
    const r = await userAdd(user);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (r) {
      toPage("/mainPage/login");
    }
    if (r == null) {
      setErrorText("add new account wrong, please connect manager");
      setLoadingAlert(true);
    }
  };

  const getAvatarArr = () => {
    const arr1: Avatar[] = [];
    const arr2: Avatar[] = [];
    const arr3: Avatar[] = [];
    avatars?.forEach((avatar, index) => {
      if ((index - 3) % 3 == 0 || index == 0) {
        arr3.push(avatar);
      }
      if ((index - 3) % 3 == 1 || index == 1) {
        arr2.push(avatar);
      }
      if ((index - 3) % 3 == 2 || index == 2) {
        arr1.push(avatar);
      }
    });
    setAvatarArr([arr1, arr2, arr3]);
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
      return <></>;
    }
  };

  const setUploadImg = async (value: string) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    await avatarAdd({
      _id: new Date().valueOf().toString(),
      imageName: imgName,
      imageUrl: value,
    });
    await getAvatars();
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  return (
    <SignUpBox>
      <AlertBox
        text={errorText}
        color={ColorType.ERROR}
        show={ifLoadingAlert}
      />
      <SignUpButtons>
        <AnimeButton
          para=""
          text="Sign Up"
          width="120px"
          height="36px"
          textColor="black"
          backGroundColor="#AAFFC9"
          borderColor="white"
          buttonClick={() => toPage("/mainPage/signUpPage")}
        />
        <AnimeButton
          para=""
          text="Log in"
          width="120px"
          height="36px"
          textColor="#4BA3C3"
          backGroundColor="white"
          borderColor="#4BA3C3"
          buttonClick={() => toPage("/mainPage/login")}
        />
      </SignUpButtons>
      <EmailInput>
        <h3>Account Email:</h3>
        <Input placeholder={"email"} onChange={onChange}></Input>
      </EmailInput>
      <PasswordInput>
        <h3>Password:</h3>
        <Input.Password
          placeholder={"password"}
          onChange={onChange}
        ></Input.Password>
      </PasswordInput>
      <PasswordInput>
        <h3>Please Confirm the Password:</h3>
        <Input.Password
          placeholder={"confirm"}
          onChange={onChange}
        ></Input.Password>
      </PasswordInput>
      <NameInput>
        <h3>Name:</h3>
        <Input placeholder={"first name"} onChange={onChange}></Input>
        <Input placeholder={"last name"} onChange={onChange}></Input>
      </NameInput>
      <EmailInput>
        <h3>Country:</h3>
        <Select
          style={{ width: "100%" }}
          onSelect={(e) => setCountry(e as string)}
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
      </EmailInput>
      <AvatarInput
        style={{
          height: `${avatarArr ? avatarArr[0].length * 60 + 140 : 0}px`,
        }}
      >
        <p>Avatar:</p>
        <AvatarChooseUploadImg>
          <img src={chooseAvatar ? chooseAvatar.imageUrl : avatarUpload} />
        </AvatarChooseUploadImg>
        <AvatarBox1>
          <AUpload
            width={"40px"}
            height={"40px"}
            textColor={"black"}
            backGroundColor={"white"}
            border={"1px solid white"}
            text={"Upload"}
            setImg={(value: ImageBody) => {
              setImgName(value.imgName);
              setLoadImg(value.imgBase64);
              setShowCropper(true);
            }}
            margin={"10px 10px "}
          />
          {getAvatarDiv(avatarArr ? avatarArr[0] : null)}
        </AvatarBox1>
        <AvatarBox2>{getAvatarDiv(avatarArr ? avatarArr[1] : null)}</AvatarBox2>
        <AvatarBox3>{getAvatarDiv(avatarArr ? avatarArr[2] : null)}</AvatarBox3>
      </AvatarInput>
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
      <CropImgDiv
        uploadImg={uploadImg}
        setLoadImg={(image: string) => {
          setUploadImg(image);
          setShowCropper(false);
        }}
        visible={showCropper}
        setVisibleFalse={() => setShowCropper(false)}
      />
    </SignUpBox>
  );
};

export default SignUpPage;
