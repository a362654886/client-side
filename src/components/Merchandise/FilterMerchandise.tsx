import * as React from "react";
import { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { merchandiseQuery, merchandiseUpdate } from "../../api/merchandiseApi";
import {
  AuctionButton,
  FilterDiv,
  MerchandiseCard,
  MerchandiseCardLeft,
  MerchandiseCardLabelP,
} from "../../cssJs/MerchandiseCss";
import {
  MERCHANDISES_UPDATE,
  MERCHANDISE_INI,
  MERCHANDISE_UPDATE,
} from "../../redux/merchandises";
import { ImageBody } from "../../types/BasicType";
import { IStoreState } from "../../types/IStoreState";
import {
  Merchandise,
  MerchandiseQueryType,
  MerchandiseReturnBody,
} from "../../types/MerchandiseType";
import { User } from "../../types/User";
import { PaginationDiv } from "../conponentDivs/Pagination";
import { SaveOutlined, LikeOutlined } from "@ant-design/icons";
import { getAuctionTimeDifference } from "../../helperFns/timeFn";
import InputBox from "../InputBox";
import { SelectValue } from "antd/lib/select";
import { BooleanType, InputBoxType } from "../../types/EnumTypes";
import { Label } from "../../types/Label";
import { getAllLabels } from "../../api/laeblAPI";
import AuctionModel from "./AuctionModel";
import { showAlert } from "../../helperFns/showFn";
import { GetAlertDiv } from "../conponentDivs/GetAlertDiv";
import { IconText } from "../../cssJs/publicCss";
import { LIKE_BODY_SEND_MERCHANDISE } from "../../redux/likeBodyState";
import { ButtonDiv, ButtonPrimary } from "../../cssJs/publicCss";
import { Loading } from "../../cssJs/publicCss";

const pageSize = 10;

const FilterMerchandise = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const merchandisesState: MerchandiseReturnBody = useSelector(
    (state: IStoreState) => state.merchandisesState
  );

  const [allLabels, setAllLabels] = useState<string[]>([]);
  const [label, setLabel] = useState<string[]>([]);
  const [indexState, setIndex] = useState(0);
  const [update, setUpdate] = useState(0);
  const [show, setShow] = useState("none");
  const [loading, setLoading] = useState(false);
  const [priceMin, setPriceMin] = useState("0");
  const [priceMax, setPriceMax] = useState("1000");
  const [localPage, setLocalPage] = useState(1);
  const [sort, setSort] = useState("price");

  const childrenRef: React.MutableRefObject<{
    popUp: (value?: string) => void;
    popClose: () => void;
  }> = useRef() as React.MutableRefObject<{
    popUp: (value?: string) => void;
    popClose: () => void;
  }>;

  useEffect(() => {
    (async function anyNameFunction() {
      await getMerchandises(1);
    })();
    (async function anyNameFunction() {
      const labels: Label[] | null = await getAllLabels("", "");
      const labelChooses: string[] = [];
      labels?.forEach((label) => {
        labelChooses.push(label.labelName);
      });
      if (labels) {
        setAllLabels(labelChooses);
      }
    })();
    return () => {
      (async function anyNameFunction() {
        await updateUserLikeMerchandise();
      })();
    };
  }, []);

  useEffect(() => {
    console.log(merchandisesState);
  }, [merchandisesState]);

  const toForum = (index: number) => {
    history.replace({
      pathname: `/mainPage/merchandise/merchandisePage/${index}`,
    });
  };

  const getMerchandises = async (page?: number) => {
    setLoading(true);
    //set page
    let searchPage = 0;
    if (page) {
      setLocalPage(page);
      searchPage = page;
    } else {
      searchPage = localPage;
    }

    const merchandiseResult = await merchandiseQuery(
      `page=${searchPage}&pageNum=${pageSize}&merchandiseQueryType=${
        MerchandiseQueryType.AUCTIONING
      }&userEmail=${
        loginUser ? loginUser.userEmail : ""
      }&searchLabel=${label.join(
        ","
      )}&priceMin=${priceMin}&priceMax=${priceMax}&sort=${sort}`
    );
    if (merchandiseResult) {
      dispatch({
        payload: merchandiseResult,
        type: MERCHANDISE_INI,
      });
    }
    setLoading(false);
  };

  const auction = (index: number) => {
    if (!loginUser?.userEmail) {
      showAlert(setShow);
    } else {
      setIndex(index);
      childrenRef.current.popUp(merchandisesState.merchandises[index].price);
    }
  };

  const updateAuction = async (value: string) => {
    const newMerchandise: Merchandise =
      merchandisesState.merchandises[indexState];
    newMerchandise.price = value;
    newMerchandise.auctionEmail = loginUser?._id as string;
    await updateMerchandise(newMerchandise);
  };

  const updateMerchandise = async (merchandise: Merchandise) => {
    const result = await merchandiseUpdate(merchandise);
    if (result) {
      childrenRef.current.popClose();
      const merchandises = merchandisesState;
      merchandises.merchandises[+indexState] = merchandise;
      dispatch({
        payload: merchandises,
        type: MERCHANDISES_UPDATE,
      });
      setUpdate(update + 1);
    }
  };

  const saveLike = (index: number) => {
    if (!loginUser?.userEmail) {
      showAlert(setShow);
    } else {
      dispatch({
        payload: index,
        type: MERCHANDISE_UPDATE,
      });
    }
  };

  const updateUserLikeMerchandise = () => {
    dispatch({
      payload: indexState,
      type: LIKE_BODY_SEND_MERCHANDISE,
    });
  };

  const onSelectChange = (e: SelectValue): void => setLabel(e as string[]);

  const onSortChange = (e: SelectValue): void => {
    if (e?.toString()) {
      setSort(e as string);
    }
  };

  /*const onTimeChange = (e: any) => {
    //
  };*/
  const onChange = (e: React.ChangeEvent<Element>): void => {
    const type = (e.target as HTMLInputElement).placeholder;
    switch (type) {
      case "Price Min":
        setPriceMin((e.target as HTMLInputElement).value);
        break;
      case "Price Max":
        setPriceMax((e.target as HTMLInputElement).value);
        break;
    }
  };

  const getMerchandiseDiv = () => {
    if (merchandisesState.merchandises && !loading) {
      return merchandisesState.merchandises.map((merchandise, index) => {
        return (
          <MerchandiseCard key={index}>
            <MerchandiseCardLeft>
              <label onClick={() => toForum(index)}>{merchandise.name}</label>
              <MerchandiseCardLabelP>
                <label>labels</label>
                <p>{merchandise.label.join(",")}</p>
              </MerchandiseCardLabelP>
              <div>
                <div style={{ width: "50%" }}>
                  <p style={{ color: "#ee6fa9" }}>price:</p>
                  <p style={{ width: "20px" }}>{merchandise.price}</p>
                  <AuctionButton onClick={() => auction(index)}>
                    auction
                  </AuctionButton>
                </div>
                <div style={{ width: "30%" }}>
                  <p style={{ color: "#ee6fa9" }}>deadline:</p>
                  <p>{getAuctionTimeDifference(merchandise.auctionLeftTime)}</p>
                </div>
                <IconText style={{ width: "10%" }}>
                  <LikeOutlined style={{ marginTop: "5px" }} />
                  <p>{merchandise.likeNum}</p>
                </IconText>
                <IconText
                  color={merchandise.like ? "red" : "black"}
                  style={{ width: "10%" }}
                  onClick={() => saveLike(index)}
                >
                  <p>save:</p>
                  <SaveOutlined style={{ marginTop: "5px" }} />
                  <p>{merchandise.like}</p>
                </IconText>
              </div>
            </MerchandiseCardLeft>
            <img
              src={(merchandise.imageBodies as ImageBody[])[0].imgBase64}
              style={{ width: "100px", height: "100px" }}
            />
          </MerchandiseCard>
        );
      });
    } else {
      return <Loading />;
    }
  };

  return (
    <>
      <GetAlertDiv
        alert={{
          type: BooleanType.FAIL,
          context: "you can't update without login",
        }}
        show={show}
      />
      <FilterDiv>
        <InputBox
          Title="Label"
          onMultipleSelectChange={onSelectChange}
          type={InputBoxType.MULTIPLE_SELECT}
          options={allLabels}
        />
        <InputBox
          Title="Price Min"
          type={InputBoxType.INPUT}
          onChange={onChange}
          value={priceMin}
        />
        <InputBox
          Title="Price Max"
          type={InputBoxType.INPUT}
          onChange={onChange}
          value={priceMax}
        />
        <InputBox
          Title="Sort By"
          type={InputBoxType.SELECT}
          onChange={onSortChange}
          options={["price", "auctionLeftTime", "likeNum"]}
          value={sort}
        />
        <ButtonDiv>
          <ButtonPrimary onClick={getMerchandises}>Submit</ButtonPrimary>
        </ButtonDiv>
      </FilterDiv>
      {getMerchandiseDiv()}
      <PaginationDiv
        pageSize={pageSize}
        propFn={getMerchandises}
        count={merchandisesState.count}
      />
      <AuctionModel
        childRef={childrenRef}
        value={merchandisesState.merchandises[indexState]?.price as string}
        saveAuction={updateAuction}
      />
    </>
  );
};

export default FilterMerchandise;
