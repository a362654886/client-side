import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "../src/container/MainPage";
import thunk from "redux-thunk";
import { useLikeAddMiddleWare } from "./redux/middleWares/authMiddleWare";
import "../src/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignUpPage from "./container/SignUpPage";
import "antd/dist/antd.css";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import AdminManagementPage from "./container/AdminManagementPage";
import { likeBodyMiddleWare } from "./redux/middleWares/likeBodyMiddleware";
import { loginUserMiddleware } from "./redux/middleWares/loginUserMiddleware";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// store type??
const store: any = createStore(
  persistedReducer,
  applyMiddleware(
    thunk,
    useLikeAddMiddleWare,
    likeBodyMiddleWare,
    loginUserMiddleware
  )
);
persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/mainPage" component={MainPage} />
        <Route path="/signUpPage" component={SignUpPage} />
        <Route path="/adminManagement" component={AdminManagementPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
