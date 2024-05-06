import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/users";
import userLoginReducer from "../reducers/login";
import userRegistrationReducer from "../reducers/registrationuser";
import ticketReducer from "../reducers/ticket";
import profileImageReducer from "../reducers/profile";

const mainReducer = combineReducers({
  users: usersReducer,
  login: userLoginReducer,
  registration: userRegistrationReducer,
  tickets: ticketReducer,
  profile: profileImageReducer,
});
const store = configureStore({
  reducer: mainReducer,
});
export default store;
