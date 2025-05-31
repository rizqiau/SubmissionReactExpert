import apiService from "../../utils/api";
import { showLoadingBar, hideLoadingBar } from "../loadingBar/action";

const ActionType = {
  SET_AUTH_USER: "SET_AUTH_USER",
  UNSET_AUTH_USER: "UNSET_AUTH_USER",
};

function setAuthUserActionCreator(authUser) {
  return {
    type: ActionType.SET_AUTH_USER,
    payload: {
      authUser,
    },
  };
}

function unsetAuthUserActionCreator() {
  return {
    type: ActionType.UNSET_AUTH_USER,
  };
}

function asyncSetAuthUser({ email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingBar());
    try {
      const {
        error,
        data,
        message: loginMessage,
      } = await apiService.login({ email, password });
      if (!error) {
        apiService.putAccessToken(data.token);
        const {
          error: userError,
          data: user,
          message: userMessage,
        } = await apiService.getOwnProfile();
        if (!userError) {
          dispatch(setAuthUserActionCreator(user.user));
        } else {
          console.error("Failed to get user profile after login:", userMessage);
          apiService.putAccessToken("");
          dispatch(unsetAuthUserActionCreator());
          alert(userMessage || "Failed to fetch user profile after login.");
        }
      } else {
        alert(loginMessage || "Login failed.");
      }
    } catch (caughtError) {
      console.error("Login unexpected error:", caughtError);
      alert("An unexpected error occurred during login.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(setAuthUserActionCreator(null));
    apiService.putAccessToken("");
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
