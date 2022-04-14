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
import {
  ButtonsDiv,
  ProfileAddButtonDiv,
  ProfileSubDiv,
} from "../../../cssJs/ProfilePage/ProfileCss";
import stateAvailable from "../../../files/stateAvailable.png";
import stateSoldOut from "../../../files/stateSoldOut.png";
import AnimeButton from "../../../components/Button";
import { getWidth } from "../../../helperFns/widthFn";

const buttonsColor = [
  {
    text: "Listings",
    color: "#4BA3C3",
    backColor: "white",
  },
  {
    text: "Following",
    color: "#4BA3C3",
    backColor: "white",
  },
  {
    text: "Bids",
    color: "#4BA3C3",
    backColor: "white",
  },
];

const ProfileMarketplacePage = (): JSX.Element => {
  const history = useHistory();

  const profileUser: User | null = useSelector(
    (state: IStoreState) => state.profileUserState
  );

  const [allMarket, setAllMarkets] = useState<MarketType[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  //0 listing
  //1 following
  // bids
  const [chooseButton, setChooseButton] = useState<number>(0);

  const changeButton = (index: number) => setChooseButton(index);

  useEffect(() => {
    (async function anyNameFunction() {
      await getMarkets();
    })();
  }, [chooseButton]);

  useEffect(() => {
    //
  }, [allMarket]);

  const getMarkets = async () => {
    if (profileUser) {
      setLoading(true);
      const result = await marketAllGetByArr(
        profileUser?.userEmail,
        1,
        24,
        chooseButton
      );
      if (result) {
        result.markets ? setAllMarkets(result.markets) : "";
      }
      setLoading(false);
    }
  };

  const chooseMarket = (marketId: string) => {
    console.log(history)
    history.location.pathname = "/mainPage/"
    history.replace(`marketplace/showOne/${marketId}`);
  };

  const getButtons = () => {
    return buttonsColor.map(
      (
        button: {
          text: string;
          color: string;
          backColor: string;
        },
        index: number
      ) => {
        if (index == chooseButton) {
          return (
            <ProfileSubDiv onClick={() => changeButton(index)}>
              <img src={stateAvailable} />
              <h6>{button.text}</h6>
            </ProfileSubDiv>
          );
        } else {
          return (
            <ProfileSubDiv onClick={() => changeButton(index)}>
              <img src={stateSoldOut} />
              <h6>{button.text}</h6>
            </ProfileSubDiv>
          );
        }
      }
    );
  };

  const getMarketDiv = (marketArr: MarketType[] | null) => {
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
      {getWidth() > 700 ? (
        <ButtonsDiv>{getButtons()}</ButtonsDiv>
      ) : (
        <div>{getButtons()}</div>
      )}
      <ProfileAddButtonDiv>
        <AnimeButton
          para=""
          text={"Lis an Item"}
          width="200px"
          height="36px"
          textColor="white"
          backGroundColor="#FFC300"
          borderColor="white"
          buttonClick={() => {
            history.push({
              pathname: "/mainPage/marketplace/create",
            });
          }}
        />
      </ProfileAddButtonDiv>
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
