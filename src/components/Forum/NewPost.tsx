import { Button } from "antd";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import { useHistory, useParams } from "react-router-dom";
import { AllPlates, NewPostBody } from "../../cssJs/forumCss";
import { Post } from "../../types/PostType";
import "react-quill/dist/quill.snow.css";
import { getModel } from "../../helperFns/quillModel";
import InputBox, { Label } from "../InputBox";
import { BooleanType, InputBoxType } from "../../types/EnumTypes";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { IStoreState } from "../../types/IStoreState";
import { User } from "../../types/User";
import { postAdd } from "../../api/postAPI";
import { SelectValue } from "antd/lib/select";
import { Loading, TitleWithLine } from "../../cssJs/publicCss";

interface Para {
  post: string;
}

const InputText = styled(ReactQuill)`
  margin: 1rem;
  margin-right: 0;
  height: 300px;
`;
const SubmitButton = styled(Button)`
  margin-top: 70px;
  margin-right: 1rem;
  background-color: #ee6fa9;
  color: white;
  float: right;
`;

const NewPost = (): JSX.Element => {
  const para: Para = useParams();
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const administerState: BooleanType = useSelector(
    (state: IStoreState) => state.administerState
  );

  useEffect(() => {
    setTopSelect();
  }, [para]);

  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [top, setTop] = useState(false);
  const [topShow, setDivShow] = useState("none");
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    setLoading(true);
    const postBody = getPostBody();
    //if login
    if (postBody) {
      const result = await postAdd(postBody);
      if (result == 200) {
        history.replace({
          pathname: `/mainPage/forumMain/forum/${para.post}`,
        });
      }
    }
    setLoading(false);
  };

  const setTopSelect = () =>
    administerState == BooleanType.SUCCESS
      ? setDivShow("block")
      : setDivShow("none");

  const getPostBody = (): Post | null => {
    const time: Date = new Date();
    return {
      _id: para.post + time.getTime(),
      postId: para.post + time.getTime(),
      postTitle: title,
      context: context,
      userEmail: (loginUser as User).userEmail as string,
      labelId: `label${para.post}`,
      time: time,
      top: top,
      likeNum: 0,
    };
  };

  const onChange = (e: React.ChangeEvent<Element>): void =>
    setTitle((e.target as HTMLInputElement).value);

  const onSelectChange = (e: SelectValue): void => {
    switch (e?.toString()) {
      case "general":
        setTop(false);
        break;
      case "top":
        setTop(true);
        break;
    }
  };

  const getBody = () => {
    if (!loading) {
      return (
        <>
          <NewPostBody>
            <InputBox
              ifShow={topShow}
              Title="Top up"
              onSelectChange={onSelectChange}
              type={InputBoxType.SELECT}
              options={["top", "general"]}
            />
            <InputBox
              Title="Title"
              onChange={onChange}
              type={InputBoxType.INPUT}
              value={title}
            />
            <Label>Context</Label>
            <InputText
              theme="snow"
              value={context}
              modules={getModel()}
              onChange={setContext}
            />
          </NewPostBody>
          <SubmitButton onClick={submit}>Submit</SubmitButton>
        </>
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <AllPlates>
      <TitleWithLine>
        <h5>{para.post}</h5>
      </TitleWithLine>
      {getBody()}
    </AllPlates>
  );
};

export default NewPost;
