import apiService from "../../utils/api";
import { showLoadingBar, hideLoadingBar } from "../loadingBar/action";

const ActionType = {
  RECEIVE_LEADERBOARDS: "RECEIVE_LEADERBOARDS",
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoadingBar());
    try {
      const { error, data: leaderboards } = await apiService.getLeaderboards();
      if (!error) {
        dispatch(receiveLeaderboardsActionCreator(leaderboards.leaderboards));
      } else {
        alert(leaderboards.data || "Failed to fetch leaderboards.");
      }
    } catch (error) {
      console.error("Error fetching leaderboards:", error);
      alert("An unexpected error occurred while fetching leaderboards.");
    }
    dispatch(hideLoadingBar());
  };
}

export {
  ActionType,
  receiveLeaderboardsActionCreator,
  asyncReceiveLeaderboards,
};
