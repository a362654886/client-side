import { Button, DatePicker } from "antd";
import moment from "moment";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dataContentAllGet } from "../../../api/dataContentAPI";
import {
  AdminDataContentDiv,
  AdminDataItemName,
  AdminDataItemsDiv,
  AdminDateDiv,
} from "../../../cssJs/AdminPage/adminCss";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { LoadingType } from "../../../types/EnumTypes";

const AdminDataContentComponent = (): JSX.Element => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<number>(0);
  const [resultBody, setResultBody] = useState<
    {
      name: string;
      num: number;
    }[]
  >([]);

  useEffect(() => {
    //
  }, [resultBody]);

  const getDataContents = async () => {
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    const result = await dataContentAllGet(startDate, endDate);
    setResultBody(result);
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  return (
    <AdminDateDiv>
      <AdminDataContentDiv>
        <label style={{ fontWeight: "bold" }}>Period: </label>
        <DatePicker
          onChange={(e) => setStartDate(moment(e).toDate().valueOf())}
        />
        -
        <DatePicker
          onChange={(e) => setEndDate(moment(e).toDate().valueOf())}
        />
        <Button onClick={() => getDataContents()}>Search</Button>
      </AdminDataContentDiv>
      {resultBody.map((item, index) => {
        return (
          <AdminDataItemsDiv key={index}>
            <AdminDataItemName>{item.name}</AdminDataItemName>
            <label style={{ color: "#4BA3C3" }}>{item.num}</label>
          </AdminDataItemsDiv>
        );
      })}
    </AdminDateDiv>
  );
};

export default AdminDataContentComponent;
