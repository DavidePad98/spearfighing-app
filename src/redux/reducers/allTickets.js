import {
  FETCH_ALL_TICKETS_REQUEST,
  FETCH_ALL_TICKETS_SUCCESS,
  FETCH_ALL_TICKETS_FAILURE,
} from "../action";

const initialState = {
  tickets: [],
  loading: false,
  error: null,
};

const allTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_TICKETS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_ALL_TICKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: action.payload,
        error: null,
      };
    case FETCH_ALL_TICKETS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default allTicketReducer;
