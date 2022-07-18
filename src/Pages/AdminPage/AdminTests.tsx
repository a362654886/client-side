import * as React from "react";
import {
  AdminAnimeDiv,
  AdminTestsDiv,
} from "../../cssJs/AdminPage/adminAdminCss";
import { openNewWindowBlank } from "../../helperFns/windowsFn";

const AdminTests = (): JSX.Element => {
  return (
    <AdminAnimeDiv>
      <AdminTestsDiv>
        <p>
          When you need to change or add functions and pages to the website:{" "}
        </p>
        <p>1. get in touch with the programmer, describe your demand clearly</p>
        <p>
          2. test the changes in the test version, and report the problems to
          the programmer
        </p>
        <p>
          3. test until you find no problems, then tell the programmer to
          release the changes into the online version of the website
        </p>
        <div>
          <p>Test version address:</p>
          <p
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => {
              openNewWindowBlank(
                `https://test.d1tfhisxi3ixek.amplifyapp.com/home`
              );
            }}
          >
            https://test.d1tfhisxi3ixek.amplifyapp.com/home
          </p>
        </div>
        <p>
          A test version is a version of the website that only can be visited by
          you and the programmer. You need to test in the test context because,
          before all the users experience the changes, you need to:
        </p>
        <p>1. confirm the changes are done as you expect</p>
        <p>
          2. ensure the changes do not cause new problems in the features which
          run well before
        </p>
        <p>
          {`3. ensure the website's regular operation during the modification
          process`}
        </p>
        <p>Simply relying on a programmer may not be a smart choice.</p>
      </AdminTestsDiv>
    </AdminAnimeDiv>
  );
};

export default AdminTests;
