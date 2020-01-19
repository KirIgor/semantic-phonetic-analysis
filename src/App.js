import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";

import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import store from "./store";

import Editor from "./components/editor/editor";
import TextPassportForm from "./components/forms/textPassport";
import InformantsPassportsForm from "./components/forms/informantsPassports";
import Save from "./components/saveAndLoad/save";
import Load from "./components/saveAndLoad/load";

import "./style.css";

const alertOptions = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  transition: transitions.SCALE,
  containerStyle: {
    zIndex: 1001
  }
};

const App = React.memo(() => {
  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <Provider store={store}>
        <MuiThemeProvider>
          <div>Пасспорт текста</div>
          <TextPassportForm />
          <div>Пасспорта информантов</div>
          <InformantsPassportsForm />
          <Editor />
          <Save />
          <Load />
        </MuiThemeProvider>
      </Provider>
    </AlertProvider>
  );
});

export default App;
