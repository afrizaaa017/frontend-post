// API service untuk postingan
import axios from 'axios';


// GET /postings (dengan filter opsional)
export const getAllPostings = async (filter) => {
  let url = '/api/';
  if (filter) {
    // filter harus berupa objek, akan diubah ke query string
    const params = new URLSearchParams({ filter: JSON.stringify(filter) });
    url += `?${params.toString()}`;
  }
  const res = await axios.get(url);
  return res.data;
};
// GET /postings/count
export const getPostingCount = async (where) => {
  let url = '/api/count';
  if (where) {
    const params = new URLSearchParams({ where: JSON.stringify(where) });
    url += `?${params.toString()}`;
  }
  const res = await axios.get(url);
  return res.data;
};

// PATCH /postings/{id} (partial update)
export const patchPosting = async (id, data) => {
  const res = await axios.patch(`/api/${id}`, data);
  return res.data;
};

export const getPostingById = async (id) => {
  const res = await axios.get(`/api/${id}`);
  return res.data;
};

export const createPosting = async (data) => {
  const res = await axios.post('/api/', data);
  return res.data;
};

export const updatePosting = async (id, data) => {
  const res = await axios.put(`/api/${id}`, data);
  return res.data;
};

export const deletePosting = async (id) => {
  const res = await axios.delete(`/api/${id}`);
  return res.data;
};
