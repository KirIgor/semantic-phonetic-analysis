import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Provider } from "react-redux";

import store from "./store";

import Editor from "./components/editor/editor";
import TextPassportForm from "./components/forms/textPassport";
import InformantsPassportsForm from "./components/forms/informantsPassports";
import Save from "./components/saveAndLoad/save";
import Load from "./components/saveAndLoad/load";

import "./style.css";

const App = React.memo(() => {
  return (
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
  );
});

export default App;
