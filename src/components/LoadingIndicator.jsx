import PropTypes from "prop-types";

function LoadingIndicator({ message, fullPage = false }) {
  return (
    <div
      className={`loading ${fullPage ? "loading--full-page" : ""}`.trim()}
      role="status"
      aria-live="polite"
    >
      <div className="loading__spinner" aria-hidden="true" />
      <p className="loading__message">{message}</p>
    </div>
  );
}

LoadingIndicator.propTypes = {
  fullPage: PropTypes.bool,
  message: PropTypes.string.isRequired,
};

export default LoadingIndicator;
