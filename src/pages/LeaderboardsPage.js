import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { asyncReceiveLeaderboards } from '../states/leaderboards/action';

function LeaderboardsPage() {
  const { leaderboards = [] } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveLeaderboards());
  }, [dispatch]);

  return (
    <div className="leaderboards-page">
      <h2>Leaderboards Pengguna Aktif</h2>
      <div className="leaderboard-list">
        <div className="leaderboard-item header">
          <p>Pengguna</p>
          <p>Skor</p>
        </div>
        {leaderboards.map(({ user, score }) => (
          <div key={user.id} className="leaderboard-item">
            <div className="leaderboard-user-info">
              <img src={user.avatar} alt={user.name} />
              <span>{user.name}</span>
            </div>
            <p className="leaderboard-score">{score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardsPage;
