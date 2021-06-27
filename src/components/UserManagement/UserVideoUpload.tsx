import * as React from "react";
import { useEffect, useState } from "react";
import { ButtonDiv, ButtonPrimary } from "../../cssJs/publicCss";
import { VideoAddDiv } from "../../cssJs/userManagementCss";
import VideoUploadDiv from "../conponentDivs/videoUploadDiv";
import InputBox from "../InputBox";
import { InputBoxType } from "../../types/EnumTypes";
import { sendFile } from "../../helperFns/filesFn";
import { videoAdd } from "../../api/videoAPI";
import { User } from "../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "../../types/IStoreState";
import { LoadingPercentageType } from "../../types/LoadingType";
import { Progress } from "antd";
import { filesUpload } from "../../api/fileAPI";

const UserVideoUpload = (): JSX.Element => {
  const dispatch = useDispatch();

  const [videoName, setVideoName] = useState("");
  const [videoUrl, setVideoUrl] = useState<FileList | null>(null);
  const [loading, setLoading] = useState<number>(0);

  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const loadingState: LoadingPercentageType | null = useSelector(
    (state: IStoreState) => state.loadingState
  );

  useEffect(() => {
    const percentageString = (loadingState.now / loadingState.total).toFixed(2);
    const percentageNum = Number(percentageString);
    setLoading(percentageNum*100);
    console.log(loading);
  }, [loadingState]);

  const setVideo = (value: FileList | null) => {
    setVideoUrl(value);
  };

  const submit = async () => {
    if (videoUrl) {
      await sendFile(videoUrl, dispatch);
      await filesUpload();
      await videoAdd({
        _id: loginUser?.userEmail + videoName,
        videoId: loginUser?.userEmail + videoName,
        videoName: videoName,
        userEmail: loginUser?.userEmail as string,
        url: `https://animevideobucket.s3.amazonaws.com/${videoUrl[0].name}`,
      });
    }
  };

  const onChange = (e: React.ChangeEvent<Element>): void =>
    setVideoName((e.target as HTMLInputElement).value);

  const getPercentage = () => {
    if (loading != 0) {
      return <Progress percent={loading} />;
    }
  };

  return (
    <VideoAddDiv>
      <InputBox
        Title="Video Name"
        onChange={onChange}
        type={InputBoxType.INPUT}
        value={videoName}
      />
      <VideoUploadDiv setVideo={setVideo} />
      {getPercentage()}
      <ButtonDiv>
        <ButtonPrimary onClick={submit}>Submit</ButtonPrimary>
      </ButtonDiv>
    </VideoAddDiv>
  );
};

export default UserVideoUpload;
