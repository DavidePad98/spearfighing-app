import {
  UPLOAD_PROFILE_IMAGE_REQUEST,
  UPLOAD_PROFILE_IMAGE_SUCCESS,
  UPLOAD_PROFILE_IMAGE_FAILURE,
} from "../action";

const initialState = {
  loading: false,
  error: null,
};

// Reduttore per le azioni di caricamento e aggiornamento dell'immagine del profilo
const profileImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_PROFILE_IMAGE_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UPLOAD_PROFILE_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case UPLOAD_PROFILE_IMAGE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileImageReducer;
