import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useLocale } from "../contexts/LocaleContext";

function NotFoundPage({ homePath = "/" }) {
  const { t } = useLocale();

  return (
    <div className="page">
      <div className="not-found-page">
        <h1 className="not-found-page__title">404</h1>
        <h2 className="not-found-page__subtitle">{t("pageNotFoundTitle")}</h2>
        <p className="not-found-page__message">{t("pageNotFoundMessage")}</p>
        <Link to={homePath} className="btn btn-primary">
          {homePath === "/login" ? t("backToLogin") : t("backToHome")}
        </Link>
      </div>
    </div>
  );
}

NotFoundPage.propTypes = {
  homePath: PropTypes.string,
};

export default NotFoundPage;
