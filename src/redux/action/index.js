export const FETCH_USER_PROFILE = "FETCH_USER_PROFILE";
export const LOGIN_USER_PROFILE = "LOGIN_USER_PROFILE";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REGISTRATION_USER_REQUEST = "REGISTRATION_USER_REQUEST";
export const REGISTRATION_USER_SUCCESS = "REGISTRATION_USER_SUCCESS";
export const REGISTRATION_USER_FAILURE = "REGISTRATION_USER_FAILURE";
export const FETCH_TICKETS_REQUEST = "FETCH_TICKETS_REQUEST";
export const FETCH_TICKETS_SUCCESS = "FETCH_TICKETS_SUCCESS";
export const FETCH_TICKETS_FAILURE = "FETCH_TICKETS_FAILURE";
export const UPLOAD_PROFILE_IMAGE_REQUEST = " UPLOAD_PROFILE_IMAGE_REQUEST";
export const UPLOAD_PROFILE_IMAGE_SUCCESS = " UPLOAD_PROFILE_IMAGE_SUCCESS";
export const UPLOAD_PROFILE_IMAGE_FAILURE = " UPLOAD_PROFILE_IMAGE_FAILURE";
export const GET_USER_BY_ID_REQUEST = " GET_USER_BY_ID_REQUEST";
export const GET_USER_BY_ID_SUCCESS = " GET_USER_BY_ID_SUCCESS";
export const GET_USER_BY_ID_FAILURE = " GET_USER_BY_ID_FAILURE";
export const FETCH_POST_REQUEST = "FETCH_POST_REQUEST";
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS";
export const FETCH_POST_FAILURE = "FETCH_POST_FAILURE";
export const FETCH_COMMENT_REQUEST = "FETCH_COMMENT_REQUEST";
export const FETCH_COMMENT_SUCCESS = "FETCH_COMMENT_SUCCESS";
export const FETCH_COMMENT_FAILURE = "FETCH_COMMENT_FAILURE";
export const FETCH_ALL_TICKETS_REQUEST = "FETCH_ALL_TICKETS_REQUEST";
export const FETCH_ALL_TICKETS_SUCCESS = "FETCH_ALL_TICKETS_SUCCESS";
export const FETCH_ALL_TICKETS_FAILURE = "FETCH_ALL_TICKETS_FAILURE";
export const FETCH_POST_BY_TICKET_REQUEST = "FETCH_POST_BY_TICKET_REQUEST";
export const FETCH_POST_BY_TICKET_SUCCESS = "FETCH_POST_BY_TICKET_SUCCESS";
export const FETCH_POST_BY_TICKET_FAILURE = "FETCH_POST_BY_TICKET_FAILURE";
export const FETCH_COMMENT_X_POST_REQUEST = "FETCH_COMMENT_X_POST_REQUEST";
export const FETCH_COMMENT_X_POST_SUCCESS = "FETCH_COMMENT_X_POST_SUCCESS";
export const FETCH_COMMENT_X_POST_FAILURE = "FETCH_COMMENT_X_POST_FAILURE";

// ALL USERS

export const fetchActionUsers = (token) => {
  return async (dispatch) => {
    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        let data = await response.json();
        dispatch({ type: FETCH_USER_PROFILE, payload: data.content });
      } else {
        console.error("Errore durante il recupero degli utenti:", response);
      }
    } catch (error) {
      console.error("Errore durante il recupero degli utenti:", error);
    }
  };
};

// LOGIN

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (userData) => ({
  type: LOGIN_SUCCESS,
  payload: userData,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const loginUser = (formData) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const userData = await response.json();
      dispatch(loginSuccess(userData));
      console.log(userData);
      return { success: true, payload: userData }; // Restituisci sia i dati dell'utente che la response completa
    } catch (error) {
      dispatch(loginFailure(error.message));
      return { success: false, error }; // Restituisci solo l'errore
    }
  };
};

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  };
};

// REGISTRATION

export const registrationRequest = () => ({
  type: REGISTRATION_USER_REQUEST,
});

export const registrationSuccess = (userData) => ({
  type: REGISTRATION_USER_SUCCESS,
  payload: userData,
});

export const registrationFailure = (error) => ({
  type: REGISTRATION_USER_FAILURE,
  payload: error,
});

export const registrationUser = (formData) => {
  return async (dispatch) => {
    dispatch(registrationRequest());
    try {
      const response = await fetch(
        "http://localhost:3001/api/auth/registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const userData = await response.json();
      dispatch(registrationSuccess(userData));
      console.log(userData);
      return { success: true, payload: userData };
    } catch (error) {
      dispatch(registrationFailure(error.message));
      return { success: false, error };
    }
  };
};

// USER BY ID

export const getUserByIdRequest = () => ({
  type: GET_USER_BY_ID_REQUEST,
});

export const getUserByIdSuccess = (userData) => ({
  type: GET_USER_BY_ID_SUCCESS,
  payload: userData,
});

export const getUserByIdFailure = (error) => ({
  type: GET_USER_BY_ID_FAILURE,
  payload: error,
});

export const getUserById = (userId, token) => {
  return async (dispatch) => {
    dispatch(getUserByIdRequest());
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(getUserByIdSuccess(userData));
    } catch (error) {
      dispatch(getUserByIdFailure(error.message));
    }
  };
};

