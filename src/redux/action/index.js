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
export const CREATE_TICKET_REQUEST = "CREATE_TICKET_REQUEST";
export const CREATE_TICKET_SUCCESS = "CREATE_TICKET_SUCCESS";
export const CREATE_TICKET_FAILURE = "CREATE_TICKET_FAILURE";
export const CREATE_POST_REQUEST = "CREATE_POST_REQUEST";
export const CREATE_POST_SUCCESS = "CREATE_POST_SUCCESS";
export const CREATE_POST_FAILURE = "CREATE_POST_FAILURE";
export const CREATE_COMMENT_REQUEST = "CREATE_COMMENT_REQUEST";
export const CREATE_COMMENT_SUCCESS = "CREATE_COMMENT_SUCCESS";
export const CREATE_COMMENT_FAILURE = "CREATE_COMMENT_FAILURE";
export const UPLOAD_PROFILE_REQUEST = "UPLOAD_PROFILE_REQUEST";
export const UPLOAD_PROFILE_SUCCESS = "UPLOAD_PROFILE_SUCCESS";
export const UPLOAD_PROFILE_FAILURE = "UPLOAD_PROFILE_FAILURE";
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS";
export const DELETE_POST_FAILURE = "DELETE_POST_FAILURE";
export const DELETE_TICKET_SUCCESS = "DELETE_TICKET_SUCCESS";
export const DELETE_TICKET_FAILURE = "DELETE_TICKET_FAILURE";
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS";
export const DELETE_COMMENT_FAILURE = "DELETE_COMMENT_FAILURE";
export const UPLOAD_TICKET_REQUEST = "UPLOAD_TICKET_REQUEST";
export const UPLOAD_TICKET_SUCCESS = "UPLOAD_TICKET_SUCCESS";
export const UPLOAD_TICKET_FAILURE = "UPLOAD_TICKET_FAILURE";
export const UPLOAD_POST_REQUEST = "UPLOAD_POST_REQUEST";
export const UPLOAD_POST_SUCCESS = "UPLOAD_POST_SUCCESS";
export const UPLOAD_POST_FAILURE = "UPLOAD_POST_FAILURE";
export const UPLOAD_COMMENT_REQUEST = "UPLOAD_COMMENT_REQUEST";
export const UPLOAD_COMMENT_SUCCESS = "UPLOAD_COMMENT_SUCCESS";
export const UPLOAD_COMMENT_FAILURE = "UPLOAD_COMMENT_FAILURE";
export const SEARCH_ALL_COMMENTS_REQUEST = "SEARCH_ALL_COMMENTS_REQUEST";
export const SEARCH_ALL_COMMENTS_SUCCESS = "SEARCH_ALL_COMMENTS_SUCCESS";
export const SEARCH_ALL_COMMENTS_FAILURE = "SEARCH_ALL_COMMENTS_FAILURE";
export const SEARCH_ALL_POSTS_REQUEST = "SEARCH_ALL_POSTS_REQUEST";
export const SEARCH_ALL_POSTS_SUCCESS = "SEARCH_ALL_POSTS_SUCCESS";
export const SEARCH_ALL_POSTS_FAILURE = "SEARCH_ALL_POSTS_FAILURE";
export const SEARCH_ALL_TICKETS_REQUEST = "SEARCH_ALL_TICKETS_REQUEST";
export const SEARCH_ALL_TICKETS_SUCCESS = "SEARCH_ALL_TICKETS_SUCCESS";
export const SEARCH_ALL_TICKETS_FAILURE = "SEARCH_ALL_TICKETS_FAILURE";
export const SEARCH_ALL_USERS_REQUEST = "SEARCH_ALL_USERS_REQUEST";
export const SEARCH_ALL_USERS_SUCCESS = "SEARCH_ALL_USERS_SUCCESS";
export const SEARCH_ALL_USERS_FAILURE = "SEARCH_ALL_USERS_FAILURE";
export const GET_COMMENT_BY_ID_REQUEST = "GET_COMMENT_BY_ID_REQUEST";
export const GET_COMMENT_BY_ID_SUCCESS = "GET_COMMENT_BY_ID_SUCCESS";
export const GET_COMMENT_BY_ID_FAILURE = "GET_COMMENT_BY_ID_FAILURE";
export const GET_POST_BY_ID_REQUEST = "GET_POST_BY_ID_REQUEST";
export const GET_POST_BY_ID_SUCCESS = "GET_POST_BY_ID_SUCCESS";
export const GET_POST_BY_ID_FAILURE = "GET_POST_BY_ID_FAILURE";
export const GET_TICKET_BY_ID_REQUEST = "GET_TICKET_BY_ID_REQUEST";
export const GET_TICKET_BY_ID_SUCCESS = "GET_TICKET_BY_ID_SUCCESS";
export const GET_TICKET_BY_ID_FAILURE = "GET_TICKET_BY_ID_FAILURE";
export const FETCH_LIKES_REQUEST = "FETCH_LIKES_REQUEST";
export const FETCH_LIKES_SUCCESS = "FETCH_LIKES_SUCCESS";
export const FETCH_LIKES_FAILURE = "FETCH_LIKES_FAILURE";
export const ADD_LIKE_REQUEST = "ADD_LIKE_REQUEST";
export const ADD_LIKE_SUCCESS = "ADD_LIKE_SUCCESS";
export const ADD_LIKE_FAILURE = "ADD_LIKE_FAILURE";
export const REMOVE_LIKE_REQUEST = "REMOVE_LIKE_REQUEST";
export const REMOVE_LIKE_SUCCESS = "REMOVE_LIKE_SUCCESS";
export const REMOVE_LIKE_FAILURE = "REMOVE_LIKE_FAILURE";

