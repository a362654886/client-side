import * as React from "react";
import { useEffect, useState } from "react";
import { animeAllGet } from "../../api/animeAPI";
import { newAllGet } from "../../api/newsAPI";
import { AnimeButton, MiddleBiggerDiv } from "../../components/Button";
import {
  AnimeBox,
  CenterDiv,
  LikeDiv,
  StarDiv,
} from "../../cssJs/AnimePage/AnimeShowCss";
import {
  CustomerProductBottomImg,
  HomeNewsBodyDiv,
  HomePageAnimeDiv,
  HomePageBodyDiv,
  HomePageDiv,
  HomePageHeaderDiv,
  HomePageHeaderLeftDiv,
  HomePageHeaderRightDiv,
  HomePageNewDiv,
  LoadingImgDiv,
  MarketContextDiv,
  MarketHomeBox,
  MarketPlaceMore,
  MarketPlaceTitle,
  ProductContextDiv,
  ProductDealerDiv,
  ShowCaseImgDiv,
} from "../../cssJs/homePageCss";
import mainPagePic from "../../files/mainPagePic.jpg";
import showCaseImg from "../../files/showCase.jpg";
import starBorder from "../../files/Star-border.svg";
import starFill from "../../files/Star-filled.svg";
import { Anime, RateBody } from "../../types/Amine";
import { NewType } from "../../types/NewsType";
import loadingImg from "../../files/loading.gif";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ANIME_ADD } from "../../redux/anime";
import { MoreRight } from "../../cssJs/basicCss";
import moreRightImg from "../../files/moreRightArrow.png";
import productDealer from "../../files/productDealer.png";
import { productAllGet } from "../../api/productAPI";
import { Product } from "../../types/ProductType";
import {
  AvatarImg,
  AvatarName,
  LinkP,
  ProductAvatarDiv,
  ProductBox,
  ProductHeader,
  ProductImgDiv,
} from "../../cssJs/AnimePage/AnimeOne/AnimeOneProductCss";
import ProfileWrapperDiv from "../../components/ProfileWrapperDiv";
import Flag from "react-flagkit";
import { flagGet } from "../../helperFns/flag";
import SettingImg from "../../components/SettingImg";
import { TimeText } from "../../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import animeProduct from "../../files/animeProduct.png";
import { Button } from "antd";
import { marketAllGet } from "../../api/marketAPI";
import { MarketType } from "../../types/MarketType";
import { MarketBox } from "../../cssJs/MarketPage/MarketPlaceCss";

