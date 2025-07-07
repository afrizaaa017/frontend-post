// pages/posts/index.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

const cardStyle = {
  background: '#fff',
  borderRadius: '10px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
  padding: '1.5rem',
  marginBottom: '1.5rem',
  transition: 'box-shadow 0.2s',
};
const cardHover = {
  boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
};
const btn = {
  border: 'none',
  borderRadius: '5px',
  padding: '0.4rem 1rem',
  margin: '0 0.2rem',
  cursor: 'pointer',
  fontWeight: 600
};
const btnAdd = { ...btn, background: '#0070f3', color: '#fff' };
const btnEdit = { ...btn, background: '#f5a623', color: '#fff' };
const btnDelete = { ...btn, background: '#e00', color: '#fff' };
const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  margin: '0.3rem 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};



export default function PostingList() {
  const [postings, setPostings] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchPostings();
  }, []);

  const fetchPostings = async () => {
    const res = await axios.get('/api/');
    setPostings(res.data);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/', form);
    setForm({ title: '', content: '' });
    fetchPostings();
  };

  const handleDelete = async id => {
    await axios.delete(`/api/${id}`);
    fetchPostings();
  };

  return (
    <div style={{ padding: '2rem', background: '#f6f8fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '2rem' }}>Daftar Posting</h1>

      <form onSubmit={handleSubmit} style={{
        background: '#fff',
        borderRadius: '10px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        padding: '1.5rem',
        maxWidth: 500,
        margin: '0 auto 2rem auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <input
          name="title"
          placeholder="Judul"
          value={form.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <textarea
          name="content"
          placeholder="Konten"
          value={form.content}
          onChange={handleChange}
          required
          style={{ ...inputStyle, minHeight: 80 }}
        />
        <button type="submit" style={btnAdd}>Tambah Posting</button>
      </form>

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {isMounted && postings.length === 0 && (
          <div style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>Belum ada postingan.</div>
        )}
        {isMounted && postings.map(posting => (
          <div
            key={posting.id}
            style={cardStyle}
            onMouseOver={e => e.currentTarget.style.boxShadow = cardHover.boxShadow}
            onMouseOut={e => e.currentTarget.style.boxShadow = cardStyle.boxShadow}
          >
            <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: 6 }}>{posting.title}</div>
            <div style={{ color: '#444', marginBottom: 12 }}>{posting.content}</div>
            <div>
              <Link href={`/postings/${posting.id}`} legacyBehavior>
                <a style={btnEdit}>✏️ Edit</a>
              </Link>
              <button style={btnDelete} onClick={() => handleDelete(posting.id)}>🗑️ Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
