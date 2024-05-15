import {
  FETCH_POST_BY_TICKET_REQUEST,
  FETCH_POST_BY_TICKET_SUCCESS,
  FETCH_POST_BY_TICKET_FAILURE,
} from "../action";

const initialState = {
  ticket_posts: [],
  loading: false,
  error: null,
};

const postByTicketReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_BY_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_POST_BY_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        ticket_posts: action.payload,
        error: null,
      };
    case FETCH_POST_BY_TICKET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default postByTicketReducer;
