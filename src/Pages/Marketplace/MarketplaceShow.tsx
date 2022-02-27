import { Input, Popover } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import AnimeButton, { MoreButtonDiv } from "../../components/Button";
import searchImg from "../../files/search.svg";
import {
  MarketBodyDiv,
  MarketBorder,
  MarketBox,
  MarketFilterCloseImg,
  MarketFilterDiv,
  MarketFilterLatest,
  MarketFilterPriceHighest,
  MarketFilterPriceLatest,
  MarketPlaceTitle,
  MarketPlaceTitleDiv,
  MarketSearch,
  MarketSearchInputDiv,
  MarketShowBox,
  MarketSortButton,
  MarketSortByCloseImg,
  MarketSortByDiv,
  MarketSortLocation,
  MarketSortPrice,
  StringBar,
  StringClear,
} from "../../cssJs/MarketPage/MarketPlaceCss";
import { useHistory } from "react-router-dom";
import { MarketType } from "../../types/MarketType";
import { marketAllGet } from "../../api/marketAPI";
import marketSort from "../../files/marketSort.png";
import marketFilter from "../../files/marketFilter.png";
import iconSelect from "../../files/Icon-Selected.svg";
import iconClose from "../../files/Icon-Close.svg";
import iconClear from "../../files/Icon-Clear.svg";
import loadingImg from "../../files/loading.gif";
import getMoreImg from "../../files/getMore.png";
import { LoadingImgDiv } from "../../cssJs/homePageCss";

export enum FilterEnum {
  Latest = "Latest",
  PriceLowest = "PriceLowest",
  PriceHeight = "PriceHeight",
}

