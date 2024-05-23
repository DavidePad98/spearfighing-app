import {
  GET_USER_BY_ID_FAILURE,
  GET_USER_BY_ID_REQUEST,
  GET_USER_BY_ID_SUCCESS,
  GET_COMMENT_BY_ID_FAILURE,
  GET_COMMENT_BY_ID_REQUEST,
  GET_COMMENT_BY_ID_SUCCESS,
  GET_POST_BY_ID_FAILURE,
  GET_POST_BY_ID_REQUEST,
  GET_POST_BY_ID_SUCCESS,
  GET_TICKET_BY_ID_FAILURE,
  GET_TICKET_BY_ID_REQUEST,
  GET_TICKET_BY_ID_SUCCESS,
} from "../action";

const initialState = {
  loading: false,
  data: {},
  error: null,
};

const detailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_BY_ID_REQUEST:
    case GET_POST_BY_ID_REQUEST:
    case GET_TICKET_BY_ID_REQUEST:
    case GET_COMMENT_BY_ID_REQUEST:
      return { ...state, loading: true };
    case GET_USER_BY_ID_SUCCESS:
    case GET_POST_BY_ID_SUCCESS:
    case GET_TICKET_BY_ID_SUCCESS:
    case GET_COMMENT_BY_ID_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case GET_USER_BY_ID_FAILURE:
    case GET_POST_BY_ID_FAILURE:
    case GET_TICKET_BY_ID_FAILURE:
    case GET_COMMENT_BY_ID_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default detailsReducer;
