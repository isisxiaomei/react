import { createStore } from "redux";
import reducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

// 创建store
export let store =  createStore(reducers, composeWithDevTools());