import {
  FETCH_COMMENT_X_POST_REQUEST,
  FETCH_COMMENT_X_POST_SUCCESS,
  FETCH_COMMENT_X_POST_FAILURE,
} from "../action";

const initialState = {
  post_comments: [],
  loading: false,
  error: null,
};

const postCommentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENT_X_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMENT_X_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post_comments: action.payload,
        error: null,
      };
    case FETCH_COMMENT_X_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default postCommentsReducer;
