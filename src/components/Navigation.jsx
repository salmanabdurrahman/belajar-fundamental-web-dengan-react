import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav className="navigation">
      <div className="navigation__brand">
        <h1>
          Simple <span className="highlight">Notes</span>
        </h1>
      </div>
      <div className="navigation__links">
        <Link to="/" className="nav-link">
          Beranda
        </Link>
        <Link to="/archives" className="nav-link">
          Arsip
        </Link>
        <Link to="/notes/new" className="nav-link nav-link--cta">
          + Tambah Catatan
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
