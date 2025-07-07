// pages/posts/[id].js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';



export default function EditPosting() {
  const router = useRouter();
  const { id } = router.query;
  const [posting, setPosting] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (id) {
      axios.get(`/api/${id}`).then(res => {
        setPosting(res.data);
        setLoading(false);
      });
    }
  }, [id]);

  const handleChange = e => {
    setPosting({ ...posting, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`/api/${id}`, posting);
    router.push('/postingan');
  };

  const cardStyle = {
    background: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
    padding: '1.5rem',
    maxWidth: 500,
    margin: '0 auto',
    marginTop: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  };
  const btnSave = {
    border: 'none',
    borderRadius: '5px',
    padding: '0.5rem 1.2rem',
    background: '#0070f3',
    color: '#fff',
    fontWeight: 600,
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '0.5rem',
  };
  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
    marginBottom: '0.5rem',
  };

  if (!isMounted || loading) {
    return <div style={{ textAlign: 'center', marginTop: 60, color: '#888' }}>Memuat data...</div>;
  }

  return (
    <div style={{ padding: '2rem', background: '#f6f8fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '2rem' }}>Edit Posting</h1>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <label htmlFor="title" style={{ fontWeight: 600 }}>Judul</label>
        <input
          id="title"
          name="title"
          value={posting.title}
          onChange={handleChange}
          required
          style={inputStyle}
        />
        <label htmlFor="content" style={{ fontWeight: 600 }}>Konten</label>
        <textarea
          id="content"
          name="content"
          value={posting.content}
          onChange={handleChange}
          required
          style={{ ...inputStyle, minHeight: 80 }}
        />
        <button type="submit" style={btnSave}>Simpan</button>
      </form>
    </div>
  );
}
