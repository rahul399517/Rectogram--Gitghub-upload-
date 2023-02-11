import { combineReducers } from "redux";
import { userReducer } from "../redux/userReducer";
export const combineReducer = combineReducers({
  //userReducer: userReducer,
  user: userReducer,
});
