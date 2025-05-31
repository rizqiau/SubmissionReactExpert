import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { postedAt } from "../utils";
import parser from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  const isUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };

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
    <div className="thread-item" onClick={onThreadClick}>
      <div className="thread-item__header">
        <p className="thread-item__category">#{category}</p>
        <h3 className="thread-item__title">{title}</h3>
      </div>
      <div className="thread-item__body">
        {/* Tampilkan potongan body, batasi panjangnya */}
        <p>
          {parser(body.substring(0, 150) + (body.length > 150 ? "..." : ""))}
        </p>
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
        <p className="thread-item__comments">💬 {totalComments}</p>
        <p className="thread-item__user">
          Dibuat oleh <img src={owner.avatar} alt={owner.name} /> {owner.name}
        </p>
        <p className="thread-item__date">{postedAt(createdAt)}</p>
      </div>
    </div>
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
