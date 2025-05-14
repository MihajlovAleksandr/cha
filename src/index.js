import React from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login'; // Предполагается, что у вас есть компонент Login
import Role from './Role';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/role" element={<Role />} />
      </Routes>
    </Router>
  </React.StrictMode>
);