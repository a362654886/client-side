import { Button, Select } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  EpisodeButtonDiv,
  EpisodeModalDiv,
  EpisodeSelectDiv,
} from "../../cssJs/ShowCasePage/EpisodeCss";
import editIcon from "../../files/editIcon.svg";
import deleteIcon from "../../files/deleteIcon.svg";

export interface IProps {
  episodeNum: number;
}

const { Option } = Select;

const EpisodeEditModal = ({ episodeNum }: IProps): JSX.Element => {
  const history = useHistory();

  const [episode, setEpisode] = useState("1");

  useEffect(() => {
    console.log(episodeNum);
  }, []);

  const editFn = () => {
    history.replace({
      pathname: "/mainPage/showcase/episodeEdit",
      state: { type: episode },
    });
  };

  return (
    <EpisodeModalDiv>
      <EpisodeSelectDiv>
        <Select
          defaultValue={"Episodes"}
          onSelect={(e) => setEpisode(e as string)}
        >
          {Array.from({ length: episodeNum + 1 }, (v, k) => k).map(
            (value: number, index: number): JSX.Element => {
              return (
                <Option key={index} value={value}>
                  {value + 1}
                </Option>
              );
            }
          )}
        </Select>
      </EpisodeSelectDiv>
      <EpisodeButtonDiv>
        <Button onClick={() => editFn()}>
          <img src={editIcon} />
          edit
        </Button>
        <Button onClick={() => console.log("delete")}>
          <img src={deleteIcon} />
          Delete
        </Button>
      </EpisodeButtonDiv>
    </EpisodeModalDiv>
  );
};

export default EpisodeEditModal;
