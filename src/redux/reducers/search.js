import {
  SEARCH_ALL_USERS_REQUEST,
  SEARCH_ALL_USERS_SUCCESS,
  SEARCH_ALL_POSTS_REQUEST,
  SEARCH_ALL_POSTS_SUCCESS,
  SEARCH_ALL_TICKETS_REQUEST,
  SEARCH_ALL_TICKETS_SUCCESS,
  SEARCH_ALL_COMMENTS_REQUEST,
  SEARCH_ALL_COMMENTS_SUCCESS,
  SEARCH_ALL_USERS_FAILURE,
  SEARCH_ALL_POSTS_FAILURE,
  SEARCH_ALL_TICKETS_FAILURE,
  SEARCH_ALL_COMMENTS_FAILURE,
} from "../action";

const initialState = {
  users: [],
  posts: [],
  tickets: [],
  comments: [],
  loading: false,
  error: null,
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_ALL_USERS_REQUEST:
    case SEARCH_ALL_POSTS_REQUEST:
    case SEARCH_ALL_TICKETS_REQUEST:
    case SEARCH_ALL_COMMENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SEARCH_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    case SEARCH_ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case SEARCH_ALL_TICKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.payload,
      };
    case SEARCH_ALL_COMMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    case SEARCH_ALL_USERS_FAILURE:
    case SEARCH_ALL_POSTS_FAILURE:
    case SEARCH_ALL_TICKETS_FAILURE:
    case SEARCH_ALL_COMMENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
