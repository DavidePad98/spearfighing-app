import {
  UPLOAD_COMMENT_REQUEST,
  UPLOAD_COMMENT_SUCCESS,
  UPLOAD_COMMENT_FAILURE,
} from "../action";

const initialState = {
  commentData: null,
  loading: false,
  error: null,
};

const commentModReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPLOAD_COMMENT_SUCCESS:
      return {
        ...state,
        commentData: action.payload,
        loading: false,
        error: null,
      };
    case UPLOAD_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default commentModReducer;
