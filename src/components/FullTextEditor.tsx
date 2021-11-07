import * as React from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import loading from "../files/loading.gif";

interface IProps {
  html: string;
  setFullText: (html: string) => void;
}

const FullTextEditor = ({ html, setFullText }: IProps): JSX.Element => {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];

  return (
    <>
      <ReactQuill
        theme={"snow"}
        onChange={(e) => setFullText(e)}
        value={html}
        modules={modules}
        formats={formats}
        bounds={".app"}
        placeholder={"Say something"}
      />
    </>
  );
};

export default FullTextEditor;
