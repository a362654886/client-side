import { Input, notification, Select } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import Flag from "react-flagkit";
import { useDispatch, useSelector } from "react-redux";
import { avatarAdd, avatarsGet } from "../../../api/avatarAPI";
import { userUpdate } from "../../../api/userApi";
import AUpload from "../../../components/AUpload";
import AnimeButton from "../../../components/Button";
import LoadingDiv from "../../../components/LoadingDiv";
import {
  AvatarBox1,
  AvatarBox2,
  AvatarBox3,
  AvatarBox4,
  AvatarChooseImg,
  AvatarChooseUploadImg,
  AvatarImg,
  AvatarInput,
} from "../../../cssJs/loginCss";
import {
  PasswordInput,
  PasswordSecretInput,
  ProfileAccountDiv,
  ProfileAccountHeaderDiv,
  SubmitButtonDiv,
} from "../../../cssJs/ProfilePage/ProfileAccountCss";
import { flagArr, flagGet, flagGetName } from "../../../helperFns/flag";
import { LOGIN_USER_ADD } from "../../../redux/loginUser";
import { IStoreState } from "../../../types/IStoreState";
import { Avatar, User } from "../../../types/User";
import { ImageBody } from "../../AdminPage/ImageUpload";
import avatarUpload from "../../../files/avatarUpload.png";
import CropImgDiv from "../../../components/CropImgDiv";
import { LoadingType } from "../../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../../helperFns/popUpAlert";

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
  const [chooseAvatarIndex, setChooseAvatarIndex] = useState<Avatar | null>(
    null
  );
  const [ifLoading, setLoading] = useState<boolean>(false);
  const [ifAvatarLoading, setAvatarLoading] = useState<boolean>(false);
  const [avatarArr, setAvatarArr] = useState<Avatar[][] | null>(null);
  const [avatars, setAvatars] = useState<Avatar[] | null>(null);

  const [uploadImg, setLoadImg] = useState<string>("");
  const [showCropper, setShowCropper] = useState<boolean>(false);
  const [imgName, setImgName] = useState<string>("");

  useEffect(() => {
    (async function anyNameFunction() {
      setAvatarLoading(true);
      await getAvatars();
      setAvatarLoading(false);
    })();
    setUserPassword(loginUser ? loginUser.password : "");
    setConfirmPassword(loginUser ? loginUser.password : "");
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
    const avatars: Avatar[] | null = await avatarsGet(false);
    setAvatars(avatars);
  };

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "password":
        setUserPassword((e.target as HTMLInputElement).value);
        break;
      case "confirm password":
        setConfirmPassword((e.target as HTMLInputElement).value);
        break;
      case "firstName":
        setFirstName((e.target as HTMLInputElement).value);
        break;
      case "lastName":
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

  const updateUserCheck = async () => {
    if (password == confirmPassword) {
      const oldPassword = localStorage.getItem("password");
      if (oldPassword != password) {
        localStorage.setItem("password", password.toString());
      }
      await updateUser();
    } else {
      openNotification(
        "please confirm password and confirmPassword",
        NotificationColor.Error,
        NotificationTitle.Error
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
      avatar: chooseAvatarIndex ? chooseAvatarIndex.imageName : "",
      avatarImage: newArr,
      likeShowcase: loginUser?.likeShowcase ? loginUser?.likeShowcase : [],
      followManga: loginUser?.followManga ? loginUser?.followManga : [],
      followUsers: loginUser?.followUsers ? loginUser?.followUsers : [],
      followMarket: loginUser?.followMarket ? loginUser?.followMarket : [],
      awesomeNum: loginUser?.awesomeNum ? loginUser?.awesomeNum : 0,
      interactionAwesome:
        loginUser != undefined ? loginUser?.interactionAwesome : false,
      interactionComments:
        loginUser != undefined ? loginUser?.interactionComments : false,
      interactionBids:
        loginUser != undefined ? loginUser?.interactionBids : false,
      interactionNewFollowers:
        loginUser != undefined ? loginUser?.interactionNewFollowers : false,
      interactionMessages:
        loginUser != undefined ? loginUser?.interactionMessages : false,
      interactionFirstAnimeNews:
        loginUser != undefined ? loginUser?.interactionFirstAnimeNews : false,
      shipAddress: loginUser?.shipAddress ? loginUser?.shipAddress : "",
      shipCity: loginUser?.shipCity ? loginUser?.shipCity : "",
      shipSuburb: loginUser?.shipSuburb ? loginUser?.shipSuburb : "",
      postCode: loginUser?.postCode ? loginUser?.postCode : "",
      link: loginUser?.link ? loginUser?.link : "",
      block: loginUser?.block ? loginUser?.block : false,
      blockTime: loginUser ? loginUser.blockTime : 0,
      blockReason: loginUser ? loginUser.blockReason : "",
      role: loginUser ? loginUser.role : "general",
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

  const setUploadImg = async (value: string) => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    await avatarAdd({
      _id: new Date().valueOf().toString(),
      imageName: imgName,
      imageUrl: value,
      privateAvatar: true,
    });
    setChooseAvatarIndex({
      _id: new Date().valueOf().toString(),
      imageName: imgName,
      imageUrl: value,
      privateAvatar: true,
    });
    await getAvatars();
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
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
          <PasswordSecretInput>
            <h6>Password</h6>
            <Input.Password
              value={password}
              placeholder={"password"}
              onChange={onChange}
            ></Input.Password>
          </PasswordSecretInput>
          <PasswordSecretInput>
            <h6>Please Confirm the Password </h6>
            <Input.Password
              value={confirmPassword}
              placeholder={"confirm password"}
              onChange={onChange}
            ></Input.Password>
          </PasswordSecretInput>
          <PasswordInput>
            <h6>Name</h6>
            <Input
              value={firstName}
              placeholder={"firstName"}
              onChange={onChange}
            ></Input>
            <Input
              value={lastName}
              placeholder={"lastName"}
              onChange={onChange}
            ></Input>
          </PasswordInput>
          <PasswordInput>
            <h6>Country</h6>
            <Select
              value={country}
              style={{ width: "320px" }}
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

          <AvatarInput
            style={{
              height: `${
                avatarArr ? (avatarArr[0].length + 1) * 60 + 140 : 0
              }px`,
            }}
          >
            <p>Avatar:</p>
            <AvatarChooseUploadImg>
              <img
                src={
                  chooseAvatarIndex ? chooseAvatarIndex.imageUrl : avatarUpload
                }
              />
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
            <AvatarBox2>
              {getAvatarDiv(avatarArr ? avatarArr[1] : null)}
            </AvatarBox2>
            <AvatarBox3>
              {getAvatarDiv(avatarArr ? avatarArr[2] : null)}
            </AvatarBox3>
          </AvatarInput>
          <SubmitButtonDiv>
            <AnimeButton
              para=""
              text="Submit"
              width="120px"
              height="36px"
              textColor="white"
              backGroundColor="#F5A623"
              borderColor="#F5A623"
              buttonClick={() => updateUserCheck()}
            />
          </SubmitButtonDiv>
          <CropImgDiv
            uploadImg={uploadImg}
            setLoadImg={(image: string) => {
              setUploadImg(image);
              setShowCropper(false);
            }}
            visible={showCropper}
            setVisibleFalse={() => setShowCropper(false)}
            cube={true}
          />
        </>
      );
    }
  };

  return <ProfileAccountDiv>{getResult()}</ProfileAccountDiv>;
};

export default ProfileAccountPage;
