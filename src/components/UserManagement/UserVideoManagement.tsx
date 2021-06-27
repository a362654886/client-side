import * as React from "react";
import { useEffect, useState } from "react";
import { ButtonDiv, ButtonPrimary } from "../../cssJs/publicCss";
import { VideoAddDiv } from "../../cssJs/userManagementCss";
import VideoUploadDiv from "../conponentDivs/videoUploadDiv";
import InputBox from "../InputBox";
import { InputBoxType } from "../../types/EnumTypes";
import { sendFile, sendFileToAws } from "../../helperFns/filesFn";
import { videoAdd, videosGet } from "../../api/videoAPI";
import { User } from "../../types/User";
import { useDispatch, useSelector } from "react-redux";
import { IStoreState } from "../../types/IStoreState";
import { LoadingPercentageType } from "../../types/LoadingType";
import { Progress } from "antd";
import { filesUpload } from "../../api/fileAPI";
import AWS, { AWSError } from "aws-sdk";
import { Video } from "../../types/VideoType";

const UserVideoManagement = (): JSX.Element => {
  const loginUser: User | null = useSelector(
    (state: IStoreState) => state.loginUserState
  );

  const [loading, setLoading] = useState(true);
  const [num, serRefresh] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    (async function anyNameFunction() {
      await getVideos();
    })();
  }, [num]);

  const getVideos = async () => {
    setLoading(true);
    const videosResult = await videosGet(loginUser?.userEmail as string);
    setLoading(false);
    setVideos(videosResult as Video[]);
  };

  const getVideosDiv = () => {
    return (videos as Video[]).map((video, index) => {
      return (
        <div key={index}>
          <h3>{video.videoName}</h3>
          <video width="750" height="500" controls>
            <source src={video.url} type="video/mp4" />
          </video>
        </div>
      );
    });
  };

  return <div>{getVideosDiv()}</div>;
};

export default UserVideoManagement;
