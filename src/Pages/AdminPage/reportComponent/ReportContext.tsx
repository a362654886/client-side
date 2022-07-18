import * as React from "react";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useDispatch, useSelector } from "react-redux";
import { blockGetContext, blockUpdate } from "../../../api/blockAPI";
import {
  AdminContentPageDiv,
  AdminProductBox,
  AdminReportButton,
  AdminReportContextDiv,
} from "../../../cssJs/AdminPage/adminCss";
import {
  ForumImg,
  ForumName,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneForumCss";
import {
  VideoDiv,
  VideoIframeDiv,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOnePageCss";
import {
  LinkP,
  ProductImgDiv,
} from "../../../cssJs/AnimePage/AnimeOne/AnimeOneProductCss";
import { MarketBox } from "../../../cssJs/MarketPage/MarketPlaceCss";
import { getWidth } from "../../../helperFns/widthFn";
import {
  ReportContextType,
  ReportShowType,
  ReportType,
} from "../../../types/blockType";
import { IStoreState } from "../../../types/IStoreState";
import { MarketType } from "../../../types/MarketType";
import { Product } from "../../../types/ProductType";
import { Video, VideoType } from "../../../types/VideoType";
import deleteIcon from "../../../files/deleteIcon.svg";
import ignoreIcon from "../../../files/Icon-Ignore.svg";
import { useHistory } from "react-router-dom";
import { _getDate } from "../../../helperFns/timeFn";
import { Button } from "antd";
import { userUpdateBlock } from "../../../api/userApi";
import { LoadingType } from "../../../types/EnumTypes";
import { LOADING_CLOSE, LOADING_OPEN } from "../../../redux/loading";
import { openNewWindowBlank } from "../../../helperFns/windowsFn";

const ReportContext = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();

  const reportBlock: ReportShowType | null = useSelector(
    (state: IStoreState) => state.reportBlockState
  );

  const [reportContext, setReportContext] = useState<JSX.Element>();
  const [blockState, setBlockState] = useState<boolean>(false);

  useEffect(() => {
    (async function anyNameFunction() {
      dispatch({
        payload: LoadingType.OPEN,
        type: LOADING_OPEN,
      });
      await getContext(
        reportBlock ? reportBlock.type : "",
        reportBlock ? reportBlock.contextId : ""
      );
      dispatch({
        payload: LoadingType.CLOSE,
        type: LOADING_CLOSE,
      });
    })();
    setBlockState(false);
    console.log(reportBlock);
  }, [reportBlock]);

  useEffect(() => {
    //
  }, [reportContext, blockState]);

  const getContext = async (type: string, id: string) => {
    const context = await blockGetContext(id, type);
    switch (type) {
      case "video":
        setReportContext(getVideo(context as Video));
        break;
      case "product":
        //const xx = getProduct(context as Product)
        setReportContext(getProduct(context as Product));
        break;
      case "market":
        //const xx = getProduct(context as Product)
        setReportContext(getMarket(context as MarketType));
        break;
      default:
        setReportContext(getComment(context as string));
        break;
    }
  };

  const getVideo = (video: Video) => {
    const videoLink =
      getWidth() > 600
        ? video.link.replace(
            "<iframe",
            "<iframe className='bi_iframe' width='808' height='580'"
          )
        : video.link.replace(
            "<iframe",
            "<iframe className='bi_iframe' width='200' height='400'"
          );
    return video.type == VideoType.Embed ? (
      <VideoDiv>
        <VideoIframeDiv
          style={{ height: getWidth() > 600 ? "600px" : "400px" }}
          dangerouslySetInnerHTML={{ __html: videoLink }}
        ></VideoIframeDiv>
      </VideoDiv>
    ) : (
      <VideoDiv>
        {video.type == VideoType.Link ? (
          linkWithEmbed(video)
        ) : (
          <h2
            style={{ cursor: "pointer" }}
            onClick={() => {
              window.open(video.link);
            }}
          >
            {video.title}
          </h2>
        )}
      </VideoDiv>
    );
  };

  const linkWithEmbed = (video: Video) => {
    return (
      <ReactPlayer
        url={video.link}
        width={getWidth() > 600 ? 808 : 200}
        height={getWidth() > 580 ? 580 : 400}
        style={{ margin: "0 auto" }}
      />
    );
  };

  const getProduct = (product: Product) => {
    return (
      <AdminProductBox
        style={{
          width: getWidth() > 600 ? "100%" : "240px",
          margin: getWidth() > 600 ? "" : "16px auto",
          height: "292px",
        }}
      >
        <ProductImgDiv
          onClick={() => {
            window.open(product.link, "_blank");
          }}
          src={product.productImg ? product.productImg : ""}
        />
        <LinkP
          onClick={() => {
            window.open(product.link, "_blank");
          }}
        >{`Here to buy>>`}</LinkP>
      </AdminProductBox>
    );
  };

  const getMarket = (market: MarketType) => {
    return (
      <MarketBox>
        <img src={`${market.imageArr[0]}`} />
        <h6>{`$ ${market.price}`}</h6>
        <p>{`Item Title - ${market.title}`}</p>
      </MarketBox>
    );
  };

  const getComment = (content: string) => {
    return <div dangerouslySetInnerHTML={{ __html: content }}></div>;
  };

  const updateReport = async (state: string) => {
    if (reportBlock) {
      const newReportBlock: ReportType = {
        _id: reportBlock._id,
        contextId: reportBlock.contextId,
        type: reportBlock.type as ReportContextType,
        reportUserId: reportBlock.reportUserId,
        forumUserId: reportBlock.forumUserId,
        state: state,
        reason: reportBlock.reason,
        uploadTime: reportBlock.uploadTime,
        resourceLink: reportBlock.resourceLink,
      };
      const r = await blockUpdate(newReportBlock);
      if (r < 300) {
        history.push("/adminManagement/Reports");
      }
    }
  };

  const blockFn = async () => {
    setBlockState(!blockState);
    dispatch({
      payload: LoadingType.OPEN,
      type: LOADING_OPEN,
    });
    if (reportBlock) {
      const r = await userUpdateBlock(
        reportBlock?.forumUserId,
        !blockState,
        reportBlock.reason
      );
    }
    dispatch({
      payload: LoadingType.CLOSE,
      type: LOADING_CLOSE,
    });
  };

  return (
    <AdminContentPageDiv>
      <div style={{ marginLeft: "8px", display: "flex" }}>
        <ForumImg src={reportBlock ? reportBlock.forumUserAvatar : ""} />
        <ForumName>{reportBlock ? reportBlock.forumUserName : ""}</ForumName>
        <ForumName>
          {reportBlock ? _getDate(new Date(reportBlock.uploadTime)) : ""}
        </ForumName>
        <Button style={{ marginTop: "16px" }} onClick={() => blockFn()}>
          {blockState ? "UnBlock" : "Block"}
        </Button>
      </div>
      {reportBlock?.type == "message" ? (
        <></>
      ) : (
        <>
          <p
            style={{ color: "blue", marginLeft: "8px", cursor: "pointer" }}
            onClick={() => openNewWindowBlank(`${reportBlock?.resourceLink}`)}
          >
            Resource Link
          </p>
        </>
      )}
      <AdminReportContextDiv style={{ marginLeft: "8px" }}>
        {reportContext}
      </AdminReportContextDiv>
      <div style={{ marginLeft: "8px", display: "flex" }}>
        <AdminReportButton onClick={() => updateReport("delete")}>
          <img src={`${deleteIcon}`} />
          <p>Hide</p>
        </AdminReportButton>
        <AdminReportButton
          style={{ marginLeft: "122px" }}
          onClick={() => updateReport("ignore")}
        >
          <img src={`${ignoreIcon}`} />
          <p>Ignore</p>
        </AdminReportButton>
      </div>
    </AdminContentPageDiv>
  );
};

export default ReportContext;
