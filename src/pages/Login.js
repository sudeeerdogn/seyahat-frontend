import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const API_URL = 'https://seyahat-planlayici-api.onrender.com';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate('/destinations');
    } catch (err) {
      setError('Email veya şifre yanlış!');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🌍 Seyahat Planlayıcı</h2>
        <h3 style={styles.subtitle}>Giriş Yap</h3>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleLogin}>
          <input style={styles.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input style={styles.input} type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button style={styles.button} type="submit">Giriş Yap</button>
        </form>
        <p style={styles.link}>Hesabın yok mu? <Link to="/register">Kayıt Ol</Link></p>
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f0f4f8' },
  card: { backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '360px' },
  title: { textAlign: 'center', color: '#2d3748', marginBottom: '8px' },
  subtitle: { textAlign: 'center', color: '#718096', marginBottom: '24px' },
  input: { width: '100%', padding: '12px', marginBottom: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '16px', boxSizing: 'border-box' },
  button: { width: '100%', padding: '12px', backgroundColor: '#4299e1', color: 'white', border: 'none', borderRadius: '8px', fontSize: '16px', cursor: 'pointer' },
  error: { color: 'red', textAlign: 'center', marginBottom: '16px' },
  link: { textAlign: 'center', marginTop: '16px', color: '#718096' }
};

export default Login;