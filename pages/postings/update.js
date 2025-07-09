import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PartialUpdateForm from '../../components/post/PartialUpdateForm';
import { getPostingById, patchPosting } from '../../api/postingan';

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

const UpdatePostingan = () => {
  const [patchId, setPatchId] = useState('');
  const [patchTitle, setPatchTitle] = useState('');
  const [patchContent, setPatchContent] = useState('');
  const router = useRouter();

  const handlePatch = async e => {
    e.preventDefault();
    if (!patchId) return;

    const dataToPatch = {};
    if (patchTitle) dataToPatch.title = patchTitle;
    if (patchContent) dataToPatch.content = patchContent;

    await patchPosting(patchId, dataToPatch);
    router.push('/postings');
  };

  return (
    <div style={{ padding: '2rem', background: '#f6f8fa', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#0070f3', marginBottom: '2rem' }}>Partial Update Postingan</h1>
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
    </div>
  );
};

export default UpdatePostingan;