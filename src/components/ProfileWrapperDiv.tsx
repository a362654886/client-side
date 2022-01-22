import * as React from "react";
import { ReactElement } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userGet } from "../api/userApi";
import { ProfileWrapper } from "../cssJs/basicCss";
import { LOADING_CLOSE, LOADING_OPEN } from "../redux/loading";
import { PROFILE_USER_UPDATE } from "../redux/profileUser";
import { LoadingType } from "../types/EnumTypes";
interface IProps {
  userId: string;
  element: ReactElement;
}

const ProfileWrapperDiv = ({ userId, element }: IProps): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const getUserById = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const profileUser = await userGet(userId);
    dispatch({
      payload: profileUser,
      type: PROFILE_USER_UPDATE,
    });
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    history.replace({
      pathname: "/mainPage/profilePage",
    });
  };

  return (
    <ProfileWrapper
      style={{}}
      onClick={() => {
        getUserById();
      }}
    >
      <>{element}</>
    </ProfileWrapper>
  );
};

export default ProfileWrapperDiv;
