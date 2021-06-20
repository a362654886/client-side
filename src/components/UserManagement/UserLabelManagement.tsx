import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllLabels, userLabelsUpdate } from "../../api/laeblAPI";
import {
  ButtonDiv,
  ButtonPrimary,
  Loading,
  SearchInput,
  Title,
} from "../../cssJs/publicCss";
import {
  LabelButtonBody,
  LabelChooseBody,
  LabelMainBody,
} from "../../cssJs/userManagementCss";
import { LOGIN_USER_UPDATE_LABELS } from "../../redux/loginUser";
import { IStoreState } from "../../types/IStoreState";
import { Label, UpdateLabel, UserLabel } from "../../types/Label";
import { User } from "../../types/User";
import { ChooseButton } from "../conponentDivs/ChooseButton";
import { DisappearButton } from "../conponentDivs/DissappearButton";

const UserLabelManagement = (): JSX.Element => {
  const dispatch = useDispatch();

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [allLabels, setAllLabels] = useState<Label[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [num, serRefresh] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function anyNameFunction() {
      await setLabels();
    })();
  }, []);

  useEffect(() => {
    console.log(loginUser);
  }, [num]);

  const setLabels = async () => {
    setLoading(true);
    const labels: Label[] | null = await getAllLabels("", "");
    const labelChooses: Label[] = [];
    if (loginUser) {
      const userLabels = (loginUser?.labels as UserLabel[]).map(
        (x: any) => x.labelId
      );
      labels?.forEach((label) => {
        if (userLabels.indexOf(label.labelId) != -1) {
          label.ifChoose = true;
        }
        labelChooses.push(label);
      });
      console.log("true");
    } else {
      labels?.forEach((label) => {
        labelChooses.push(label);
      });
      console.log("false");
    }
    if (labels) {
      setAllLabels(labelChooses);
    }
    setLoading(false);
  };

  /*const LabelChooseSet = (localUser: any) => {
    if (localUser) {
      const labels: Label[] = [];
      const userLabels = (localUser?.labels as UserLabel[]).map(
        (x: any) => x[0].labelId
      );
      allLabels.forEach((label) => {
        if (userLabels.indexOf(label.labelId) != -1) {
          label.ifChoose = true;
        }
        labels.push(label);
      });
      setAllLabels(labels);
    }
  };*/

  const onChange = (e: React.ChangeEvent<Element>) => {
    const searchValue = (e.target as HTMLInputElement).value;
    setSearchValue(searchValue);
  };

  const saveLabel = (label: Label) => {
    const labels = allLabels;
    const index: number = labels.indexOf(label);
    labels[index].ifChoose = !labels[index].ifChoose;
    setAllLabels(labels);
    refresh();
  };

  const refresh = () => {
    const n = num + 1;
    serRefresh(n);
  };

  const update = async () => {
    setLoading(true);
    const updateLabels: UpdateLabel[] = allLabels.map((x: Label) => {
      return {
        userEmail: loginUser?.userEmail as string,
        labelId: x.labelId,
        ifChoose: x.ifChoose ? x.ifChoose : (false as boolean),
      };
    });
    await userLabelsUpdate(updateLabels);
    //update login user
    const loginUserLabels: UserLabel[] = [];
    updateLabels.map((x: UpdateLabel) => {
      if (x.ifChoose) {
        loginUserLabels.push({
          _id: (loginUser?.userEmail as string) + x.labelId,
          userEmail: loginUser?.userEmail as string,
          labelId: x.labelId,
        });
      }
    });
    dispatch({
      payload: loginUserLabels,
      type: LOGIN_USER_UPDATE_LABELS,
    });
    refresh();
    setLoading(false);
  };

  const getBody = () => {
    if (!loading) {
      return (
        <>
          <LabelChooseBody>
            <Title>Choose Labels:</Title>
            <div>
              {allLabels.map((label) => {
                if (label.ifChoose) {
                  return (
                    <DisappearButton
                      label={label}
                      onSave={saveLabel}
                      key={label._id}
                      margin="0 0 0 0"
                    ></DisappearButton>
                  );
                }
              })}
            </div>
          </LabelChooseBody>
          <SearchInput placeholder="Search" onChange={onChange} />
          <LabelButtonBody>
            {allLabels.map((label) => {
              if (
                label.labelName
                  .toLocaleLowerCase()
                  .indexOf(searchValue.toLocaleLowerCase()) != -1
              ) {
                return (
                  <ChooseButton
                    label={label}
                    onSave={saveLabel}
                    key={label._id}
                    margin="0 10px 0 0"
                  ></ChooseButton>
                );
              }
            })}
          </LabelButtonBody>
        </>
      );
    } else {
      return <Loading />;
    }
  };

  return (
    <LabelMainBody>
      {getBody()}
      <ButtonDiv>
        <ButtonPrimary onClick={update}>Update</ButtonPrimary>
      </ButtonDiv>
    </LabelMainBody>
  );
};

export default UserLabelManagement;
