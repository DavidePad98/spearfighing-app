import {
  REGISTRATION_USER_REQUEST,
  REGISTRATION_USER_SUCCESS,
  REGISTRATION_USER_FAILURE,
} from "../action";

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const userRegistrationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTRATION_USER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: null,
      };
    case REGISTRATION_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userRegistrationReducer;