// VALIDATE TOKEN

export const validateTokenAndFetchUser = async (token, dispatch) => {
  try {
    const response = await fetch("http://localhost:3001/api/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Session expired or invalid token");
    }

    const userData = await response.json();
    dispatch(loginSuccess("login userData", userData)); // Assumi che loginSuccess accetta i dati dell'utente e li memorizzi nello stato Redux
  } catch (error) {
    console.error("Error validating token and fetching user:", error);
    localStorage.removeItem("token"); // Rimuovi il token se non è più valido
    dispatch(loginFailure("Please login again"));
  }
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
      // localStorage.setItem("token", userData.authorization);
      dispatch(loginSuccess(userData));
      return { success: true, payload: userData };
    } catch (error) {
      dispatch(loginFailure(error.message));
      return { success: false, error };
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

// POST BY ID

export const getPostByIdRequest = () => ({
  type: GET_POST_BY_ID_REQUEST,
});

export const getPostByIdSuccess = (postData) => ({
  type: GET_POST_BY_ID_SUCCESS,
  payload: postData,
});

export const getPostByIdFailure = (error) => ({
  type: GET_POST_BY_ID_FAILURE,
  payload: error,
});

export const getPostById = (postId, token) => {
  return async (dispatch) => {
    dispatch(getPostByIdRequest());
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const postData = await response.json();
      dispatch(getPostByIdSuccess(postData));
    } catch (error) {
      dispatch(getPostByIdFailure(error.message));
    }
  };
};

// TICKET BY ID

export const getTicketByIdRequest = () => ({
  type: GET_TICKET_BY_ID_REQUEST,
});

export const getTicketByIdSuccess = (ticketData) => ({
  type: GET_TICKET_BY_ID_SUCCESS,
  payload: ticketData,
});

export const getTicketByIdFailure = (error) => ({
  type: GET_TICKET_BY_ID_FAILURE,
  payload: error,
});

