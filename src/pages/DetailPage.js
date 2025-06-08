import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import parser from 'html-react-parser';
import {
  asyncReceiveDetailThread,
  clearDetailThreadActionCreator,
  asyncAddComment,
  asyncUpVoteDetailThread,
  asyncDownVoteDetailThread,
  // eslint-disable-next-line no-unused-vars
  asyncNeutralizeDetailThreadVote,
  asyncUpVoteComment,
  asyncDownVoteComment,
  // eslint-disable-next-line no-unused-vars
  asyncNeutralizeCommentVote,
} from '../states/detailThread/action';
import { postedAt } from '../utils';
import AddCommentForm from '../components/AddCommentForm';
import CommentList from '../components/CommentList';

function DetailPage() {
  const { id } = useParams();
  const { detailThread = null, authUser = null } = useSelector(
    (states) => states,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailThread(id));

    return () => {
      dispatch(clearDetailThreadActionCreator());
    };
  }, [id, dispatch]);

  if (!detailThread) {
    return <p>Loading detail thread...</p>;
  }

  const {
    title,
    body,
    category,
    createdAt,
    owner,
    upVotesBy,
    downVotesBy,
    comments,
  } = detailThread;

  const isUpVoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const isDownVoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const onUpVoteThread = () => {
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote!');
      return;
    }
    dispatch(asyncUpVoteDetailThread(id));
  };

  const onDownVoteThread = () => {
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote!');
      return;
    }
    dispatch(asyncDownVoteDetailThread(id));
  };

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ threadId: id, content }));
  };

  const onUpVoteComment = (commentId) => {
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote!');
      return;
    }
    dispatch(asyncUpVoteComment({ threadId: id, commentId }));
  };

  const onDownVoteComment = (commentId) => {
    if (!authUser) {
      alert('Anda harus login untuk melakukan vote!');
      return;
    }
    dispatch(asyncDownVoteComment({ threadId: id, commentId }));
  };

  return (
    <div className="detail-page">
      <p className="detail-page__category">
        #
        {category}
      </p>
      <h2 className="detail-page__title">{title}</h2>
      <div className="detail-page__owner-info">
        <img src={owner.avatar} alt={owner.name} />
        <p>{owner.name}</p>
      </div>
      <div className="detail-page__body">{parser(body)}</div>
      <div className="detail-page__footer">
        <div className="detail-page__votes">
          <button
            type="button"
            className={`vote-button ${isUpVoted ? 'voted' : ''}`}
            onClick={onUpVoteThread}
          >
            👍
            {' '}
            {upVotesBy.length}
          </button>
          <button
            type="button"
            className={`vote-button ${isDownVoted ? 'voted' : ''}`}
            onClick={onDownVoteThread}
          >
            👎
            {' '}
            {downVotesBy.length}
          </button>
        </div>
        <p className="detail-page__date">{postedAt(createdAt)}</p>
      </div>

      {authUser && <AddCommentForm onAddComment={onAddComment} />}

      <h3>
        Komentar (
        {comments.length}
        )
      </h3>
      <CommentList
        comments={comments}
        authUser={authUser}
        onUpVoteComment={onUpVoteComment}
        onDownVoteComment={onDownVoteComment}
      />
    </div>
  );
}

export default DetailPage;
