import { Button } from "antd";
import styled from "styled-components";

export const MerchandiseDiv = styled.div`
  height: auto;
  min-height: 1000px;
  width: 100%;
  margin: 10px auto;
  background-color: white;
  position: relative;
`;

//new merchandise

export const NewMerchandiseDiv = styled.div`
  margin: 1rem;
`;

export const NewMerchandiseImg = styled.img`
  margin: 10px;
  width: ${(props) => (props.style as React.CSSProperties).width};
  height: ${(props) => (props.style as React.CSSProperties).height};
  border: 2px solid black;
`;

export const NewImage = styled.div`
  width: 100%;
  text-align: left;
  margin-top: 1rem;
  margin-bottom: 1rem;
  display: flex;
  label {
    background-color: #ee6fa9;
    height: 32px;
    width: 150px;
    border-radius: 20px 0 0 20px;
    padding-left: 25px;
    line-height: 32px;
    margin: 0;
    color: white;
  }
  div {
    width: 80%;
  }
`;

export const NewMerchandiseLabel = styled.label`
  background-color: #ee6fa9;
  height: 32px;
  width: 150px;
  border-radius: 20px 0 0 20px;
  padding-left: 25px;
  line-height: 32px;
  margin: 0;
  color: white;
`;

//merchandise filter

export const FilterDiv = styled.div`
  border: 1px solid #ee6fa9;
  padding-left: 3%;
  padding-right: 3%;
  padding-bottom: 1rem;
  margin-left: 10px;
  margin-right: 10px;
`;

export const PriceDiv = styled.div`
  display: flex;
  div {
    width: 100%;
    margin-right: 20px;
  }
`;

export const MerchandiseCard = styled.div`
  display: flex;
  position: relative;
  margin: 10px;
  height: 120px;
  border: 1px solid black;
  img {
    position: absolute;
    right: 5px;
    margin: 5px;
  }
`;

export const MerchandiseCardLeft = styled.div`
  width: 80%;
  label {
    color: #ee6fa9;
    padding-top: 5px;
    margin-left: 5px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ee6fa9;
  }
  label:hover {
    background: #ee6fa9;
    color: white;
  }
  div {
    display: flex;
    height: 30px;
    width: 100%;
    margin-left: 5px;
    div {
      height: 100%;
      bottom: 5px;
    }
    p {
      padding-top: 2px;
      margin-right: 5px;
    }
  }
`;

export const MerchandiseCardLabelP = styled.p`
  height: 25px;
  margin-left: 5px;
  display: flex;
  label {
    width: 40px;
    border-bottom: 0px solid #ee6fa9;
    padding-top: 0px;
    margin: 0px;
  }
`;

export const AuctionButton = styled(Button)`
  background-color: #ee6fa9;
  color: white;
  border-radius: 15px;
  height: 25px;
  padding: 0px 15px 0 15px;
  margin-left: 20px;
`;

//merchandise page

export const MerchandisePageDiv = styled.div`
  margin: 10px;
  padding: 10px;
`;

export const MerchandiseShowDiv = styled.div`
  padding: 1rem;
  height: 420px;
  width: 100%;
  border: 1px solid black;
`;

export const MerchandiseButtons = styled.div`
  display: flex;
  position: relative;
  height: 50px;
  width: 100%;
`;

export const MerchandiseButton = styled(Button)`
  position: absolute;
  background-color: #ee6fa9;
  color: white;
  border-radius: 15px;
  right: ${(props) => (props.style as React.CSSProperties).right};
`;

export const MerchandiseBodyDiv = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  height: auto;
  width: 100%;
  border: 1px solid black;
`;

export const MerchandiseShowDivTop = styled.div`
  margin: 1rem;
  height: 300px;
  width: 100%;
  display: flex;
`;

export const MerchandiseShowDivLeft = styled.div`
  width: 50%;
  div {
    display: flex;
    p {
      border-bottom: 1px solid black;
      width: 150px;
    }
  }
`;

export const MerchandiseTitle = styled.p`
  width: 150px;
  background-color: #ee6fa9;
  color: white;
  border-radius: 15px 0 0 15px;
  padding-left: 15px;
  padding-right: 5px;
`;

export const MerchandiseText = styled.p`
  width: 150px;
  height: 29px;
  padding-left: 15px;
  margin-left: 5px;
`;

export const MerchandiseShowDivRight = styled.div`
  width: 50%;
  img {
    height: 100%;
  }
`;

export const MerchandiseShowDivBottom = styled.div`
  height: 50px;
`;

export const BottomImg = styled.img`
  height: 50px;
  width: 50px;
  margin-left: 10px;
`;

export const MerchandiseMessage = styled.div`
  margin-top: 20px;
  margin-bottom: 1rem;
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

export const MerchandiseBody = styled.div`
  margin-top: 10px;
  font-size: 18px;
`;
