import { createStore } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import rootReducer from "./reducers/rootReducer";

export default createStore(rootReducer, devToolsEnhancer());
// export default createStore(rootReducer);
