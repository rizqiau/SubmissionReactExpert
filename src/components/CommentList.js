import React from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";

function CommentList({
  comments,
  authUser,
  onUpVoteComment,
  onDownVoteComment,
}) {
  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          authUser={authUser}
          onUpVote={onUpVoteComment}
          onDownVote={onDownVoteComment}
        />
      ))}
    </div>
  );
}

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  authUser: PropTypes.object,
  onUpVoteComment: PropTypes.func.isRequired,
  onDownVoteComment: PropTypes.func.isRequired,
};

export default CommentList;
