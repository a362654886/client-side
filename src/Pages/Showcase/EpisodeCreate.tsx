import { Button } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { episodeAdd, episodeGet } from "../../api/episodeAPI";
import AnimeButton, { MiddleDiv } from "../../components/Button";
import ImageUpload, { ImageBody } from "../../components/ImageUpload";
import {
  EpisodeDiv,
  EpisodeImage,
  EpisodeImages,
  EpisodeNumber,
  EpisodeTitle,
} from "../../cssJs/ShowCasePage/EpisodeCss";
import { getWidth } from "../../helperFns/widthFn";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { LoadingType } from "../../types/EnumTypes";
import { EpisodeType } from "../../types/EpisodeType";
import { IStoreState } from "../../types/IStoreState";
import { ShowCaseType } from "../../types/showCaseType";

const EpisodeCreate = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const manga: ShowCaseType | null = useSelector(
    (state: IStoreState) => state.mangaState
  );

  const [episodeNum, setEpisodeNum] = useState(0);
  const [imgArr, setImgArr] = useState<ImageBody[]>([]);

  useEffect(() => {
    (async function anyNameFunction() {
      await getEpisode();
    })();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    //console.log(episodeNum);
  }, [episodeNum]);

  const getEpisode = async () => {
    const episodeResult = await episodeGet(manga ? manga._id : "");
    episodeResult?.count
      ? setEpisodeNum(episodeResult?.count)
      : setEpisodeNum(0);
  };

  const setNewImage = (imageBody: ImageBody) => {
    console.log(imageBody);
    const exist = imgArr
      .map((image) => image.imgName)
      .indexOf(imageBody.imgName);
    if (exist == -1) {
      const newArr = [];
      imgArr.forEach((image) => newArr.push(image));
      newArr.push(imageBody);
      setImgArr(newArr);
    }
  };

  const deleteImg = (index: number) => {
    const newArr: ImageBody[] = [];
    imgArr.forEach((image) => newArr.push(image));
    newArr.splice(index, 1);
    setImgArr(newArr);
  };

  const insertEpisode = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const newEpisode: EpisodeType = {
      _id: `${manga?._id}Episode${episodeNum + 1}`,
      page: episodeNum + 1,
      title: manga?.title ? manga?.title : "",
      mangaType: manga?._id ? manga?._id : "",
      imageArr: imgArr.map((image) => image.imgBase64),
    };
    await episodeAdd(newEpisode);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
    history.push(`/showcase/Manga/${manga?._id}`);
  };

  return (
    <EpisodeDiv>
      <EpisodeTitle>Episode</EpisodeTitle>
      <EpisodeNumber>
        <h6>Episode Number:</h6>
        <p>{episodeNum + 1}</p>
      </EpisodeNumber>
      <EpisodeImages>
        {imgArr.map((image, index) => {
          return (
            <EpisodeImage key={index}>
              <div>
                <img
                  src={image.imgBase64}
                  style={{
                    width: getWidth() > 600 ? "723px" : "100%",
                  }}
                />
              </div>
              <div>
                <Button onClick={() => deleteImg(index)}>Delete</Button>
              </div>
            </EpisodeImage>
          );
        })}
        <div style={{ width: "100%" }}>
          <div style={{ width: "240px", margin: "0px auto" }}>
            <ImageUpload
              width={"240px"}
              height={"240px"}
              textColor={"black"}
              backGroundColor={"#F6F6F6"}
              border={"1px solid #F6F6F6"}
              text={""}
              setImg={(value: ImageBody) => setNewImage(value)}
              imageAdd={false}
              margin={"20px auto"}
            />
          </div>
        </div>
        <div style={{ marginTop: "32px", marginBottom: "32px" }}>
          <AnimeButton
            para=""
            text={"Post"}
            width={"100%"}
            height={"36px"}
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="white"
            buttonClick={() => insertEpisode()}
          />
        </div>
        <MiddleDiv>
          <AnimeButton
            para=""
            text={"Cancel"}
            width="120px"
            height="32px"
            textColor="#302D46"
            backGroundColor="white"
            borderColor="#dbdbdb"
            buttonClick={() => {
              window.history.go(-1);
            }}
          />
        </MiddleDiv>
      </EpisodeImages>
    </EpisodeDiv>
  );
};

export default EpisodeCreate;
