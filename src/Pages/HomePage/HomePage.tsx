import * as React from "react";
import { useEffect, useState } from "react";
import { animeAllGet } from "../../api/animeAPI";
import { MiddleBiggerDiv } from "../../components/Button";
import {
  AnimeBox,
  CenterDiv,
  LikeDiv,
  ShowcaseBox,
  StarDiv,
} from "../../cssJs/AnimePage/AnimeShowCss";
import {
  CustomerProductBottomImg,
  HomePageAnimeDiv,
  HomePageBodyDiv,
  HomePageDiv,
  HomePageHeadlineDiv,
  HomePageMarketPlaceDiv,
  HomePageMobileHeadlineDiv,
  HomePageMobileShowcaseDiv,
  HomePageProductPlaceDiv,
  HomePageShowcaseDiv,
  HomeShowcaseDiv,
  LoadingImgDiv,
  MarketContextDiv,
  MarketHomeBox,
  MarketPlaceMore,
  MarketPlaceTitle,
  ProductContextDiv,
  ShowcaseHomeBox,
  ShowCaseImgDiv,
} from "../../cssJs/homePageCss";
import showCaseImg from "../../files/showCase.jpg";
import starBorder from "../../files/Star-border.svg";
import starFill from "../../files/Star-filled.svg";
import { Anime, RateBody } from "../../types/Amine";
import { NewType } from "../../types/NewsType";
import loadingImg from "../../files/loading.gif";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ANIME_NONE } from "../../redux/anime";
import { MoreRight } from "../../cssJs/basicCss";
import moreRightImg from "../../files/moreRightArrow.png";
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
import { Carousel } from "antd";
import { marketAllGet } from "../../api/marketAPI";
import { MarketType } from "../../types/MarketType";
import { ShowCaseEnum, ShowCaseType } from "../../types/showCaseType";
import { showCaseAllGet } from "../../api/showcaseAPI";
import { headlineAllGet } from "../../api/headlineAPI";
import { HeadLineType } from "../../types/headLine";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "../HomePage/slider.css";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

// import required modules
import { Pagination } from "swiper";
import { ReportContextType } from "../../types/blockType";

