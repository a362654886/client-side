import {
  Button,
  Input,
  InputNumber,
  notification,
  Radio,
  Select,
  Space,
} from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import ImageUpload, { ImageBody } from "../../components/ImageUpload";
import {
  MarketBodyDiv,
  MarketImgDiv,
  MarketImgLimitDiv,
  MarketInputDiv,
  MarketLocationInputDiv,
  MarketPlaceTitle,
  MarketPlaceTitleDiv,
  MarketUploadImage,
  PublishButtonsDiv,
} from "../../cssJs/MarketPage/MarketPlaceCss";
import lodash, { cloneDeep } from "lodash";
import blankMarket from "../../files/blankMarket.png";
import TextArea from "antd/lib/input/TextArea";
import AnimeButton, { MiddleDiv } from "../../components/Button";
import { MarketType } from "../../types/MarketType";
import { User } from "../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "../../types/IStoreState";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";
import { marketAdd } from "../../api/marketAPI";
import { flagArr, flagGet, flagGetName } from "../../helperFns/flag";
import Flag from "react-flagkit";
import { useHistory } from "react-router-dom";
import { getWidth } from "../../helperFns/widthFn";
import {
  ShowCaseCreateImageHeader,
  TagSelect,
  TagSelectDiv,
} from "../../cssJs/ShowCasePage/showCaseCss";
import {
  NotificationColor,
  NotificationTitle,
  openNotification,
} from "../../helperFns/popUpAlert";
import CropImgDiv from "../../components/CropImgDiv";

const { Option } = Select;

