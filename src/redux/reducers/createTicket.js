import {
  CREATE_TICKET_REQUEST,
  CREATE_TICKET_SUCCESS,
  CREATE_TICKET_FAILURE,
} from "../action";

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const createTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_TICKET_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        loading: false,
        error: null,
      };
    case CREATE_TICKET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default createTicketReducer;
