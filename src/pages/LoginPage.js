import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';

function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    const result = await dispatch(asyncSetAuthUser({ email, password }));
    if (result && result.success) {
      navigate('/');
    }
  };
  return (
    <div className="auth-page">
      <h2>Login</h2>
      <form onSubmit={onLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Belum punya akun? <Link to="/register">Daftar di sini</Link>
      </p>
    </div>
  );
}

export default LoginPage;
