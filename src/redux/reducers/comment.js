import {
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE,
} from "../action";

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        comments: action.payload,
        error: null,
      };
    case FETCH_COMMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default commentReducer;
