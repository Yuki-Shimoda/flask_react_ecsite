import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from './components/App'
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./reducers/index";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
   <Provider store={store}>
    <App />
   </Provider>,
  document.getElementById("root")
);

reportWebVitals();