// CHANGE IMG PROFILE

export const uploadProfileImageRequest = () => ({
  type: UPLOAD_PROFILE_IMAGE_REQUEST,
});

export const uploadProfileImageSuccess = (userData) => ({
  type: UPLOAD_PROFILE_IMAGE_SUCCESS,
  payload: userData,
});

export const uploadProfileImageFailure = (error) => ({
  type: UPLOAD_PROFILE_IMAGE_FAILURE,
  payload: error,
});

export const uploadProfileImage = (userId, token, formData) => {
  return async (dispatch) => {
    dispatch(uploadProfileImageRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/users/${userId}/profileImage`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(uploadProfileImageSuccess(userData));
    } catch (error) {
      dispatch(uploadProfileImageFailure(error.message));
    }
  };
};

// USER'S TICKET

export const ticketRequest = () => ({
  type: FETCH_TICKETS_REQUEST,
});

export const ticketSuccess = (userData) => ({
  type: FETCH_TICKETS_SUCCESS,
  payload: userData,
});

export const ticketFailure = (error) => ({
  type: FETCH_TICKETS_FAILURE,
  payload: error,
});

export const ticketXUser = (userId, token) => {
  return async (dispatch) => {
    dispatch(ticketRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/tickets/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(ticketSuccess(userData));
    } catch (error) {
      dispatch(ticketFailure(error.message));
    }
  };
};

// USER'S POST

export const postRequest = () => ({
  type: FETCH_POST_REQUEST,
});

export const postSuccess = (userData) => ({
  type: FETCH_POST_SUCCESS,
  payload: userData,
});

export const postFailure = (error) => ({
  type: FETCH_POST_FAILURE,
  payload: error,
});

export const postXUser = (userId, token) => {
  return async (dispatch) => {
    dispatch(postRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/posts/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(postSuccess(userData));
    } catch (error) {
      dispatch(postFailure(error.message));
    }
  };
};

// USER'S COMMENT

export const commentRequest = () => ({
  type: FETCH_COMMENT_REQUEST,
});

export const commentSuccess = (userData) => ({
  type: FETCH_COMMENT_SUCCESS,
  payload: userData,
});

export const commentFailure = (error) => ({
  type: FETCH_COMMENT_FAILURE,
  payload: error,
});

export const commentXUser = (userId, token) => {
  return async (dispatch) => {
    dispatch(commentRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/comments/user/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(commentSuccess(userData));
    } catch (error) {
      dispatch(commentFailure(error.message));
    }
  };
};

// ALL TICKETS

export const allTicketRequest = () => ({
  type: FETCH_ALL_TICKETS_REQUEST,
});

export const allTicketSuccess = (userData) => ({
  type: FETCH_ALL_TICKETS_SUCCESS,
  payload: userData,
});

export const allTicketFailure = (error) => ({
  type: FETCH_ALL_TICKETS_FAILURE,
  payload: error,
});

export const allTicketAction = (token) => {
  return async (dispatch) => {
    dispatch(allTicketRequest());
    try {
      const response = await fetch(`http://localhost:3001/tickets`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(allTicketSuccess(userData));
    } catch (error) {
      dispatch(allTicketFailure(error.message));
    }
  };
};

// POST BY TICKET

export const postsByTicketRequest = () => ({
  type: FETCH_POST_BY_TICKET_REQUEST,
});

export const postsByTicketSuccess = (userData) => ({
  type: FETCH_POST_BY_TICKET_SUCCESS,
  payload: userData,
});

export const postsByTicketFailure = (error) => ({
  type: FETCH_POST_BY_TICKET_FAILURE,
  payload: error,
});

export const postsByTicketAction = (ticketId, token) => {
  return async (dispatch) => {
    dispatch(postsByTicketRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/posts/byTicket/${ticketId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(postsByTicketSuccess(userData));
    } catch (error) {
      dispatch(postsByTicketFailure(error.message));
    }
  };
};

// COMMENTS X POST

export const postCommentsRequest = () => ({
  type: FETCH_COMMENT_X_POST_REQUEST,
});

export const postCommentsSuccess = (userData) => ({
  type: FETCH_COMMENT_X_POST_SUCCESS,
  payload: userData,
});

export const postCommentsFailure = (error) => ({
  type: FETCH_COMMENT_X_POST_FAILURE,
  payload: error,
});

export const postCommentsAction = (postId, token) => {
  return async (dispatch) => {
    dispatch(postCommentsRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/comments/post/${postId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(postCommentsSuccess(userData));
    } catch (error) {
      dispatch(postCommentsFailure(error.message));
    }
  };
};
