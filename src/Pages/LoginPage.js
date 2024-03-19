// src/pages/LoginPage.js
import React from 'react';
import Login from '../Components/Login';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  return (
    <div>
      <Login navigate={navigate} />
    </div>
  );
}

export default LoginPage;