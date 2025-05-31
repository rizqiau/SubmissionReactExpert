import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

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

Navigation.propTypes = {
  authUser: PropTypes.object.isRequired,
  signOut: PropTypes.func.isRequired,
};

export default Navigation;