const MarketplaceShow = (): JSX.Element => {
  const history = useHistory();

  const [value, setValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [allMarket, setAllMarket] = useState<MarketType[]>([]);
  const [sortByVisible, setSortByVisible] = useState<boolean>(false);
  const [filterVisible, setFilterVisible] = useState<boolean>(false);
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [priceFrom, setPriceFrom] = useState<string>("");
  const [priceTo, setPriceTo] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const [filterType, setFilterType] = useState<FilterEnum>(FilterEnum.Latest);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const pageSize = 4;

  useEffect(() => {
    (async function anyNameFunction() {
      await search("");
    })();
  }, []);

  useEffect(() => {
    //console.log(searchString);
  }, [searchString, page]);

  const search = async (value: string) => {
    setLoading(true);
    const marketResult = await marketAllGet(
      value,
      1,
      2,
      city,
      country,
      priceFrom,
      priceTo,
      filterType
    );
    if (marketResult) {
      //setAllMarket(allMarket.concat(marketResult.markets));
      setAllMarket(marketResult.markets);
      setCount(marketResult.count);
    }
    setLoading(false);
  };

  const getMore = async () => {
    setLoadingMore(true);
    const marketResult = await marketAllGet(
      "",
      page + 1,
      2,
      city,
      country,
      priceFrom,
      priceTo,
      filterType
    );
    if (marketResult) {
      setAllMarket(allMarket.concat(marketResult.markets));
      setCount(marketResult.count);
    }
    setLoadingMore(false);
    setPage(page + 1);
  };

  const chooseMarket = (market: MarketType) => {
    history.replace({
      pathname: `/mainPage/marketplace/showOne/${market._id}`,
    });
  };

  const setSearch = () => {
    const searchString = `"${city}, ${country}","${priceFrom}-${priceTo}"`;
    setSearchString(searchString);
  };

  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "Country":
        setCountry((e.target as HTMLInputElement).value);
        break;
      case "City":
        setCity((e.target as HTMLInputElement).value);
        break;
      case "From":
        setPriceFrom((e.target as HTMLInputElement).value);
        break;
      case "To":
        setPriceTo((e.target as HTMLInputElement).value);
        break;
    }
  };

  const getMarketDiv = (marketArr: MarketType[] | null) => {
    if (marketArr) {
      return marketArr.map((market: MarketType, index: number) => {
        return (
          <div
            className="col-xl-3 col-md-4 col-sm-6"
            key={index}
            onClick={() => chooseMarket(market)}
          >
            <MarketBox>
              <img src={`${market.imageArr[0]}`} />
              <h6>{`$ ${market.price}`}</h6>
              <p>{`Item Title - ${market.title}`}</p>
            </MarketBox>
          </div>
        );
      });
    } else {
      return <></>;
    }
  };

  const getExistMarket = () => (
    <>{getMarketDiv(allMarket ? allMarket : null)}</>
  );

  const getLoading = () =>
    loadingMore ? (
      <LoadingImgDiv>
        <img src={`${loadingImg}`} />
      </LoadingImgDiv>
    ) : (
      <></>
    );

  const sortByDiv = () => {
    return (
      <MarketSortByDiv>
        <MarketSortByCloseImg
          src={iconClose}
          onClick={() => setSortByVisible(false)}
        />
        <MarketSortLocation>Location</MarketSortLocation>
        <Input placeholder="Country" onChange={onChange} />
        <p>—</p>
        <Input placeholder="City" onChange={onChange} />
        <MarketSortPrice>Price</MarketSortPrice>
        <Input placeholder="From" onChange={onChange} />
        <p>—</p>
        <Input placeholder="To" onChange={onChange} />
        <MarketSortButton>
          <AnimeButton
            para=""
            text={"Apply"}
            width="120px"
            height="32px"
            textColor="black"
            backGroundColor="white"
            borderColor="black"
            buttonClick={() => {
              setSortByVisible(false);
              setSearch();
            }}
          />
        </MarketSortButton>
      </MarketSortByDiv>
    );
  };

  const filterDiv = () => {
    return (
      <MarketFilterDiv>
        <MarketFilterCloseImg
          src={iconClose}
          onClick={() => setFilterVisible(false)}
        />
        <MarketFilterLatest onClick={() => setFilterType(FilterEnum.Latest)}>
          Latest
          {filterType == FilterEnum.Latest ? <img src={iconSelect} /> : <></>}
        </MarketFilterLatest>
        <MarketFilterPriceLatest
          onClick={() => setFilterType(FilterEnum.PriceLowest)}
        >
          Price Lowest
          {filterType == FilterEnum.PriceLowest ? (
            <img src={iconSelect} />
          ) : (
            <></>
          )}
        </MarketFilterPriceLatest>
        <MarketFilterPriceHighest
          onClick={() => setFilterType(FilterEnum.PriceHeight)}
        >
          Price Highest
          {filterType == FilterEnum.PriceHeight ? (
            <img src={iconSelect} />
          ) : (
            <></>
          )}
        </MarketFilterPriceHighest>
      </MarketFilterDiv>
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <MarketPlaceTitleDiv>
        <MarketPlaceTitle>Marketplace</MarketPlaceTitle>
        <AnimeButton
          para=""
          text={"List an Item"}
          width="200px"
          height="32px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="#FFC300"
          buttonClick={() => history.replace(`/mainPage/marketplace/create`)}
        />
      </MarketPlaceTitleDiv>
      <MarketBodyDiv>
        <MarketSearchInputDiv>
          <Input value={value} onChange={(e) => setValue(e.target.value)} />
          <MarketSearch>
            <img onClick={() => search(value)} src={`${searchImg}`} />
          </MarketSearch>
        </MarketSearchInputDiv>
        <MarketBorder>
          <Popover
            placement="bottomRight"
            content={sortByDiv()}
            trigger="click"
            visible={sortByVisible}
          >
            <div onClick={() => setSortByVisible(true)}>
              <img src={marketSort} />
              <p>Sort By</p>
            </div>
          </Popover>
          <Popover
            placement="bottom"
            content={filterDiv()}
            trigger="click"
            visible={filterVisible}
          >
            <div onClick={() => setFilterVisible(true)}>
              <img src={marketFilter} />
              <p>Filters</p>
            </div>
          </Popover>
        </MarketBorder>
        <StringBar
          onClick={() => {
            console.log("clear");
          }}
        >
          <p>{searchString}</p>
          <StringClear>
            <img src={iconClear} />
            <p>Clear</p>
          </StringClear>
        </StringBar>
        <MarketShowBox className="row">
          {loading ? (
            <div>
              <img src={loadingImg} />
            </div>
          ) : (
            getExistMarket()
          )}
        </MarketShowBox>
        {getLoading()}
        <MoreButtonDiv onClick={() => getMore()}>
          <div>
            <img src={`${getMoreImg}`} />
            <p>Load More</p>
          </div>
        </MoreButtonDiv>
      </MarketBodyDiv>
    </div>
  );
};

export default MarketplaceShow;
