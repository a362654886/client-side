import { Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import AnimeButton from "../../components/Button";
import searchImg from "../../files/search.svg";
import {
  MarketBodyDiv,
  MarketBorder,
  MarketBox,
  MarketPlaceTitle,
  MarketPlaceTitleDiv,
  MarketSearch,
  MarketSearchInputDiv,
  MarketShowBox,
} from "../../cssJs/MarketPage/MarketPlaceCss";
import { useHistory } from "react-router-dom";
import { MarketType } from "../../types/MarketType";
import { marketAllGet } from "../../api/marketAPI";

const MarketplaceShow = (): JSX.Element => {
  const history = useHistory();

  const [value, setValue] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [allMarket, setAllMarket] = useState<MarketType[]>([]);
  const pageSize = 4;

  useEffect(() => {
    (async function anyNameFunction() {
      await search("");
    })();
  }, [page]);

  const search = async (value: string) => {
    setLoading(true);
    const marketResult = await marketAllGet(value, page, pageSize);
    if (marketResult) {
      setAllMarket(allMarket.concat(marketResult.markets));
      setCount(marketResult.count);
    }
    setLoading(false);
  };

  const chooseMarket = (market: MarketType) => {
    history.push({
      pathname: "/mainPage/marketplace/showOne",
      state: `${market._id}`,
    });
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
        <MarketBorder />
        <MarketShowBox className="row">{getExistMarket()}</MarketShowBox>
      </MarketBodyDiv>
    </div>
  );
};

export default MarketplaceShow;
