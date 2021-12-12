import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdate } from "../../../api/userApi";
import AnimeButton from "../../../components/Button";
import LoadingDiv from "../../../components/LoadingDiv";
import {
  PasswordInput,
  ProfileAccountDiv,
} from "../../../cssJs/ProfilePage/ProfileAccountCss";
import {
  ContactEmailInput,
  ContactLocationInput,
  ContactSubmitButtonDiv,
  ContactTelInput,
  LogoInput,
  SocialDiv,
} from "../../../cssJs/ProfilePage/ProfileContactCss";
import { LOGIN_USER_ADD } from "../../../redux/loginUser";
import { IStoreState } from "../../../types/IStoreState";
import { Gender, User } from "../../../types/User";
import facebookPng from "./../../../files/facebook.png";
import insPng from "./../../../files/ins.png";

const ProfileContactPage = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const dispatch = useDispatch();

  const [email, setUserEmail] = useState<string>("");
  const [tel, setTel] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [facebook, setFacebook] = useState<string>("");
  const [ins, setIns] = useState<string>("");
  const [ifLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (loginUser) {
      setUserEmail(loginUser.userEmail ? loginUser.userEmail : "");
      setTel(loginUser.tel ? loginUser.tel : "tel");
      setLocation(loginUser.location ? loginUser.location : "");
      setFacebook(loginUser.facebook ? loginUser.facebook : "facebook");
      setIns(loginUser ? loginUser.ins : "ins");
    }
  }, [loginUser]);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case email:
        setUserEmail((e.target as HTMLInputElement).value);
        break;
      case tel:
        setTel((e.target as HTMLInputElement).value);
        break;
      case location:
        setLocation((e.target as HTMLInputElement).value);
        break;
      case facebook:
        setFacebook((e.target as HTMLInputElement).value);
        break;
      case ins:
        setIns((e.target as HTMLInputElement).value);
        break;
    }
  };

  const updateUser = async () => {
    const readyUpdateUser: User = {
      _id: email,
      userEmail: email,
      password: loginUser ? loginUser.password : "",
      name: loginUser ? loginUser.name : "",
      gender: loginUser ? loginUser.gender : Gender.male,
      birthday: loginUser ? loginUser.birthday : new Date(),
      location: location,
      facebook: facebook,
      ins: ins,
      tel: tel,
      avatar: loginUser ? loginUser.avatar : "",
      rate: loginUser ? loginUser.rate : [],
      likeAnime: loginUser?.likeAnime ? loginUser?.likeAnime : [],
      avatarImage: loginUser ? loginUser.avatarImage : [],
      likeShowcase: loginUser?.likeShowcase ? loginUser?.likeShowcase : [],
      followManga: loginUser?.followManga ? loginUser?.followManga : [],
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
          <ContactEmailInput>
            <p>Email:</p>
            <Input placeholder={email} onChange={onChange}></Input>
          </ContactEmailInput>
          <ContactTelInput>
            <p>Tel:</p>
            <Input placeholder={tel} onChange={onChange}></Input>
          </ContactTelInput>
          <ContactLocationInput>
            <p>Location:</p>
            <Input placeholder={location} onChange={onChange}></Input>
          </ContactLocationInput>
          <SocialDiv>
            <p>Social Pages</p>
            <LogoInput>
              <PasswordInput>
                <img src={facebookPng} />
                <Input placeholder={facebook} onChange={onChange}></Input>
              </PasswordInput>
              <PasswordInput>
                <img src={insPng} />
                <Input placeholder={ins} onChange={onChange}></Input>
              </PasswordInput>
            </LogoInput>
          </SocialDiv>
          <ContactSubmitButtonDiv>
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
          </ContactSubmitButtonDiv>
        </>
      );
    }
  };

  return <ProfileAccountDiv>{getResult()}</ProfileAccountDiv>;
};

export default ProfileContactPage;
