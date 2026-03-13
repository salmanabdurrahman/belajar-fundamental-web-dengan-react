import { useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import LoadingIndicator from "../components/LoadingIndicator";
import StatusMessage from "../components/StatusMessage";
import { useLocale } from "../contexts/LocaleContext";
import useInput from "../hooks/useInput";
import { login } from "../utils/network-data";

function LoginPage({ onLoginSuccess }) {
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [errorKey, setErrorKey] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLocale();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setErrorKey("");

    const response = await login({ email, password });

    if (response.error) {
      setErrorKey("loginFailed");
      setSubmitting(false);
      return;
    }

    try {
      await onLoginSuccess(response.data.accessToken);
      navigate("/", { replace: true });
    } catch {
      setErrorKey("sessionExpired");
      setSubmitting(false);
    }
  };

  if (submitting) {
    return <LoadingIndicator message={t("submitting")} />;
  }

  const status = (
    <>
      <StatusMessage
        message={location.state?.messageKey ? t(location.state.messageKey) : ""}
        variant="success"
      />
      <StatusMessage message={errorKey ? t(errorKey) : ""} variant="error" />
    </>
  );

  return (
    <AuthLayout
      title={t("loginTitle")}
      subtitle={t("loginSubtitle")}
      status={status}
      footer={<Link to="/register">{t("noAccount")}</Link>}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            {t("email")}
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={onEmailChange}
            autoComplete="email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            {t("password")}
          </label>
          <input
            type="password"
            id="password"
            className="form-input"
            value={password}
            onChange={onPasswordChange}
            autoComplete="current-password"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {t("loginButton")}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

LoginPage.propTypes = {
  onLoginSuccess: PropTypes.func.isRequired,
};

export default LoginPage;
