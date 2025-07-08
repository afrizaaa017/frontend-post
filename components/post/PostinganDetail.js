import React from 'react';
import styles from '../../styles/PostinganCard.module.css';

export default function PostinganDetail({ postingan }) {
  if (!postingan) return null;
  return (
    <div className={styles.card}>
      <div className={styles.id}><b>ID:</b> {postingan.id}</div>
      <div className={styles.title}>{postingan.title}</div>
      <div className={styles.content}>{postingan.content}</div>
    </div>
  );
}
