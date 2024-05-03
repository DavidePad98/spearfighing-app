import { FETCH_USER_PROFILE } from "../action";

const initialState = {
  users: [],
  tokens: {
    admin:
      "eyJhbGciOiJIUzM4NCJ9.eyJpYXQiOjE3MTQ1NzM2OTksImV4cCI6MTcxNDU3NzI5OSwic3ViIjoiNzM4ODczNzItYmM2NC00NWUzLThjYmItNzc5NDJjZGI0N2IxIn0.eAHbP2W4sMwF6RJRTjjPSWOGq50V92VMrbyecMeQCZ3ZGXx47ZfNbEllFUL5m2aU",
  },
  error: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_PROFILE:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
};

export default usersReducer;
