const ActionType = {
  SHOW_LOADING_BAR: 'SHOW_LOADING_BAR',
  HIDE_LOADING_BAR: 'HIDE_LOADING_BAR',
};

function showLoadingBar() {
  return {
    type: ActionType.SHOW_LOADING_BAR,
  };
}

function hideLoadingBar() {
  return {
    type: ActionType.HIDE_LOADING_BAR,
  };
}

export { ActionType, showLoadingBar, hideLoadingBar };
