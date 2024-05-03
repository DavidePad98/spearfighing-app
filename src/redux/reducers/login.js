import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_USER,
} from "../action";

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        userData: null,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default userLoginReducer;
