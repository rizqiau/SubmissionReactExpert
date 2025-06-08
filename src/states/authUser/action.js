import apiService from '../../utils/api';
import { showLoadingBar, hideLoadingBar } from '../loadingBar/action';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
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
          return { success: true };
        }
        apiService.putAccessToken('');
        dispatch(unsetAuthUserActionCreator());
        alert(userMessage || 'Failed to fetch user profile after login.');
        return { success: false, message: userMessage };
      }
      alert(loginMessage || 'Login failed.');
      return { success: false, message: loginMessage };
    } catch (caughtError) {
      alert('An unexpected error occurred during login.');
      return {
        success: false,
        message: 'An unexpected error occurred during login.',
      };
    } finally {
      dispatch(hideLoadingBar());
    }
  };
}

function asyncUnsetAuthUser() {
  return (dispatch) => {
    dispatch(setAuthUserActionCreator(null));
    apiService.putAccessToken('');
  };
}

function asyncRegisterUser({ name, email, password }) {
  return async (dispatch) => {
    dispatch(showLoadingBar());
    try {
      const { error, message } = await apiService.register({
        name,
        email,
        password,
      });
      if (!error) {
        alert('Pendaftaran berhasil! Silakan login.');
        return { success: true };
      }
      alert(message || 'Pendaftaran gagal.');
      return { success: false, message };
    } catch (caughtError) {
      alert('An unexpected error occurred during registration.');
      return {
        success: false,
        message: 'An unexpected error occurred during registration.',
      };
    } finally {
      dispatch(hideLoadingBar());
    }
  };
}

export {
  ActionType,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  asyncRegisterUser,
};
