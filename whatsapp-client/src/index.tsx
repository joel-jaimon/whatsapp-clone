import React from "react";
import ReactDOM from "react-dom";
import "./common.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { DropDownContextProvider } from "./context/dropDownContext";
import { GlobalModalProvider } from "./context/globalModalContext";
import { MovableModalContextProvider } from "./context/movableModalContext";

ReactDOM.render(
  <React.StrictMode>
    <MovableModalContextProvider>
      <GlobalModalProvider>
        <DropDownContextProvider>
          <App />
        </DropDownContextProvider>
      </GlobalModalProvider>
    </MovableModalContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
