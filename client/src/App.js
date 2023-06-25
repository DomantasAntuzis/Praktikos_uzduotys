import React, { useState } from 'react';
import Login from './components/login';
import Register from './components/register';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>

      {showLogin ? <Login /> : <Register />}
    </div>
  );
}

export default App;