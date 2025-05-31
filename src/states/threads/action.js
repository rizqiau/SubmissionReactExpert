import apiService from "../../utils/api";
import { showLoadingBar, hideLoadingBar } from "../loadingBar/action";
import { receiveUsersActionCreator } from "../users/action";

const ActionType = {
  RECEIVE_THREADS: "RECEIVE_THREADS",
  ADD_THREAD: "ADD_THREAD",
  UPVOTE_THREAD: "UPVOTE_THREAD",
  DOWNVOTE_THREAD: "DOWNVOTE_THREAD",
  NEUTRALIZE_THREAD_VOTE: "NEUTRALIZE_THREAD_VOTE",
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function upVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWNVOTE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeThreadVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_THREAD_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoadingBar());
    try {
      const { error, data: thread } = await apiService.createThread({
        title,
        body,
        category,
      });
      if (!error) {
        dispatch(addThreadActionCreator(thread.thread));
      } else {
        alert(thread.data || "Failed to create thread.");
      }
    } catch (error) {
      console.error("Error creating thread:", error);
      alert("An unexpected error occurred while creating thread.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncPopulateThreadsAndUsers() {
  return async (dispatch) => {
    dispatch(showLoadingBar());
    try {
      const {
        error: threadsError,
        data: threadsData,
        message: threadsMessage,
      } = await apiService.getAllThreads();
      const {
        error: usersError,
        data: usersData,
        message: usersMessage,
      } = await apiService.getAllUsers();

      if (!threadsError) {
        dispatch(receiveThreadsActionCreator(threadsData.threads));
      } else {
        alert(threadsMessage || "Failed to fetch threads.");
      }

      if (!usersError) {
        dispatch(receiveUsersActionCreator(usersData.users));
      } else {
        alert(usersMessage || "Failed to fetch users.");
      }
    } catch (caughtError) {
      console.error("Error populating threads and users:", caughtError);
      alert("An unexpected error occurred while fetching data.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncUpVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert("Anda harus login untuk melakukan vote!");
      return;
    }

    dispatch(upVoteThreadActionCreator({ threadId, userId: authUser.id }));
    dispatch(showLoadingBar());

    try {
      const { error } = await apiService.upVoteThread(threadId);
      if (error) {
        dispatch(
          neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id })
        );
        alert("Failed to upvote thread. Please try again.");
      }
    } catch (error) {
      dispatch(
        neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id })
      );
      console.error("Error upvoting thread:", error);
      alert("An unexpected error occurred while upvoting thread.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncDownVoteThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert("Anda harus login untuk melakukan vote!");
      return;
    }

    dispatch(downVoteThreadActionCreator({ threadId, userId: authUser.id }));
    dispatch(showLoadingBar());

    try {
      const { error } = await apiService.downVoteThread(threadId);
      if (error) {
        dispatch(
          neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id })
        );
        alert("Failed to downvote thread. Please try again.");
      }
    } catch (error) {
      dispatch(
        neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id })
      );
      console.error("Error downvoting thread:", error);
      alert("An unexpected error occurred while downvoting thread.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncNeutralizeThreadVote(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) {
      alert("Anda harus login untuk melakukan vote!");
      return;
    }

    dispatch(
      neutralizeThreadVoteActionCreator({ threadId, userId: authUser.id })
    );
    dispatch(showLoadingBar());

    try {
      const { error } = await apiService.neutralizeThreadVote(threadId);
      if (error) {
        alert("Failed to neutralize thread vote. Please try again.");
      }
    } catch (error) {
      console.error("Error neutralizing thread vote:", error);
      alert("An unexpected error occurred while neutralizing thread vote.");
    }
    dispatch(hideLoadingBar());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  upVoteThreadActionCreator,
  downVoteThreadActionCreator,
  neutralizeThreadVoteActionCreator,
  asyncAddThread,
  asyncPopulateThreadsAndUsers,
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeThreadVote,
};
