import { Button } from "antd";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { RecommendPost, TimeText } from "../../cssJs/publicCss";
import { getDate } from "../../helperFns/timeFn";
import { MERCHANDISE_ADD } from "../../redux/merchandises";
import { POST_ADD } from "../../redux/posts";
import { Merchandise } from "../../types/MerchandiseType";
import { Post } from "../../types/PostType";

const PostButton = styled(Button)`
  height: 32px;
  width: 50%;
  padding: 0 5px 0 5px;
  background-color: ${(props) => props.color};
  border-radius: ${(props) => props.property};
  p {
    color: white;
    padding-top: 5px;
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
`;

const PostsBody = styled.div`
  width: 100%;
  margin-left: 1rem;
  background: white;
  border-radius: 20px 20px 0px 0px;
`;

interface IProps {
  posts: Post[];
  merchandises: Merchandise[];
}

const RecommendPosts = ({ posts, merchandises }: IProps): JSX.Element => {
  const [showPosts, setShowPosts] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const toPost = (post: Post) => {
    dispatch({
      payload: post,
      type: POST_ADD,
    });
    history.replace({
      pathname: `/mainPage/forumMain/post/0/${post.postTitle}`,
    });
    //console.log(postId);
  };

  const toMerchandise = (merchandise: Merchandise) => {
    dispatch({
      payload: merchandise,
      type: MERCHANDISE_ADD,
    });
    history.replace({
      pathname: `/mainPage/merchandise/merchandisePage/0`,
    });
  };

  const getBody = () => {
    if (showPosts) {
      return posts.map((post, index) => {
        return (
          <RecommendPost color="white" key={index} onClick={() => toPost(post)}>
            <div>
              <p>{post.postTitle}</p>
              <TimeText>{getDate(new Date(post.time))}</TimeText>
            </div>
          </RecommendPost>
        );
      });
    } else {
      return merchandises.map((merchandise, index) => {
        return (
          <RecommendPost
            color="white"
            key={index}
            onClick={() => toMerchandise(merchandise)}
          >
            <div>
              <p>{merchandise.name}</p>
              <TimeText>{getDate(new Date(merchandise.uploadTime))}</TimeText>
            </div>
          </RecommendPost>
        );
      });
    }
  };

  return (
    <PostsBody>
      <Buttons>
        <PostButton
          onClick={() => {
            setShowPosts(!showPosts);
          }}
          color="#ee6fa9"
          property="15px 0 0 15px"
        >
          <p>Hot Posts</p>
        </PostButton>
        <PostButton
          onClick={() => {
            setShowPosts(!showPosts);
          }}
          color="#5c7ef9"
          property="0 15px 15px 0"
        >
          <p>Hot Merchandise</p>
        </PostButton>
      </Buttons>
      {getBody()}
    </PostsBody>
  );
};

export default RecommendPosts;
