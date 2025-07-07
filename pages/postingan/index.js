// pages/posts/index.js
import {useState, useEffect} from 'react';
import axios from 'axios';
import Link from 'next/link';



export default function PostingList() {
  const [postings, setPostings] = useState([]);
  const [form, setForm] = useState({title: '', content: ''});

  useEffect(() => {
    fetchPostings();
  }, []);

  const fetchPostings = async () => {
    const res = await axios.get('/api/');
    setPostings(res.data);
  };

  const handleChange = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('/api/', form);
    setForm({title: '', content: ''});
    fetchPostings();
  };

  const handleDelete = async id => {
    await axios.delete(`/api/${id}`);
    fetchPostings();
  };

  return (
    <div style={{padding: '2rem'}}>
      <h1>Daftar Posting</h1>

      <form onSubmit={handleSubmit} style={{marginBottom: 20}}>
        <input name="title" placeholder="Judul" value={form.title} onChange={handleChange} required />
        <br />
        <textarea name="content" placeholder="Konten" value={form.content} onChange={handleChange} required />
        <br />
        <button type="submit">Tambah Posting</button>
      </form>

      <ul>
        {postings.map(posting => (
          <li key={posting.id}>
            <b>{posting.title}</b> — {posting.content}
            <br />
            <Link href={`/postings/${posting.id}`}>✏️ Edit</Link>
            {' | '}
            <button onClick={() => handleDelete(posting.id)}>🗑️ Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