export const getTicketById = (ticketId, token) => {
  return async (dispatch) => {
    dispatch(getTicketByIdRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/tickets/${ticketId}`,
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
      const ticketData = await response.json();
      dispatch(getTicketByIdSuccess(ticketData));
    } catch (error) {
      dispatch(getTicketByIdFailure(error.message));
    }
  };
};

// COMMENT BY ID

export const getCommentByIdRequest = () => ({
  type: GET_COMMENT_BY_ID_REQUEST,
});

export const getCommentByIdSuccess = (commentData) => ({
  type: GET_COMMENT_BY_ID_SUCCESS,
  payload: commentData,
});

export const getCommentByIdFailure = (error) => ({
  type: GET_COMMENT_BY_ID_FAILURE,
  payload: error,
});

export const getCommentById = (commentId, token) => {
  return async (dispatch) => {
    dispatch(getCommentByIdRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/comments/${commentId}`,
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
      const ticketData = await response.json();
      dispatch(getCommentByIdSuccess(ticketData));
    } catch (error) {
      dispatch(getCommentByIdFailure(error.message));
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

// CREATE TICKET

export const createTicketRequest = () => ({
  type: CREATE_TICKET_REQUEST,
});

export const createTicketSuccess = (userData) => ({
  type: CREATE_TICKET_SUCCESS,
  payload: userData,
});

export const createTicketFailure = (error) => ({
  type: CREATE_TICKET_FAILURE,
  payload: error,
});

export const createTicketAction = (userId, token, formData) => {
  return async (dispatch) => {
    dispatch(createTicketRequest());
    try {
      const response = await fetch(`http://localhost:3001/tickets`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(createTicketSuccess(userData));
    } catch (error) {
      dispatch(createTicketFailure(error.message));
    }
  };
};

// CREATE POST

export const createPostRequest = () => ({
  type: CREATE_POST_REQUEST,
});

export const createPostSuccess = (userData) => ({
  type: CREATE_POST_SUCCESS,
  payload: userData,
});

export const createPostFailure = (error) => ({
  type: CREATE_POST_FAILURE,
  payload: error,
});

export const createPostAction = (userId, token, formData) => {
  return async (dispatch) => {
    dispatch(createPostRequest());
    try {
      const response = await fetch(`http://localhost:3001/posts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(createPostSuccess(userData));
    } catch (error) {
      dispatch(createPostFailure(error.message));
    }
  };
};

// CREATE COMMENT

export const createCommentRequest = () => ({
  type: CREATE_COMMENT_REQUEST,
});

export const createCommentSuccess = (userData) => ({
  type: CREATE_COMMENT_SUCCESS,
  payload: userData,
});

export const createCommentFailure = (error) => ({
  type: CREATE_COMMENT_FAILURE,
  payload: error,
});

export const createCommentAction = (userId, token, formData) => {
  return async (dispatch) => {
    dispatch(createCommentRequest());
    try {
      const response = await fetch(`http://localhost:3001/comments`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(createCommentSuccess(userData));
    } catch (error) {
      dispatch(createCommentFailure(error.message));
    }
  };
};

// UPLOAD PROFILE

export const uploadProfileRequest = () => ({
  type: UPLOAD_PROFILE_REQUEST,
});

export const uploadProfileSuccess = (userData) => ({
  type: UPLOAD_PROFILE_SUCCESS,
  payload: userData,
});

export const uploadProfileFailure = (error) => ({
  type: UPLOAD_PROFILE_FAILURE,
  payload: error,
});

export const uploadProfile = (userId, token, formData) => {
  return async (dispatch) => {
    dispatch(uploadProfileRequest());
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(uploadProfileSuccess(userData));
    } catch (error) {
      dispatch(uploadProfileFailure(error.message));
    }
  };
};

// DELETE POST

export const deletePostSuccess = (postId) => ({
  type: DELETE_POST_SUCCESS,
  payload: postId,
});

export const deletePostFailure = () => ({
  type: DELETE_POST_FAILURE,
  payload: "problem with delete",
});

export const deletePost = (postId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      // const userData = await response.json();
      dispatch(deletePostSuccess(postId));
    } catch (error) {
      dispatch(deletePostFailure(error.message));
    }
  };
};

// DELETE TICKET

export const deleteTicketSuccess = (ticketId) => ({
  type: DELETE_TICKET_SUCCESS,
  payload: ticketId,
});

export const deleteTicketFailure = () => ({
  type: DELETE_TICKET_FAILURE,
  payload: "problem with delete",
});

export const deleteTicket = (ticketId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:3001/tickets/${ticketId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      // const userData = await response.json();
      dispatch(deleteTicketSuccess(ticketId));
    } catch (error) {
      dispatch(deleteTicketFailure(error.message));
    }
  };
};

// DELETE COMMENT

export const deleteCommentSuccess = (commentId) => ({
  type: DELETE_COMMENT_SUCCESS,
  payload: commentId,
});

export const deleteCommentFailure = () => ({
  type: DELETE_COMMENT_FAILURE,
  payload: "problem with delete",
});

export const deleteComment = (commentId, token) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `http://localhost:3001/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      // const userData = await response.json();
      dispatch(deleteCommentSuccess(commentId));
    } catch (error) {
      dispatch(deleteCommentFailure(error.message));
    }
  };
};

// UPLOAD TICKET

export const uploadTicketRequest = () => ({
  type: UPLOAD_TICKET_REQUEST,
});

export const uploadTicketSuccess = (userData) => ({
  type: UPLOAD_TICKET_SUCCESS,
  payload: userData,
});

export const uploadTicketFailure = (error) => ({
  type: UPLOAD_TICKET_FAILURE,
  payload: error,
});

export const uploadTicket = (ticketId, token, formData) => {
  return async (dispatch) => {
    dispatch(uploadTicketRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/tickets/${ticketId}`,
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
      dispatch(uploadTicketSuccess(userData));
    } catch (error) {
      dispatch(uploadTicketFailure(error.message));
    }
  };
};

