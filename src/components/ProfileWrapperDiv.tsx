import * as React from "react";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { ProfileWrapper } from "../cssJs/basicCss";
interface IProps {
  userId: string;
  element: ReactElement;
  loginUser?: boolean;
}

const ProfileWrapperDiv = ({
  userId,
  element,
  loginUser,
}: IProps): JSX.Element => {
  const history = useHistory();

  return (
    <ProfileWrapper
      style={{}}
      onClick={() => {
        history.push({
          pathname: loginUser
            ? `/profileLoginUser/${userId}`
            : `/profilePage/${userId}`,
        });
      }}
    >
      <>{element}</>
    </ProfileWrapper>
  );
};

export default ProfileWrapperDiv;
