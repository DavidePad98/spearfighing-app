import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/users";
import userLoginReducer from "../reducers/login";
import userRegistrationReducer from "../reducers/registrationuser";

const mainReducer = combineReducers({
  users: usersReducer,
  login: userLoginReducer,
  registration: userRegistrationReducer,
});
const store = configureStore({
  reducer: mainReducer,
});
export default store;
