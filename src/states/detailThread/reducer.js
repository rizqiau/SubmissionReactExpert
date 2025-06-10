import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action) {
  switch (action.type) {
    case ActionType.RECEIVE_DETAIL_THREAD:
      return action.payload.detailThread;
    case ActionType.CLEAR_DETAIL_THREAD:
      return null;
    case ActionType.ADD_COMMENT:
      if (detailThread && detailThread.id === action.payload.threadId) {
        return {
          ...detailThread,
          comments: [action.payload.comment, ...detailThread.comments],
        };
      }
      return detailThread;
    case ActionType.UPVOTE_DETAIL_THREAD:
      if (detailThread && detailThread.id === action.payload.threadId) {
        return {
          ...detailThread,
          upVotesBy: detailThread.upVotesBy.includes(action.payload.userId)
            ? detailThread.upVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
            : [...detailThread.upVotesBy, action.payload.userId],
          downVotesBy: detailThread.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
        };
      }
      return detailThread;
    case ActionType.DOWNVOTE_DETAIL_THREAD:
      if (detailThread && detailThread.id === action.payload.threadId) {
        return {
          ...detailThread,
          downVotesBy: detailThread.downVotesBy.includes(action.payload.userId)
            ? detailThread.downVotesBy.filter(
              (id) => id !== action.payload.userId,
            )
            : [...detailThread.downVotesBy, action.payload.userId],
          upVotesBy: detailThread.upVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
        };
      }
      return detailThread;
    case ActionType.NEUTRALIZE_DETAIL_THREAD_VOTE:
      if (detailThread && detailThread.id === action.payload.threadId) {
        return {
          ...detailThread,
          upVotesBy: detailThread.upVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
          downVotesBy: detailThread.downVotesBy.filter(
            (id) => id !== action.payload.userId,
          ),
        };
      }
      return detailThread;
    case ActionType.UPVOTE_COMMENT:
      if (detailThread && detailThread.id === action.payload.threadId) {
        return {
          ...detailThread,
          comments: detailThread.comments.map((comment) => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.includes(action.payload.userId)
                  ? comment.upVotesBy.filter(
                    (id) => id !== action.payload.userId,
                  )
                  : [...comment.upVotesBy, action.payload.userId],
                downVotesBy: comment.downVotesBy.filter(
                  (id) => id !== action.payload.userId,
                ),
              };
            }
            return comment;
          }),
        };
      }
      return detailThread;
    case ActionType.DOWNVOTE_COMMENT:
      if (detailThread && detailThread.id === action.payload.threadId) {
        return {
          ...detailThread,
          comments: detailThread.comments.map((comment) => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                downVotesBy: comment.downVotesBy.includes(action.payload.userId)
                  ? comment.downVotesBy.filter(
                    (id) => id !== action.payload.userId,
                  )
                  : [...comment.downVotesBy, action.payload.userId],
                upVotesBy: comment.upVotesBy.filter(
                  (id) => id !== action.payload.userId,
                ),
              };
            }
            return comment;
          }),
        };
      }
      return detailThread;
    case ActionType.NEUTRALIZE_COMMENT_VOTE:
      if (detailThread && detailThread.id === action.payload.threadId) {
        return {
          ...detailThread,
          comments: detailThread.comments.map((comment) => {
            if (comment.id === action.payload.commentId) {
              return {
                ...comment,
                upVotesBy: comment.upVotesBy.filter(
                  (id) => id !== action.payload.userId,
                ),
                downVotesBy: comment.downVotesBy.filter(
                  (id) => id !== action.payload.userId,
                ),
              };
            }
            return comment;
          }),
        };
      }
      return detailThread;
    default:
      return detailThread;
  }
}

export default detailThreadReducer;
