import {
  Checkbox,
  Input,
  RadioChangeEvent,
  Row,
  Col,
  DatePicker,
  Button,
  Modal,
} from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { AdminAnimeCreateDiv } from "../../../cssJs/AdminPage/adminAdminCreateCss";
import {
  AdminAiredInput,
  AdminAnimeInput,
  AnimeAddNewSource,
  AnimeAddNewSourceInput,
  AnimeAddNewSourceModalDiv,
  AnimeCreateSubmitButton,
  UploadImageButton,
  UploadImageDiv,
  WhereWatchDiv,
  WhereWatchImg,
} from "../../../cssJs/AdminPage/adminAdminCss";
import { ImageBody } from "../../../types/BasicType";
import AnimeButton from "../../../components/Button";
import { Anime, AnimeSource } from "../../../types/Amine";
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
import moment from "moment";
import { animeSourceAdd, animeSourcesGet } from "../../../api/animeSourceAPI";
import CropImgBodyDiv from "./CropImgBodyDiv";
import Add from "../../../files/Add.svg";
import IconUpload from "./ImageUpload";
import { cloneDeep } from "lodash";

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
  const [uploadImg, setLoadImg] = useState<ImageBody>({
    width: 0,
    height: 0,
    imgBase64: "",
    imgName: "",
  });
  const [animeImg, setAnimeImg] = useState<string>("");
  const [whereWatchList, setWhereWatchList] = useState([""]);
  const [errorText, setErrorText] = useState<string>("");
  const [ifLoadingAlert, setLoadingAlert] = useState<boolean>(false);
  const [showCropper, setShowCropper] = useState<boolean>(false);

  //all where to watch
  const [whereToWatches, setWhereToWatches] = useState<AnimeSource[]>([]);

  //where to watch
  const [whereToWatchShow, setWhereToWatchShow] = useState<boolean>(false);
  const [whereToWatchUploadImg, setWhereToWatchUploadImg] =
    useState<string>("");
  const [whereToWatchName, setWhereToWatchName] = useState<string>("");
  const [whereToWatchLink, setWhereToWatchLink] = useState<string>("");

  useEffect(() => {
    (async function anyNameFunction() {
      const allSources = await animeSourcesGet();
      setWhereToWatches(allSources);
    })();
  }, []);

  useEffect(() => {
    //
  }, [uploadImg, whereWatchList]);

  const onChange = (e: React.ChangeEvent<Element> | RadioChangeEvent): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "title":
        setTitle((e.target as HTMLInputElement).value);
        break;
      case "producers":
        setProducers((e.target as HTMLInputElement).value);
        break;
      case "rating":
        setRating((e.target as HTMLInputElement).value);
        break;
    }
  };

  const onMultipleChange = (checkedValue: CheckboxValueType[]): void => {
    setWhereWatchList(checkedValue as string[]);
  };

  const replaceNewImage = (imageBody: ImageBody) => {
    setAnimeImg(imageBody.imgBase64);
  };

  const submit = async () => {
    const anime: Anime = {
      _id: new Date().valueOf().toString(),
      title: title,
      aired: `${airedStart} - ${airedEnd}`,
      producers: producers,
      rating: rating,
      whereToWatch: whereWatchList,
      headImage: animeImg,
      likes: 0,
      rate: {
        ratePeople: 0,
        totalRate: 0,
      },
    };
    if (title.trim() == "" || animeImg == "") {
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

  const saveWhereToWatch = async () => {
    const whereToWatchBody: AnimeSource = {
      _id: whereToWatchName,
      imageLink: whereToWatchUploadImg,
      sourceName: whereToWatchName,
      link: whereToWatchLink,
    };
    const r = await animeSourceAdd(whereToWatchBody);
    if (r == 200) {
      setWhereToWatchShow(false);
      whereToWatchBody.imageLink = `${whereToWatchBody.sourceName}.png`;
      const newArr = cloneDeep(whereToWatches);
      newArr.push(whereToWatchBody);
      setWhereToWatches(newArr);
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
          <img src={`${animeImg}`}></img>
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
          setImg={(value: ImageBody) => {
            setLoadImg(value);
            setShowCropper(true);
          }}
          margin={"0px"}
        />
      </UploadImageButton>
      <AdminAiredInput>
        <h6>Aired:</h6>
        <DatePicker
          picker="month"
          onChange={(e) => setAiredStart(moment(e).format(`YYYY MM`))}
        />
        <p>-</p>
        <DatePicker
          picker="month"
          onChange={(e) => setAiredEnd(moment(e).format(`YYYY MM`))}
        />
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
            {whereToWatches.map((item, index) => {
              return (
                <Col
                  key={index}
                  style={{
                    marginRight: "42px",
                    marginBottom: "20px",
                    width: "82px",
                  }}
                >
                  <Checkbox value={item.sourceName}>
                    <WhereWatchImg
                      src={`https://animeimagebucket.s3.amazonaws.com/${item.imageLink}`}
                    />
                  </Checkbox>
                </Col>
              );
            })}

            <Col style={{ marginRight: "42px", width: "296px" }}>
              <AnimeAddNewSource
                onClick={() => {
                  setWhereToWatchShow(true);
                }}
              >
                <img src={Add} />
                <p>Add a New Source</p>
              </AnimeAddNewSource>
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
      <Modal
        width={700}
        footer={[]}
        onCancel={() => setWhereToWatchShow(false)}
        maskClosable={false}
        visible={whereToWatchShow}
      >
        <AnimeAddNewSourceModalDiv>
          <img src={whereToWatchUploadImg} />
          <IconUpload
            width={"120px"}
            height={"32px"}
            textColor={"black"}
            backGroundColor={"white"}
            border={"1px solid #D1D2D3"}
            text={"Upload"}
            setImg={(value: ImageBody) =>
              setWhereToWatchUploadImg(value.imgBase64)
            }
            margin={"0px"}
          />
        </AnimeAddNewSourceModalDiv>
        <AnimeAddNewSourceInput>
          <Input
            placeholder="Image Name"
            value={whereToWatchName}
            onChange={(e) => setWhereToWatchName(e.target.value)}
          />
        </AnimeAddNewSourceInput>
        <AnimeAddNewSourceInput>
          <Input
            placeholder="Link"
            value={whereToWatchLink}
            onChange={(e) => setWhereToWatchLink(e.target.value)}
          />
        </AnimeAddNewSourceInput>
        <Button onClick={() => saveWhereToWatch()}>save</Button>
      </Modal>
      <CropImgBodyDiv
        uploadImg={uploadImg}
        setLoadImg={(imageBody: ImageBody) => {
          replaceNewImage(imageBody);
          setShowCropper(false);
        }}
        visible={showCropper}
        setVisibleFalse={() => setShowCropper(false)}
      />
    </>
  );

  return <AdminAnimeCreateDiv>{getResultFn()}</AdminAnimeCreateDiv>;
};

export default AdminCreatComponent;
