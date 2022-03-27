import * as React from "react";
import { ReactElement } from "react";
import { useHistory } from "react-router-dom";
import { ProfileWrapper } from "../cssJs/basicCss";
interface IProps {
  userId: string;
  element: ReactElement;
}

const ProfileWrapperDiv = ({ userId, element }: IProps): JSX.Element => {
  const history = useHistory();

  return (
    <ProfileWrapper
      style={{}}
      onClick={() => {
        history.push({
          pathname: `/mainPage/profilePage/${userId}`,
        });
      }}
    >
      <>{element}</>
    </ProfileWrapper>
  );
};

export default ProfileWrapperDiv;
