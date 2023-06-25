import React, { useState, useEffect } from 'react';
import Login from './components/login';
import Register from './components/register';
import Cookies from 'js-cookie';
import FileUpload from './components/fileUpload';
import './App.css';

function App() {
  const [showLogin, setShowLogin] = useState(true);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const storedPermissions = Cookies.get('permissions');
    if (storedPermissions) {
      setPermissions(JSON.parse(storedPermissions));
    }
  }, []);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleRegisterClick = () => {
    setShowLogin(false);
  };

  const handleLogin = (userPermissions) => {
    setPermissions(userPermissions);
    Cookies.set('permissions', JSON.stringify(userPermissions), {expires: 1/24});
    setShowLogin(true);
  }

  const checkPermissions = () => {
    console.log(Cookies.get('permissions'));
  }

  return (
    <div>
      <button onClick={handleLoginClick}>Login</button>
      <button onClick={handleRegisterClick}>Register</button>

      {showLogin ? <Login onLogin={handleLogin}/> : <Register/>}
      {permissions === 10 && <FileUpload />}
      <button onClick={checkPermissions}>permissions</button>
    </div>
  );
}

export default App;