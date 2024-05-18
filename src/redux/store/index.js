import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import usersReducer from "../reducers/users";
import userLoginReducer from "../reducers/login";
import userRegistrationReducer from "../reducers/registrationuser";
import ticketReducer from "../reducers/ticket";
// import profileImageReducer from "../reducers/profileImageMod";
import getUserByIdReducer from "../reducers/user";
import postReducer from "../reducers/post";
import commentReducer from "../reducers/comment";
import allTicketReducer from "../reducers/allTickets";
import postByTicketReducer from "../reducers/postByTicket";
import postCommentsReducer from "../reducers/commnetByPost";
import createTicketReducer from "../reducers/createTicket";
import createPostReducer from "../reducers/createPost";
import createCommentReducer from "../reducers/createComment";
import profileModifyReducer from "../reducers/modifyProfile";
import deletePostReducer from "../reducers/deletePost";
import deleteTicketReducer from "../reducers/deleteTicket";
import deleteCommentReducer from "../reducers/deleteComment";

const mainReducer = combineReducers({
  // users: usersReducer,
  login: userLoginReducer,
  registration: userRegistrationReducer,
  tickets: ticketReducer,
  // profileImageMod: profileImageReducer,
  user: getUserByIdReducer,
  post: postReducer,
  comment: commentReducer,
  allTickets: allTicketReducer,
  postXticket: postByTicketReducer,
  commentXpost: postCommentsReducer,
  createTicket: createTicketReducer,
  createPost: createPostReducer,
  createComment: createCommentReducer,
  modifyProfile: profileModifyReducer,
  deletePost: deletePostReducer,
  deleteTicket: deleteTicketReducer,
  deleteComment: deleteCommentReducer,
});
const store = configureStore({
  reducer: mainReducer,
});
export default store;
