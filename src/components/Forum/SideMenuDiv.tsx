import { Spin } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { getAllLabels } from "../../api/laeblAPI";
import { platesGet } from "../../api/postAPI";
import { getPoPup, popUpBlock } from "../../components/conponentDivs/PopUpDiv";
import { PlateImg, PlateTag, SideMenu } from "../../cssJs/forumCss";
import { Label } from "../../types/Label";
import { Plate } from "../../types/PostType";

export type LabelBlock = {
  plateName: string;
  labels: popUpBlock[];
};

interface IProps {
  toPage: (value: string) => void;
}

const SideMenuDiv = ({ toPage }: IProps): JSX.Element => {

  const [allPlates, setAllPlates] = useState<Plate[]>([]);
  const [allLabels, setAllLabels] = useState<LabelBlock[]>([]);
  const [allPlateCss, setPlateCss] = useState<string[]>([]);
  const [chooseLabels, setChooseLabels] = useState<JSX.Element>(<></>);
  const [choosePlate, setChoosePlate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function anyNameFunction() {
      await getPlates();
    })();
  }, []);

  const getPlates = async () => {
    //get all plate
    const platesFromBackEnd: Plate[] | null = await platesGet();
    //set plate
    if (platesFromBackEnd) {
      const labels = await labelsGet(platesFromBackEnd);
      setCss(-1);
      setAllPlates(platesFromBackEnd);
      setAllLabels(labels);
    }
    setLoading(true);
  };

  const labelsGet = async (plates: Plate[]) => {
    const plateLabels: LabelBlock[] = [];
    // get all label
    for (const plate of plates) {
      const labels: Label[] | null = await getAllLabels(
        "plate",
        plate.plateName
      );
      if (labels) {
        const popLabels: popUpBlock[] | undefined = labels.map((label) => {
          return {
            name: label.labelName,
            imageBase64: label.imgBase64,
          };
        });
        plateLabels.push({
          plateName: plate.plateName,
          labels: popLabels ? popLabels : [],
        });
      }
    }
    return plateLabels;
  };

  const getLabels = (plateName: string, index: number) => {
    const label = allLabels.find((x: LabelBlock) => x.plateName == plateName);
    const para = label ? label.labels : [];
    const labelDiv = getPoPup(para, 2, toPage, mouseLeave);
    labelDiv == null ? setChooseLabels(<></>) : setChooseLabels(labelDiv);
    setChoosePlate(plateName);
    //set css
    setCss(index);
  };

  const mouseLeave = () => {
    setCss(-1);
    setChooseLabels(<></>);
  };

  const getLabel = (plateName: string) => {
    if (plateName == choosePlate) {
      return chooseLabels;
    }
  };

  const setCss = (index: number) => {
    const plateCss = allPlateCss.map(() => "#ee6fa9");
    if (index != -1) {
      plateCss[index] = "white";
    }
    setPlateCss(plateCss);
  };

  const getColor = (color: string) => (color == "white" ? "black" : "white");

  const getBody = () => {
    if (loading) {
      return (
        <>
          <SideMenu onMouseLeave={() => mouseLeave()}>
            {allPlates.map((plate, index) => {
              return (
                <PlateTag
                  key={plate._id}
                  style={{
                    backgroundColor: allPlateCss[index],
                    color: getColor(allPlateCss[index]),
                  }}
                >
                  <div
                    style={{
                      height: "115px",
                    }}
                    onMouseEnter={() => getLabels(plate.plateName, index)}
                  >
                    <PlateImg
                      src={"data:image/jpeg;base64," + plate.imgBase64}
                    />
                    <a>{plate.plateName}</a>
                  </div>
                  {getLabel(plate.plateName)}
                </PlateTag>
              );
            })}
          </SideMenu>
        </>
      );
    } else {
      return <Spin tip="Loading..."></Spin>;
    }
  };

  return <>{getBody()}</>;
};

export default SideMenuDiv;
