import * as React from "react";
import { useEffect, useState } from "react";
import { AnimeButton } from "../../components/Button";
import { AdminAnimeDiv, ButtonsDiv } from "../../cssJs/AdminPage/adminAdminCss";
import { NewType } from "../../types/NewsType";
import NewEditComponent from "./newsComponent/NewEditComponent";
import NewsCreatComponent from "./newsComponent/NewsCreatComponent";
import NewsSearch from "./newsComponent/NewsSearch";

const AdminNewsCreatePage = (): JSX.Element => {
  const [buttonString, setButton] = useState<string>("Create");
  const [edit, setEdit] = useState<boolean>(false);
  const [editNew, setEditNew] = useState<NewType | null>(null);

  const menu = ["Create", "Search"];

  useEffect(() => {
    setEdit(false);
    setEditNew(null);
  }, []);

  useEffect(() => {
    //toPage("adminManagement/News")
  }, [buttonString, edit]);

  const onEdit = (anime: NewType) => {
    setEditNew(anime);
    setEdit(true);
  };

  const tabButton = (value: string) => {
    setEdit(false);
    setEditNew(null);
    setButton(value);
  };

  const getButtonComponentDiv = () => {
    return menu.map((menuString: string, index: number) => {
      if (menuString == buttonString) {
        return (
          <div key={index}>
            <AnimeButton
              para=""
              text={menuString}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="#F6F6F6"
              borderColor="white"
              buttonClick={() => tabButton(menu[index])}
            />
          </div>
        );
      } else {
        return (
          <div key={index}>
            <AnimeButton
              para=""
              text={menuString}
              width="120px"
              height="32px"
              textColor="black"
              backGroundColor="white"
              borderColor="black"
              buttonClick={() => tabButton(menu[index])}
            />
          </div>
        );
      }
    });
  };

  const getAminComponent = () => {
    if (!edit) {
      return buttonString == "Create" ? (
        <NewsCreatComponent />
      ) : (
        <NewsSearch editNew={onEdit} />
      );
    } else {
      return <NewEditComponent newBody={editNew as NewType} />;
    }
  };

  return (
    <AdminAnimeDiv>
      <ButtonsDiv>{getButtonComponentDiv()}</ButtonsDiv>
      <div>{getAminComponent()}</div>
    </AdminAnimeDiv>
  );
};

export default AdminNewsCreatePage;
