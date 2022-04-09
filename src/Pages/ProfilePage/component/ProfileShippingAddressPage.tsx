import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userUpdateShipAddress } from "../../../api/userApi";
import AnimeButton from "../../../components/Button";
import LoadingDiv from "../../../components/LoadingDiv";
import { ProfileAccountDiv } from "../../../cssJs/ProfilePage/ProfileAccountCss";
import {
  ContactLocationInput,
  ContactSubmitButtonDiv,
} from "../../../cssJs/ProfilePage/ProfileContactCss";
import { NotificationButton } from "../../../cssJs/ProfilePage/ProfileSettingCss";
import { LOGIN_USER_ADD } from "../../../redux/loginUser";
import { IStoreState } from "../../../types/IStoreState";
import { User } from "../../../types/User";

const ProfileShippingAddressPage = (): JSX.Element => {
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [suburb, setSuburb] = useState<string>("");
  const [postCode, setPostcode] = useState<string>("");

  const [ifLoading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setAddress(loginUser ? loginUser.shipAddress : "");
    setCity(loginUser ? loginUser.shipCity : "");
    setSuburb(loginUser ? loginUser.shipSuburb : "");
    setPostcode(loginUser ? loginUser.postCode : "");
  }, [loginUser]);

  const updateUser = async () => {
    const readyUpdateUser: User = {
      _id: loginUser ? loginUser._id : "",
      userEmail: loginUser ? loginUser.userEmail : "",
      password: loginUser ? loginUser.password : "",
      firstName: loginUser ? loginUser.firstName : "",
      lastName: loginUser ? loginUser.lastName : "",
      country: loginUser ? loginUser.country : "",
      birthday: loginUser ? loginUser.birthday : new Date(),
      location: loginUser ? loginUser.location : "",
      facebook: loginUser ? loginUser.facebook : "",
      ins: loginUser ? loginUser.ins : "",
      tel: loginUser ? loginUser.tel : "",
      rate: loginUser ? loginUser.rate : [],
      likeAnime: loginUser?.likeAnime ? loginUser?.likeAnime : [],
      avatar: loginUser ? loginUser.avatar : "",
      avatarImage: loginUser ? loginUser.avatarImage : [],
      likeShowcase: loginUser?.likeShowcase ? loginUser?.likeShowcase : [],
      followManga: loginUser?.followManga ? loginUser?.followManga : [],
      followUsers: loginUser?.followUsers ? loginUser?.followUsers : [],
      followMarket: loginUser?.followMarket ? loginUser?.followMarket : [],
      awesomeNum: loginUser?.awesomeNum ? loginUser?.awesomeNum : 0,
      interactionAwesome: loginUser?.awesomeNum
        ? loginUser?.interactionAwesome
        : false,
      interactionComments: loginUser?.awesomeNum
        ? loginUser?.interactionComments
        : false,
      interactionBids: loginUser?.awesomeNum
        ? loginUser?.interactionBids
        : false,
      interactionNewFollowers: loginUser?.awesomeNum
        ? loginUser?.interactionNewFollowers
        : false,
      interactionMessages: loginUser?.awesomeNum
        ? loginUser?.interactionMessages
        : false,
      interactionFirstAnimeNews: loginUser?.awesomeNum
        ? loginUser?.interactionFirstAnimeNews
        : false,
      shipAddress: address,
      shipCity: city,
      shipSuburb: suburb,
      postCode: postCode,
    };
    setLoading(true);
    const r = await userUpdateShipAddress(readyUpdateUser);
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
          <ContactLocationInput>
            <p>Address:</p>
            <Input
              placeholder={address}
              onChange={(e) => setAddress(e.target.value)}
            ></Input>
          </ContactLocationInput>
          <ContactLocationInput>
            <p>City:</p>
            <Input
              placeholder={city}
              onChange={(e) => setCity(e.target.value)}
            ></Input>
          </ContactLocationInput>
          <ContactLocationInput>
            <p>Suburb:</p>
            <Input
              placeholder={suburb}
              onChange={(e) => setSuburb(e.target.value)}
            ></Input>
          </ContactLocationInput>
          <ContactLocationInput>
            <p>Post Code:</p>
            <Input
              placeholder={postCode}
              onChange={(e) => setPostcode(e.target.value)}
            ></Input>
          </ContactLocationInput>
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

export default ProfileShippingAddressPage;
