// Komponen Card untuk menampilkan satu postingan
import React from 'react';
import styles from '../../styles/PostinganCard.module.css';

export default function PostinganCard({ postingan, onEdit, onDelete }) {
  return (
    <div className={styles.card}>
      <div className={styles.id}>id = {postingan.id}</div>
      <div className={styles.title}>{postingan.title}</div>
      <div className={styles.content}>{postingan.content}</div>
      <div>
        {onEdit && (
          <button onClick={() => onEdit(postingan)} className={styles.btnEdit}>✏️ Edit</button>
        )}
        {onDelete && (
          <button onClick={() => onDelete(postingan.id)} className={styles.btnDelete}>🗑️ Delete</button>
        )}
      </div>
    </div>
  );
}
