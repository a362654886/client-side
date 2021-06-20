import { Button } from "antd";
import styled from "styled-components";

export const ForumDiv = styled.div`
  height: auto;
  min-height: 1000px;
  display: flex;
  width: 100%;
  margin: 0 auto;
`;

//side menu
export const SideMenu = styled.div`
  width: 100px;
  background-color: #ee6fa9;
  margin: 1rem;
`;

export const PlateTag = styled.div`
  margin-top: 20px;
  text-align: center;
  position: relative;
  display: flex;
  a {
    margin: auto 0;
    font-size: 16px;
    height: 45px;
  }
  a:hover {
    background-color: #ee6fa9;
    color: white;
  }
`;

export const PlateImg = styled.img`
  width: 50px;
  margin-top: 20px;
  margin-left: 25px;
  margin-right: 25px;
  height: 50px;
`;

export const PlatePopUp = styled.div`
  position: absolute;
  left: 100%;
  background-color: white;
  border-right: 1px solid black;
  width: ${(props) => (props.style as React.CSSProperties).width};
  height: ${(props) => (props.style as React.CSSProperties).height};
  z-index: 2;
`;

export const LabelPopUp = styled.div`
  display: inline;
  width: 110px;
  height: 115px;
  padding: 20px;
  img {
    margin-left: 10px;
    margin-right: 10px;
    width: 50px;
    height: 50px;
  }
  a {
    height: 25px;
  }
`;

export const LabelPopUpRow = styled.div`
  display: flex;
`;

//right part

export const AllPlates = styled.div`
  width: 85%;
  background: white;
  margin: 1rem;
  padding: 1rem;
  z-index: 1;
  position: relative;
`;

export const AllPostDiv = styled.div`
  border: 1px solid black;
  position: relative;
  height: 90%;
`;

//new post

export const NewPostBody = styled.div`
  margin: 1rem;
`;

//post

export const PostBody = styled.div`
  margin: 1rem;
  padding: 1rem;
  background-color: #f2f2f2;
  h5 {
    width: 60%;
    color: #ee6fa9;
    border-bottom: 1px solid #ee6fa9;
  }
`;
export const PostAttribute = styled.div`
  display: flex;
  p {
    margin-right: 1rem;
  }
`;

export const SubTitle = styled.p`
  font-size: 12px;
  font-style: italic;
  margin-top: 5px;
  a {
    border-bottom: 1px solid blue;
  }
`;

export const PostContext = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  font-size: 18px;
`;

export const PostMessage = styled.div`
  background-color: #f2f2f2;
  margin: 1rem;
  padding: 1rem;
  border: 1px solid black;
  min-height: 700px;
  position: relative;
  h5 {
    width: 100%;
    color: #ee6fa9;
    border-bottom: 1px solid #ee6fa9;
    margin: 0;
  }
`;

export const PostFooter = styled.div`
  display: flex;
  position: relative;
`;

export const PostMessageDiv = styled.div`
  margin-top: 10px;
  border-bottom: 1px solid #d0d1d1;
  position: relative;
`;
export const PostMessageBody = styled.div`
  margin-top: 10px;
  font-size: 18px;
`;

//posts

export const PostTableTitle = styled.div`
  display: flex;
  background-color: #f2f2f2;
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  padding-left: 5px;
  height:40px;
`;

export const PostPlateTitle = styled.div`
  background-color: #f2f2f2;
  margin: 0 5px 0 5px;
`;

export const PostTableTitleText = styled.div`
  margin: 0.5rem 0 0.5rem 0.5rem;
  font-size: 15px;
  display: flex;
`;
export const PostTableTitleButton = styled(Button)`
  height: 20px;
  width: 40px;
  padding: 0px 0px 5px 1px;
  margin-left: 10px;
  border-radius: 10px;
`;

export const PostTableItem = styled.div`
  display: flex;
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
  margin-left: 0.5rem;
  border-bottom: 1px solid #f2f2f2;
  color: ${(props) => props.color};
  div:hover {
    background: #f2f2f2;
  }
  div {
    height: 30px;
  }
`;

export const PostTableBody = styled.div`
  div:hover {
    background: #f2f2f2;
  }
  font-size: 15px;
  padding-bottom: ${(props) =>
    (props.style as React.CSSProperties).marginBottom};
  margin-right: 5px;
`;