const HomePage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [allNews, setAllNews] = useState<NewType[]>([]);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allMarkets, setAllMarkets] = useState<MarketType[]>([]);
  const [newLoading, setNewLoading] = useState<boolean>(false);
  const [animeLoading, setAnimeLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function anyNameFunction() {
      await getNews();
      await getAnimes();
      await getProducts();
      await getMarkets();
    })();
  }, []);

  const getNews = async () => {
    setNewLoading(true);
    const animeResult = await newAllGet("", 1, 2);
    if (animeResult) {
      setAllNews(animeResult.result);
    }
    setNewLoading(false);
  };

  const getAnimes = async () => {
    setAnimeLoading(true);
    const animeResult = await animeAllGet("", "general", 1, 4);
    if (animeResult) {
      setAllAnime(animeResult.result);
    }
    setAnimeLoading(false);
  };

  const getProducts = async () => {
    const productsResult = await productAllGet("", 1, 3);
    if (productsResult) {
      setAllProducts(productsResult.result);
    }
  };

  const getMarkets = async () => {
    const marketResult = await marketAllGet("", 1, 4);
    if (marketResult) {
      setAllMarkets(marketResult.markets);
    }
  };

  const chooseAnime = (anime: Anime) => {
    dispatch({
      payload: anime,
      type: ANIME_ADD,
    });
    history.replace("oneAnime");
  };

  const chooseMarket = (market: MarketType) => {
    history.push({
      pathname: "/mainPage/marketplace/showOne",
      state: `${market._id}`,
    });
  };

  const getNewDiv = () => {
    return newLoading ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      allNews.map((news, index) => (
        <HomePageNewDiv key={index}>
          <h2>{news.header}</h2>
          <HomeNewsBodyDiv
            dangerouslySetInnerHTML={{ __html: news.html }}
          ></HomeNewsBodyDiv>
          <AnimeButton
            para=""
            text="See All"
            width="120px"
            height="36px"
            textColor="#4BA3C3"
            backGroundColor="#302D46"
            borderColor="#4BA3C3"
            buttonClick={() => {
              console.log("");
            }}
          />
        </HomePageNewDiv>
      ))
    );
  };

  const getStar = (rate: RateBody) => {
    const rateNum = rate.totalRate / rate.ratePeople;
    return [1, 2, 3, 4, 5].map((n, index) => {
      if (rateNum > n) {
        return (
          <img
            key={index}
            style={{
              width: "24px",
              height: "24px",
              marginRight: "6.4px",
              marginLeft: "6.4px",
              marginTop: "8px",
            }}
            src={starFill}
          />
        );
      } else {
        return (
          <img
            key={index}
            style={{
              width: "24px",
              height: "24px",
              marginRight: "6.4px",
              marginLeft: "6.4px",
              marginTop: "8px",
            }}
            src={starBorder}
          />
        );
      }
    });
  };

  const getAnimeDiv = () => {
    return animeLoading ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      allAnime.map((anime, index) => (
        <div
          className="col-xl-3 col-md-4 col-sm-6"
          onClick={() => chooseAnime(anime)}
          key={index}
          style={{ cursor: "pointer" }}
        >
          <AnimeBox>
            <img src={`${anime.headImage}`} />
            <h6>{anime.title}</h6>
          </AnimeBox>
          <LikeDiv>
            <StarDiv>{getStar(anime.rate)}</StarDiv>
            <p>{anime.likes} Fans</p>
          </LikeDiv>
        </div>
      ))
    );
  };

  const getProductDiv = () => {
    const result = allProducts.map((product, index) => {
      const date = new Date(product.uploadTime);
      return (
        <ProductBox style={{ marginRight: "60px" }} key={index}>
          <ProductImgDiv src={product.productImg} />
          <LinkP
            onClick={() => {
              window.open(product.link, "_blank");
            }}
          >{`Here to buy>>`}</LinkP>
          <p>From</p>
          <ProductAvatarDiv>
            <ProfileWrapperDiv
              userId={product.userId}
              element={
                <>
                  <AvatarImg>
                    <img src={product.userAvatar} />
                  </AvatarImg>
                  <AvatarName>
                    {product.userName}
                    <Flag
                      style={{ marginLeft: "5px" }}
                      country={flagGet(
                        product.userCountry ? product.userCountry : ""
                      )}
                    />
                  </AvatarName>
                </>
              }
            ></ProfileWrapperDiv>
            <SettingImg
              userId={product.userId}
              userName={product.userName}
              userImg={product.userAvatar}
              marginTop="24px"
            />
          </ProductAvatarDiv>
          <TimeText>{`${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`}</TimeText>
          <ProductHeader>{product.anime}</ProductHeader>
        </ProductBox>
      );
    });
    result.push(
      <ProductDealerDiv>
        <h2>If you are Dealers</h2>
        <p>
          You are welcome to share product shopping links here. To add a
          product, find the associating anime first.{" "}
        </p>
        <Button>Hows?</Button>
        <h2>Who are In</h2>
        <img src={productDealer} />
      </ProductDealerDiv>
    );
    return result;
  };

  const getMarketsDiv = () => {
    return allMarkets.map((market, index) => {
      return (
        <MarketHomeBox key={index}>
          <img src={`${market.imageArr[0]}`} />
          <h6>{`$ ${market.price}`}</h6>
          <p>{`Item Title - ${market.title}`}</p>
        </MarketHomeBox>
      );
    });
  };

  return (
    <HomePageDiv>
      <HomePageBodyDiv>
        <HomePageHeaderDiv className="row">
          <HomePageHeaderLeftDiv className="col-xl-6 col-md-6 col-sm-6">
            <img src={mainPagePic} />
          </HomePageHeaderLeftDiv>
          <HomePageHeaderRightDiv className="col-xl-6 col-md-6 col-sm-6">
            {getNewDiv()}
          </HomePageHeaderRightDiv>
        </HomePageHeaderDiv>
        <HomePageAnimeDiv>
          <h1>Meet your favourite anime</h1>
          <h3>
            Find the most popular anime, as well as the peripheral products and
            fans.
          </h3>
          <div className="row" style={{ display: "flex" }}>
            {getAnimeDiv()}
          </div>
        </HomePageAnimeDiv>
        <CenterDiv>
          <MiddleBiggerDiv>
            <MoreRight
              onClick={() => history.replace("/mainPage/animeShowPage")}
            >
              <img src={moreRightImg} />
              <p>View All</p>
            </MoreRight>
          </MiddleBiggerDiv>
        </CenterDiv>
        <HomePageAnimeDiv>
          <h1>Show your anime world</h1>
          <h3>
            Display your collections and anime drawing talents. Redeem Rewards
            by your Awesome pictures!
          </h3>
          <ShowCaseImgDiv src={showCaseImg} />
        </HomePageAnimeDiv>
        <CenterDiv>
          <MiddleBiggerDiv>
            <MoreRight
              onClick={() => history.replace("/mainPage/showcase/show")}
            >
              <img src={moreRightImg} />
              <p>View All</p>
            </MoreRight>
          </MiddleBiggerDiv>
        </CenterDiv>
        <MarketPlaceTitle>
          <h2>Marketplace</h2>
          <MarketPlaceMore
            onClick={() => history.replace("/mainPage/animeShowPage")}
          >
            <img src={moreRightImg} />
            <p>See More</p>
          </MarketPlaceMore>
        </MarketPlaceTitle>
        <MarketContextDiv>{getMarketsDiv()}</MarketContextDiv>
        <MarketPlaceTitle>
          <h2>Anime Products</h2>
          <MarketPlaceMore
            onClick={() => history.replace("/mainPage/animeShowPage")}
          >
            <img src={moreRightImg} />
            <p>See More</p>
          </MarketPlaceMore>
        </MarketPlaceTitle>
        <ProductContextDiv>{getProductDiv()}</ProductContextDiv>
        <CustomerProductBottomImg src={animeProduct} />
      </HomePageBodyDiv>
    </HomePageDiv>
  );
};

export default HomePage;
