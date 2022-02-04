import { Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import AnimeButton from "../components/Button";
import { ContactUsDiv, InputDiv, TextAreaDiv } from "../cssJs/contactUs";

const ContactUs = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

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
        buttonClick={() => console.log("send")}
      />
    </ContactUsDiv>
  );
};

export default ContactUs;
