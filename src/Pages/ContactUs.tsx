import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import * as React from "react";
import { useState } from "react";
import { emailPost } from "../api/emailAPI";
import AnimeButton from "../components/Button";
import { ContactUsDiv, InputDiv, TextAreaDiv } from "../cssJs/contactUs";
import { popUpAPIResult } from "../helperFns/popUpAlert";

const ContactUs = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const sendEmail = async () => {
    await popUpAPIResult<Promise<number | null>>(
      emailPost(
        `leolupersonal@gmail.com`,
        `
        name: ${name},
        email:${email},
        title:${title},
        message:${message}
      `
      ),
      "send email fail",
      () => {
        //
      }
    );
  };

  return (
    <ContactUsDiv>
      <h1>Contact Us</h1>
      <InputDiv>
        <h3>Name</h3>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </InputDiv>
      <InputDiv>
        <h3>Email</h3>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </InputDiv>
      <InputDiv>
        <h3>Title</h3>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </InputDiv>
      <TextAreaDiv>
        <h3>Message</h3>
        <TextArea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </TextAreaDiv>
      <AnimeButton
        para=""
        text={"Send"}
        width="120px"
        height="32px"
        textColor="white"
        backGroundColor="#FFC300"
        borderColor="#FFC300"
        buttonClick={() => sendEmail()}
      />
    </ContactUsDiv>
  );
};

export default ContactUs;
