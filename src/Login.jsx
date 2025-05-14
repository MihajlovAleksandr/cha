import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/Login.css';
import { Header } from './Header';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
    
            fetch(`http://localhost:3001/api/user/${username.trim()}/${password.trim()}`)
                .then(response => response.json())
                .then(data => LoginIn(data))
                .catch(error => console.error('Ошибка:', error));
    }
  };
    function LoginIn(data){
      console.log(data)
      localStorage.setItem("userId", data.userId);
    }

  return (
    <div className="app-wrapper">
      <Header />
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Login"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
  
}
