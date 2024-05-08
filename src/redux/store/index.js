import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/users";
import userLoginReducer from "../reducers/login";
import userRegistrationReducer from "../reducers/registrationuser";
import ticketReducer from "../reducers/ticket";
import profileImageReducer from "../reducers/profile";
import getUserByIdReducer from "../reducers/user";

const mainReducer = combineReducers({
  users: usersReducer,
  login: userLoginReducer,
  registration: userRegistrationReducer,
  tickets: ticketReducer,
  profile: profileImageReducer,
  user: getUserByIdReducer,
});
const store = configureStore({
  reducer: mainReducer,
});
export default store;
