import React, { useState } from 'react';
import axios from 'axios';
import '../styles/auth.css';
import auth from '../images/auth.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://192.168.122.49:8080/api/auth/authenticate', {
        email,
        password
      });

      localStorage.setItem('token', response.data.token);

      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      console.log(`Email: ${email}, Password: ${password}`);
      console.log(`Token: ${response.data.token}`); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className='auth-container'>
        <img src={auth} alt="auth" />
        <form onSubmit={handleSubmit}>
          <h1 className='auth-h1'>Вход</h1>
          <div className='label-container'>
          <label>
            Почта
            <input className='auth-inp' type="email" placeholder="Введите почту" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label>
            Пароль
            <input className='auth-inp' type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          </div>
          <button type="submit">Войти</button>
          <p className='p-auth'>Нет аккаунта? <a href="/register">Регистрация</a></p>
        </form>
      </div>
    </>
  );
}

export default Login;