const HomePage = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [allNews, setAllNews] = useState<NewType[]>([]);
  const [allAnime, setAllAnime] = useState<Anime[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [allMarkets, setAllMarkets] = useState<MarketType[]>([]);
  const [allShowcases, setAllShowcases] = useState<ShowCaseType[]>([]);
  const [allHeadlines, setAllHeadlines] = useState<HeadLineType[]>([]);
  const [newLoading, setNewLoading] = useState<boolean>(false);
  const [animeLoading, setAnimeLoading] = useState<boolean>(false);
  const [showcaseLoading, setShowcaseLoading] = useState<boolean>(false);

  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  const onResize = React.useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    });
    localStorage.setItem(
      "animeWidth",
      document.documentElement.clientWidth.toString()
    );
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    //
  }, [newLoading]);

  useEffect(() => {
    (async function anyNameFunction() {
      await getHeadlines();
      await getAnimes();
      await getProducts();
      await getMarkets();
      await getShowcases();
    })();
  }, []);

  const getShowcases = async () => {
    setShowcaseLoading(true);
    const showCaseResult = await showCaseAllGet(
      ShowCaseEnum.Collections,
      "hot",
      1,
      4,
      "",
      "",
      ""
    );
    if (showCaseResult) {
      setAllShowcases(showCaseResult.result);
    }
    setShowcaseLoading(false);
  };

  const getAnimes = async () => {
    setAnimeLoading(true);
    const animeResult = await animeAllGet("", "general", 1, 4);
    if (animeResult) {
      setAllAnime(animeResult.result);
    }
    setAnimeLoading(false);
  };

  const getHeadlines = async () => {
    setNewLoading(true);
    const headlinesResult = await headlineAllGet();
    setAllHeadlines(headlinesResult ? headlinesResult : []);
    setNewLoading(false);
  };

  const getProducts = async () => {
    const productsResult = await productAllGet("", 1, 4);
    if (productsResult) {
      setAllProducts(productsResult.result);
    }
  };

  const getMarkets = async () => {
    const marketResult = await marketAllGet(
      "",
      1,
      4,
      "",
      "",
      "0",
      "1000000",
      "Latest"
    );
    if (marketResult) {
      setAllMarkets(marketResult.markets);
    }
  };

  const chooseAnime = (anime: Anime) => {
    dispatch({
      payload: null,
      type: ANIME_NONE,
    });
    history.push(`oneAnime?${anime._id}`);
  };

  const chooseMarket = (market: MarketType) => {
    history.push({
      pathname: "/marketplace/showOne/null",
      state: `${market._id}`,
    });
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

  const getAnimeMobileDiv = () => {
    return animeLoading ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      allAnime.map((anime, index) => (
        <div
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

  const getHeadlineDiv = () => {
    return newLoading ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      allHeadlines.map((headline, index) => (
        <SwiperSlide
          key={index}
          style={{ cursor: "pointer", display: "inline", height: "400px" }}
        >
          <div style={{ cursor: "pointer", display: "flex", height: "400px" }}>
            <div style={{ width: "25%" }}>
              <img
                style={{ width: "320px" }}
                src={`${allHeadlines[index - 1 == -1 ? 2 : index - 1].image}`}
              />
              <p style={{ width: "320px", textAlign: "left" }}>{`${
                allHeadlines[index - 1 == -1 ? 2 : index - 1].title
              }`}</p>
            </div>
            <div>
              <img src={`${headline.image}`} />
              <p>{headline.title}</p>
            </div>
            <div style={{ width: "25%" }}>
              <img
                style={{ width: "320px" }}
                src={`${allHeadlines[index + 1 == 3 ? 0 : index + 1].image}`}
              />
              <p style={{ width: "320px", textAlign: "right" }}>{`${
                allHeadlines[index + 1 == 3 ? 0 : index + 1].title
              }`}</p>
            </div>
          </div>
        </SwiperSlide>
      ))
    );
  };

  const getHeadlineMobileDiv = () => {
    return newLoading ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      allHeadlines.map((headline, index) => (
        <div
          className={"headlineImg"}
          key={index}
          style={{ cursor: "pointer" }}
        >
          <img src={`${headline.image}`} />
          <p>{headline.title}</p>
        </div>
      ))
    );
  };

  const getShowcaseMobileDiv = () => {
    return showcaseLoading ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      allShowcases.map((showcase, index) => (
        <div key={index} style={{ cursor: "pointer" }}>
          <ShowcaseBox>
            <img src={`${showcase.imageArr[0]}`} />
          </ShowcaseBox>
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
              type={ReportContextType.PRODUCT}
              contextId={product._id}
            />
          </ProductAvatarDiv>
          <TimeText>{`${date.getDate()}-${
            date.getMonth() + 1
          }-${date.getFullYear()}`}</TimeText>
          <ProductHeader>{product.anime}</ProductHeader>
        </ProductBox>
      );
    });
    /*result.push(
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
    );*/
    return result;
  };

  const getMarketsDiv = () => {
    return allMarkets.map((market, index) => {
      return (
        <MarketHomeBox
          onClick={() => {
            history.push(`marketplace/showOne/${market._id}`);
          }}
          key={index}
        >
          <img src={`${market.imageArr[0]}`} />
          <h6>{`$ ${market.price}`}</h6>
          <p>{`Item Title - ${market.title}`}</p>
        </MarketHomeBox>
      );
    });
  };

  const getShowcasesDiv = () => {
    return allShowcases.map((showcase, index) => {
      return (
        <ShowcaseHomeBox key={index}>
          <img src={`${showcase.imageArr[0]}`} />
        </ShowcaseHomeBox>
      );
    });
  };

  return (
    <HomePageDiv>
      <HomePageBodyDiv>
        {size.width > 700 ? (
          <>
            <HomePageHeadlineDiv>
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{
                  clickable: true,
                }}
                scrollbar={{
                  hide: true,
                }}
                className="mySwiper"
              >
                {getHeadlineDiv()}
              </Swiper>

              {/**
               * <Carousel dots={true} style={{ margin: "auto 0px" }}>
                {getHeadlineDiv()}
              </Carousel>
               */}
            </HomePageHeadlineDiv>
          </>
        ) : (
          <>
            <HomePageMobileHeadlineDiv>
              <Carousel dots={true} style={{ margin: "auto 0px" }}>
                {getHeadlineMobileDiv()}
              </Carousel>
            </HomePageMobileHeadlineDiv>
          </>
        )}
        <HomePageAnimeDiv>
          <h1>Meet your favourite anime</h1>
          <h3>
            Find the most popular anime, as well as the peripheral products and
            fans.
          </h3>
          {size.width > 700 ? (
            <>
              <div className="row" style={{ display: "flex" }}>
                {getAnimeDiv()}
              </div>
            </>
          ) : (
            <Carousel style={{ marginLeft: "10px" }} dots={true}>
              {getAnimeMobileDiv()}
            </Carousel>
          )}
        </HomePageAnimeDiv>
        <CenterDiv>
          <MiddleBiggerDiv>
            <MarketPlaceMore onClick={() => history.push("/animeShowPage")}>
              <img src={moreRightImg} />
              <p>View All</p>
            </MarketPlaceMore>
          </MiddleBiggerDiv>
        </CenterDiv>
        {size.width > 700 ? (
          <>
            <HomeShowcaseDiv>
              <h1>Show your anime world</h1>
              <h3>
                Display your collections and anime drawing talents. Redeem
                Rewards by your Awesome pictures!
              </h3>
              <MarketContextDiv>{getShowcasesDiv()}</MarketContextDiv>
            </HomeShowcaseDiv>
            <CenterDiv>
              <MiddleBiggerDiv>
                <MoreRight
                  onClick={() =>
                    history.push("/showcase/showCollection?page=1")
                  }
                >
                  <img src={moreRightImg} />
                  <p>View All</p>
                </MoreRight>
              </MiddleBiggerDiv>
            </CenterDiv>
          </>
        ) : (
          <>
            <HomePageMobileShowcaseDiv>
              <h1>Show your anime world</h1>
              <h3>
                Display your collections and anime drawing talents. Redeem
                Rewards by your Awesome pictures!
              </h3>
            </HomePageMobileShowcaseDiv>
            <HomePageShowcaseDiv>
              <Carousel style={{ marginLeft: "10px" }} dots={true}>
                {getShowcaseMobileDiv()}
              </Carousel>
            </HomePageShowcaseDiv>
            <CenterDiv>
              <MiddleBiggerDiv>
                <MarketPlaceMore
                  onClick={() =>
                    history.push("/showcase/showCollection?page=1")
                  }
                >
                  <img src={moreRightImg} />
                  <p>View All</p>
                </MarketPlaceMore>
              </MiddleBiggerDiv>
            </CenterDiv>
          </>
        )}
        {size.width > 700 ? (
          <>
            <MarketPlaceTitle>
              <h2>Marketplace</h2>
            </MarketPlaceTitle>
            <MarketContextDiv>{getMarketsDiv()}</MarketContextDiv>
            <CenterDiv>
              <MiddleBiggerDiv>
                <MarketPlaceMore onClick={() => history.push("/animeShowPage")}>
                  <img src={moreRightImg} />
                  <p>View All</p>
                </MarketPlaceMore>
              </MiddleBiggerDiv>
            </CenterDiv>
          </>
        ) : (
          <>
            <MarketPlaceTitle>
              <h2>Marketplace</h2>
            </MarketPlaceTitle>
            <HomePageMarketPlaceDiv>
              <Carousel style={{ marginLeft: "10px" }} dots={true}>
                {getMarketsDiv()}
              </Carousel>
            </HomePageMarketPlaceDiv>
            <CenterDiv>
              <MiddleBiggerDiv>
                <MarketPlaceMore onClick={() => history.push("/animeShowPage")}>
                  <img src={moreRightImg} />
                  <p>View All</p>
                </MarketPlaceMore>
              </MiddleBiggerDiv>
            </CenterDiv>
          </>
        )}
        {size.width > 700 ? (
          <>
            <MarketPlaceTitle>
              <h2>Anime Products</h2>
            </MarketPlaceTitle>
            <ProductContextDiv>{getProductDiv()}</ProductContextDiv>
            <CenterDiv>
              <MiddleBiggerDiv>
                <MarketPlaceMore onClick={() => history.push("/animeShowPage")}>
                  <img src={moreRightImg} />
                  <p>View All</p>
                </MarketPlaceMore>
              </MiddleBiggerDiv>
            </CenterDiv>
          </>
        ) : (
          <>
            <MarketPlaceTitle>
              <h2>Anime Products</h2>
            </MarketPlaceTitle>
            <HomePageProductPlaceDiv>
              <Carousel style={{ marginLeft: "10px" }} dots={true}>
                {getProductDiv()}
              </Carousel>
            </HomePageProductPlaceDiv>
            <CenterDiv>
              <MiddleBiggerDiv>
                <MarketPlaceMore onClick={() => history.push("/animeShowPage")}>
                  <img src={moreRightImg} />
                  <p>View All</p>
                </MarketPlaceMore>
              </MiddleBiggerDiv>
            </CenterDiv>
          </>
        )}
        <CustomerProductBottomImg
          onClick={() => history.push("/mall/custom")}
          src={animeProduct}
        />
      </HomePageBodyDiv>
    </HomePageDiv>
  );
};

export default HomePage;
