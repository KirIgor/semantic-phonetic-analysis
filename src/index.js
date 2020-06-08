import React from "react";
import ReactDOM from "react-dom";

import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import store from "./store";
import App from "./App.js";

import ErrorBoundary from "./error-boundary";

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 1001,
  },
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...alertOptions}>
    <Provider store={store}>
      <MuiThemeProvider>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </MuiThemeProvider>
    </Provider>
  </AlertProvider>,
  document.getElementById("root")
);
