import { LOADING_ADD_NOW } from "../redux/loading";
import { middleStoreType } from "../types/MiddleWareType";

export let socket: WebSocket | null = null;

export const connection = (userEmail: string, store: middleStoreType ) => {
  //`ws://localhost:5001/ws?userEmail=${userEmail}`
  socket = new WebSocket(`ws://3.85.175.249:5001/ws?userEmail=${userEmail}`);
  socket.onopen = function () {
    (socket as WebSocket).send(`{
        "fileName":"",
        "type":"Start"
    }`);
  };
  socket.onmessage = (event) => {
    const message = JSON.parse(event.data.toString());
    if(message.type == "loadingNum"){
      store.dispatch({
        payload: message.obj.part,
        type: LOADING_ADD_NOW,
      })
    }
  };
};

export const socketSend = (value: string) => {
  (socket as WebSocket).send(value);
};

//export const socketClose = () => socket.close();
