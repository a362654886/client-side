import { Pagination } from "antd";
import * as React from "react";
import { useState } from "react";
import styled from "styled-components";

export const PostPagination = styled(Pagination)`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;

interface IProps {
  pageSize: number;
  propFn: (pageNum: number) => void;
  count: number;
}

export const PaginationDiv = ({
  pageSize,
  propFn,
  count,
}: IProps): JSX.Element => {
  const [pageNum, setPageNum] = useState(1);

  const newPage = async (page: number) => {
    setPageNum(page);
    await propFn(page);
  };

  return (
    <PostPagination
      onChange={newPage}
      defaultCurrent={pageNum}
      defaultPageSize={pageSize}
      total={count}
    />
  );
};
