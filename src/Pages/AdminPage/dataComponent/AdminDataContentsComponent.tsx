import { Button, DatePicker } from "antd";
import moment from "moment";
import * as React from "react";
import { useState } from "react";
import {
  AdminDataContentDiv,
  AdminDateChildDiv,
  AdminDateDiv,
} from "../../../cssJs/AdminPage/adminCss";

const AdminDataContentComponent = (): JSX.Element => {
  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<number>(0);
  const [resultBody, setResultBody] = useState<
    {
      name: string;
      num: number;
    }[]
  >([]);

  return (
    <AdminDateDiv>
      <AdminDataContentDiv>
        <label>Period: </label>
        <DatePicker
          onChange={(e) => setStartDate(moment(e).toDate().valueOf())}
        />
        -
        <DatePicker
          onChange={(e) => setEndDate(moment(e).toDate().valueOf())}
        />
        <Button>Search</Button>
      </AdminDataContentDiv>
      {resultBody.map((item, index) => {
        return (
          <div key={index}>
            <label>{item.name}</label>
            <label>{item.num}</label>
          </div>
        );
      })}
    </AdminDateDiv>
  );
};

export default AdminDataContentComponent;
