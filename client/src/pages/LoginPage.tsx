import React, { useState } from 'react';
import InputField from '../components/InputField';
import Button from '../components/Button';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setError(''); // Clear error
      alert('Login successful!'); // Replace with redirect logic
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Welcome Back</h1>
        {error && <p className="error-message">{error}</p>}
        <InputField
          label="Username"
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button text="Login" onClick={handleLogin} />
        <p className="small-text">© 2025 Refund Management System</p>
      </div>
    </div>
  );
};

export default LoginPage;
