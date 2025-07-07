
# Frontend Post (Next.js)

Aplikasi ini adalah frontend berbasis Next.js yang digunakan untuk menampilkan dan mengelola postingan. Aplikasi ini terhubung dengan backend melalui proxy API yang telah dikonfigurasi pada file `next.config.mjs`.

## Fitur Utama
- Menampilkan daftar artikel dan postingan
- Melihat detail postingan berdasarkan ID
- Proxy API ke backend (http://127.0.0.1:3030/postings)

## Struktur Folder
- `pages/` : Halaman utama aplikasi
  - `postingan/` : Halaman daftar dan detail postingan
- `public/` : Asset publik (ikon, gambar, dll)
- `src/app/` : File global, layout, dan halaman utama

## Konfigurasi Proxy API
Pada file `next.config.mjs`, terdapat konfigurasi rewrite agar permintaan ke `/api/:path*` diteruskan ke backend di `http://127.0.0.1:3030/postings/:path*`.

```js
// next.config.mjs
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:3030/postings/:path*',
      },
    ];
  },
};
```

## Menjalankan Aplikasi
1. Install dependencies:
   ```bash
   npm install
   ```
2. Jalankan aplikasi:
   ```bash
   npm run dev
   ```
3. Buka browser ke [http://localhost:3000](http://localhost:3000)

## Catatan
- Pastikan backend berjalan di `http://127.0.0.1:3030` agar proxy API berfungsi.
- Aplikasi ini dapat dikembangkan lebih lanjut sesuai kebutuhan.

---

Created for academic purposes.
