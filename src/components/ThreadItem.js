import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import { postedAt } from "../utils";
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  // eslint-disable-next-line no-unused-vars
  asyncNeutralizeThreadVote,
} from "../states/threads/action";

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  totalComments,
}) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.authUser);

  const isUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const onUpVote = (event) => {
    event.stopPropagation();
    if (!authUser) {
      alert("You must be logged in to vote.");
      return;
    }
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVote = (event) => {
    event.stopPropagation();
    if (!authUser) {
      alert("You must be logged in to vote.");
      return;
    }
    dispatch(asyncDownVoteThread(id));
  };

  return (
    <Link to={`/threads/${id}`} className="thread-item">
      <div className="thread-item__header">
        <p className="thread-item__category">#{category}</p>
        <h3 className="thread-item__title">{title}</h3>
      </div>
      <div className="thread-item__body">
        <div>
          {parser(body.substring(0, 150) + (body.length > 150 ? "..." : ""))}
        </div>
      </div>
      <div className="thread-item__footer">
        <div className="thread-item__votes">
          <button
            type="button"
            className={`vote-button ${isUpVoted ? "voted" : ""}`}
            onClick={onUpVote}>
            👍 {upVotesBy.length}
          </button>
          <button
            type="button"
            className={`vote-button ${isDownVoted ? "voted" : ""}`}
            onClick={onDownVote}>
            👎 {downVotesBy.length}
          </button>
        </div>
        <p className="thread-item__comments">
          💬
          {totalComments}
        </p>
        <p className="thread-item__user">
          Dibuat oleh <img src={owner.avatar} alt={owner.name} /> {owner.name}
        </p>
        <p className="thread-item__date">{postedAt(createdAt)}</p>
      </div>
    </Link>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
};

export default ThreadItem;
