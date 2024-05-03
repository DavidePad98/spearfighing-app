import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/users";
import userLoginReducer from "../reducers/login";

const mainReducer = combineReducers({
  users: usersReducer,
  login: userLoginReducer,
});
const store = configureStore({
  reducer: mainReducer,
});
export default store;
