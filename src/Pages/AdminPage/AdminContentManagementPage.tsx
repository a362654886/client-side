import * as React from "react";
import {
  AdminDateChildDiv,
  AdminDateDiv,
  AdminPageDiv,
} from "../../cssJs/AdminPage/adminCss";

const AdminContentManagementPage = (): JSX.Element => {
  return (
    <AdminDateDiv>
      <AdminDateChildDiv>
        <h6>Account: info@animepark.com</h6>
      </AdminDateChildDiv>
      <AdminDateChildDiv>
        <h6>Password: NUBQDE8c</h6>
      </AdminDateChildDiv>
      <AdminDateChildDiv>
        <h6>
          Link:{" "}
          <a
            href={`https://analytics.google.com/analytics/web/?authuser=5#/p318774988/realtime/overview?params=_u..nav%3Dmaui&collectionId=user`}
          >
            Google/analyst
          </a>
        </h6>
      </AdminDateChildDiv>
    </AdminDateDiv>
  );
};

export default AdminContentManagementPage;
