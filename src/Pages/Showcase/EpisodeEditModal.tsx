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
import { ShowCaseType } from "../../types/showCaseType";
import { IStoreState } from "../../types/IStoreState";
import { useDispatch, useSelector } from "react-redux";
import { episodeDelete } from "../../api/episodeAPI";
import { LoadingType } from "../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../redux/loading";

export interface IProps {
  episodeNum: number;
  deleteEpidose: () => void;
}

const { Option } = Select;

const EpisodeEditModal = ({
  episodeNum,
  deleteEpidose,
}: IProps): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const manga: ShowCaseType | null = useSelector(
    (state: IStoreState) => state.mangaState
  );

  const [episode, setEpisode] = useState("1");
  const [episodeTotal, setEpisodeTotal] = useState(episodeNum);

  useEffect(() => {
    setEpisode(episodeNum.toString());
  }, []);

  const editFn = () => {
    history.push({
      pathname: "/showcase/episodeEdit",
      state: { type: episode },
    });
  };

  const deleteEpisode = async () => {
    const epidoseId = `${manga?._id}Episode${episode}`;
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    await episodeDelete(epidoseId);
    setEpisodeTotal(episodeTotal - 1);
    deleteEpidose();
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  return (
    <EpisodeModalDiv>
      <EpisodeSelectDiv>
        <Select
          defaultValue={"Episodes"}
          onSelect={(e: string) => setEpisode(e as string)}
          style={{ width: 200 }}
        >
          <Option key={"Episodes"} value={"Episodes"}>
            {"Episodes"}
          </Option>
          {Array.from({ length: episodeTotal }, (v, k) => k).map(
            (value: number, index: number): JSX.Element => {
              return (
                <Option key={index} value={value + 1}>
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
        <Button onClick={() => deleteEpisode()}>
          <img src={deleteIcon} />
          Delete
        </Button>
      </EpisodeButtonDiv>
    </EpisodeModalDiv>
  );
};

export default EpisodeEditModal;
