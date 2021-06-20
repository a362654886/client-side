import * as React from "react";
import { useEffect, useState } from "react";
import { getAllLabels } from "../../api/laeblAPI";
import { platesGet } from "../../api/postAPI";
import {
  ButtonDelete,
  OnePlateDiv,
  OnePlateImg,
  OnePlateText,
  OnePostDiv,
  PlateImg,
  PlateManagementDiv,
  PlateManagementText,
  PostsManagement,
} from "../../cssJs/ManagementCss";
import { Label } from "../../types/Label";
import { Plate } from "../../types/PostType";

const PlateManagement = (): JSX.Element => {
  const [num, serRefresh] = useState(0);
  const [allPlates, setAllPlates] = useState<Plate[]>([]);
  const [allLabels, setAllLabels] = useState<Label[]>([]);
  const [plateLabels, setPlateAllLabels] = useState<Label[]>([]);

  useEffect(() => {
    (async function anyNameFunction() {
      await getPlates();
      await getLabels();
    })();
  }, []);

  useEffect(() => {
    //console.log(allPlates);
    //console.log(allLabels);
    //console.log(plateLabels);
  }, [num]);

  const getPlates = async () => {
    //get all plate
    let platesFromBackEnd: Plate[] | null = await platesGet();
    platesFromBackEnd = (platesFromBackEnd as Plate[]).map((plate) => {
      plate.showPost = false;
      return plate;
    });
    //set plate
    if (platesFromBackEnd) {
      setAllPlates(platesFromBackEnd);
    }
    refresh();
  };

  const getLabels = async () => {
    const labels: Label[] | null = await getAllLabels("plate", "");
    if (labels) {
      setAllLabels(labels);
    }
    refresh();
  };

  const showLabels = async (plateId: string) => {
    const labels: Label[] = [];
    allLabels.forEach((label: Label) => {
      if (label.plateId == plateId) {
        labels.push(label);
      }
    });
    setPlateAllLabels(labels);
    //set choose label boolean
    const plates = allPlates.map((plate) => {
      plate.plateId == plateId
        ? (plate.showPost = true)
        : (plate.showPost = false);
      return plate;
    });
    setAllPlates(plates);
    refresh();
  };

  const refresh = () => {
    const n = num + 1;
    serRefresh(n);
  };

  const getDisplay = (display: boolean) =>
    display ? { display: "block" } : { display: "none" };

  return (
    <PlateManagementDiv>
      <PlateManagementText>PLATES:</PlateManagementText>
      {allPlates.map((plate, index) => {
        return (
          <>
            <OnePlateDiv key={index}>
              <OnePlateImg>
                <PlateImg src={"data:image/jpeg;base64," + plate.imgBase64} />
              </OnePlateImg>
              <OnePlateText>
                <p onClick={() => showLabels(plate.plateId)}>
                  {plate.plateName}
                </p>
              </OnePlateText>
              <ButtonDelete style={{ bottom: "35px", right: "5px" }}>
                UPDATE
              </ButtonDelete>
              <ButtonDelete style={{ bottom: "5px", right: "5px" }}>
                DELETE
              </ButtonDelete>
            </OnePlateDiv>
            <PostsManagement style={getDisplay(plate.showPost as boolean)}>
              <PlateManagementText>LABELS:</PlateManagementText>
              {plateLabels.map((label, index) => {
                return (
                  <OnePostDiv key={index}>
                    <OnePlateImg>
                      <PlateImg
                        src={"data:image/jpeg;base64," + label.imgBase64}
                      />
                    </OnePlateImg>
                    <OnePlateText>
                      <p>{label.labelName}</p>
                    </OnePlateText>
                    <ButtonDelete style={{ bottom: "35px", right: "5px" }}>
                      UPDATE
                    </ButtonDelete>
                    <ButtonDelete style={{ bottom: "5px", right: "5px" }}>
                      DELETE
                    </ButtonDelete>
                  </OnePostDiv>
                );
              })}
            </PostsManagement>
          </>
        );
      })}
    </PlateManagementDiv>
  );
};

export default PlateManagement;
