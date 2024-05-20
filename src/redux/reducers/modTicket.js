import {
  UPLOAD_TICKET_REQUEST,
  UPLOAD_TICKET_SUCCESS,
  UPLOAD_TICKET_FAILURE,
} from "../action";

const initialState = {
  ticketData: null,
  loading: false,
  error: null,
};

const ticketModReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPLOAD_TICKET_SUCCESS:
      return {
        ...state,
        ticketData: action.payload,
        loading: false,
        error: null,
      };
    case UPLOAD_TICKET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ticketModReducer;
