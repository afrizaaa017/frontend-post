import React from 'react';

export default function PartialUpdateForm({ patchId, setPatchId, patchTitle, setPatchTitle, patchContent, setPatchContent, onPatch, inputStyle, btnEdit }) {
  return (
    <form onSubmit={onPatch} style={{
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
      <label><b>Partial Update Konten Posting (by ID)</b></label>
      <input
        placeholder="ID postingan"
        value={patchId}
        onChange={e => setPatchId(e.target.value)}
        style={inputStyle}
      />
      <input
        placeholder="Judul baru"
        value={patchTitle}
        onChange={e => setPatchTitle(e.target.value)}
        style={inputStyle}
      />
      <input
        placeholder="Konten baru"
        value={patchContent}
        onChange={e => setPatchContent(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={btnEdit}>Update Satu</button>
    </form>
  );
}
