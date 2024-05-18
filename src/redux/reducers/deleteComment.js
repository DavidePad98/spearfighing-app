import { DELETE_COMMENT_SUCCESS, DELETE_COMMENT_FAILURE } from "../action";

const initialState = {
  comments: [],
  error: null,
};

const deleteCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment.id !== action.payload
        ),
        error: null,
      };

    case DELETE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default deleteCommentReducer;
