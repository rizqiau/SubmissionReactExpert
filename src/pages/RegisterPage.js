import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { asyncRegisterUser } from '../states/authUser/action';

function RegisterPage() {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = async (event) => {
    event.preventDefault();
    const result = await dispatch(asyncRegisterUser({ name, email, password }));

    if (result && result.success) {
      navigate('/login');
    }
  };

  return (
    <div className="auth-page">
      <h2>Daftar Akun</h2>
      <form onSubmit={onRegister} className="register-form">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password (minimal 6 karakter)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={6}
          required
        />
        <button type="submit">Daftar</button>
      </form>
      <p>
        Sudah punya akun?
        {' '}
        <Link to="/login">Login di sini</Link>
      </p>
    </div>
  );
}

export default RegisterPage;
