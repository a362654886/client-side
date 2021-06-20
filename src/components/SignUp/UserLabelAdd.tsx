import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getAllLabels, userLabelsAdd } from "../../api/laeblAPI";
import {
  ButtonDiv,
  ButtonPrimary,
  SearchInput,
  Title,
} from "../../cssJs/publicCss";
import { NewUserBody, NEW_USER_BACK } from "../../redux/newUser";
import { NewUserType } from "../../types/EnumTypes";
import { IStoreState } from "../../types/IStoreState";
import { Label, UserLabel } from "../../types/Label";
import { ChooseButton } from "../conponentDivs/ChooseButton";
import { DisappearButton } from "../conponentDivs/DissappearButton";

const MainBody = styled.div`
  margin: 1rem;
`;

const ChooseBody = styled.div`
  margin: 1rem;
  display: flex;
`;

const ButtonBody = styled.div`
  margin: 1rem;
  height: 300px;
  background-color: #fff5f6;
`;

const UserLabelAdd = (): JSX.Element => {
  const dispatch = useDispatch();

  const [allLabels, setAllLabels] = useState<Label[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [num, serRefresh] = useState(0);

  const newUserState: NewUserBody = useSelector(
    (state: IStoreState) => state.newUserState
  );

  useEffect(() => {
    (async function anyNameFunction() {
      const labels: Label[] | null = await getAllLabels("","");
      const labelChooses: Label[] = [];
      labels?.forEach((label) => {
        labelChooses.push(label);
      });
      if (labels) {
        setAllLabels(labelChooses);
      }
    })();
  }, []);

  useEffect(() => {
    //console.log("rrrr");
  }, [num]);

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

  const onChange = (e: React.ChangeEvent<Element>) => {
    const searchValue = (e.target as HTMLInputElement).value;
    setSearchValue(searchValue);
  };

  const saveLabels = async () => {
    const userLabels: UserLabel[] = [];
    allLabels.forEach((label) => {
      if (label.ifChoose) {
        const userLabel: UserLabel = {
          _id: newUserState.user?.userEmail + label.labelName,
          userEmail: newUserState.user?.userEmail as string,
          labelId: label._id,
        };
        userLabels.push(userLabel);
      }
    });
    await userLabelsAdd(userLabels);
    dispatch({
      payload: {
        state: NewUserType.BACK,
        user: null,
      },
      type: NEW_USER_BACK,
    });
  };

  return (
    <MainBody>
      <ChooseBody>
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
      </ChooseBody>
      <SearchInput placeholder="Search" onChange={onChange} />
      <ButtonBody>
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
      </ButtonBody>
      <ButtonDiv>
        <ButtonPrimary onClick={saveLabels}>Submit</ButtonPrimary>
      </ButtonDiv>
    </MainBody>
  );
};

export default UserLabelAdd;
