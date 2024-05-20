import {
  UPLOAD_POST_REQUEST,
  UPLOAD_POST_SUCCESS,
  UPLOAD_POST_FAILURE,
} from "../action";

const initialState = {
  postData: null,
  loading: false,
  error: null,
};

const postModReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPLOAD_POST_SUCCESS:
      return {
        ...state,
        postData: action.payload,
        loading: false,
        error: null,
      };
    case UPLOAD_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postModReducer;