// UPLOAD POST

export const uploadPostRequest = () => ({
  type: UPLOAD_POST_REQUEST,
});

export const uploadPostSuccess = (userData) => ({
  type: UPLOAD_POST_SUCCESS,
  payload: userData,
});

export const uploadPostFailure = (error) => ({
  type: UPLOAD_POST_FAILURE,
  payload: error,
});

export const uploadPost = (postId, token, formData) => {
  return async (dispatch) => {
    dispatch(uploadPostRequest());
    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // "Content-Type": "application/json",
        },
        // body: JSON.stringify(formData),
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const userData = await response.json();
      dispatch(uploadPostSuccess(userData));
    } catch (error) {
      dispatch(uploadPostFailure(error.message));
    }
  };
};

// UPLOAD COMMENT

export const uploadCommentRequest = () => ({
  type: UPLOAD_COMMENT_REQUEST,
});

export const uploadCommentSuccess = (userData) => ({
  type: UPLOAD_COMMENT_SUCCESS,
  payload: userData,
});

export const uploadCommentFailure = (error) => ({
  type: UPLOAD_COMMENT_FAILURE,
  payload: error,
});

export const uploadComment = (commentId, token, formData) => {
  return async (dispatch) => {
    dispatch(uploadCommentRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/comments/${commentId}`,
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
      dispatch(uploadCommentSuccess(userData));
    } catch (error) {
      dispatch(uploadCommentFailure(error.message));
    }
  };
};

// SEARCH COMMENT

export const searchCommentRequest = () => ({
  type: SEARCH_ALL_COMMENTS_REQUEST,
});

export const searchCommentSuccess = (userData) => ({
  type: SEARCH_ALL_COMMENTS_SUCCESS,
  payload: userData,
});

export const searchCommentFailure = (error) => ({
  type: SEARCH_ALL_COMMENTS_FAILURE,
  payload: error,
});

export const searchComment = (token, query) => {
  return async (dispatch) => {
    dispatch(searchCommentRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/comments/search?query=${query}`,
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
      dispatch(searchCommentSuccess(userData));
    } catch (error) {
      dispatch(searchCommentFailure(error.message));
    }
  };
};

// SEARCH POST

export const searchPostRequest = () => ({
  type: SEARCH_ALL_POSTS_REQUEST,
});

export const searchPostSuccess = (userData) => ({
  type: SEARCH_ALL_POSTS_SUCCESS,
  payload: userData,
});

export const searchPostFailure = (error) => ({
  type: SEARCH_ALL_POSTS_FAILURE,
  payload: error,
});

