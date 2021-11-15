import { Input, RadioChangeEvent } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { AdminAnimeCreateDiv } from "../../../cssJs/AdminPage/adminAdminCreateCss";
import {
  AdminAnimeInput,
  AnimeCreateSubmitButton,
} from "../../../cssJs/AdminPage/adminAdminCss";
import AnimeButton from "../../../components/Button";
import LoadingDiv from "../../../components/LoadingDiv";
import { NewType } from "../../../types/NewsType";
import { newUpdate } from "../../../api/newsAPI";
import { FullTextEditDiv } from "../../../cssJs/AdminPage/adminNewsCss";
import FullTextEditor from "../../../components/FullTextEditor";

interface IProps {
  newBody: NewType;
}

const NewEditComponent = ({ newBody }: IProps): JSX.Element => {
  const [title, setTitle] = useState<string>(newBody.header);
  const [html, setHtml] = useState<string>(newBody.html);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //
  }, [loading]);

  const onChange = (e: React.ChangeEvent<Element> | RadioChangeEvent): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "title":
        setTitle((e.target as HTMLInputElement).value);
        break;
    }
  };

  const submit = async () => {
    const updateNew: NewType = {
      _id: newBody._id,
      header: title,
      html: html,
      time: newBody.time
    };
    setLoading(true);
    await newUpdate(updateNew);
    setLoading(false);
  };

  const getResultFn = () => {
    if (loading) {
      return (
        <div style={{ marginTop: "200px", marginLeft: "200px" }}>
          <LoadingDiv width="200px" height="200px" />
        </div>
      );
    } else {
      return (
        <>
          <AdminAnimeInput>
            <p>Title:</p>
            <Input
              placeholder={"title"}
              value={title}
              onChange={onChange}
            ></Input>
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
              text={"Update"}
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

export default NewEditComponent;
