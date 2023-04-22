import { useState } from 'react';
import LoginForm from './LoginForm';
import Profile from './Profile';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);

  const handleLogin = (username, password) => {
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error('Invalid credentials');
        }
      })
      .then((data) => {
        setToken(data.token);
        setId(data.id);
        setIsLoggedIn(true);
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.id);
      })
      .catch((err) => console.log(err.message));
  };

  const handleLogout = () => {
    setToken(null);
    setId(null);
    setIsLoggedIn(false);
  }
}

export default App;