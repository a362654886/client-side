import { Checkbox, Input, RadioChangeEvent, Row, Col } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import ImgUploadDiv from "../../../components/conponentDivs/ImgUploadDiv";
import { AdminAnimeCreateDiv } from "../../../cssJs/AdminPage/adminAdminCreateCss";
import {
  AdminAiredInput,
  AdminAnimeInput,
  AnimeCreateSubmitButton,
  UploadImageButton,
  UploadImageDiv,
  WhereWatchDiv,
  WhereWatchImg,
} from "../../../cssJs/AdminPage/adminAdminCss";
import { ImageBody } from "../../../types/BasicType";
import crunchyroll from "../../../files/Star-border.png";
import Funimation from "../../../files/Star-border.png";
import mal from "../../../files/Star-border.png";
import tubi from "../../../files/Star-border.png";
import hidive from "../../../files/Star-border.png";
import VIZ from "../../../files/Star-border.png";
import AnimeButton from "../../../components/Button";
import { animeUpdate } from "../../../api/animeAPI";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useDispatch } from "react-redux";
import { LoadingType } from "../../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { Anime } from "../../../types/Amine";
import { openNotification } from "../../../helperFns/popUpAlert";
import AlertBox, { ColorType } from "../../../components/AlertBox";

const CheckboxGroup = Checkbox.Group;

interface IProps {
  anime: Anime;
}

const AdminEditComponent = ({ anime }: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>(anime.title);
  const [airedStart, setAiredStart] = useState<string>(
    anime.aired.split("-")[0]
  );
  const [airedEnd, setAiredEnd] = useState<string>(anime.aired.split("-")[1]);
  const [producers, setProducers] = useState<string>(anime.producers);
  const [rating, setRating] = useState<string>(anime.rating);
  const [uploadImg, setLoadImg] = useState<string>(anime.headImage);
  const [errorText, setErrorText] = useState<string>("");
  const [ifLoadingAlert, setLoadingAlert] = useState<boolean>(false);
  const [whereWatchList, setWhereWatchList] = useState<string[]>(
    anime.whereToWatch
  );

  const onChange = (e: React.ChangeEvent<Element> | RadioChangeEvent): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "title":
        setTitle((e.target as HTMLInputElement).value);
        break;
      case "Aired Start":
        setAiredStart((e.target as HTMLInputElement).value);
        break;
      case "Aired End":
        setAiredEnd((e.target as HTMLInputElement).value);
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
      aired: `${airedStart} - ${airedEnd}`,
      producers: producers,
      rating: rating,
      whereToWatch: whereWatchList,
      headImage: uploadImg,
      likes: anime.likes,
    };
    if (title.trim() == "" || uploadImg == "") {
      setErrorText("the header and head image shouldn't be empty");
      setLoadingAlert(true);
      return;
    }
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const r = await animeUpdate(updateAnime);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (r == 200) {
      openNotification("success", "update anime success");
    }
  };

  const getResultFn = () => (
    <>
      <AlertBox
        text={errorText}
        color={ColorType.ERROR}
        show={ifLoadingAlert}
      />
      <AdminAnimeInput>
        <p>Title:</p>
        <Input placeholder={"title"} value={title} onChange={onChange}></Input>
      </AdminAnimeInput>
      <UploadImageDiv>
        <p>Head Image</p>
        <img src={`${uploadImg}`} />
      </UploadImageDiv>
      <UploadImageButton>
        <ImgUploadDiv setImg={setImg} />
      </UploadImageButton>
      <AdminAiredInput>
        <h6>Aired:</h6>
        <Input
          placeholder={"Aired Start"}
          value={airedStart}
          onChange={onChange}
        ></Input>
        <p>-</p>
        <Input
          placeholder={"Aired End"}
          value={airedEnd}
          onChange={onChange}
        ></Input>
      </AdminAiredInput>
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
            <Col style={{ marginRight: "42px", width: "82px" }}>
              <Checkbox value={"Funimation"} style={{ marginTop: "32px" }}>
                <WhereWatchImg src={Funimation} />
              </Checkbox>
            </Col>
            <Col style={{ marginRight: "42px", width: "82px" }}>
              <Checkbox value={"hidive"} style={{ marginTop: "32px" }}>
                <WhereWatchImg src={hidive} />
              </Checkbox>
            </Col>
            <Col style={{ marginRight: "42px", width: "82px" }}>
              <Checkbox value={"VIZ"} style={{ marginTop: "32px" }}>
                <WhereWatchImg src={VIZ} />
              </Checkbox>
            </Col>
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

  return <AdminAnimeCreateDiv>{getResultFn()}</AdminAnimeCreateDiv>;
};

export default AdminEditComponent;
