import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { postDelete, postQuery } from "../../api/postAPI";
import { Loading } from "../../cssJs/publicCss";
import {
  AllPost,
  ButtonDelete,
  OnePost,
  PostManagementAttribute,
  PostManagementSubTitle,
} from "../../cssJs/userManagementCss";
import { getTimeDifference } from "../../helperFns/timeFn";
import { IStoreState } from "../../types/IStoreState";
import { Post } from "../../types/PostType";
import { User } from "../../types/User";
import { PaginationDiv } from "../conponentDivs/Pagination";

const pageSize = 8;

const UserPostManagement = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [count, setCount] = useState(0);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [num, serRefresh] = useState(0);

  useEffect(() => {
    (async function anyNameFunction() {
      await getPosts();
    })();
  }, [num]);

  const deletePost = async (postId: string) => {
    setLoading(true);
    await postDelete(postId);
    refresh();
    setLoading(false);
  };

  const refresh = () => {
    const n = num + 1;
    serRefresh(n);
  };

  const getPosts = async () => {
    setLoading(true);
    const postResult = await postQuery(
      "",
      1,
      10,
      "response",
      loginUser?.userEmail as string,
      "userPost"
    );
    setAllPosts(postResult.posts);
    setCount(postResult.count);
    setLoading(false);
  };

  const getBody = () => {
    if (!loading) {
      return (
        <>
          {allPosts.map((post, index) => {
            return (
              <OnePost key={index}>
                <h5>{post.postTitle}</h5>
                <PostManagementAttribute>
                  <PostManagementSubTitle>
                    {`posted by `}
                    <a>{post.userEmail}</a>
                    {`, ${getTimeDifference(post.time)} ago`}
                  </PostManagementSubTitle>
                </PostManagementAttribute>
                <p>{post.context.replace(/<[^>]+>/g, "")}</p>
                <ButtonDelete onClick={() => deletePost(post._id)}>
                  Delete
                </ButtonDelete>
              </OnePost>
            );
          })}
        </>
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <AllPost>
      {getBody()}
      <PaginationDiv pageSize={pageSize} propFn={getPosts} count={count} />
    </AllPost>
  );
};

export default UserPostManagement;
