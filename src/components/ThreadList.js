import React from "react";
import PropTypes from "prop-types";
import ThreadItem from "./ThreadItem";

function ThreadList({ threads }) {
  return (
    <div className="thread-list">
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(ThreadItem.propTypes)).isRequired,
};

export default ThreadList;
