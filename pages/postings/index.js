// pages/posts/index.js
import { useState, useEffect } from 'react';
import PostinganCard from '../../components/post/PostinganCard';
import PostinganForm from '../../components/post/PostinganForm';
import PartialUpdateForm from '../../components/post/PartialUpdateForm';
import {
  getAllPostings,
  createPosting,
  deletePosting,
  getPostingCount,
  patchPosting
} from '../../api/postingan';

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
  const [count, setCount] = useState(0);
  const [bulkContent, setBulkContent] = useState('');
  const [patchId, setPatchId] = useState('');
  const [patchTitle, setPatchTitle] = useState('');
  const [patchContent, setPatchContent] = useState('');

  useEffect(() => {
    setIsMounted(true);
    fetchPostings();
    fetchCount();
  }, []);

  const fetchPostings = async () => {
    const data = await getAllPostings();
    setPostings(data);
  };

  const fetchCount = async () => {
    const res = await getPostingCount();
    setCount(res.count);
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await createPosting(form);
    setForm({ title: '', content: '' });
    fetchPostings();
    fetchCount();
  };

  const handleDelete = async id => {
    await deletePosting(id);
    fetchPostings();
    fetchCount();
  };

  // Partial update postingan by id (PATCH /postings/{id})
  const handlePatch = async e => {
    e.preventDefault();
    if (!patchId) return;
    const data = {};
    if (patchTitle) data.title = patchTitle;
    if (patchContent) data.content = patchContent;
    await patchPosting(patchId, data);
    setPatchId('');
    setPatchTitle('');
    setPatchContent('');
    fetchPostings();
  };

  return (
    <div style={{ padding: '2rem', background: '#f6f8fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '2rem' }}>Daftar Posting</h1>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <b>Total Posting:</b> {count}
      </div>

      <PostinganForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        inputStyle={inputStyle}
        btnAdd={btnAdd}
      />

      {/* Partial update postingan by id */}
      <PartialUpdateForm
        patchId={patchId}
        setPatchId={setPatchId}
        patchTitle={patchTitle}
        setPatchTitle={setPatchTitle}
        patchContent={patchContent}
        setPatchContent={setPatchContent}
        onPatch={handlePatch}
        inputStyle={inputStyle}
        btnEdit={btnEdit}
      />

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {isMounted && postings.length === 0 && (
          <div style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>Belum ada postingan.</div>
        )}
        {isMounted && postings.map(posting => (
          <PostinganCard
            key={posting.id}
            postingan={posting}
            onEdit={() => window.location.href = `/postings/${posting.id}`}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
