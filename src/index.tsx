import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reducer from "./redux/reducers";
import { createStore, applyMiddleware } from "redux";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./Pages/MainPage";
import thunk from "redux-thunk";
import "../src/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/antd.css";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import AdminPage from "./Pages/AdminPage/AdminPage";
import AdminMainPage from "./Pages/AdminPage/AdminMainPage";
import EpisodeShow from "./Pages/Showcase/EpisodeShow";
import { loginUserMiddleware } from "./redux/middleWares/loginUserMiddleware";
import { animeMiddleware } from "./redux/middleWares/animeMiddleware";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// store type??
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
const store: any = createStore(
  persistedReducer,
  applyMiddleware(thunk, loginUserMiddleware, animeMiddleware)
);
persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/mainPage" component={MainPage} />
        <Route path="/episodeShow" component={EpisodeShow} />
        <Route path="/adminPage" component={AdminPage} />
        <Route path="/adminManagement" component={AdminMainPage} />
        <Route path="/" component={MainPage} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
