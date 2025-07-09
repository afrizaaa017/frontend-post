// pages/posts/index.js
import { useState, useEffect } from 'react';
import Link from 'next/link';
import PostinganCard from '../../components/post/PostinganCard';
import {
  getAllPostings,
  deletePosting,
  getPostingCount,
} from '../../api/postingan';

const btn = {
  border: 'none',
  borderRadius: '5px',
  padding: '0.4rem 1rem',
  margin: '0 0.2rem',
  cursor: 'pointer',
  fontWeight: 600
};
const btnAdd = { ...btn, background: '#0070f3', color: '#fff' };

export default function PostingList() {
  const [postings, setPostings] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const [count, setCount] = useState(0);

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

  const handleDelete = async id => {
    await deletePosting(id);
    fetchPostings();
    fetchCount();
  };

  return (
    <div style={{ padding: '2rem', background: '#f6f8fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '2rem' }}>Daftar Posting</h1>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <b>Total Posting:</b> {count}
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Link href="/postings/new" style={btnAdd}>Create New Post</Link>
      </div>

      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        {isMounted && postings.length === 0 && (
          <div style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>Belum ada postingan.</div>
        )}
        {isMounted && postings.map(posting => (
          <PostinganCard
            key={posting.id}
            postingan={posting}
            onEdit={() => window.location.href = `/postings/${posting.id}`}
            onEditPartial={() => window.location.href = `/postings/update`}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
