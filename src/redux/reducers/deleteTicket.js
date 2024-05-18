import { DELETE_TICKET_SUCCESS, DELETE_TICKET_FAILURE } from "../action";

const initialState = {
  tickets: [],
  error: null,
};

const deleteTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_TICKET_SUCCESS:
      return {
        ...state,
        tickets: state.tickets.filter((ticket) => ticket.id !== action.payload),
        error: null,
      };

    case DELETE_TICKET_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default deleteTicketReducer;
