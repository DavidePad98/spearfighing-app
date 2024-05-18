import { DELETE_POST_SUCCESS, DELETE_POST_FAILURE } from "../action";

const initialState = {
  posts: [],
  error: null,
};

const deletePostReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.payload),
        error: null,
      };

    case DELETE_POST_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default deletePostReducer;
