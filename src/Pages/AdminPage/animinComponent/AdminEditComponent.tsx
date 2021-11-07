import { Checkbox, Input, RadioChangeEvent, Row, Col } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import ImgUploadDiv from "../../../components/conponentDivs/ImgUploadDiv";
import { AdminAnimeCreateDiv } from "../../../cssJs/AdminPage/adminAdminCreateCss";
import {
  AdminAnimeInput,
  AnimeCreateSubmitButton,
  UploadImageButton,
  UploadImageDiv,
  WhereWatchDiv,
  WhereWatchImg,
} from "../../../cssJs/AdminPage/adminAdminCss";
import { ImageBody } from "../../../types/BasicType";
import crunchyroll from "../../../files/crunchyroll.png";
import hulu from "../../../files/hulu.jpg";
import mal from "../../../files/mal.png";
import tubi from "../../../files/tubi.png";
import AnimeButton from "../../../components/Button";
import { Anime } from "../../../types/Amine";
import { animeUpdate } from "../../../api/animeAPI";
import LoadingDiv from "../../../components/LoadingDiv";
import { CheckboxValueType } from "antd/lib/checkbox/Group";

const CheckboxGroup = Checkbox.Group;

interface IProps {
  anime: Anime;
}

const AdminEditComponent = ({ anime }: IProps): JSX.Element => {
  const [title, setTitle] = useState<string>(anime.title);
  const [aired, setAired] = useState<string>(anime.aired);
  const [producers, setProducers] = useState<string>(anime.producers);
  const [rating, setRating] = useState<string>(anime.rating);
  const [uploadImg, setLoadImg] = useState<string>(anime.headImage);
  const [whereWatchList, setWhereWatchList] = useState<string[]>(
    anime.whereToWatch
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //
    console.log("s");
  }, [loading]);

  const onChange = (e: React.ChangeEvent<Element> | RadioChangeEvent): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "title":
        setTitle((e.target as HTMLInputElement).value);
        break;
      case "aired":
        setAired((e.target as HTMLInputElement).value);
        break;
      case "producers":
        setProducers((e.target as HTMLInputElement).value);
        break;
      case "rating":
        setRating((e.target as HTMLInputElement).value);
        break;
    }
  };

  const onMultipleChange = (checkedValue: CheckboxValueType[]): void =>
    setWhereWatchList(checkedValue as string[]);

  const setImg = (value: ImageBody) => setLoadImg(value.imgBase64);

  const submit = async () => {
    const updateAnime: Anime = {
      _id: anime._id,
      title: title,
      aired: aired,
      producers: producers,
      rating: rating,
      whereToWatch: whereWatchList,
      headImage: uploadImg,
      likes: anime.likes,
    };
    setLoading(true);
    const r = await animeUpdate(updateAnime);
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
          <UploadImageDiv>
            <p>Head Image</p>
            <img src={`${uploadImg}`} />
          </UploadImageDiv>
          <UploadImageButton>
            <ImgUploadDiv setImg={setImg} />
          </UploadImageButton>
          <AdminAnimeInput>
            <p>Aired:</p>
            <Input
              placeholder={"aired"}
              value={aired}
              onChange={onChange}
            ></Input>
          </AdminAnimeInput>
          <AdminAnimeInput>
            <p>Producers:</p>
            <Input
              placeholder={"producers"}
              value={producers}
              onChange={onChange}
            ></Input>
          </AdminAnimeInput>
          <AdminAnimeInput>
            <p>Rating:</p>
            <Input
              placeholder={"rating"}
              value={rating}
              onChange={onChange}
            ></Input>
          </AdminAnimeInput>
          <WhereWatchDiv>
            <p>Where to Watch:</p>
            <CheckboxGroup
              onChange={onMultipleChange}
              value={whereWatchList}
              style={{ display: "flex", marginLeft: "130px", width: "450px" }}
            >
              <Row>
                <Col style={{ marginRight: "42px", width: "82px" }}>
                  <Checkbox value={"mal"}>
                    <WhereWatchImg src={mal} />
                  </Checkbox>
                </Col>
                <Col style={{ marginRight: "42px", width: "82px" }}>
                  <Checkbox value={"tubi"}>
                    <WhereWatchImg src={tubi} />
                  </Checkbox>
                </Col>
                <Col style={{ marginRight: "42px", width: "82px" }}>
                  <Checkbox value={"crunchyroll"}>
                    <WhereWatchImg src={crunchyroll} />
                  </Checkbox>
                </Col>
                <Checkbox value={"hulu"} style={{ marginTop: "32px" }}>
                  <WhereWatchImg src={hulu} />
                </Checkbox>
              </Row>
            </CheckboxGroup>
          </WhereWatchDiv>
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

export default AdminEditComponent;
