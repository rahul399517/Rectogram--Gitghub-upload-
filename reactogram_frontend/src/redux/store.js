import { createStore } from "redux";
import { combineReducer } from "../redux/combineReducer";
export const store = createStore(combineReducer);
