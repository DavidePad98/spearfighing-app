import { combineReducers, configureStore } from "@reduxjs/toolkit";
import usersReducer from "../reducers/users";
import userLoginReducer from "../reducers/login";
import userRegistrationReducer from "../reducers/registrationuser";
import ticketReducer from "../reducers/ticket";
import profileImageReducer from "../reducers/profile";
import getUserByIdReducer from "../reducers/user";
import postReducer from "../reducers/post";
import commentReducer from "../reducers/comment";
import allTicketReducer from "../reducers/allTickets";
import postByTicketReducer from "../reducers/postByTicket";
import postCommentsReducer from "../reducers/commnetByPost";

const mainReducer = combineReducers({
  users: usersReducer,
  login: userLoginReducer,
  registration: userRegistrationReducer,
  tickets: ticketReducer,
  profile: profileImageReducer,
  user: getUserByIdReducer,
  post: postReducer,
  comment: commentReducer,
  allTickets: allTicketReducer,
  postXticket: postByTicketReducer,
  commentXpost: postCommentsReducer,
});
const store = configureStore({
  reducer: mainReducer,
});
export default store;
