import { Checkbox, Input, RadioChangeEvent, Row, Col } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
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
import crunchyroll from "../../../files/cunp.png";
import Funimation from "../../../files/Funimation.png";
import mal from "../../../files/mal.png";
import tubi from "../../../files/Tubi.png";
import hidive from "../../../files/Hidive.png";
import VIZ from "../../../files/VIZ.png";
import AnimePlant from "../../../files/AnimePlant.png";
import AnimeButton from "../../../components/Button";
import { Anime } from "../../../types/Amine";
import { animeAdd } from "../../../api/animeAPI";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { useDispatch } from "react-redux";
import { LoadingType } from "../../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import ImageUpload from "../../../components/ImageUpload";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../../helperFns/popUpAlert";
import AlertBox, { ColorType } from "../../../components/AlertBox";

const CheckboxGroup = Checkbox.Group;

interface IProps {
  editAnime: (anime: Anime) => void;
}

const AdminCreatComponent = ({ editAnime }: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [airedStart, setAiredStart] = useState<string>("");
  const [airedEnd, setAiredEnd] = useState<string>("");
  const [producers, setProducers] = useState<string>("");
  const [rating, setRating] = useState<string>("");
  const [uploadImg, setLoadImg] = useState<string>("");
  const [whereWatchList, setWhereWatchList] = useState([""]);
  const [errorText, setErrorText] = useState<string>("");
  const [ifLoadingAlert, setLoadingAlert] = useState<boolean>(false);

  useEffect(() => {
    //
  }, [uploadImg]);

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
    const anime: Anime = {
      _id: title,
      title: title,
      aired: `${airedStart} - ${airedEnd}`,
      producers: producers,
      rating: rating,
      whereToWatch: whereWatchList,
      headImage: uploadImg,
      likes: 0,
      rate: {
        ratePeople: 0,
        totalRate: 0,
      },
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
    const r = await animeAdd(anime);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    if (r == 200) {
      openNotification(
        "create anime success",
        NotificationColor.Success,
        NotificationTitle.Success
      );
      editAnime(anime);
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
        <Input placeholder={"title"} onChange={onChange}></Input>
      </AdminAnimeInput>
      <UploadImageDiv>
        <h6>Head Image</h6>
        <div>
          <img src={`${uploadImg}`}></img>
          <p>280x280</p>
        </div>
      </UploadImageDiv>
      <UploadImageButton>
        <ImageUpload
          width={"120px"}
          height={"32px"}
          textColor={"black"}
          backGroundColor={"white"}
          border={"1px solid #D1D2D3"}
          text={"Upload"}
          setImg={(value: ImageBody) => setImg(value)}
        />
      </UploadImageButton>
      <AdminAiredInput>
        <h6>Aired:</h6>
        <Input placeholder={"Aired Start"} onChange={onChange}></Input>
        <p>-</p>
        <Input placeholder={"Aired End"} onChange={onChange}></Input>
      </AdminAiredInput>
      <AdminAnimeInput>
        <p>Producers:</p>
        <Input placeholder={"producers"} onChange={onChange}></Input>
      </AdminAnimeInput>
      <AdminAnimeInput>
        <p>Rating:</p>
        <Input placeholder={"rating"} onChange={onChange}></Input>
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
            <Col style={{ marginRight: "42px", width: "82px" }}>
              <Checkbox value={"AnimePlant"} style={{ marginTop: "32px" }}>
                <WhereWatchImg src={AnimePlant} />
              </Checkbox>
            </Col>
          </Row>
        </CheckboxGroup>
      </WhereWatchDiv>
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

  return <AdminAnimeCreateDiv>{getResultFn()}</AdminAnimeCreateDiv>;
};

export default AdminCreatComponent;
