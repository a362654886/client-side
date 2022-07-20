import { Button, Input } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { userAdminGet, userAdminUpdate } from "../../api/userApi";
import AnimeButton from "../../components/Button";
import {
  AdminAnimeDiv,
  AdminAuthorizationDiv,
} from "../../cssJs/AdminPage/adminAdminCss";
import { User } from "../../types/User";

const AdminAdminAuthorization = (): JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    (async function anyNameFunction() {
      const users = await userAdminGet();
      if (users) {
        setUsers(users);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  const editEmail = async (id: string, role: string) => {
    await userAdminUpdate(id, role);
    const users = await userAdminGet();
    if (users) {
      setUsers(users);
    }
  };

  return (
    <AdminAnimeDiv>
      <AdminAuthorizationDiv>
        <h6>Authorize an user into the Admin group</h6>
        <p>
          The Admin group can access the Admin background and own full
          permissions to manage all content on AnimePark.com.
        </p>
        <div style={{ display: "flex", marginBottom: "30px" }}>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          <AnimeButton
            para=""
            text={"Add"}
            width="120px"
            height="32px"
            textColor="white"
            backGroundColor="#FFC300"
            borderColor="#FFC300"
            buttonClick={() => editEmail(email, "admin")}
          />
        </div>
        <h6>User list of the Admin group</h6>
        {users.map((user) => {
          return (
            <>
              <div style={{ display: "flex" }}>
                <p style={{ width: "250px" }}>{user.userEmail}</p>
                <Button onClick={() => editEmail(user.userEmail, "")}>
                  Delete
                </Button>
              </div>
            </>
          );
        })}
      </AdminAuthorizationDiv>
    </AdminAnimeDiv>
  );
};

export default AdminAdminAuthorization;
