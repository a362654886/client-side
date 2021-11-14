import { Input, RadioChangeEvent } from "antd";
import * as React from "react";
import { useState } from "react";
import { AdminAnimeCreateDiv } from "../../../cssJs/AdminPage/adminAdminCreateCss";
import {
  AdminAnimeInput,
  AnimeCreateSubmitButton,
} from "../../../cssJs/AdminPage/adminAdminCss";
import AnimeButton from "../../../components/Button";
import { NewType } from "../../../types/NewsType";
import LoadingDiv from "../../../components/LoadingDiv";
import FullTextEditor from "../../../components/FullTextEditor";
import { FullTextEditDiv } from "../../../cssJs/AdminPage/adminNewsCss";
import { newAdd } from "../../../api/newsAPI";

const NewsCreatComponent = (): JSX.Element => {
  const [title, setTitle] = useState<string>("");
  const [html, setHtml] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onChange = (e: React.ChangeEvent<Element> | RadioChangeEvent): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "title":
        setTitle((e.target as HTMLInputElement).value);
        break;
    }
  };

  const submit = async () => {
    setLoading(true);
    const newNew: NewType = {
      _id: title,
      header: title,
      html: html,
      time: new Date()
    };
    await newAdd(newNew);
    setLoading(false);
  };

  const getResultFn = () => {
    if (loading) {
      return (
        <div style={{ marginTop: "200px", marginLeft: "200px" }}>
          <LoadingDiv height="200px" width="200px" />
        </div>
      );
    } else {
      return (
        <>
          <AdminAnimeInput>
            <p>Title:</p>
            <Input placeholder={"title"} onChange={onChange}></Input>
          </AdminAnimeInput>
          <FullTextEditDiv>
            <FullTextEditor
              html={html}
              setFullText={(e) => {
                setHtml(e);
              }}
            />
          </FullTextEditDiv>
          <AnimeCreateSubmitButton>
            <AnimeButton
              para=""
              text={"Create"}
              width="120px"
              height="32px"
              textColor="white"
              backGroundColor="#FFC300"
              borderColor="white"
              buttonClick={() => submit()}
            />
          </AnimeCreateSubmitButton>
        </>
      );
    }
  };

  return <AdminAnimeCreateDiv>{getResultFn()}</AdminAnimeCreateDiv>;
};

export default NewsCreatComponent;
