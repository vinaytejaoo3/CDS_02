import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login({ navigate }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard')
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='title'><center><h1>AI-Enhanced Drug Adverse Reaction Monitoring</h1></center>
    
    
    <div className="container">   
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
    </div>
  );
}

export default Login;
