import styled from "styled-components";

export const SearchDiv = styled.div`
  width: 80%;
  height: 62px;
  margin-left: 52px;
  margin-top: 45px;
  display: flex;
  input {
    width: 573px;
    height: 36px;
  }
  button {
    margin-left: 30px;
  }
`;

export const SearchNewsDiv = styled.div`
  width: 80%;
  height: 62px;
  margin-left: 52px;
  margin-top: 45px;
  display: flex;
  input {
    width: 573px;
    height: 36px;
  }
  button {
    margin-left: 30px;
  }
`;

export const SearchTableDiv = styled.div`
  width: 80%;
  height: auto;
  margin-left: 52px;
  margin-top: 30px;
  position: relative;
`;

export const AnimeTableElement = styled.div`
  display: inline;
  height: 136px;
  width: 80%;
  div {
    display: flex;
  }
`;

export const AnimeTableTitle = styled.div`
  display: flex;
  border: 1px solid black;
  text-align: center;
`;

export const AnimeTableItem = styled.h2`
  height: auto;
  line-height: 40px;
  font-size: 24px;
`;

export const ViewButton = styled.p`
  width: auto;
  height: 32px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 32px;
  display: flex;
  img {
    height: 24px;
    weight: 24px;
    margin-right: 8px;
  }
`;

export const ViewButtonText = styled.p`
  width: 20%;
  text-align: center;
`;
