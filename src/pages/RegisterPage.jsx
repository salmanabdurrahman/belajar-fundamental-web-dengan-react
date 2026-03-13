import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import LoadingIndicator from "../components/LoadingIndicator";
import StatusMessage from "../components/StatusMessage";
import { useLocale } from "../contexts/LocaleContext";
import useInput from "../hooks/useInput";
import { register } from "../utils/network-data";

function RegisterPage() {
  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirmPassword, onConfirmPasswordChange] = useInput("");
  const [errorKey, setErrorKey] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { t } = useLocale();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrorKey("passwordMismatch");
      return;
    }

    setSubmitting(true);
    setErrorKey("");

    const response = await register({ name, email, password });

    if (response.error) {
      setErrorKey("registerFailed");
      setSubmitting(false);
      return;
    }

    navigate("/login", {
      replace: true,
      state: { messageKey: "registerSuccess" },
    });
  };

  if (submitting) {
    return <LoadingIndicator message={t("submitting")} />;
  }

  return (
    <AuthLayout
      title={t("registerTitle")}
      subtitle={t("registerSubtitle")}
      status={
        <StatusMessage message={errorKey ? t(errorKey) : ""} variant="error" />
      }
      footer={<Link to="/login">{t("haveAccount")}</Link>}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            {t("name")}
          </label>
          <input
            type="text"
            id="name"
            className="form-input"
            value={name}
            onChange={onNameChange}
            autoComplete="name"
            required
          />
        </div>

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
            autoComplete="new-password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            {t("confirmPassword")}
          </label>
          <input
            type="password"
            id="confirmPassword"
            className="form-input"
            value={confirmPassword}
            onChange={onConfirmPasswordChange}
            autoComplete="new-password"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {t("registerButton")}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
