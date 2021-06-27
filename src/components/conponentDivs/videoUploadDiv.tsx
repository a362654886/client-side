import * as React from "react";
import { ChangeEvent } from "react";
import styled from "styled-components";
import { ImageBody } from "../../types/BasicType";

type ImageCheck = {
  width: number;
  height: number;
};

export const ImageUploadBody = styled.div`
  display: flex;
`;

export const Title = styled.div`
  width: 150px;
  height: 28px;
  line-height: 28px;
  background-color: #ee6fa9;
  border-radius: 15px 0 0 15px;
  label {
    text-align: center;
    padding-top: 1px;
    padding-left: 25px;
    color: white;
  }
`;

export const InputBody = styled.input`
  height: 28px;
  width: 80%;
`;

interface IProps {
  setVideo: (value: FileList | null) => void;
}

const VideoUploadDiv = ({ setVideo }: IProps): JSX.Element => {
  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files: FileList | null = (e.target as HTMLInputElement).files;
    setVideo(files);
  };

  const getBase64file = (file: File) => {
    return new Promise((resolve: (value: string) => void) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        resolve(reader.result as string);
      };
    });
  };

  return (
    <ImageUploadBody>
      <Title>
        <label>video Upload</label>
      </Title>
      <InputBody type="file" onChange={(e) => handleImageChange(e)} />
    </ImageUploadBody>
  );
};

export default VideoUploadDiv;
