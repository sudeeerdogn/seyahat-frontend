import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/* eslint-disable react-hooks/exhaustive-deps */

function Destinations() {
  const [destinations, setDestinations] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', country: '', description: '', estimatedBudget: '', durationDays: '', category: '' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const API_URL = process.env.REACT_APP_API_URL || 'https://seyahat-planlayici-api.onrender.com';

const api = axios.create({
    baseURL: API_URL,
    headers: { Authorization: `Bearer ${token}` }
});

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
    fetchDestinations();
  }, []);

 useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await api.get('/api/destinations');
        setDestinations(res.data);
      } catch (err) {
        navigate('/login');
      }
    };
    fetchDestinations();
  }, [navigate]);

 const handleSearch = async () => {
    if (!keyword.trim()) {
      const res = await api.get('/api/destinations');
      setDestinations(res.data);
      return;
    }
    const res = await api.get(`/api/destinations/search?keyword=${keyword}`);
    setDestinations(res.data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await api.post('/api/destinations', {
      ...form,
      estimatedBudget: parseFloat(form.estimatedBudget),
      durationDays: parseInt(form.durationDays)
    });
    setShowForm(false);
    setForm({ name: '', country: '', description: '', estimatedBudget: '', durationDays: '', category: '' });
    fetchDestinations();
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/destinations/${id}`);
    fetchDestinations();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>🌍 Seyahat Planlayıcı</h1>
        <button style={styles.logoutBtn} onClick={handleLogout}>Çıkış</button>
      </div>

      <div style={styles.searchBar}>
        <input
          style={styles.searchInput}
          placeholder="Destinasyon ara..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button style={styles.searchBtn} onClick={handleSearch}>Ara</button>
        <button style={styles.addBtn} onClick={() => setShowForm(!showForm)}>+ Ekle</button>
      </div>

      {showForm && (
        <div style={styles.form}>
          <h3>Yeni Destinasyon</h3>
          <form onSubmit={handleAdd}>
           {[
  { key: 'name', label: 'Destinasyon Adı' },
  { key: 'country', label: 'Ülke' },
  { key: 'description', label: 'Açıklama' },
  { key: 'estimatedBudget', label: 'Tahmini Bütçe (TL)' },
  { key: 'durationDays', label: 'Gün Sayısı' },
  { key: 'category', label: 'Kategori' }
].map(({ key, label }) => (
  <input
    key={key}
    style={styles.input}
    placeholder={label}
    value={form[key]}
    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
  />
))}

            <button style={styles.addBtn} type="submit">Kaydet</button>
          </form>
        </div>
      )}

      <div style={styles.grid}>
        {destinations.map((d) => (
          <div key={d.id} style={styles.card}>
            <h3 style={styles.cardTitle}>{d.name}</h3>
            <p style={styles.cardCountry}>📍 {d.country}</p>
            <p style={styles.cardDesc}>{d.description}</p>
            <div style={styles.cardFooter}>
              <span style={styles.badge}>{d.category}</span>
              <span style={styles.budget}>💰 {d.estimatedBudget} TL</span>
              <span style={styles.days}>🗓 {d.durationDays} gün</span>
            </div>
            <button style={styles.deleteBtn} onClick={() => handleDelete(d.id)}>Sil</button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
  title: { color: '#2d3748' },
  logoutBtn: { padding: '8px 16px', backgroundColor: '#fc8181', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  searchBar: { display: 'flex', gap: '12px', marginBottom: '24px' },
  searchInput: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '16px' },
  searchBtn: { padding: '12px 24px', backgroundColor: '#4299e1', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  addBtn: { padding: '12px 24px', backgroundColor: '#48bb78', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  form: { backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', marginBottom: '24px' },
  input: { width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  card: { backgroundColor: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
  cardTitle: { color: '#2d3748', marginBottom: '8px' },
  cardCountry: { color: '#718096', marginBottom: '8px' },
  cardDesc: { color: '#4a5568', fontSize: '14px', marginBottom: '16px' },
  cardFooter: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' },
  badge: { backgroundColor: '#ebf8ff', color: '#2b6cb0', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  budget: { backgroundColor: '#f0fff4', color: '#276749', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  days: { backgroundColor: '#fff5f5', color: '#c53030', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' },
  deleteBtn: { padding: '8px 16px', backgroundColor: '#fc8181', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', width: '100%' }
};

export default Destinations;