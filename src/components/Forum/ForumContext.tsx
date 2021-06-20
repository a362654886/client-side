import { Button} from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { postsGet } from "../../api/postAPI";
import {
  AllPlates,
  AllPostDiv,
  PostPlateTitle,
  PostTableBody,
  PostTableItem,
  PostTableTitle,
  PostTableTitleButton,
  PostTableTitleText,
} from "../../cssJs/forumCss";
import { Loading, TitleWithLine } from "../../cssJs/publicCss";
import { showAlert } from "../../helperFns/showFn";
import { getDate } from "../../helperFns/timeFn";
import { POSTS_INI } from "../../redux/posts";
import { BooleanType } from "../../types/EnumTypes";
import { IStoreState } from "../../types/IStoreState";
import { Post, PostReturnBody } from "../../types/PostType";
import { User } from "../../types/User";
import { GetAlertDiv } from "../conponentDivs/GetAlertDiv";
import { PaginationDiv } from "../conponentDivs/Pagination";

const NewPostButton = styled(Button)`
  position: absolute;
  right: 5px;
  background-color: #ee6fa9;
  color:white;
  border-radius: 20px;
`;

interface Para {
  name: string;
}

const pageSize = 15;

const ForumContext = (): JSX.Element => {
  const para: Para = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const postsState: Post[] = useSelector(
    (state: IStoreState) => state.postsState
  );

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  /*const administer: BooleanType = useSelector(
    (state: IStoreState) => state.administerState
  );*/

  const [count, setCount] = useState(0);
  const [loadding, setLoading] = useState(true);
  const [sort, setSort] = useState("time");
  const [page, setPage] = useState(1);
  const [show, setShow] = useState("none");

  useEffect(() => {
    (async function anyNameFunction() {
      await getPosts(1, "time");
    })();
  }, [para]);

  useEffect(() => {
    //console.log("Sss");
  }, [postsState]);

  const toForum = (url: string) => {
    if (!loginUser?.userEmail) {
      showAlert(setShow);
    } else {
      history.replace({
        pathname: url,
      });
    }
  };

  const sortBy = async (value: string) => await getPosts(page, value);

  const getPosts = async (page: number, sortBy?: string) => {
    setLoading(true);
    setPage(page);
    let sortString = "";
    if (sortBy) {
      setSort(sortBy);
      sortString = sortBy;
    } else {
      sortString = sort;
    }
    const result: PostReturnBody = await postsGet(
      `label${para.name}`,
      page,
      pageSize,
      sortString,
      loginUser ? loginUser.userEmail : "",
      "all"
    );
    if (result) {
      setCount(result.count);
      dispatch({
        payload: result.posts,
        type: POSTS_INI,
      });
    }
    setLoading(false);
  };

  const getAllPosts = (topUp: boolean, marginBottom: string, color: string) => {
    if (loadding) {
      return <Loading />;
    } else {
      return (
        <PostTableBody style={{ marginBottom: marginBottom }}>
          {postsState.map((post, index) => {
            if (post.top == topUp) {
              return (
                <PostTableItem
                  key={post._id}
                  color={color}
                  onClick={() =>
                    toForum(`/mainPage/forumMain/post/${index}/${para.name}`)
                  }
                >
                  <div style={{ width: "50%" }}>{post.postTitle}</div>
                  <div style={{ width: "16.6%" }}>
                    {post.messages}/{post.likeNum}
                  </div>
                  <div style={{ width: "16.6%" }}>{post.userEmail}</div>
                  <div style={{ width: "16.6%" }}>
                    {getDate(new Date(post.time))}
                  </div>
                </PostTableItem>
              );
            }
          })}
        </PostTableBody>
      );
    }
  };

  return (
    <AllPlates>
      <TitleWithLine>
        <h5>{para.name}</h5>
        <NewPostButton
          onClick={() => toForum(`/mainPage/forumMain/newPost/${para.name}`)}
        >
          New Post
        </NewPostButton>
      </TitleWithLine>
      <GetAlertDiv
        alert={{
          type: BooleanType.FAIL,
          context: "you can't add without login",
        }}
        show={show}
      />
      <AllPostDiv>
        <PostTableTitle>
          <PostTableTitleText style={{ width: "50%" }}>
            <p>Title</p>
            <PostTableTitleButton onClick={() => sortBy("time")}>New</PostTableTitleButton>
            <PostTableTitleButton onClick={() => sortBy("response")}>Hot</PostTableTitleButton>
          </PostTableTitleText>
          <PostTableTitleText style={{ width: "16.6%" }}>
            Responses/like
          </PostTableTitleText>
          <PostTableTitleText style={{ width: "16.6%" }}>
            Publisher
          </PostTableTitleText>
          <PostTableTitleText style={{ width: "16.6%" }}>
            Time
          </PostTableTitleText>
        </PostTableTitle>
        <PostPlateTitle>
          <PostTableTitleText>Top Up</PostTableTitleText>
        </PostPlateTitle>
        {getAllPosts(true, "20px","blue")}
        <PostPlateTitle>
          <PostTableTitleText>Post</PostTableTitleText>
        </PostPlateTitle>
        {getAllPosts(false, "50px","block")}
        <PaginationDiv pageSize={pageSize} propFn={getPosts} count={count} />
      </AllPostDiv>
    </AllPlates>
  );
};

export default ForumContext;
