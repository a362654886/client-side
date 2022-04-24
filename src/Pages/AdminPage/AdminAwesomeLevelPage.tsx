import * as React from "react";
import { useEffect, useState } from "react";
import { awesomeLevelAllGet } from "../../api/awesomeLevelAPI";
import { AnimeButton } from "../../components/Button";
import { AdminAnimeDiv, ButtonsDiv } from "../../cssJs/AdminPage/adminAdminCss";
import { AwesomeLevelType } from "../../types/awesomeLevel";
import AwesomeCreatComponent from "./AwesomeComponent/AwesomeCreatComponent";
import AwesomeManageComponent from "./AwesomeComponent/AwesomeManageComponent";

const AdminAwesomeLevelPage = (): JSX.Element => {
  const [buttonString, setButton] = useState<string>("Create");
  const [allAwesomeLevels, setAllAwesomeLevels] = useState<AwesomeLevelType[]>(
    []
  );

  useEffect(() => {
    (async function anyNameFunction() {
      getAll();
    })();
  }, []);

  useEffect(() => {
    //toPage("adminManagement/News")
  }, [buttonString]);

  const getAll = async () => {
    const awesomeLevels = await awesomeLevelAllGet();
    setAllAwesomeLevels(awesomeLevels);
  };

  const getAminComponent = () => {
    return buttonString == "Create" ? (
      <AwesomeCreatComponent
        num={allAwesomeLevels ? allAwesomeLevels.length : 0}
        update={() => getAll()}
      />
    ) : (
      <AwesomeManageComponent
        awesomeLevels={allAwesomeLevels}
        update={(levels: AwesomeLevelType[]) => setAllAwesomeLevels(levels)}
      />
    );
  };

  return (
    <AdminAnimeDiv>
      <ButtonsDiv>
        <div>
          <AnimeButton
            para=""
            text={`Create`}
            width="120px"
            height="32px"
            textColor="black"
            backGroundColor="#AAFFC9"
            borderColor="#AAFFC9"
            buttonClick={() => setButton(`Create`)}
          />
        </div>
        <div>
          <AnimeButton
            para=""
            text={`Manage`}
            width="120px"
            height="32px"
            textColor="black"
            backGroundColor="white"
            borderColor="black"
            buttonClick={() => setButton(`Manage`)}
          />
        </div>
      </ButtonsDiv>
      <div>{getAminComponent()}</div>
    </AdminAnimeDiv>
  );
};

export default AdminAwesomeLevelPage;
