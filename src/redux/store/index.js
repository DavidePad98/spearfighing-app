import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userLoginReducer from "../reducers/login";
import userRegistrationReducer from "../reducers/registrationuser";
import ticketReducer from "../reducers/ticket";
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
import ticketModReducer from "../reducers/modTicket";
import postModReducer from "../reducers/modPost";
import searchReducer from "../reducers/search";
import detailsReducer from "../reducers/detailsPage";
import likeReducer from "../reducers/likes";

const mainReducer = combineReducers({
  login: userLoginReducer,
  registration: userRegistrationReducer,
  details: detailsReducer,
  tickets: ticketReducer,
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
  modTicket: ticketModReducer,
  modPost: postModReducer,
  search: searchReducer,
  likes: likeReducer,
});
const store = configureStore({
  reducer: mainReducer,
});
export default store;
