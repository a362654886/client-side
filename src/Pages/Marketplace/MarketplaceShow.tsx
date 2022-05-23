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
import { useHistory, useParams } from "react-router-dom";
import { MarketType } from "../../types/MarketType";
import { marketAllGet, marketAllGetByArr } from "../../api/marketAPI";
import marketSort from "../../files/marketSort.png";
import marketFilter from "../../files/marketFilter.png";
import iconSelect from "../../files/Icon-Selected.svg";
import iconClose from "../../files/Icon-Close.svg";
import iconClear from "../../files/Icon-Clear.svg";
import loadingImg from "../../files/loading.gif";
import getMoreImg from "../../files/getMore.png";
import { LoadingImgDiv } from "../../cssJs/homePageCss";
import { getWidth } from "../../helperFns/widthFn";

export enum FilterEnum {
  Latest = "Latest",
  PriceLowest = "PriceLowest",
  PriceHeight = "PriceHeight",
}

interface Para {
  id: string;
}

const MarketplaceShow = (): JSX.Element => {
  const para: Para = useParams();

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
  const [searchUser, setSearchUser] = useState<boolean>(true);
  const pageSize = 24;

  useEffect(() => {
    (async function anyNameFunction() {
      setSearchUser(true);
      await search("");
    })();
  }, []);

  useEffect(() => {
    //console.log(searchString);
  }, [searchString, page, country, city, priceFrom, priceTo]);

  useEffect(() => {
    (async function anyNameFunction() {
      setSearchUser(false);
      await search("");
    })();
  }, [filterType, searchString]);

  const search = async (value: string) => {
    if (para.id != "null" && searchUser) {
      await searchByUser(para.id);
    } else {
      await searchBySearchValue(value);
    }
  };

  const getMore = async () => {
    await searchBySearchValue("");
    setPage(page + 1);
  };

  const searchBySearchValue = async (value: string) => {
    setLoading(true);
    const marketResult = await marketAllGet(
      value,
      1,
      pageSize,
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

  const searchByUser = async (userId: string) => {
    setLoading(true);
    const marketResult = await marketAllGetByArr(userId, page, pageSize, 0);
    if (marketResult) {
      //setAllMarket(allMarket.concat(marketResult.markets));
      setAllMarket(marketResult.markets);
      setCount(marketResult.count);
    }
    setLoading(false);
  };

  const chooseMarket = (market: MarketType) => {
    history.push({
      pathname: `/marketplace/showOne/${market._id}`,
    });
  };

  const setSearch = () => {
    const searchString = `"${city}, ${country}","${priceFrom}-${priceTo}"`;
    setSearchString(searchString);
  };

  const clearFn = () => {
    setCountry("");
    setCity("");
    setPriceFrom("");
    setPriceTo("");
    setSearchString("");
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
        <Input placeholder="Country" value={country} onChange={onChange} />
        <p>—</p>
        <Input placeholder="City" value={city} onChange={onChange} />
        <MarketSortPrice>Price</MarketSortPrice>
        <Input placeholder="From" value={priceFrom} onChange={onChange} />
        <p>—</p>
        <Input placeholder="To" value={priceTo} onChange={onChange} />
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
              setSearchUser(false);
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
          Price Highest
          {filterType == FilterEnum.PriceLowest ? (
            <img src={iconSelect} />
          ) : (
            <></>
          )}
        </MarketFilterPriceLatest>
        <MarketFilterPriceHighest
          onClick={() => setFilterType(FilterEnum.PriceHeight)}
        >
          Price Lowest
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
    <div
      style={{
        width: "100%",
        paddingLeft: getWidth() > 600 ? "" : "8px",
        paddingRight: getWidth() > 600 ? "" : "8px",
      }}
    >
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
          buttonClick={() => history.push(`/marketplace/create`)}
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
            clearFn();
          }}
        >
          <p>{searchString}</p>
          <StringClear>
            <img src={iconClear} />
            <p>Clear</p>
          </StringClear>
        </StringBar>
        <MarketShowBox className={getWidth() > 600 ? "row" : ""}>
          {loading ? (
            <div>
              <img src={loadingImg} />
            </div>
          ) : (
            getExistMarket()
          )}
        </MarketShowBox>
        {getLoading()}
        {count >= allMarket.length ? (
          <></>
        ) : (
          <MoreButtonDiv onClick={() => getMore()}>
            <div>
              <img src={`${getMoreImg}`} />
              <p>Load More</p>
            </div>
          </MoreButtonDiv>
        )}
      </MarketBodyDiv>
    </div>
  );
};

export default MarketplaceShow;
