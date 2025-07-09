import React from 'react';  

export default function PostinganUpdateForm({ form, onChange, onSubmit, inputStyle, btnAdd }) {
  return (
    <form onSubmit={onSubmit} style={{
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
        onChange={onChange}
        style={inputStyle}
      />
      <textarea
        name="content"
        placeholder="Konten"
        value={form.content}
        onChange={onChange}
        style={{ ...inputStyle, minHeight: 80 }}
      />
      <button type="submit" style={btnAdd}>Update Keseluruhan Postingan</button>
    </form>
  );
}