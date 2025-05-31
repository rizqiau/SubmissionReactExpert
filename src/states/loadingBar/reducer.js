import { ActionType } from "./action";

function loadingBarReducer(loadingBar = 0, action) {
  switch (action.type) {
    case ActionType.SHOW_LOADING_BAR:
      return loadingBar + 1;
    case ActionType.HIDE_LOADING_BAR:
      return loadingBar - 1;
    default:
      return loadingBar;
  }
}

export default loadingBarReducer;
