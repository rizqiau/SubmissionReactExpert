import React from 'react';
import PropTypes from 'prop-types';

function AddCommentForm({ onAddComment }) {
  const [content, setContent] = React.useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    if (content.trim()) {
      onAddComment(content);
      setContent('');
    }
  };

  return (
    <div className="add-comment-form">
      <h3>Beri Komentar</h3>
      <form onSubmit={onSubmit}>
        <textarea
          placeholder="Tulis komentarmu di sini..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          required
        />
        <button type="submit">Kirim Komentar</button>
      </form>
    </div>
  );
}

AddCommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default AddCommentForm;
