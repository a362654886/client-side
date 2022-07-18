import * as React from "react";
import { testSendEmails } from "../../api/autoReplyAPI";
import AnimeButton from "../../components/Button";
import {
  AdminAnimeDiv,
  AdminNotificationEmailDiv,
} from "../../cssJs/AdminPage/adminAdminCss";

const AdminNotificationEmail = (): JSX.Element => {
  return (
    <AdminAnimeDiv>
      <AdminNotificationEmailDiv>
        <p>
          Notification emails are automatically sent weekly to the users who opt
          to receive certain type of notifications. The email content is
          formatly generated by system, telling the users if other users have
          engaged with them in the week, based on users’ personalized settings.
        </p>
        <p>
          The emails normally do not require a manual operation to send out.
          Once click the button, all users will receive a notification email in
          a minute, which is not suggested.{" "}
        </p>
        <p>
          Take an action carefully only when you suspect the emails are not sent
          automatically.
        </p>
        <AnimeButton
          para=""
          text={"Send Notification emails"}
          width="230px"
          height="32px"
          textColor="black"
          backGroundColor="white"
          borderColor="black"
          buttonClick={() => testSendEmails()}
        />
      </AdminNotificationEmailDiv>
    </AdminAnimeDiv>
  );
};

export default AdminNotificationEmail;
