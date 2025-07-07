// pages/posts/[id].js
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import axios from 'axios';



export default function EditPosting() {
  const router = useRouter();
  const {id} = router.query;
  const [posting, setPosting] = useState({title: '', content: ''});

  useEffect(() => {
    if (id) {
      axios.get(`/api/${id}`).then(res => setPosting(res.data));
    }
  }, [id]);

  const handleChange = e => {
    setPosting({...posting, [e.target.name]: e.target.value});
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`/api/${id}`, posting);
    router.push('/postings');
  };

  return (
    <div style={{padding: '2rem'}}>
      <h1>Edit Posting</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" value={post.title} onChange={handleChange} required />
        <br />
        <textarea name="content" value={post.content} onChange={handleChange} required />
        <br />
        <button type="submit">Simpan</button>
      </form>
    </div>
  );
}
