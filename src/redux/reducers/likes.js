import {
  FETCH_LIKES_REQUEST,
  FETCH_LIKES_SUCCESS,
  FETCH_LIKES_FAILURE,
  ADD_LIKE_REQUEST,
  ADD_LIKE_SUCCESS,
  ADD_LIKE_FAILURE,
  REMOVE_LIKE_REQUEST,
  REMOVE_LIKE_SUCCESS,
  REMOVE_LIKE_FAILURE,
} from "../action";

const initialState = {
  likes: [],
  loading: false,
  error: null,
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIKES_REQUEST:
    case ADD_LIKE_REQUEST:
    case REMOVE_LIKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LIKES_SUCCESS:
      return {
        ...state,
        loading: false,
        likes: action.payload,
        error: null,
      };
    case ADD_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        likes: [...state.likes, action.payload],
        error: null,
      };
    case REMOVE_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
        likes: state.likes.filter(
          (like) =>
            like[`${action.payload.entityType}Id`] !==
              action.payload.entityId || like.userId !== action.payload.userId
        ),
        error: null,
      };
    case FETCH_LIKES_FAILURE:
    case ADD_LIKE_FAILURE:
    case REMOVE_LIKE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default likeReducer;
