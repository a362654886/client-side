import { Button, Input, Spin } from "antd";
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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async function anyNameFunction() {
      setLoading(true);
      const users = await userAdminGet();
      if (users) {
        setUsers(users);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users, loading]);

  const editEmail = async (id: string, role: string) => {
    setLoading(true);
    await userAdminUpdate(id, role);
    const users = await userAdminGet();
    if (users) {
      setUsers(users);
    }
    setLoading(false);
  };

  return (
    <AdminAnimeDiv>
      <AdminAuthorizationDiv>
        <h6>Authorize an user into the Admin group</h6>
        <p>
          The Admin group can access the Admin background and own full
          permissions to manage all content on AnimePark.com.
        </p>
        <p>
          Users added to the Admin group must first be registered users of
          AnimePark.com, then they can log in admin background with the account
          and password of AnimePark.com
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
        {loading ? (
          <Spin />
        ) : (
          users.map((user) => {
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
          })
        )}
      </AdminAuthorizationDiv>
    </AdminAnimeDiv>
  );
};

export default AdminAdminAuthorization;
