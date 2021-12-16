import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import {
  ShowcaseSideDiv,
  ShowcaseSideDivHeader,
  ShowcaseSideUser,
} from "../../cssJs/ShowCasePage/showCaseCss";
import { userAwesomeGet } from "../../api/userApi";
import { User } from "../../types/User";
import showcaseImg from "../../files/showCaseAwesomeClick.png";

const ShowcaseSide = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async function anyNameFunction() {
      await searchAwesome();
    })();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const searchAwesome = async () => {
    const showcaseResult = await userAwesomeGet();
    if (showcaseResult) {
      setUsers(showcaseResult);
    }
  };

  return (
    <ShowcaseSideDiv>
      <ShowcaseSideDivHeader>
        <div>
          <img src={showcaseImg} />
          <h2>Awesome Board</h2>
        </div>
        {users.map((user, index) => {
          return (
            <ShowcaseSideUser key={index}>
              <img
                src={`https://animeimagebucket.s3.amazonaws.com/${user.avatar}`}
              />
              <h6>{`${user.firstName}.${user.lastName
                .substring(0, 1)
                .toUpperCase()}`}</h6>
              <p>{user.awesomeNum}</p>
            </ShowcaseSideUser>
          );
        })}
      </ShowcaseSideDivHeader>
    </ShowcaseSideDiv>
  );
};

export default ShowcaseSide;
