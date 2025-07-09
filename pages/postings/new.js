import { useState } from 'react';
import { useRouter } from 'next/router';
import PostinganForm from '../../components/post/PostinganForm';
import { createPosting } from '../../api/postingan';

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  margin: '0.3rem 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  fontSize: '1rem'
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

const NewPostingan = () => {
  const [form, setForm] = useState({ title: '', content: '' });
  const router = useRouter();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await createPosting(form);
    router.push('/postings');
  };

  return (
    <div style={{ padding: '2rem', background: '#f6f8fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '2rem' }}>Create New Post</h1>
      <PostinganForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        inputStyle={inputStyle}
        btnAdd={btnAdd}
      />
    </div>
  );
};

export default NewPostingan;