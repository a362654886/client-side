import styled from "styled-components";
import { Container, Button } from "react-bootstrap";
import { Input, Pagination, Spin } from "antd";

// header
export const Header = styled(Container)`
  background-color: #ee6fa9;
  margin: 0;
  height: 120px;
  padding: 10px;
  max-width: 100%;
  display: flex;
`;

// body
export const BackGroundBody = styled.div`
  height: auto;
  background-color: transparent;
  opacity: 1;
  background: rgba(255, 255, 255, 0.5);
`;

export const MainBody = styled.div`
  width: 80%;
  margin: 0 auto;
`;

//recommend div
export const RecommendDiv = styled.div`
  height: 250px;
  display: flex;
  margin: 1rem;
`;

export const RecommendSlider = styled.div`
  height: 250px;
  width: 50%;
`;

export const RecommendPost = styled.div`
  height: 20px;
  width: 100%;
  margin: 5px 2px 2px 0px;
  background-color: ${(props) => props.color};
  display: flex;
  div:hover {
    background: #f2f2f2;
  }
  div {
    width: 100%;
    display: flex;
    position: relative;
    p {
      margin-left: 5px;
    }
  }
`;

export const TimeText = styled.p`
  position: absolute;
  right: 10px;
`;

//lower body

export const LowerBody = styled.div`
  margin: 1rem auto;
`;

//lower body context

export const LowerBodyContext = styled.div`
  height: 200px;
  background: white;
  margin: 1rem;
  h5 {
    text-align: left;
    color: #ee6fa9;
    border-bottom: 2px solid #ee6fa9;
  }
  div {
    display: flex;
    div {
      margin: 1rem;
      background-color: blue;
      height: 100px;
      width: 70px;
    }
  }
`;

//title
export const Title = styled.h5`
  color: #ee6fa9;
  padding-top: 5px;
  margin-right: 1rem;
`;

export const TitleWhite = styled.h5`
  color: white;
  padding-top: 5px;
  margin: 1rem 0 0 2rem;
`;

export const TitleWithLine = styled.div`
  display: flex;
  position: relative;
  h5 {
    width: 80%;
    color: #ee6fa9;
    border-bottom: 1px solid #ee6fa9;
  }
  Button {
    float: right;
  }
  padding: 10px;
`;

//logo
export const LOGO = styled.div`
  width: 100px;
  height: 100px;
  img {
    width: 100px;
    height: 100px;
  }
`;

//buttons
export const ButtonPrimary = styled(Button)`
  background-color: #ee6fa9;
  height: 32px;
  width: 150px;
  border-radius: 20px 20px 20px 20px;
  padding: 0;
  line-height: 32px;
  margin: 0;
  color: white;
`;

export const ButtonDiv = styled.div`
  width: 100%;
  text-align: center;
`;

//flex
export const FlexBody = styled.div`
  display: flex;
  text-align: center;
  margin: ${(props) => props.property};
`;

//search Input

export const SearchInput = styled(Input)`
  //margin: 1rem;
  margin: 0 1rem;
  width: 95%;
`;

export const IconText = styled.div`
  margin-left: 5px;
  margin-right: 5px;
  display: flex;
  color: ${(props) => props.color};
  p {
    margin: 0;
    padding-left: 5px;
    padding-top: 5px;
  }
`;

//display flex

export const FlexDiv = styled.div`
  display: flex;
`;

//loading
export const Loading = styled(Spin)``;

//pagination

export const PostPagination = styled(Pagination)`
  position: absolute;
  right: 40%;
  bottom: 10px;
`;
