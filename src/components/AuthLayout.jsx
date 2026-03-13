import PropTypes from "prop-types";

function AuthLayout({ title, subtitle, status, footer, children }) {
  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h2 className="page__title">{title}</h2>
        <p className="auth-card__subtitle">{subtitle}</p>
        {status}
        {children}
        {footer ? <p className="auth-card__footer">{footer}</p> : null}
      </div>
    </div>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  footer: PropTypes.node,
  status: PropTypes.node,
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

AuthLayout.defaultProps = {
  footer: null,
  status: null,
};

export default AuthLayout;