const MarketplaceCreate = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const history = useHistory();
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [imgArr, setImgArr] = useState<string[]>(["add"]);
  const [tags, setTags] = useState<string[]>([]);
  const [state, setState] = useState<string>("available");
  const [uploadImg, setLoadImg] = useState<string>("");
  const [showCropper, setShowCropper] = useState<boolean>(false);

  useEffect(() => {
    //console.log(imgArr);
  }, [imgArr, state]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const setResizeUploadImg = (imageBody: string) => {
    const newArr: string[] = cloneDeep(imgArr);
    newArr.unshift(imageBody);
    if (newArr.length > 4) {
      newArr.pop();
    }
    setImgArr(newArr);
  };

  const deleteImg = (index: number) => {
    const newImgArr = imgArr;
    newImgArr.splice(index, 1);
    if (newImgArr.length < 4 && newImgArr.indexOf("add") == -1) {
      newImgArr.push("add");
    }
    setImgArr(lodash.cloneDeep(newImgArr));
  };

  const getArr = () => {
    const arr: string[] = [];
    imgArr.forEach((item) => {
      if (item !== "add") {
        arr.push(item);
      }
    });
    return arr;
  };

  const marketCreate = async () => {
    const id = new Date().valueOf().toString();
    const marketBody: MarketType = {
      _id: id,
      userId: loginUser ? loginUser._id : "",
      imageArr: getArr(),
      title: title,
      price: parseFloat(price),
      description: description,
      state: state,
      country: country,
      location: city,
      uploadTime: new Date(),
      tags: tags.map((tag, index) => {
        return {
          _id: id + index,
          text: tag,
          num: -1,
        };
      }),
      hide: false,
    };
    if (marketBody.title == "") {
      openNotification(
        "please input title value",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
      return;
    }
    if (!marketBody.price || marketBody.price == 0) {
      openNotification(
        "please input price value",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
      return;
    }
    if (marketBody.imageArr.length == 0) {
      openNotification(
        "please input at least one image",
        NotificationColor.Warning,
        NotificationTitle.Warning
      );
      return;
    }
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const r = await marketAdd(marketBody);
    if (r == 200) {
      history.push("/marketplace/show/null");
    } else {
      openNotification(
        r.toString(),
        NotificationColor.Success,
        NotificationTitle.Success
      );
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  const formatTag = (tagArr: string[]) => {
    let newTagArr: string[] = [];
    tagArr.forEach((item) => {
      const arr = item.split("#");
      newTagArr = newTagArr.concat(arr);
    });
    const returnTagArr: string[] = [];
    newTagArr.forEach((item) => {
      if (item != "") {
        returnTagArr.push(`#${item}`);
      }
    });
    setTags(returnTagArr);
  };

  return (
    <div
      style={{
        marginLeft: getWidth() > 600 ? "" : "8px",
        marginRight: getWidth() > 600 ? "" : "8px",
        width: getWidth() > 600 ? "1140px" : "",
      }}
    >
      <div className="col-xl-9 col-md-9 col-sm-9 col-9">
        <MarketPlaceTitleDiv>
          <MarketPlaceTitle>Marketplace</MarketPlaceTitle>
        </MarketPlaceTitleDiv>
        <MarketBodyDiv>
          <p>publish an Item to trade at the marketplace</p>
          <MarketImgDiv
            style={{
              width: getWidth() > 600 ? "610px" : "300px",
              height: getWidth() > 600 ? "650px" : "1260px",
            }}
          >
            {imgArr.map((image, index) => {
              if (image == "add") {
                return (
                  <div
                    style={
                      getWidth() > 600
                        ? {
                            position: "absolute",
                            left: (index + 1) % 2 == 0 ? "300px" : "0px",
                            top: index <= 1 ? "0px" : "320px",
                            marginLeft: "40px",
                          }
                        : { marginLeft: "40px", marginBottom: "70px" }
                    }
                  >
                    <ImageUpload
                      width={"260px"}
                      height={"260px"}
                      textColor={"black"}
                      backGroundColor={"#F6F6F6"}
                      border={"1px solid #F6F6F6"}
                      text={"Image"}
                      setImg={(value: ImageBody) => {
                        setLoadImg(value.imgBase64);
                        setShowCropper(true);
                      }}
                      margin={"15px 0px 0px 0px"}
                      imageAdd={false}
                    />
                  </div>
                );
              } else {
                return (
                  <MarketUploadImage
                    key={index}
                    style={
                      getWidth() > 600
                        ? {
                            position: "absolute",
                            left: (index + 1) % 2 == 0 ? "300px" : "0px",
                            top: index <= 1 ? "0px" : "320px",
                          }
                        : {}
                    }
                  >
                    <div>
                      <img
                        src={image}
                        style={{
                          width: "250px",
                          height: "250px",
                          borderRadius: "20px",
                        }}
                      />
                    </div>
                    <div>
                      <Button onClick={() => deleteImg(index)}>Delete</Button>
                    </div>
                  </MarketUploadImage>
                );
              }
            })}
            {Array.from({ length: 4 - imgArr.length }, (v, k) => k).map(
              (image, index) => {
                const _index = imgArr.length + index;
                return (
                  <MarketUploadImage
                    key={index}
                    style={
                      getWidth() > 600
                        ? {
                            position: "absolute",
                            left: (_index + 1) % 2 == 0 ? "300px" : "0px",
                            top: _index <= 1 ? "0px" : "320px",
                          }
                        : {}
                    }
                  >
                    <div>
                      <img
                        src={blankMarket}
                        style={{
                          width: "250px",
                          height: "250px",
                          borderRadius: "20px",
                        }}
                      />
                    </div>
                  </MarketUploadImage>
                );
              }
            )}
          </MarketImgDiv>
          <MarketImgLimitDiv>
            <p>4 Pictures for an Item to the Maximum</p>
          </MarketImgLimitDiv>
          <MarketInputDiv>
            <h6>Item Title</h6>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </MarketInputDiv>
          <TagSelectDiv>
            <ShowCaseCreateImageHeader>Tags</ShowCaseCreateImageHeader>
            <TagSelect
              mode="tags"
              value={tags}
              onChange={(e) => formatTag(e as string[])}
              dropdownStyle={{ display: "none" }}
            ></TagSelect>
          </TagSelectDiv>
          <MarketInputDiv>
            <h6>Price</h6>
            <InputNumber value={price} onChange={(e) => setPrice(e)} /> $ (NZD)
          </MarketInputDiv>
          <MarketInputDiv>
            <h6>Write a Description</h6>
            <TextArea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </MarketInputDiv>
          <MarketLocationInputDiv>
            <h6>Location</h6>
            <Input
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </MarketLocationInputDiv>
          <Select
            style={{ width: "320px" }}
            onSelect={(e: string) => setCountry(e as string)}
          >
            {flagArr.map((value, index) => {
              return (
                <Option key={index} value={value}>
                  <div style={{ display: "flex" }}>
                    <Flag country={flagGet(value)} />
                    <p style={{ marginLeft: "10px", marginTop: "-3px" }}>
                      {flagGetName(value)}
                    </p>
                  </div>
                </Option>
              );
            })}
          </Select>
          <MarketInputDiv>
            <h6>State</h6>
            <Radio.Group
              onChange={(e) => setState(e.target.value)}
              value={state}
            >
              <Space direction="vertical">
                <Radio value={"available"}>Available</Radio>
                <Radio value={"soldOut"}>
                  Sold Out (Please back edit to this state when you sell out
                  your item.)
                </Radio>
              </Space>
            </Radio.Group>
          </MarketInputDiv>
          <PublishButtonsDiv>
            <AnimeButton
              para=""
              text={"Publish"}
              width="100%"
              height="32px"
              textColor="white"
              backGroundColor="#FFC300"
              borderColor="#FFC300"
              buttonClick={() => marketCreate()}
            />
            <MiddleDiv>
              <AnimeButton
                para=""
                text={"Cancel"}
                width="120px"
                height="32px"
                textColor="black"
                backGroundColor="white"
                borderColor="#302D46"
                buttonClick={() => window.history.back()}
              />
            </MiddleDiv>
          </PublishButtonsDiv>
        </MarketBodyDiv>
        <CropImgDiv
          uploadImg={uploadImg}
          setLoadImg={(image: string) => {
            setResizeUploadImg(image);
            setShowCropper(false);
          }}
          visible={showCropper}
          setVisibleFalse={() => setShowCropper(false)}
          cube={true}
        />
      </div>
      <div className="col-xl-3 col-md-3 col-sm-1 col-1"></div>
    </div>
  );
};

export default MarketplaceCreate;
