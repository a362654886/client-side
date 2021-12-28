import { Button, Select } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
    <div style={{ display: "flex" }}>
      <Select defaultValue={"1"} onSelect={(e) => setEpisode(e as string)}>
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
      <Button onClick={() => editFn()}>edit</Button>
    </div>
  );
};

export default EpisodeEditModal;