export const searchPost = (token, query) => {
  return async (dispatch) => {
    dispatch(searchPostRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/posts/search?query=${query}`,
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
      dispatch(searchPostSuccess(userData));
    } catch (error) {
      dispatch(searchPostFailure(error.message));
    }
  };
};

// SEARCH TICKET

export const searchTicketRequest = () => ({
  type: SEARCH_ALL_TICKETS_REQUEST,
});

export const searchTicketSuccess = (userData) => ({
  type: SEARCH_ALL_TICKETS_SUCCESS,
  payload: userData,
});

export const searchTicketFailure = (error) => ({
  type: SEARCH_ALL_TICKETS_FAILURE,
  payload: error,
});

export const searchTicket = (token, query) => {
  return async (dispatch) => {
    dispatch(searchTicketRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/tickets/search?query=${query}`,
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
      dispatch(searchTicketSuccess(userData));
    } catch (error) {
      dispatch(searchTicketFailure(error.message));
    }
  };
};

// SEARCH USER

export const searchUserRequest = () => ({
  type: SEARCH_ALL_USERS_REQUEST,
});

export const searchUserSuccess = (userData) => ({
  type: SEARCH_ALL_USERS_SUCCESS,
  payload: userData,
});

export const searchUserFailure = (error) => ({
  type: SEARCH_ALL_USERS_FAILURE,
  payload: error,
});

export const searchUser = (token, query) => {
  return async (dispatch) => {
    dispatch(searchUserRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/users/search?query=${query}`,
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
      dispatch(searchUserSuccess(userData));
    } catch (error) {
      dispatch(searchUserFailure(error.message));
    }
  };
};

// GET LIKES

export const fetchLikesRequest = () => ({
  type: FETCH_LIKES_REQUEST,
});

export const fetchLikesSuccess = (likeData) => ({
  type: FETCH_LIKES_SUCCESS,
  payload: likeData || [],
});

export const fetchLikesFailure = (error) => ({
  type: FETCH_LIKES_FAILURE,
  payload: error || "Unknown error",
});

export const fetchLikesForEntity =
  (token, entityId, entityType, userId) => async (dispatch) => {
    dispatch(fetchLikesRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/likes/${entityType}/${entityId}?userId=${userId}`,
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
      const data = await response.json();
      dispatch(fetchLikesSuccess(data));
    } catch (error) {
      dispatch(fetchLikesFailure(error.message));
    }
  };

export const fetchLikesForUser = (token, userId) => {
  return async (dispatch) => {
    dispatch(fetchLikesRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/likes/user?userId=${userId}`,
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
      const likeData = await response.json();
      dispatch(fetchLikesSuccess(likeData));
    } catch (error) {
      dispatch(fetchLikesFailure(error.message));
    }
  };
};

// POST LIKES

export const addLikeRequest = () => ({
  type: ADD_LIKE_REQUEST,
});

export const addLikeSuccess = (likeData) => ({
  type: ADD_LIKE_SUCCESS,
  payload: likeData,
});

export const addLikeFailure = (error) => ({
  type: ADD_LIKE_FAILURE,
  payload: error,
});

export const addLike = (token, entityId, entityType, userId) => {
  return async (dispatch) => {
    dispatch(addLikeRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/likes/${entityType}/${entityId}?userId=${userId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const likeData = await response.json();
      dispatch(addLikeSuccess(likeData));
    } catch (error) {
      dispatch(addLikeFailure(error.message));
    }
  };
};

// REMOVE LIKES

export const removeLikeRequest = () => ({
  type: REMOVE_LIKE_REQUEST,
});

export const removeLikeSuccess = (likeId) => ({
  type: REMOVE_LIKE_SUCCESS,
  payload: likeId,
});

export const removeLikeFailure = (error) => ({
  type: REMOVE_LIKE_FAILURE,
  payload: error,
});

export const removeLike = (token, entityId, entityType, userId) => {
  return async (dispatch) => {
    dispatch(removeLikeRequest());
    try {
      const response = await fetch(
        `http://localhost:3001/likes/${entityType}/${entityId}?userId=${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      dispatch(removeLikeSuccess(userId));
    } catch (error) {
      dispatch(removeLikeFailure(error.message));
    }
  };
};
