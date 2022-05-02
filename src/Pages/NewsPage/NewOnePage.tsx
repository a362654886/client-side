import * as React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { newGet } from "../../api/newsAPI";
import AnimeButton from "../../components/Button";
import LoadingDiv from "../../components/LoadingDiv";
import ShareDiv from "../../components/ShareDiv";
import {
  NewHeaderTitle,
  NewMainBox,
  OneNewButtons,
  OneNewHeader,
  OneNewSource,
  OneNewText,
  OneNewTime,
} from "../../cssJs/newsCss";
import { IStoreState } from "../../types/IStoreState";
import { NewType } from "../../types/NewsType";

interface Para {
  id: string;
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const NewOnePage = (): JSX.Element => {
  const para: Para = useParams();
  const history = useHistory();

  const newsNumber: number | null = useSelector(
    (state: IStoreState) => state.newState
  );

  const [loading, setLoading] = useState(false);
  const [oneNew, setOneNew] = useState<NewType | null>(null);

  useEffect(() => {
    (async function anyNameFunction() {
      await getNew(para.id);
    })();
  }, [para.id]);

  useEffect(() => {
    //
  }, [loading]);

  const getNew = async (id: string) => {
    setLoading(true);
    const newResult = await newGet(id);
    if (newResult) {
      setOneNew(newResult);
    }
    setLoading(false);
  };

  const getTimeString = (time: Date) => {
    const date = new Date(time);
    return `${
      months[date.getMonth()]
    } ${date.getDate()}, ${date.getFullYear()}`;
  };

  const toNext = (id: string) => {
    const idNum = parseInt(id) + 1;
    history.replace(idNum.toString());
  };

  const toPrve = (id: string) => {
    const idNum = parseInt(id) - 1;
    history.replace(idNum.toString());
  };

  const getPrveDiv = () => {
    if (para.id !== "1") {
      return (
        <AnimeButton
          para=""
          text={"PREV"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="white"
          borderColor="#b9b9b9"
          buttonClick={() => toPrve(oneNew ? oneNew._id : "")}
        />
      );
    }
  };

  const getNextDiv = () => {
    if (parseInt(para.id) < (newsNumber ? newsNumber : 0)) {
      return (
        <AnimeButton
          para=""
          text={"Next"}
          width="120px"
          height="32px"
          textColor="black"
          backGroundColor="white"
          borderColor="#b9b9b9"
          buttonClick={() => toNext(oneNew ? oneNew._id : "")}
        />
      );
    }
  };

  return (
    <NewMainBox>
      <NewHeaderTitle>
        <h1>News</h1>
      </NewHeaderTitle>
      {loading ? (
        <>
          <LoadingDiv height="300px" width="300px" />
        </>
      ) : (
        <>
          <OneNewHeader>{oneNew?.header}</OneNewHeader>
          <OneNewTime>
            {getTimeString(oneNew ? oneNew.time : new Date())}
          </OneNewTime>
          <OneNewText
            style={{ marginTop: "16px" }}
            dangerouslySetInnerHTML={{ __html: oneNew ? oneNew.html : "" }}
          ></OneNewText>
          <OneNewSource>
            <h6>Source</h6>
            <p
              onClick={() => {
                window.open(oneNew?.source);
              }}
            >
              {oneNew?.source}
            </p>
          </OneNewSource>
          <ShareDiv marginTop={"24px"} />
          <OneNewButtons>
            <div style={{ display: "flex", margin: "0px auto" }}>
              {getPrveDiv()}
              {getNextDiv()}
            </div>
          </OneNewButtons>
        </>
      )}
    </NewMainBox>
  );
};

export default NewOnePage;
