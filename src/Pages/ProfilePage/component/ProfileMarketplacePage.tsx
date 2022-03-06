import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { marketAllGetByArr } from "../../../api/marketAPI";
import {
  MarketBox,
  MarketShowBox,
} from "../../../cssJs/MarketPage/MarketPlaceCss";
import { IStoreState } from "../../../types/IStoreState";
import { MarketType } from "../../../types/MarketType";
import { User } from "../../../types/User";
import loadingImg from "../../../files/loading.gif";

const ProfileMarketplacePage = (): JSX.Element => {
  const history = useHistory();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [allMarket, setAllMarkets] = useState<MarketType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function anyNameFunction() {
      await getMarkets();
    })();
  }, []);

  useEffect(() => {
    //
  }, [allMarket]);

  const getMarkets = async () => {
    console.log(loginUser)
    if (loginUser) {
      setLoading(true);
      const result = await marketAllGetByArr(loginUser?.userEmail, 1, 24);
      console.log(result)
      if (result) {
        result.markets ? setAllMarkets(result.markets) : "";
      }
      setLoading(false);
    }
  };

  const chooseMarket = (marketId: string) => {
    history.replace(`marketplace/showOne/${marketId}`);
  };

  const getMarketDiv = (marketArr: MarketType[] | null) => {
    console.log(marketArr)
    if (marketArr) {
      return marketArr.map((market: MarketType, index: number) => {
        return (
          <div
            className="col-xl-3 col-md-4 col-sm-6"
            key={index}
            onClick={() => chooseMarket(market._id)}
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
    <>
      <MarketShowBox className="row">
        {loading ? (
          <div>
            <img src={loadingImg} />
          </div>
        ) : (
          getExistMarket()
        )}
      </MarketShowBox>
    </>
  );
};

export default ProfileMarketplacePage;
