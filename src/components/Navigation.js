import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Navigation({ authUser, signOut }) {
  const { avatar, name } = authUser;

  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">Threads</Link>
        </li>
        <li>
          <Link to="/leaderboards">Leaderboards</Link>
        </li>
      </ul>
      <div className="user-info">
        <img src={avatar} alt={name} title={name} className="avatar" />
        <span>{name}</span>
        <button type="button" onClick={signOut}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
