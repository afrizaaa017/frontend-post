import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PostinganUpdateForm from '../../components/post/PostinganUpdateForm';
import { getPostingById, updatePosting } from '../../api/postingan';

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

const btnEdit = { ...btn, background: '#f5a623', color: '#fff' };

const EditPosting = () => {
  const [form, setForm] = useState({ title: '', content: '' });
  const router = useRouter();
  const { id } = router.query;  

  useEffect(() => {
    if (!id) return; // Jangan lakukan apa-apa jika id belum tersedia

    const fetchPost = async () => {
      try {
        const data = await getPostingById(id);
        setForm({ title: data.title, content: data.content });
      } catch (error) {
        console.error("Failed to fetch post:", error);
        // Opsional: Arahkan ke halaman error atau 404
      }
    };

    fetchPost();
  }, [id]); // Jalankan efek ini setiap kali id berubah

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!id) return;

    const dataToUpdate = {};
    if (form.title) dataToUpdate.title = form.title;
    if (form.content) dataToUpdate.content = form.content;

    await updatePosting(id, dataToUpdate);
    router.push('/postings');
  };

  return (
    <div style={{ padding: '2rem', background: '#f6f8fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '2rem' }}>Update Post (ID: {id})</h1>
      <PostinganUpdateForm
        form={form}
        onChange={handleChange}
        onSubmit={handleSubmit}
        inputStyle={inputStyle}
        btnEdit={btnEdit}
      />
    </div>
  );
};

export default EditPosting;

