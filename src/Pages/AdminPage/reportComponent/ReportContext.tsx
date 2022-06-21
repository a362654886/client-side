import * as React from "react";
import { useSelector } from "react-redux";
import { ReportBlock } from "../../../redux/reportBlock";
import { ReportShowType } from "../../../types/blockType";
import { IStoreState } from "../../../types/IStoreState";

const ReportContext = (): JSX.Element => {
  const reportBlock: ReportShowType | null = useSelector(
    (state: IStoreState) => state.reportBlockState
  );

  return <>{reportBlock?._id}</>;
};

export default ReportContext;
