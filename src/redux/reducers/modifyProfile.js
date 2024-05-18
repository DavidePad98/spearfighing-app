import {
  UPLOAD_PROFILE_REQUEST,
  UPLOAD_PROFILE_SUCCESS,
  UPLOAD_PROFILE_FAILURE,
} from "../action";

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const profileModifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPLOAD_PROFILE_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: null,
      };
    case UPLOAD_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileModifyReducer;
