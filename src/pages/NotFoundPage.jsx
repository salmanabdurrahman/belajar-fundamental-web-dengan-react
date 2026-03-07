import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="page">
      <div className="not-found-page">
        <h1 className="not-found-page__title">404</h1>
        <h2 className="not-found-page__subtitle">Halaman Tidak Ditemukan</h2>
        <p className="not-found-page__message">
          Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan.
        </p>
        <Link to="/" className="btn btn-primary">
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
