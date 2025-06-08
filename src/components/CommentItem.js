import React from 'react';
import PropTypes from 'prop-types';
import parser from 'html-react-parser';
import { postedAt } from '../utils';

function CommentItem({
  id,
  content,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  onUpVote,
  onDownVote,
}) {
  const isUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const handleUpVote = (event) => {
    event.stopPropagation();
    onUpVote(id);
  };

  const handleDownVote = (event) => {
    event.stopPropagation();
    onDownVote(id);
  };

  return (
    <div className="comment-item">
      <div className="comment-item__header">
        <div className="comment-item__owner-info">
          <img src={owner.avatar} alt={owner.name} />
          <p>{owner.name}</p>
        </div>
        <p className="comment-item__date">{postedAt(createdAt)}</p>
      </div>
      <div className="comment-item__content">{parser(content)}</div>
      <div className="comment-item__footer">
        <button
          type="button"
          className={`vote-button ${isUpVoted ? 'voted' : ''}`}
          onClick={handleUpVote}
        >
          👍
          {' '}
          {upVotesBy.length}
        </button>
        <button
          type="button"
          className={`vote-button ${isDownVoted ? 'voted' : ''}`}
          onClick={handleDownVote}
        >
          👎
          {' '}
          {downVotesBy.length}
        </button>
      </div>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

CommentItem.propTypes = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  authUser: PropTypes.shape(authUserShape),
  onUpVote: PropTypes.func.isRequired,
  onDownVote: PropTypes.func.isRequired,
};

CommentItem.defaultProps = {
  authUser: null,
};

export default CommentItem;
