# Aplikasi Catatan Pribadi - React SPA

Aplikasi Single Page Application (SPA) untuk mengelola catatan pribadi dengan fitur lengkap, dibangun menggunakan React dengan styling Neo-Brutalism.

## 🌐 Live Demo

Anda dapat mencoba aplikasi ini secara langsung melalui link berikut:

**Demo Aplikasi:**
[https://belajar-fundamental-web-dengan-react.netlify.app](https://belajar-fundamental-web-dengan-react.netlify.app)

## 🌟 Fitur

### Fitur Utama

- ✅ **Multi-page Navigation** dengan React Router
- ✅ **Daftar Catatan** - Menampilkan semua catatan aktif
- ✅ **Detail Catatan** - Melihat detail lengkap catatan via URL parameter
- ✅ **Tambah Catatan** - Form untuk membuat catatan baru dengan HTML formatting
- ✅ **Hapus Catatan** - Menghapus catatan yang tidak diperlukan
- ✅ **PropTypes Validation** - Validasi tipe data pada semua komponen
- ✅ **Arsip Catatan** - Arsipkan dan aktifkan kembali catatan
- ✅ **Halaman Arsip** - Halaman khusus untuk catatan yang diarsipkan
- ✅ **Pencarian** - Cari catatan berdasarkan judul dengan query parameter
- ✅ **Halaman 404** - Handle URL yang tidak valid

## 🚀 Teknologi

- **React 19.2.0** - Library UI
- **React Router 7.x** - Client-side routing
- **PropTypes** - Runtime type checking
- **html-react-parser** - Render HTML string
- **Vite** - Build tool & dev server
- **ESLint** - Code linting

## 📁 Struktur Folder

```
src/
├── components/          # Komponen UI reusable
│   ├── Navigation.jsx
│   ├── NoteItem.jsx
│   ├── NoteList.jsx
│   ├── SearchBar.jsx
│   ├── DeleteButton.jsx
│   └── ArchiveButton.jsx
├── pages/              # Komponen halaman
│   ├── HomePage.jsx
│   ├── DetailPage.jsx
│   ├── AddNotePage.jsx
│   ├── ArchivePage.jsx
│   └── NotFoundPage.jsx
├── utils/              # Helper functions & data
│   └── local-data.js
├── styles/             # Styling
│   └── style.css
├── App.jsx            # Root component dengan routing
└── main.jsx           # Entry point
```

## 🛣️ Routing

| Path         | Component    | Deskripsi                      |
| ------------ | ------------ | ------------------------------ |
| `/`          | HomePage     | Daftar catatan aktif           |
| `/notes/new` | AddNotePage  | Form tambah catatan baru       |
| `/notes/:id` | DetailPage   | Detail catatan berdasarkan ID  |
| `/archives`  | ArchivePage  | Daftar catatan yang diarsipkan |
| `/*`         | NotFoundPage | Halaman 404                    |

## 🔧 Instalasi & Menjalankan

### Prerequisites

- Node.js (v16 atau lebih baru)
- npm atau yarn

### Instalasi

```bash
# Install dependencies
npm install

# Jalankan development server
npm run dev

# Build untuk production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

Aplikasi akan berjalan di `http://localhost:5173` (atau port lain jika 5173 sedang digunakan).

## 🤖 AI Attribution / Acknowledgements

Dalam proses pengembangan proyek ini, saya menggunakan bantuan **AI tools** sebagai alat pendukung dalam beberapa tahap pengembangan, antara lain:

- **Brainstorming ide dan struktur fitur aplikasi** untuk membantu merancang alur aplikasi catatan pribadi.
- **Menyusun dan merapikan dokumentasi README** agar lebih jelas dan mudah dipahami.
- **Referensi styling** untuk eksplorasi konsep desain **Neo-Brutalism** yang digunakan pada tampilan aplikasi.
