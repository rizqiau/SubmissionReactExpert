import apiService from "../../utils/api";
import { showLoadingBar, hideLoadingBar } from "../loadingBar/action";

const ActionType = {
  RECEIVE_DETAIL_THREAD: "RECEIVE_DETAIL_THREAD",
  CLEAR_DETAIL_THREAD: "CLEAR_DETAIL_THREAD",
  ADD_COMMENT: "ADD_COMMENT",
  UPVOTE_DETAIL_THREAD: "UPVOTE_DETAIL_THREAD",
  DOWNVOTE_DETAIL_THREAD: "DOWNVOTE_DETAIL_THREAD",
  NEUTRALIZE_DETAIL_THREAD_VOTE: "NEUTRALIZE_DETAIL_THREAD_VOTE",
  UPVOTE_COMMENT: "UPVOTE_COMMENT",
  DOWNVOTE_COMMENT: "DOWNVOTE_COMMENT",
  NEUTRALIZE_COMMENT: "NEUTRALIZE_COMMENT_VOTE",
};

function receiveDetailThreadActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_DETAIL_THREAD,
    payload: {
      detailThread,
    },
  };
}

function clearDetailThreadActionCreator() {
  return {
    type: ActionType.CLEAR_DETAIL_THREAD,
  };
}

function addCommentActionCreator({ threadId, comment }) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      threadId,
      comment,
    },
  };
}

function upVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.UPVOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function downVoteDetailThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.DOWNVOTE_DETAIL_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function neutralizeDetailThreadVoteActionCreator({ threadId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_DETAIL_THREAD_VOTE,
    payload: {
      threadId,
      userId,
    },
  };
}

function upVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.UPVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function downVoteCommentActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.DOWNVOTE_COMMENT,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function neutralizeCommentVoteActionCreator({ threadId, commentId, userId }) {
  return {
    type: ActionType.NEUTRALIZE_COMMENT_VOTE,
    payload: {
      threadId,
      commentId,
      userId,
    },
  };
}

function asyncReceiveDetailThread(threadId) {
  return async (dispatch) => {
    dispatch(showLoadingBar());
    try {
      const { error, data: detailThread } = await apiService.getDetailThread(
        threadId
      );
      if (!error) {
        dispatch(receiveDetailThreadActionCreator(detailThread.detailThread));
      } else {
        alert(detailThread.data || "Failed to fetch thread detail.");
      }
    } catch (error) {
      console.error("Error fetching detail thread:", error);
      alert("An unexpected error occurred while fetching thread detail.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncAddComment({ threadId, content }) {
  return async (dispatch) => {
    dispatch(showLoadingBar());
    try {
      const { error, data: comment } = await apiService.createComment({
        threadId,
        content,
      });
      if (!error) {
        dispatch(
          addCommentActionCreator({ threadId, comment: comment.comment })
        );
      } else {
        alert(comment.data || "Failed to add comment.");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("An unexpected error occurred while adding comment.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncUpVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return;

    dispatch(
      upVoteDetailThreadActionCreator({ threadId, userId: authUser.id })
    );
    dispatch(showLoadingBar());

    try {
      const { error } = await apiService.upVoteThread(threadId);
      if (error) {
        dispatch(
          neutralizeDetailThreadVoteActionCreator({
            threadId,
            userId: authUser.id,
          })
        );
        alert("Failed to upvote thread. Please try again.");
      }
    } catch (error) {
      dispatch(
        neutralizeDetailThreadVoteActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
      console.error("Error upvoting detail thread:", error);
      alert("An unexpected error occurred while upvoting thread.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncDownVoteDetailThread(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return;

    dispatch(
      downVoteDetailThreadActionCreator({ threadId, userId: authUser.id })
    );
    dispatch(showLoadingBar());

    try {
      const { error } = await apiService.downVoteThread(threadId);
      if (error) {
        dispatch(
          neutralizeDetailThreadVoteActionCreator({
            threadId,
            userId: authUser.id,
          })
        );
        alert("Failed to downvote thread. Please try again.");
      }
    } catch (error) {
      dispatch(
        neutralizeDetailThreadVoteActionCreator({
          threadId,
          userId: authUser.id,
        })
      );
      console.error("Error downvoting detail thread:", error);
      alert("An unexpected error occurred while downvoting thread.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncNeutralizeDetailThreadVote(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return;

    dispatch(
      neutralizeDetailThreadVoteActionCreator({ threadId, userId: authUser.id })
    );
    dispatch(showLoadingBar());

    try {
      const { error } = await apiService.neutralizeThreadVote(threadId);
      if (error) {
        alert("Failed to neutralize thread vote. Please try again.");
      }
    } catch (error) {
      console.error("Error neutralizing detail thread vote:", error);
      alert("An unexpected error occurred while neutralizing thread vote.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncUpVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return;

    dispatch(
      upVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })
    );
    dispatch(showLoadingBar());

    try {
      const { error } = await apiService.upVoteComment({ threadId, commentId });
      if (error) {
        dispatch(
          neutralizeCommentVoteActionCreator({
            threadId,
            commentId,
            userId: authUser.id,
          })
        );
        alert("Failed to upvote comment. Please try again.");
      }
    } catch (error) {
      dispatch(
        neutralizeCommentVoteActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        })
      );
      console.error("Error upvoting comment:", error);
      alert("An unexpected error occurred while upvoting comment.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncDownVoteComment({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return;

    dispatch(
      downVoteCommentActionCreator({ threadId, commentId, userId: authUser.id })
    );
    dispatch(showLoadingBar());

    try {
      const { error } = await apiService.downVoteComment({
        threadId,
        commentId,
      });
      if (error) {
        dispatch(
          neutralizeCommentVoteActionCreator({
            threadId,
            commentId,
            userId: authUser.id,
          })
        );
        alert("Failed to downvote comment. Please try again.");
      }
    } catch (error) {
      dispatch(
        neutralizeCommentVoteActionCreator({
          threadId,
          commentId,
          userId: authUser.id,
        })
      );
      console.error("Error downvoting comment:", error);
      alert("An unexpected error occurred while downvoting comment.");
    }
    dispatch(hideLoadingBar());
  };
}

function asyncNeutralizeCommentVote({ threadId, commentId }) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    if (!authUser) return;

    dispatch(
      neutralizeCommentVoteActionCreator({
        threadId,
        commentId,
        userId: authUser.id,
      })
    );
    dispatch(showLoadingBar());

    try {
      const { error } = await apiService.neutralizeCommentVote({
        threadId,
        commentId,
      });
      if (error) {
        alert("Failed to neutralize comment vote. Please try again.");
      }
    } catch (error) {
      console.error("Error neutralizing comment vote:", error);
      alert("An unexpected error occurred while neutralizing comment vote.");
    }
    dispatch(hideLoadingBar());
  };
}

export {
  ActionType,
  receiveDetailThreadActionCreator,
  clearDetailThreadActionCreator,
  addCommentActionCreator,
  upVoteDetailThreadActionCreator,
  downVoteDetailThreadActionCreator,
  neutralizeDetailThreadVoteActionCreator,
  upVoteCommentActionCreator,
  downVoteCommentActionCreator,
  neutralizeCommentVoteActionCreator,
  asyncReceiveDetailThread,
  asyncAddComment,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  asyncNeutralizeDetailThreadVote,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeCommentVote,
};
