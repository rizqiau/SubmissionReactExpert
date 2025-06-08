import React from 'react';
import PropTypes from 'prop-types';
import LoadingBar from 'react-top-loading-bar';

function Loading({ show }) {
  return <LoadingBar progress={show ? 100 : 0} waitingTime={200} />;
}

Loading.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default Loading;
