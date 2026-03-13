# Aplikasi Catatan Pribadi V2

Single Page Application berbasis React untuk mengelola catatan pribadi dengan autentikasi, integrasi Dicoding Notes API, proteksi route, penggantian tema, dan penggantian bahasa. Proyek ini merupakan submission akhir phase 2 kelas **Belajar Fundamental Aplikasi Web dengan React**.

## Live Demo

Anda dapat mencoba aplikasi ini secara langsung melalui link berikut:

**Demo Aplikasi:**
[https://belajar-fundamental-web-dengan-react.netlify.app](https://belajar-fundamental-web-dengan-react.netlify.app)

## Fitur

- Autentikasi pengguna (register, login, logout) dengan penyimpanan `accessToken` di `localStorage`
- Integrasi **Dicoding Notes API** untuk melihat, menambah, menghapus, arsip, unarchive, dan detail catatan
- Route protection untuk halaman notes setelah login
- Theme switcher `light/dark` dengan persistensi
- Language switcher `Indonesia/English`
- Loading indicator saat fetch data dan submit form
- Pencarian catatan berdasarkan judul
- Halaman 404 untuk route tidak valid

## Teknologi

- React 19
- React Router DOM 7
- Vite
- PropTypes
- html-react-parser
- ESLint

## Sumber Data

API yang digunakan:

[https://notes-api.dicoding.dev/v1](https://notes-api.dicoding.dev/v1)

Request helper berada di `src/utils/network-data.js`.

## Struktur Proyek

```

src/
├── components/
├── contexts/
├── data/
├── hooks/
├── pages/
├── routes/
├── styles/
├── utils/
├── App.jsx
└── main.jsx

```

## Routing

| Path         | Akses  | Deskripsi            |
| ------------ | ------ | -------------------- |
| `/login`     | Publik | Halaman login        |
| `/register`  | Publik | Halaman registrasi   |
| `/`          | Privat | Daftar catatan aktif |
| `/archives`  | Privat | Daftar catatan arsip |
| `/notes/new` | Privat | Tambah catatan       |
| `/notes/:id` | Privat | Detail catatan       |
| `*`          | Publik | Halaman 404          |

## Menjalankan Proyek

Prasyarat:

- Node.js 18+
- npm

```bash
npm install
npm run dev
```

Aplikasi berjalan di `http://localhost:5173`.

## Alur Penggunaan

1. Registrasi akun di `/register`
2. Login untuk mengakses halaman catatan
3. Tambah dan kelola catatan dari halaman utama atau arsip
4. Ubah tema dan bahasa melalui navigasi

## Penyimpanan Lokal

Aplikasi menyimpan data berikut di `localStorage`:

- `accessToken`
- `notes-app-theme`
- `notes-app-locale`

## Verifikasi

```bash
npm run lint
npm run build
```

## AI Attribution / Acknowledgements

Dalam proses pengembangan proyek ini, saya menggunakan bantuan **AI tools** sebagai alat pendukung dalam beberapa tahap pengembangan, antara lain:

- **Brainstorming ide dan struktur fitur aplikasi** untuk membantu merancang alur aplikasi catatan pribadi.
- **Menyusun dan merapikan dokumentasi README** agar lebih jelas dan mudah dipahami.
- **Referensi styling** untuk eksplorasi konsep desain **Neo-Brutalism** yang digunakan pada tampilan aplikasi.
