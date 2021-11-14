import styled from "styled-components";

export const SearchDiv = styled.div`
  width: 573px;
  height: 162px;
  margin-left: 52px;
  margin-top: 30px;
  input {
    width: 573px;
  }
  button {
    margin-top: 20px;
    margin-left: 456px;
  }
`;

export const SearchTableDiv = styled.div`
  width: 80%;
  height: 162px;
  margin-left: 52px;
  margin-top: 30px;
  position: relative;
`;

export const AnimeTableElement = styled.div`
  display: flex;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
  border-right: 1px solid black;
`;

export const AnimeTableTitle = styled.div`
  display: flex;
  border: 1px solid black;
  text-align: center;
`;

export const AnimeTableItem = styled.div`
  width: 60%;
  text-align: center;
`;

export const ViewButton = styled.p`
  width: 20%;
  text-align: center;
  color: blue;
  cursor: pointer;
`;

export const ViewButtonText = styled.p`
  width: 20%;
  text-align: center;
`;
