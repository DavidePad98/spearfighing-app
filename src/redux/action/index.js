export const FETCH_USER_PROFILE = "FETCH_USER_PROFILE";
export const LOGIN_USER_PROFILE = "LOGIN_USER_PROFILE";
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const REGISTRATION_USER_REQUEST = "REGISTRATION_USER_REQUEST";
export const REGISTRATION_USER_SUCCESS = "REGISTRATION_USER_SUCCESS";
export const REGISTRATION_USER_FAILURE = "REGISTRATION_USER_FAILURE";

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
