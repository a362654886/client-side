import { Button } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { episodeGetById, episodeUpdate } from "../../api/episodeAPI";
import AnimeButton, { MiddleDiv } from "../../components/Button";
import ImageUpload, { ImageBody } from "../../components/ImageUpload";
import {
  EpisodeDiv,
  EpisodeImage,
  EpisodeImages,
  EpisodeNumber,
  EpisodeTitle,
} from "../../cssJs/ShowCasePage/EpisodeCss";
import { ShowcaseImage } from "../../cssJs/ShowCasePage/showCaseCss";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { LoadingType } from "../../types/EnumTypes";
import { EpisodeType } from "../../types/EpisodeType";
import { IStoreState } from "../../types/IStoreState";
import { ShowCaseType } from "../../types/showCaseType";

const EpisodeEdit = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const manga: ShowCaseType | null = useSelector(
    (state: IStoreState) => state.mangaState
  );

  const [episodeNum, setEpisodeNum] = useState(0);
  const [imgArr, setImgArr] = useState<(string | ImageBody)[]>([]);

  useEffect(() => {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    const id: string = (history.location.state as any).type;
    if (id) {
      (async function anyNameFunction() {
        dispatch({
          payload: LoadingType.OPEN,
          type: LOADING_OPEN,
        });
        await getEpisodeById(parseInt(id).toString());
        dispatch({
          payload: LoadingType.CLOSE,
          type: LOADING_CLOSE,
        });
      })();
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getEpisodeById = async (id: string) => {
    const episodeResult = await episodeGetById(`${manga?._id}Episode${id}`);
    if (episodeResult) {
      setImgArr(episodeResult.episodes.imageArr);
      setEpisodeNum(episodeResult.count);
    }
  };

  const setNewImage = (imageBody: ImageBody) => {
    const exist = imgArr
      .map((image) => {
        if (typeof image == "string") {
          return image;
        } else {
          return image.imgName;
        }
      })
      .indexOf(imageBody.imgName);
    if (exist == -1) {
      const newArr = [];
      imgArr.forEach((image) => newArr.push(image));
      newArr.push(imageBody);
      setImgArr(newArr);
    }
  };

  const deleteImg = (index: number) => {
    const newArr: (ImageBody | string)[] = [];
    imgArr.forEach((image) => newArr.push(image));
    newArr.splice(index, 1);
    setImgArr(newArr);
  };

  const editEpisode = async () => {
    const id: string = (history.location.state as any).type;
    const newEpisode: EpisodeType = {
      _id: `${manga?._id}Episode${id}`,
      page: episodeNum,
      title: manga?.title ? manga?.title : "",
      mangaType: manga?._id ? manga?._id : "",
      imageArr: imgArr.map((image) =>
        typeof image == "string" ? image : image.imgBase64
      ),
    };
    await episodeUpdate(newEpisode);
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
                <ShowcaseImage
                  src={typeof image == "string" ? image : image.imgBase64}
                />
              </div>
              <div>
                <Button onClick={() => deleteImg(index)}>Delete</Button>
              </div>
            </EpisodeImage>
          );
        })}
        <MiddleDiv style={{ width: "240px" }}>
          <ImageUpload
            width={"240px"}
            height={"240px"}
            textColor={"black"}
            backGroundColor={"#F6F6F6"}
            border={"1px solid #F6F6F6"}
            text={"Image"}
            setImg={(value: ImageBody) => setNewImage(value)}
            margin={"15px 0px 0px 0px"}
            imageAdd={false}
          />
        </MiddleDiv>
        <div style={{ marginTop: "32px", marginBottom: "32px" }}>
          <AnimeButton
            para=""
            text={"Save"}
            width={"100%"}
            height={"36px"}
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="white"
            buttonClick={() => editEpisode()}
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
            buttonClick={() => window.history.go(-1)}
          />
        </MiddleDiv>
      </EpisodeImages>
    </EpisodeDiv>
  );
};

export default EpisodeEdit;
