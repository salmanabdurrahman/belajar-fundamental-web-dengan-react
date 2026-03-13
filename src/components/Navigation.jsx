import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useLocale } from "../contexts/LocaleContext";
import { useTheme } from "../contexts/ThemeContext";

function Navigation({ authUser = null, onLogout }) {
  const navigate = useNavigate();
  const { locale, toggleLocale, t } = useLocale();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    onLogout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navigation">
      <div className="navigation__brand">
        <Link to={authUser ? "/" : "/login"} className="navigation__brand-link">
          <h1>
            Simple <span className="highlight">Notes</span>
          </h1>
        </Link>
      </div>

      <div className="navigation__controls">
        <button type="button" className="nav-link" onClick={toggleTheme}>
          {theme === "light" ? t("darkMode") : t("lightMode")}
        </button>
        <button type="button" className="nav-link" onClick={toggleLocale}>
          {locale === "id" ? t("english") : t("indonesian")}
        </button>
        {authUser ? (
          <span className="navigation__user">
            {t("loggedInAs")}: {authUser.name}
          </span>
        ) : null}
      </div>

      <div className="navigation__links">
        {authUser ? (
          <>
            <Link to="/" className="nav-link">
              {t("home")}
            </Link>
            <Link to="/archives" className="nav-link">
              {t("archives")}
            </Link>
            <Link to="/notes/new" className="nav-link nav-link--cta">
              {t("addNote")}
            </Link>
            <button type="button" className="nav-link" onClick={handleLogout}>
              {t("logout")}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              {t("login")}
            </Link>
            <Link to="/register" className="nav-link nav-link--cta">
              {t("register")}
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

Navigation.propTypes = {
  authUser: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  onLogout: PropTypes.func.isRequired,
};

export default Navigation;
