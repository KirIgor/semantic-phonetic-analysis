import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";

import editorReducer from "./editorReducer";

const rootReducer = combineReducers({
  editor: editorReducer,
  form: formReducer
});

export default rootReducer;
