import apiService from "../../utils/api";
import { setAuthUserActionCreator } from "../authUser/action";
import { showLoadingBar, hideLoadingBar } from "../loadingBar/action";

const ActionType = {
  SET_IS_PRELOAD: "SET_IS_PRELOAD",
};

function setIsPreloadActionCreator(isPreload) {
  return {
    type: ActionType.SET_IS_PRELOAD,
    payload: {
      isPreload,
    },
  };
}

function asyncPreloadProcess() {
  return async (dispatch) => {
    dispatch(showLoadingBar());
    try {
      const { error, data: authUser } = await apiService.getOwnProfile();
      if (!error) {
        dispatch(setAuthUserActionCreator(authUser.user));
      } else {
        dispatch(setAuthUserActionCreator(null));
      }
    } catch (error) {
      console.error("Error during preload process:", error);
      dispatch(setAuthUserActionCreator(null));
    } finally {
      dispatch(setIsPreloadActionCreator(false));
      dispatch(hideLoadingBar());
    }
  };
}

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
