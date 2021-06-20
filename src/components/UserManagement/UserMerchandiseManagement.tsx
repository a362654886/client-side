import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { merchandiseDelete, merchandisesGet } from "../../api/merchandiseApi";
import { FlexBody, Loading } from "../../cssJs/publicCss";
import {
  IconButtonDelete,
  MerchandiseMessageManagement,
  MerchandisePart,
  OneMerchandise,
  OneMerchandiseText,
  OneMerchandiseTitle,
} from "../../cssJs/userManagementCss";
import { IStoreState } from "../../types/IStoreState";
import { Merchandise } from "../../types/MerchandiseType";
import { User } from "../../types/User";
import { DeleteOutlined } from "@ant-design/icons";
import { PaginationDiv } from "../conponentDivs/Pagination";

const pageSize = 5;

const UserMerchandiseManagement = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [num, serRefresh] = useState(0);
  const [merchandises, setMerchandises] = useState<Merchandise[]>([]);

  useEffect(() => {
    (async function anyNameFunction() {
      await getMerchandises();
    })();
  }, [num]);

  const getMerchandises = async () => {
    setLoading(true);
    const merchandiseResult = await merchandisesGet(
      1,
      10,
      "null",
      loginUser?.userEmail as string,
      "userMerchandise"
    );
    console.log(merchandiseResult);
    setLoading(false);
    setMerchandises(merchandiseResult?.merchandises as Merchandise[]);
    setCount(merchandiseResult?.count as number);
  };

  const deleteMerchandise = async (merchandiseId: string) => {
    setLoading(true);
    await merchandiseDelete(merchandiseId);
    refresh();
    setLoading(false);
  };

  const refresh = () => {
    const n = num + 1;
    serRefresh(n);
  };

  const getBody = () => {
    if (!loading) {
      return merchandises.map((merchandise, index) => {
        return (
          <OneMerchandise key={index}>
            <FlexBody>
              <MerchandisePart style={{ width: "50%" }}>
                <OneMerchandiseTitle>name:</OneMerchandiseTitle>
                <OneMerchandiseText>{merchandise.name}</OneMerchandiseText>
              </MerchandisePart>
              <MerchandisePart style={{ width: "25%" }}>
                <OneMerchandiseTitle>price:</OneMerchandiseTitle>
                <OneMerchandiseText>{merchandise.price}</OneMerchandiseText>
              </MerchandisePart>
            </FlexBody>
            <FlexBody>
              <MerchandisePart style={{ width: "50%" }}>
                <OneMerchandiseTitle>likeNum:</OneMerchandiseTitle>
                <OneMerchandiseText>{merchandise.likeNum}</OneMerchandiseText>
              </MerchandisePart>
              <MerchandisePart style={{ width: "50%" }}>
                <OneMerchandiseTitle>leftTime:</OneMerchandiseTitle>
                <OneMerchandiseText>
                  {merchandise.auctionLeftTime}
                </OneMerchandiseText>
              </MerchandisePart>
            </FlexBody>
            <FlexBody>
              <MerchandisePart style={{ width: "90%" }}>
                <OneMerchandiseTitle>labels:</OneMerchandiseTitle>
                <OneMerchandiseText>{merchandise.label}</OneMerchandiseText>
              </MerchandisePart>
              <IconButtonDelete
                type="primary"
                shape="circle"
                icon={<DeleteOutlined />}
                onClick={() => {
                  deleteMerchandise(merchandise._id);
                }}
              />
            </FlexBody>
          </OneMerchandise>
        );
      });
    } else {
      return <Loading />;
    }
  };

  return (
    <MerchandiseMessageManagement>
      {getBody()}
      <PaginationDiv
        pageSize={pageSize}
        propFn={getMerchandises}
        count={count}
      />
    </MerchandiseMessageManagement>
  );
};

export default UserMerchandiseManagement;
