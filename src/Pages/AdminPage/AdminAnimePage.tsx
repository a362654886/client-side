import * as React from "react";
import { useEffect, useState } from "react";
import AnimeButton from "../../components/Button";
import { AdminAnimeDiv, ButtonsDiv } from "../../cssJs/AdminPage/adminAdminCss";
import { Anime } from "../../types/Amine";
import AdminCreatComponent from "./animinComponent/AdminCreatComponent";
import AdminEditComponent from "./animinComponent/AdminEditComponent";
import AdminSearch from "./animinComponent/AdminSearch";

const AdminAnimeCreatePage = (): JSX.Element => {
  const [buttonString, setButton] = useState<string>("Create");
  const [edit, setEdit] = useState<boolean>(false);
  const [editAnime, setEditAnime] = useState<Anime | null>(null);

  const menu = ["Create", "Search"];

  useEffect(() => {
    setEdit(false);
    setEditAnime(null);
  }, []);

  useEffect(() => {
    //toPage("adminManagement/News")
  }, [buttonString, edit]);

  const onEdit = (anime: Anime) => {
    setEditAnime(anime);
    setEdit(true);
  };

  const tabButton = (value: string) => {
    setEdit(false);
    setEditAnime(null);
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
        <AdminCreatComponent editAnime={onEdit} />
      ) : (
        <AdminSearch editAnime={onEdit} />
      );
    } else {
      return <AdminEditComponent anime={editAnime as Anime} />;
    }
  };

  return (
    <AdminAnimeDiv>
      <ButtonsDiv>{getButtonComponentDiv()}</ButtonsDiv>
      <div>{getAminComponent()}</div>
    </AdminAnimeDiv>
  );
};

export default AdminAnimeCreatePage;
