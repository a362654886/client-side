import { Button, Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AnimeButton from "../../../components/Button";
import { SearchDiv } from "../../../cssJs/AdminPage/animeSearchCss";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { LoadingType } from "../../../types/EnumTypes";
import { AdminContentPageDiv } from "../../../cssJs/AdminPage/adminCss";
import AdminDataHeader from "./AdminDataHeader";
import { userBlockGet, userUpdateBlock } from "../../../api/userApi";
import { User } from "../../../types/User";
import {
  AdminBlockAllBlock,
  AdminBlockChildEle,
  AdminBlockEle,
  AdminBlockEleId,
  AdminBlockEleReason,
  AdminBlockTime,
} from "../../../cssJs/AdminPage/adminManagementCss";
import { _getDate } from "../../../helperFns/timeFn";
import { CenterDiv } from "../../../cssJs/AnimePage/AnimeShowCss";
import { cloneDeep } from "lodash";

const BlockSearch = (): JSX.Element => {
  const dispatch = useDispatch();

  const [searchValue, setSearchValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    (async function anyNameFunction() {
      await search();
    })();
  }, [page]);

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "searchValue":
        setSearchValue((e.target as HTMLInputElement).value);
        break;
    }
  };

  const search = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const result = await userBlockGet(page, searchValue);
    setAllUsers(result.result);
    setCount(result.count);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const unBlock = async (user: User) => {
    console.log(user);
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    await userUpdateBlock(user._id, !user.block, "");
    const _allUsers = cloneDeep(allUsers);
    const index = _allUsers.findIndex((item) => item._id == user._id);
    user.block = !user.block;
    _allUsers[index] = user;
    setAllUsers(_allUsers);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  return (
    <AdminContentPageDiv>
      <AdminDataHeader buttonString={"Blocked"} />
      <SearchDiv>
        <Input placeholder={"searchValue"} onChange={onChange}></Input>
        <AnimeButton
          para=""
          text="Search"
          width="120px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="white"
          buttonClick={() => search()}
        />
      </SearchDiv>
      <AdminBlockAllBlock>All Blocked</AdminBlockAllBlock>
      {allUsers.map((user, index) => {
        return (
          <AdminBlockEle key={index}>
            <AdminBlockEleId>
              <p>{`(ID: ${user._id})`}</p>
            </AdminBlockEleId>
            <AdminBlockChildEle>
              <img
                src={`https://animeimagebucket.s3.amazonaws.com/${user.avatar}`}
              />
              <h6>{user.showName}</h6>
              <Button onClick={() => unBlock(user)}>
                {user.block ? `UnBlock` : `Block`}
              </Button>
            </AdminBlockChildEle>
          </AdminBlockEle>
        );
      })}
      <CenterDiv>
        {allUsers.length < count ? (
          <AnimeButton
            para=""
            text="View more"
            width="120px"
            height="32px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="white"
            buttonClick={() => setPage(page + 1)}
          />
        ) : (
          <></>
        )}
      </CenterDiv>
    </AdminContentPageDiv>
  );
};

export default BlockSearch;
