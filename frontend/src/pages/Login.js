import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Ensure you are importing useNavigate
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email,
        password
      });
      console.log(response.data); // Handle successful response
      // Redirect to another page after successful login
      navigate('/dashboard'); // Replace '/dashboard' with your desired route
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong'); // Handle unexpected errors
      }
    }
  };

  return (
    <div className="light-mode">
      <div className="header">
        <div className="logo">
          <h1>TO DO APP</h1>
          <p>Stop Procrastinating, Start Organizing</p>
        </div>
        <div className="icons">
          <button id="theme-toggle" className="theme-toggle">
            <img src="dark mode button.svg" alt="theme selector" />
          </button>
          <img className="icon user-profile" src="profile photo.png" alt="profile photo" />
        </div>
      </div>
      <div className="container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          {error && <p className="error">{error}</p>}
          <p>Don't have an account? <a href="/signup">Sign Up</a></p>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
